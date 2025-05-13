# college/forms.py
from django import forms
from .models import College

class CollegeForm(forms.ModelForm):
    class Meta:
        model = College
        fields = '__all__'
        widgets = {
            'address': forms.Textarea(attrs={'rows': 3}),
        }