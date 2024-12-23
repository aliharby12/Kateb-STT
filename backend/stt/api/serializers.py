from rest_framework import serializers


class AudioUploadSerializer(serializers.Serializer):
    """
    Serializer to validate audio file uploads.

    Fields:
        - file: The audio file to be uploaded. It validates the file type and ensures it's not empty.
    """

    file = serializers.FileField()

    def validate_file(self, value):
        # Ensure the uploaded file is of a supported type (e.g., .wav)
        if not value.name.endswith(".wav"):
            raise serializers.ValidationError("Only .wav files are supported.")
        return value
