from django.db import models
from django.contrib.auth.models import User


class AudioFile(models.Model):
    """
    Model to represent an uploaded audio file.

    Attributes:
        user (ForeignKey): The user who uploaded the audio file.
        audio (FileField): The uploaded audio file.
        created_at (DateTimeField): The timestamp when the audio file was uploaded.
        duration (FloatField): The duration of the audio file in seconds.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    audio = models.FileField(upload_to="audio/")
    created_at = models.DateTimeField(auto_now_add=True)
    duration = models.FloatField()

    def __str__(self):
        return f"{self.user.username} - {self.id}"
