# Generated by Django 5.2 on 2025-05-06 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('educationpioneer', '0002_remove_college_educationpi_email_d57d81_idx_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='college',
            name='is_approved',
            field=models.BooleanField(default=False),
        ),
    ]
