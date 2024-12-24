import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from decouple import config
from .serializers import AudioUploadSerializer


class SpeechToTextView(APIView):
    """
    Endpoint for uploading audio files and forwarding them to an external STT system.

    This API accepts an audio file via a POST request, validates it using a serializer,
    forwards it to the external Speech-to-Text (STT) API (URL fetched from environment variables),
    and returns the transcription result.

    Methods:
        - POST: Handles the upload, validation, and transcription of the audio file.
    """

    permission_classes = [
        IsAuthenticated,
    ]  # Ensure user authentication

    def post(self, request):
        # Get the STT system URL from environment variables
        stt_url = config("STT_API_URL", default="https://example.com/stt")

        # Check the user quota
        user_profile = request.user.userprofile
        if user_profile.used_seconds >= user_profile.audio_quota_seconds:
            return Response(
                {
                    "error": "Quota exceeded. Please contact support to extend your quota."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Validate the incoming file using the serializer
        serializer = AudioUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Retrieve the validated file
        audio_file = serializer.validated_data["file"]

        try:
            # Prepare the form-data payload for the STT system
            form_data = {"file": (audio_file.name, audio_file, audio_file.content_type)}

            # Make the request to the STT system
            response = requests.post(
                stt_url,
                files=form_data,
            )

            # Check if the request to the STT system was successful
            if response.status_code == 200:

                # Get the total seconds
                audio_duration_seconds = response.json()["total_duration"]
                if (
                    user_profile.used_seconds + audio_duration_seconds
                    > user_profile.audio_quota_seconds
                ):
                    return Response(
                        {"error": "Not enough quota for this file."},
                        status=status.HTTP_403_FORBIDDEN,
                    )

                user_profile.used_seconds += audio_duration_seconds
                user_profile.save()
                # Return the transcription result to the client
                return Response(response.json(), status=status.HTTP_200_OK)
            else:
                # Handle errors from the STT system
                return Response(
                    {
                        "error": f"Failed to process audio. STT system responded with status {response.status_code}."
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        except Exception as e:
            # Handle unexpected errors
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
