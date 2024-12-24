from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    """
    Model to represent a user profile.

    Attributes:
        user (OneToOne): The user who created this profile.
        audio_quota_seconds (FloatField): The uploaded audios quota in seconds.
        used_seconds (FloatField): The uploaded audios used seconds.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    audio_quota_seconds = models.FloatField(default=60)  # Default quota in seconds
    used_seconds = models.FloatField(default=0)

    def __str__(self):
        return f"{self.user.username} - Quota: {self.audio_quota_seconds} secs"
