# Generated by Django 5.1.6 on 2025-06-05 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('educationpioneer', '0012_alter_studentregistration_country'),
    ]

    operations = [
        migrations.AlterField(
            model_name='college',
            name='email',
            field=models.EmailField(max_length=254, verbose_name='Email'),
        ),
    ]
