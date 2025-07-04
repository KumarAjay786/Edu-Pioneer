from django.contrib import admin
from django.urls import path
from educationpioneer.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name="home"),
    path('about/', about, name="about"),
    path('admissionGuidance/', admissionGuidance, name="admissionGuidance"),
    path('apply/', apply, name="apply"),
    path('save-student/', save_student, name='save_student'),
    path('college_register_request/', college_register_request,
         name="college_register_request"),
    path('collegeIndia/', collegeIndia, name="collegeIndia"),
    path('consultation/', register_agent, name="consultation"),
    path('financialAssistance/', financialAssistance, name="financialAssistance"),
    path('institutions/', institutions, name="institutions"),
    path('college/<int:college_id>/', college_detail, name='college_detail'),
    path('studentCounseling/', studentCounseling, name="studentCounseling"),
    path('studyAbroad/', studyAbroad, name="studyAbroad"),
    path('visaAssistance/', visaAssistance, name="visaAssistance"),
    path('college_register_form/', college_register_form,
         name="college_register_form"),
    path('college-admin/college_dashboard/',
         college_dashboard, name='college_dashboard'),
    path('college/<int:college_id>/delete/',
         college_delete, name='college_delete'),
    path('college/<int:college_id>/courses/',
         manage_courses, name='manage_courses'),
    path('collegestaff_manage_courses/<int:college_id>/courses/',
         collegestaff_manage_courses, name='collegestaff_manage_courses'),
    path('college_list/', college_list, name='college_list'),
    path('colleges/', college_list, name='college_list'),
    path('college/<int:college_id>/toggle_approve/',
         toggle_approve, name='toggle_approve'),
    # path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('college-staff/login/', college_staff_login, name='college_staff_login'),
    path('college-staff/manage-courses/', college_staff_manage_courses,
         name='college_staff_manage_courses'),
    path('college-staff/logout/', college_staff_logout,
         name='college_staff_logout'),
    path('college-admin/login/', college_admin_login, name='college_admin_login'),
    path('college-admin/logout/', college_admin_logout,
         name='college_admin_logout'),
    path('signup_view', signup_view, name='signup_view'),
    path('login_view', login_view, name='login_view'),
    path('delete_student/<int:student_id>/',
         delete_student, name='delete_student'),
    # path('submit-application/', submit_application, name='submit_application'),
    # path('apply_to_course/', apply_to_course, name='apply_course'),
    path('apply-course/', apply_to_course, name='apply_to_course'),
    path('toggle-agent-approve/<int:agent_id>/',
         toggle_agent_approve, name='toggle_agent_approve'),
    path('agent-delete/<int:agent_id>/', agent_delete, name='agent_delete'),
    path('agent/login/', agent_login, name='agent_login'),
    path('agent/logout/', agent_logout, name='agent_logout'),
    path('agent/dashboard/', agent_dashboard, name='agent_dashboard'),
    path('update/<str:college_id>/', college_update_form,
         name='college_update_form'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
