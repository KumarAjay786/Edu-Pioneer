from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages
from django.shortcuts import render, redirect
from educationpioneer.forms import CollegeForm
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from .models import *
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.contrib.auth.decorators import login_required
# Create your views here.
def home(request):
    return render(request , "index.html")

def about(request):
    return render(request , 'about.html')
def admissionGuidance(request):
    return render(request , 'admissionGuidance.html')
def apply(request):
    return render(request , 'apply.html')
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




# Public registration form
def college_register_form(request):
    if request.method == 'POST':
        try:
            College.objects.create_user(
                username=request.POST.get('email'),  # Using email as username
                password=request.POST.get('password'),
                name=request.POST.get('name'),
                website=request.POST.get('website'),
                email=request.POST.get('email'),
                mobile=request.POST.get('mobile'),
                address=request.POST.get('address'),
                district=request.POST.get('district'),
                state=request.POST.get('state'),
                country=request.POST.get('country')
            )
            messages.success(request, 'Registration successful! Please login.')
        except Exception as e:
            messages.error(request, f'Error: {str(e)}')
    return render(request, 'college_register_form.html')


def college_dashboard(request):
    params = request.GET.copy()
    
    # Get filters from request
    filters = {
        'state': params.get('state'),
        'country': params.get('country'),
        'district': params.get('district'),  # <--- Add this line
        'search': params.get('search'),
        'page': params.get('page', 1)
    }

    # Base queryset
    colleges = College.objects.all().order_by('-created_at')

    # Apply filters
    if filters['state']:
        colleges = colleges.filter(state=filters['state'])
    if filters['country']:
        colleges = colleges.filter(country=filters['country'])
    if filters['district']:  # <--- Add this condition
        colleges = colleges.filter(district=filters['district'])
    if filters['search']:
        colleges = colleges.filter(name__icontains=filters['search'])

    # Pagination
    paginator = Paginator(colleges, 10)
    page_obj = paginator.get_page(filters['page'])

    # AJAX response
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'table_html': render_to_string('college/partials/table_body.html', {'page_obj': page_obj}),
            'pagination_html': render_to_string('college/partials/pagination.html', {
                'page_obj': page_obj,
                'request': request
            }),
            'total_colleges': colleges.count()
        })

    # Regular response
    return render(request, 'college/dashboard.html', {
        'page_obj': page_obj,
        'states': College.objects.values_list('state', flat=True).distinct(),
        'countries': College.objects.values_list('country', flat=True).distinct(),
        'district': College.objects.values_list('district', flat=True).distinct(),  # <--- Add this
        'total_colleges': colleges.count()
    })

def college_detail(request, college_id):
    college = get_object_or_404(College, id=college_id)
    return render(request, 'college/detail_partial.html', {'college': college})

def college_delete(request, college_id):
    if request.method == 'POST':
        college = get_object_or_404(College, id=college_id)
        college.delete()
        messages.success(request, 'College deleted successfully.')
    return redirect('college_dashboard')

