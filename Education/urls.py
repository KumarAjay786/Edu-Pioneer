"""
URL configuration for Education project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from educationpioneer.views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('' , home , name="home"),
    path('about/' , about , name="about"),
    path('admissionGuidance/' , admissionGuidance , name="admissionGuidance"),
    path('apply/' , apply , name="apply"),
    path('college_register_request/' , college_register_request , name="college_register_request"),
    path('collegeIndia/' , collegeIndia , name="collegeIndia"),
    path('consultation/' , consultation , name="consultation"),
    path('financialAssistance/' , financialAssistance , name="financialAssistance"),
    path('institutions/' , institutions , name="institutions"),
    path('studentCounseling/' , studentCounseling , name="studentCounseling"),
    path('studyAbroad/' , studyAbroad , name="studyAbroad"),
    path('visaAssistance/' , visaAssistance , name="visaAssistance"),
    path('college_register_form/' , college_register_form , name="college_register_form"),
    path('college_dashboard/', college_dashboard, name='college_dashboard'),
    path('<int:college_id>/detail/', college_detail, name='college_detail'),
    path('college/<int:college_id>/delete/', college_delete, name='college_delete'),
]
