from django.shortcuts import render , HttpResponse
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages
from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from .models import *
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
import os
from django.conf import settings
from django.urls import reverse
from django.views.decorators.cache import never_cache
from django.contrib.auth.hashers import check_password
from django.contrib.auth import login as auth_login
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
import json



# Create your views here.
def home(request):
    return render(request , "index.html")

def about(request):
    return render(request , 'about.html')
def admissionGuidance(request):
    return render(request , 'admissionGuidance.html')

from django.shortcuts import render
from django.http import JsonResponse
from .models import College

def apply(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        state = request.GET.get("state")
        district = request.GET.get("district")
        
        colleges = College.objects.filter(
            state__iexact=state,
            district__iexact=district,
            is_approved=True
        ).values('id', 'name')
        
        return JsonResponse({"colleges": list(colleges)})

    return render(request, 'apply.html')


@csrf_exempt
def save_student(request):
    if request.method == 'POST':
        try:
            # Parse JSON data if content-type is application/json
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST
            
            # Validate required fields
            required_fields = ['firstName', 'lastName', 'email', 'mobile', 'course', 'collegeName']
            missing_fields = [field for field in required_fields if not data.get(field)]
            
            if missing_fields:
                return JsonResponse({
                    'status': 'error',
                    'message': f'Missing required fields: {", ".join(missing_fields)}'
                }, status=400)
            
            # Create student record
            student = StudentRegistration.objects.create(
                first_name=data.get('firstName'),
                last_name=data.get('lastName'),
                course_type=data.get('courseType'),
                course=data.get('course'),
                max_fees=data.get('maxFees'),
                country=data.get('apply-country'),
                state=data.get('apply-state'),
                district=data.get('apply-district'),
                college=data.get('collegeName'),
                mobile=data.get('mobile'),
                email=data.get('email'),
                address=data.get('address', '')
            )
            
            # Email content
            admin_subject = f"New Application: {student.first_name} {student.last_name}"
            admin_message = f"""
            New Student Application Details:
            
            Name: {student.first_name} {student.last_name}
            Course: {student.course} ({student.course_type})
            College: {student.college}
            Fees Budget: ₹{student.max_fees}
            
            Contact Information:
            Email: {student.email}
            Mobile: {student.mobile}
            Address: {student.address}
            
            Location:
            {student.district}, {student.state}, {student.country}
            """
            
            user_subject = "Your Application Received"
            user_message = f"""
            Dear {student.first_name},
            
            Thank you for applying to {student.college} for {student.course}.
            
            We've received your application with the following details:
            - Name: {student.first_name} {student.last_name}
            - Course: {student.course}
            - Preferred College: {student.college}
            - Contact: {student.mobile}
            
            Our admissions team will review your application and contact you shortly.
            
            Best regards,
            Admissions Office
            Education Pioneer
            """
            
            # Send emails
            try:
                # Email to admin
                send_mail(
                    subject=admin_subject,
                    message=admin_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.ADMIN_EMAIL],
                    fail_silently=False
                )
                
                # Email to student
                send_mail(
                    subject=user_subject,
                    message=user_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[student.email],
                    fail_silently=False
                )
                
                return JsonResponse({
                    'status': 'success',
                    'message': 'Registration successful! Confirmation email sent.'
                })
                
            except Exception as email_error:
                # Log the email error but still return success for the form submission
                print(f"Email sending failed: {str(email_error)}")
                return JsonResponse({
                    'status': 'success',
                    'message': 'Registration successful! (Email notification failed)'
                })
            
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e),
                'traceback': str(e.__traceback__) if settings.DEBUG else None
            }, status=500)
    
    return JsonResponse({
        'status': 'error',
        'message': 'Only POST requests are allowed'
    }, status=405)
def college_register_request(request):
    return render(request  , 'college_register_request.html')
def collegeIndia(request):
    return render(request , 'collegeIndia.html')
def consultation(request):
    return render(request , 'consultation.html')
def financialAssistance(request):
    return render(request , 'financialAssistance.html')
def institutions(request):
    return render(request , 'institutions.html')
def studentCounseling(request):
    return render(request , 'studentCounseling.html')
def studyAbroad(request):
    return render(request , 'studyAbroad.html')
def visaAssistance(request):
    return render(request , 'visaAssistance.html')


def college_register_form(request):
    if request.method == 'POST':
        try:
            # Validate required fields
            required_fields = [
                'college_name', 'email', 'mobile',
                'address', 'district', 'state', 'country'
            ]
            missing_fields = [field for field in required_fields if not request.POST.get(field)]

            if missing_fields:
                messages.error(request, f"Missing required fields: {', '.join(missing_fields)}")
                return render(request, 'college_register_form.html', {
                    'form_data': request.POST
                })

            # Handle logo upload
            logo = request.FILES.get('logo')

            # Create the college
            college = College.objects.create(
                name=request.POST.get('college_name'),
                about=request.POST.get('college_about'),
                website=request.POST.get('website'),
                email=request.POST.get('email'),
                mobile=request.POST.get('mobile'),
                address=request.POST.get('address'),
                district=request.POST.get('district'),
                state=request.POST.get('state'),
                country=request.POST.get('country'),
                logo=logo
            )

            # Upload multiple images
            for image in request.FILES.getlist('college_images'):
                CollegeImage.objects.create(college=college, image=image)

            # Send notification emails
            try:
                admin_subject = f"New College Registration: {college.name}"
                admin_message = f"""
                A new college has registered:

                Name: {college.name}
                Email: {college.email}
                Mobile: {college.mobile}
                Website: {college.website or 'N/A'}
                Address: {college.address}
                Location: {college.district}, {college.state}, {college.country}
                """

                college_subject = "College Registration Received"
                college_message = f"""
                Dear {college.name},

                Thank you for registering your college with us.
                We have received your application and our team will review it soon.

                Details:
                Name: {college.name}
                Email: {college.email}
                Mobile: {college.mobile}

                Regards,
                Education Pioneer Team
                """

                # Email to admin
                send_mail(
                    admin_subject,
                    admin_message,
                    settings.DEFAULT_FROM_EMAIL,
                    [settings.ADMIN_EMAIL],
                    fail_silently=False
                )

                # Email to the college
                send_mail(
                    college_subject,
                    college_message,
                    settings.DEFAULT_FROM_EMAIL,
                    [college.email],
                    fail_silently=False
                )

            except Exception as mail_error:
                messages.warning(request, f"College registered, but email failed: {str(mail_error)}")
                return redirect('college_register_form')

            messages.success(request, 'College registered successfully.')
            return redirect('college_register_form')

        except IntegrityError as e:
            if 'unique constraint' in str(e).lower():
                messages.error(request, 'This college name or email is already taken.')
            else:
                messages.error(request, 'An error occurred. Please try again.')
            return render(request, 'college_register_form.html', {
                'form_data': request.POST
            })

        except Exception as e:
            messages.error(request, f'Unexpected error: {str(e)}')
            return render(request, 'college_register_form.html', {
                'form_data': request.POST
            })

    return render(request, 'college_register_form.html')



def college_update_form(request, college_id):
    college = get_object_or_404(College, college_id=college_id)
    
    if request.method == 'POST':
        try:
            # Validate required fields
            required_fields = [
                'college_name', 'email', 'mobile',
                'address', 'district', 'state', 'country'
            ]
            missing_fields = [field for field in required_fields if not request.POST.get(field)]

            if missing_fields:
                messages.error(request, f"Missing required fields: {', '.join(missing_fields)}")
                return render(request, 'college_update_form.html', {
                    'college': college,
                    'form_data': request.POST
                })

            # Handle logo upload
            logo = request.FILES.get('logo')
            if logo:
                if college.logo:  # Delete old logo if exists
                    college.logo.delete()
                college.logo = logo

            # Update college fields
            college.name = request.POST.get('college_name')
            college.about = request.POST.get('college_about')
            college.website = request.POST.get('website')
            college.email = request.POST.get('email')
            college.mobile = request.POST.get('mobile')
            college.address = request.POST.get('address')
            college.district = request.POST.get('district')
            college.state = request.POST.get('state')
            college.country = request.POST.get('country')
            college.save()
            delete_image_ids = request.POST.getlist('delete_images') 
            
            if delete_image_ids:
                # Fetch images to delete
                images_to_delete = CollegeImage.objects.filter(
                    id__in=delete_image_ids,
                    college=college
                )
                
                # Delete each image
                for image in images_to_delete:
                    image.image.delete()  # Delete file from storage
                    image.delete()       # Delete record from database
                
                messages.success(request, f"Deleted {len(images_to_delete)} image(s).")

            # Handle new images
            for image in request.FILES.getlist('college_images'):
                CollegeImage.objects.create(college=college, image=image)

            messages.success(request, 'College updated successfully.')
            return redirect('college_update_form', college_id=college.college_id)

        except IntegrityError as e:
            if 'unique constraint' in str(e).lower():
                messages.error(request, 'This college name or email is already taken.')
            else:
                messages.error(request, 'An error occurred. Please try again.')
            return render(request, 'college_update_form.html', {
                'college': college,
                'form_data': request.POST
            })

        except Exception as e:
            messages.error(request, f'Unexpected error: {str(e)}')
            return render(request, 'college_update_form.html', {
                'college': college,
                'form_data': request.POST
            })

    return render(request, 'college_update_form.html', {'college': college})

def manage_courses(request, college_id):
    college = get_object_or_404(College, id=college_id)

    if request.method == 'POST':
        # ADD COURSE
        if 'add_course' in request.POST:
            course = Course(
                college=college,
                name=request.POST.get('course_name'),
                period=request.POST.get('period'),
                total_fees=request.POST.get('total_fees'),
                eligibility=request.POST.get('eligibility'),
                age_limit=request.POST.get('age_limit'),
                eligibility_info=request.POST.get('eligibility_info'),
            )
            course.save()
            messages.success(request, 'Course added successfully!')

        # EDIT COURSE
        elif 'edit_course' in request.POST:
            course = get_object_or_404(Course, id=request.POST.get('course_id'))
            course.name = request.POST.get('edit_name')
            course.period = request.POST.get('edit_period')
            course.total_fees = request.POST.get('edit_total_fees')
            course.eligibility = request.POST.get('edit_eligibility')
            course.age_limit = request.POST.get('edit_age_limit')
            course.eligibility_info = request.POST.get('edit_eligibility_info')
            course.save()
            messages.success(request, 'Course updated successfully!')

        # DELETE COURSE
        elif 'delete_course' in request.POST:
            course = get_object_or_404(Course, id=request.POST.get('delete_id'))
            course.delete()
            messages.warning(request, 'Course deleted.')

        return redirect('manage_courses', college_id=college_id)

    courses = Course.objects.filter(college=college)
    return render(request, 'manage_courses.html', {
        'college': college,
        'courses': courses
    })


def toggle_approve(request, college_id):
    college = get_object_or_404(College, id=college_id)
    college.is_approved = not college.is_approved
    college.save()
    base_url = reverse('college_dashboard')
    query_params = request.GET.urlencode()
    return redirect(f'{base_url}?{query_params}' if query_params else base_url)

def college_detail(request, college_id):
    college = get_object_or_404(College, id=college_id)
    return render(request, 'college/detail_partial.html', {'college': college})

def college_delete(request, college_id):
    college = get_object_or_404(College, id=college_id)
    
    try:
        # Delete logo file if exists
        if college.logo:
            if os.path.isfile(college.logo.path):
                os.remove(college.logo.path)
        
        # Delete all associated images
        for image in college.images.all():
            if image.image and os.path.isfile(image.image.path):
                os.remove(image.image.path)
            image.delete()
        
        # Delete the college
        college.delete()
        messages.success(request, 'College and its files deleted successfully.')
    except Exception as e:
        messages.error(request, f'Error deleting college: {str(e)}')
    
    return redirect('college_dashboard')

def college_list(request):
    colleges = College.objects.filter(is_approved=True).prefetch_related(
        'images',
        'course_set'
    )

    countries = College.objects.values_list('country', flat=True).distinct().order_by('country')
    states = College.objects.values_list('state', flat=True).distinct().order_by('state')
    districts = College.objects.values_list('district', flat=True).distinct().order_by('district')
    courses = Course.objects.values_list('name', flat=True).distinct().order_by('name')

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        country = request.GET.get('country')
        state = request.GET.get('state')
        district = request.GET.get('district')
        course = request.GET.get('course')
        search = request.GET.get('search')
        min_fee = request.GET.get('min_fee')
        max_fee = request.GET.get('max_fee')

        if country:
            colleges = colleges.filter(country=country)
        if state:
            colleges = colleges.filter(state=state)
        if district:
            colleges = colleges.filter(district=district)
        if course:
            colleges = colleges.filter(course__name=course).distinct()
        if search:
            colleges = colleges.filter(name__icontains=search)
        if min_fee:
            colleges = colleges.filter(course__total_fees__gte=min_fee)
        if max_fee:
            colleges = colleges.filter(course__total_fees__lte=max_fee)

        # ✅ Ensure 'request' is explicitly passed
        return render(request, 'college_list_partial.html', {
            'colleges': colleges,
            'request': request
        })

    return render(request, 'college_list.html', {
        'colleges': colleges,
        'countries': countries,
        'states': states,
        'districts': districts,
        'courses': courses
    })

def college_staff_login(request):
    if request.session.get('is_college_staff_logged_in'):
        try:
            college = College.objects.get(college_id=request.session['college_id'])
            return redirect('collegestaff_manage_courses', college_id=college.id)
        except College.DoesNotExist:
            request.session.flush()
            messages.error(request, 'Session expired or invalid. Please log in again.')

    if request.method == 'POST':
        college_id = request.POST.get('college_id')
        password = request.POST.get('password')
        
        if college_id and password:
            try:
                college = College.objects.get(college_id=college_id)
                if college.password == password:
                    request.session['college_id'] = college.college_id
                    request.session['college_name'] = college.name
                    request.session['is_college_staff_logged_in'] = True
                    return redirect('collegestaff_manage_courses', college_id=college.id)
                else:
                    messages.error(request, 'Invalid password')
            except College.DoesNotExist:
                messages.error(request, 'College not found with this ID')
        else:
            messages.error(request, 'Please provide both College ID and password')
    
    return render(request, 'college_staff/login.html')

@never_cache
@login_required(login_url="college_staff_login")
def collegestaff_manage_courses(request, college_id):
    college = get_object_or_404(College, id=college_id)

    if request.method == 'POST':
        if 'add_course' in request.POST:
            try:
                # Create the course
                course = Course.objects.create(
                    college=college,
                    name=request.POST.get('course_name'),
                    period=request.POST.get('period'),
                    total_fees=request.POST.get('total_fees'),
                    total_semesters=request.POST.get('total_semesters'),
                    eligibility=request.POST.get('eligibility'),
                    age_limit=request.POST.get('age_limit') or None,
                    eligibility_info=request.POST.get('eligibility_info') or None
                )
                
                # Add semester fees
                total_semesters = int(request.POST.get('total_semesters'))
                total_allocated = 0
                
                for i in range(1, total_semesters + 1):
                    fee_key = f'semester_fee_{i}'
                    fee_amount = request.POST.get(fee_key)
                    if fee_amount:
                        fee_amount = float(fee_amount)
                        total_allocated += fee_amount
                        SemesterFee.objects.create(
                            course=course,
                            semester_number=i,
                            fee_amount=fee_amount,
                            includes_exam_fee=request.POST.get(f'semester_includes_exam_{i}', 'off') == 'on'
                        )
                
                # Verify total fees match
                if float(request.POST.get('total_fees')) != total_allocated:
                    messages.warning(request, 'Total fees did not match sum of semester fees. Adjusted total fees.')
                    course.total_fees = total_allocated
                    course.save()
                
                messages.success(request, 'Course added successfully!')
            except Exception as e:
                messages.error(request, f'Error adding course: {str(e)}')

        elif 'edit_course' in request.POST:
            try:
                course = get_object_or_404(Course, id=request.POST.get('course_id'))
                course.name = request.POST.get('edit_name')
                course.period = request.POST.get('edit_period')
                course.total_fees = request.POST.get('edit_total_fees')
                course.total_semesters = request.POST.get('edit_total_semesters')
                course.eligibility = request.POST.get('edit_eligibility')
                course.age_limit = request.POST.get('edit_age_limit') or None
                course.eligibility_info = request.POST.get('edit_eligibility_info') or None
                course.save()
                
                # Update semester fees
                existing_fees = {fee.semester_number: fee for fee in course.semester_fees.all()}
                total_allocated = 0
                
                for i in range(1, int(request.POST.get('edit_total_semesters')) + 1):
                    fee_key = f'edit_semester_fee_{i}'
                    fee_amount = request.POST.get(fee_key)
                    if fee_amount:
                        fee_amount = float(fee_amount)
                        total_allocated += fee_amount
                        
                        if i in existing_fees:
                            # Update existing fee
                            fee = existing_fees[i]
                            fee.fee_amount = fee_amount
                            fee.includes_exam_fee = request.POST.get(f'edit_semester_includes_exam_{i}', 'off') == 'on'
                            fee.save()
                        else:
                            # Create new fee
                            SemesterFee.objects.create(
                                course=course,
                                semester_number=i,
                                fee_amount=fee_amount,
                                includes_exam_fee=request.POST.get(f'edit_semester_includes_exam_{i}', 'off') == 'on'
                            )
                
                # Delete any removed semesters
                for sem_num, fee in existing_fees.items():
                    if sem_num > int(request.POST.get('edit_total_semesters')):
                        fee.delete()
                
                # Verify total fees match
                if float(request.POST.get('edit_total_fees')) != total_allocated:
                    messages.warning(request, 'Total fees did not match sum of semester fees. Adjusted total fees.')
                    course.total_fees = total_allocated
                    course.save()
                
                messages.success(request, 'Course updated successfully!')
            except Exception as e:
                messages.error(request, f'Error updating course: {str(e)}')

        elif 'delete_course' in request.POST:
            try:
                course = get_object_or_404(Course, id=request.POST.get('delete_id'))
                course.delete()
                messages.warning(request, 'Course deleted successfully!')
            except Exception as e:
                messages.error(request, f'Error deleting course: {str(e)}')

        return redirect('collegestaff_manage_courses', college_id=college_id)

    courses = Course.objects.filter(college=college).prefetch_related('semester_fees')
    return render(request, 'collegestaff_manage_courses.html', {
        'college': college,
        'courses': courses
    })

def college_staff_manage_courses(request):
        return redirect('college_staff_login')

def college_staff_logout(request):
    request.session.flush()
    return redirect('college_staff_login') 


@never_cache
@login_required(login_url="college_admin_login")
def college_dashboard(request):
    params = request.GET.copy()
    filters = {
        'state': params.get('state'),
        'country': params.get('country'),
        'district': params.get('district'),
        'search': params.get('search'),
        'page': params.get('page', 1)
    }

    colleges = College.objects.all().order_by('-created_at')
    if filters['state']:
        colleges = colleges.filter(state=filters['state'])
    if filters['country']:
        colleges = colleges.filter(country=filters['country'])
    if filters['district']:
        colleges = colleges.filter(district=filters['district'])
    if filters['search']:
        colleges = colleges.filter(name__icontains=filters['search'])

    students = Student.objects.all()
    qa = StudentRegistration.objects.all().order_by('-registration_date')
    applications = Application.objects.select_related('student', 'college', 'course').all()
    agents = Agent.objects.all().order_by('-created_at')  

    paginator = Paginator(colleges, 10)
    page_obj = paginator.get_page(filters['page'])

    return render(request, 'college_admin/dashboard.html', {
        'page_obj': page_obj,
        'students': students,
        'applications': applications,
        'agents': agents,  
        'qa' : qa,
        'states': College.objects.values_list('state', flat=True).distinct(),
        'countries': College.objects.values_list('country', flat=True).distinct(),
        'district': College.objects.values_list('district', flat=True).distinct(),
        'total_colleges': colleges.count(),
    })


COLLEGE_ADMIN_ID = "admin123" 
COLLEGE_ADMIN_PASSWORD = "securepass"  

def college_admin_login(request):
    if request.user.is_authenticated:
        return redirect('college_dashboard')

    if request.method == 'POST':
        college_id = request.POST.get('college_id')
        password = request.POST.get('password')

        if college_id and password:
            if college_id == COLLEGE_ADMIN_ID and password == COLLEGE_ADMIN_PASSWORD:
                from django.contrib.auth.models import User
                user, created = User.objects.get_or_create(
                    username=college_id,
                    defaults={'is_staff': True}
                )
                user.set_password(COLLEGE_ADMIN_PASSWORD)
                user.save()
                user = authenticate(username=college_id, password=password)
                login(request, user)
                
                return redirect('college_dashboard')
            else:
                messages.error(request, 'Invalid credentials')
        else:
            messages.error(request, 'Please provide both fields')

    return render(request, 'college_admin/login.html')


def college_admin_logout(request):
    request.session.flush()
    return redirect('college_admin_login')


def signup_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        phone = request.POST['phone']
        password = request.POST['password']
        profile_pic = request.FILES.get('profile_pic', None)
        if Student.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists. Please choose another one.')
            return render(request, 'student/signup.html')
        new_student = Student(username=username, email=email, phone=phone)
        new_student.set_password(password)
        if profile_pic:
            new_student.profile_pic = profile_pic
        new_student.save()
        messages.success(request, 'Signup successful! You can now log in.')
        return redirect('login_view')
    
    return render(request, 'student/signup.html')


def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        
        try:
            user = Student.objects.get(email=email)
            if check_password(password, user.password):
                # Login successful
                request.session['is_logged_in'] = True
                request.session['user_id'] = user.id
                request.session['username'] = user.username
                request.session['email'] = user.email
                if user.profile_pic:
                    request.session['profile_pic'] = user.profile_pic.url
                
                messages.success(request, 'Login successful!')
                return redirect('college_list')
            else:
                messages.error(request, 'Invalid password.')
        except Student.DoesNotExist:
            messages.error(request, 'Invalid email or password.')
    
    return render(request, 'student/login.html')

def logout_view(request):
    request.session.flush()
    return redirect('/')

def delete_student(request, student_id):
    if request.method == 'POST':
        student = get_object_or_404(Student, id=student_id)
        student.delete()
        messages.success(request, 'Student deleted successfully.')
        return redirect('college_dashboard')
    else:
        messages.error(request, 'Invalid request method.')
        return redirect('college_dashboard')
    


def apply_to_course(request):
    if not request.session.get('is_logged_in'):
        return JsonResponse({'status': 'error', 'message': 'Not logged in'})

    if request.method == 'POST':
        try:
            # Get student from session
            student = Student.objects.get(id=request.session['user_id'])
            course_id = request.POST.get('course_id')
            college_id = request.POST.get('college_id')
            student_country = request.POST.get('student-country')
            student_state = request.POST.get('student-state')
            student_district = request.POST.get('student-district')
           
            course = Course.objects.get(id=course_id)
            college = College.objects.get(id=college_id)

            # Check existing application
            if Application.objects.filter(student=student, course=course).exists():
                return JsonResponse({'status': 'exists', 'message': 'Already applied'})

            # Create new application
            Application.objects.create(
                student=student,
                course=course,
                college=college,
                student_country = student_country,
                student_state = student_state,
                student_district = student_district,
            )
            return JsonResponse({'status': 'success', 'message': 'Application submitted'})

        except Student.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Student not found'})
        except (Course.DoesNotExist, College.DoesNotExist):
            return JsonResponse({'status': 'error', 'message': 'Invalid course or college'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def register_agent(request):
    if request.method != 'POST':
        if request.content_type == 'application/json':
            return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)
        else:
            return render(request, 'consultation.html')

    try:
        # Identify if it's JSON request or form-data
        is_json = request.content_type == 'application/json'
        data = json.loads(request.body) if is_json else request.POST

        required_fields = [
            'agent-name', 'agent-email', 'agent-mobile',
            'agent-country', 'agent-state', 'agent-district'
        ]
        missing_fields = [field for field in required_fields if not data.get(field)]

        if missing_fields:
            error_msg = f"Missing required fields: {', '.join(missing_fields)}"
            if is_json:
                return JsonResponse({'status': 'error', 'message': error_msg}, status=400)
            else:
                messages.error(request, error_msg)
                return render(request, 'consultation.html', {'form_data': data})

        # Create agent instance
        agent = Agent(
            full_name=data.get('agent-name'),
            email=data.get('agent-email'),
            mobile=data.get('agent-mobile'),
            web_details=data.get('agent-web', ''),
            address=data.get('agent-address', ''),
            country=data.get('agent-country'),
            state=data.get('agent-state'),
            district=data.get('agent-district'),
            is_approved=False
        )

        # Handle profile picture for form submissions
        if not is_json and 'profile-pic' in request.FILES:
            agent.profile_pic = request.FILES['profile-pic']

        agent.save()  # Save agent (this may trigger ID/password generation)

        # Email content
        admin_subject = f"New Agent Registration: {agent.full_name}"
        admin_message = f"""
New Agent Registration Details:

Name: {agent.full_name}
Email: {agent.email}
Mobile: {agent.mobile}
Website: {agent.web_details}

Address:
{agent.address}
{agent.district}, {agent.state}, {agent.country}

This agent requires approval in the admin panel.
"""

        agent_subject = "Your Agent Registration Received"
        agent_message = f"""
Dear {agent.full_name},

Thank you for registering as an agent with us.

We've received your application with the following details:
- Name: {agent.full_name}
- Email: {agent.email}
- Mobile: {agent.mobile}
- Location: {agent.district}, {agent.state}, {agent.country}

Our team will review your application and contact you shortly.
Once approved, you'll receive your agent credentials.

Best regards,
Agent Management Team
{getattr(settings, 'COMPANY_NAME', 'Our Company')}
"""

        try:
            send_mail(admin_subject, admin_message, settings.DEFAULT_FROM_EMAIL, [settings.ADMIN_EMAIL])
            send_mail(agent_subject, agent_message, settings.DEFAULT_FROM_EMAIL, [agent.email])
            success_message = "Registration successful! Confirmation email sent."
        except Exception as email_error:
            success_message = "Registration successful! (Email notification failed)"
            if is_json:
                return JsonResponse({
                    'status': 'success',
                    'message': success_message,
                    'agent_id': agent.id,
                    'warning': str(email_error)
                })

        if is_json:
            return JsonResponse({
                'status': 'success',
                'message': success_message,
                'agent_id': agent.id
            })
        else:
            messages.success(request, "Agent registered successfully! Our team will review your application shortly.")
            return redirect('consultation')

    except Exception as e:
        if request.content_type == 'application/json':
            return JsonResponse({
                'status': 'error',
                'message': str(e),
                'traceback': str(e.__traceback__) if settings.DEBUG else None
            }, status=500)
        else:
            messages.error(request, f"Registration error: {str(e)}")
            return render(request, 'consultation.html', {
                'form_data': request.POST,
                'error': str(e)
            })


def toggle_agent_approve(request, agent_id):
    agent = get_object_or_404(Agent, id=agent_id)
    agent.is_approved = not agent.is_approved
    agent.save()
    messages.success(request, f"Agent {agent.full_name} has been {'approved' if agent.is_approved else 'rejected'}.")
    return redirect('college_dashboard')

def agent_delete(request, agent_id):
    agent = get_object_or_404(Agent, id=agent_id)
    agent.delete()
    messages.success(request, f"Agent {agent.full_name} has been deleted.")
    return redirect('college_dashboard')


def agent_login(request):
    if request.session.get('is_agent_logged_in'):
        return redirect('agent_dashboard')

    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        if email and password:
            try:
                agent = Agent.objects.get(email=email)

                # Compare plain text password
                if password == agent.password:
                    request.session['agent_id'] = agent.agent_id
                    request.session['agent_name'] = agent.full_name
                    request.session['is_agent_logged_in'] = True
                    return redirect('agent_dashboard')
                else:
                    messages.error(request, 'Invalid email or password')
            except Agent.DoesNotExist:
                messages.error(request, 'Agent not found with this email')
        else:
            messages.error(request, 'Please provide both email and password')

    return render(request, 'agent/login.html')

@login_required
def agent_logout(request):
    request.session.flush()
    return redirect('agent_login')


@never_cache
@login_required(login_url="agent_login")
def agent_dashboard(request):
    if not request.session.get('is_agent_logged_in'):
        return redirect('agent_login')

    agent_id = request.session.get('agent_id')
    
    try:
        agent = Agent.objects.get(agent_id=agent_id)
        # Get applications where student's location matches agent's location
        applications = Application.objects.filter(
            student_country=agent.country,
            student_state=agent.state,
            student_district=agent.district
        )
        application_count = applications.count()
        

    except Agent.DoesNotExist:
        messages.error(request, 'Agent not found. Please log in again.')
        return redirect('agent_login')

    context = {
        'agent': agent,
        'application_count': application_count,
        'applications': applications,
    }

    return render(request, 'agent/dashboard.html', context)