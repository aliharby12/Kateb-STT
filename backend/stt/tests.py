from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
import wave
import tempfile


class STTTests(APITestCase):
    def setUp(self):
        self.stt_url = reverse("speech-to-text")
        self.user = User.objects.create_user(
            username="testuser", password="testpassword"
        )

    def create_temp_wav_file(self):
        # Create a temporary .wav file
        temp_file = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
        with wave.open(temp_file, "w") as wav_file:
            wav_file.setnchannels(1)  # Mono
            wav_file.setsampwidth(2)  # 16-bit samples
            wav_file.setframerate(44100)  # 44.1kHz sample rate
            wav_file.writeframes(b"\x00\x00" * 44100)  # 1 second of silence
        return temp_file

    # Test cases for STT endpoint
    def test_stt_with_valid_audio(self):

        self.client.force_authenticate(user=self.user)
        temp_file = self.create_temp_wav_file()
        with open(temp_file.name, "rb") as audio_file:
            response = self.client.post(self.stt_url, {"file": audio_file})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("json", response.data)

    def test_stt_without_file(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.stt_url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("file", response.data)

    def test_stt_unauthenticated(self):
        temp_file = self.create_temp_wav_file()
        with open(temp_file.name, "rb") as audio_file:
            response = self.client.post(self.stt_url, {"file": audio_file})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
