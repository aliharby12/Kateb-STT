from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User


class AuthTests(APITestCase):
    def setUp(self):
        self.register_url = reverse("register")
        self.login_url = reverse("login")
        self.user_data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword",
            "password2": "testpassword",
        }

    # Test cases for Register endpoint
    def test_register_user_successfully(self):
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("message", response.data)

    def test_register_user_password_mismatch(self):
        self.user_data["password2"] = "wrongpassword"
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)

    def test_register_user_with_existing_username(self):
        User.objects.create_user(
            username="testuser", email="testuser@example.com", password="testpassword"
        )
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)

    def test_register_user_invalid_email(self):
        self.user_data["email"] = "invalidemail"
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    # Test cases for Login endpoint
    def test_login_user_successfully(self):
        User.objects.create_user(username="testuser", password="testpassword")
        response = self.client.post(
            self.login_url, {"username": "testuser", "password": "testpassword"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("message", response.data)

    def test_login_user_invalid_credentials(self):
        response = self.client.post(
            self.login_url, {"username": "testuser", "password": "wrongpassword"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)

    def test_login_user_missing_username(self):
        response = self.client.post(self.login_url, {"password": "testpassword"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)

    def test_login_user_missing_password(self):
        response = self.client.post(self.login_url, {"username": "testuser"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)
