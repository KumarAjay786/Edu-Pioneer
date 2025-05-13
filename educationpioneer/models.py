# college/models.py
from django.db import models
from django.core.validators import URLValidator
import uuid  # For generating unique user IDs

class College(models.Model):
    # Existing fields
    name = models.CharField(max_length=200, verbose_name="College Name")
    website = models.URLField(validators=[URLValidator()], verbose_name="Website")
    email = models.EmailField(verbose_name="Email", unique=True)
    mobile = models.CharField(max_length=15, verbose_name="Mobile Number")
    address = models.TextField(verbose_name="Address")
    district = models.CharField(max_length=100, verbose_name="District")
    state = models.CharField(max_length=100, verbose_name="State")
    country = models.CharField(max_length=100, verbose_name="Country")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
  