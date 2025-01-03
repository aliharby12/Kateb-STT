from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from .serializers import LoginSerializer, RegisterSerializer


class RegisterView(APIView):
    """
    API view for user registration.

    Allows users to register by providing a username, email,
    password, and password confirmation. Ensures validation
    of user data and creation of a new user in the system.
    """

    permission_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "User registered successfully!"},
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    """
    API view for user login.

    Authenticates users by validating their username and password.
    If successful, logs the user in and returns a success message.
    """

    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data.get("username", None)
        password = serializer.validated_data.get("password", None)
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response(
                {"message": "Logged in successfully!"}, status=status.HTTP_200_OK
            )
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
        )
