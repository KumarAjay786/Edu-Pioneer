from django.db import models
from django.core.validators import URLValidator
from django.utils.crypto import get_random_string
from django.contrib.auth.hashers import make_password
class College(models.Model):
    college_id = models.CharField(max_length=20, unique=True, editable=False, null=True, blank=True)
    password = models.CharField(max_length=20, null=True)
    name = models.CharField(max_length=200, verbose_name="College Name", unique=True)
    website = models.URLField(validators=[URLValidator()], verbose_name="Website")
    about = models.TextField(verbose_name="About College", null=True, blank=True)
    email = models.EmailField(verbose_name="Email")
    mobile = models.CharField(max_length=15, verbose_name="Mobile Number")
    address = models.TextField(verbose_name="Address")
    district = models.CharField(max_length=100, verbose_name="District")
    state = models.CharField(max_length=100, verbose_name="State")
    country = models.CharField(max_length=100, verbose_name="Country")
    logo = models.ImageField(upload_to='college_logos/', blank=True, null=True, verbose_name="College Logo")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=False)
    def save(self, *args, **kwargs):
        if not self.college_id:
            base = ''.join(e for e in self.name.lower() if e.isalnum())[:6]
            similar = College.objects.filter(college_id__startswith=base).count() + 1
            self.college_id = f"{base}{similar:04d}"

        if not self.password:
            self.password = get_random_string(length=10)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class CollegeImage(models.Model):
    college = models.ForeignKey(College, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='college_images/', blank=True, null=True)

    def __str__(self):
        return f"Image for {self.college.name}"

class Course(models.Model):
    college = models.ForeignKey('College', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    period = models.CharField(max_length=100)
    total_fees = models.DecimalField(max_digits=10, decimal_places=2)
    total_semesters = models.PositiveIntegerField(default=1)
    eligibility = models.TextField()
    age_limit = models.IntegerField(null=True, blank=True)
    eligibility_info = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.period})"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

class SemesterFee(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='semester_fees')
    semester_number = models.PositiveIntegerField()
    fee_amount = models.DecimalField(max_digits=10, decimal_places=2)
    includes_exam_fee = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('course', 'semester_number')
        ordering = ['semester_number']
    
    def __str__(self):
        return f"Sem {self.semester_number} - ₹{self.fee_amount}"

class Student(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=128)
    profile_pic = models.ImageField(upload_to='student_profiles/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def __str__(self):
        return self.username
    
   
    

class Application(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    applied_at = models.DateTimeField(auto_now_add=True)
    student_country = models.CharField(max_length=100, verbose_name="Country" , null=True, blank=True)
    student_state = models.CharField(max_length=100, verbose_name="State" , null=True, blank=True)
    student_district = models.CharField(max_length=100, verbose_name="District" , null=True, blank=True)
    class Meta:
        unique_together = ('student', 'college', 'course')

    def __str__(self):
        return f"{self.student.username} - {self.course.name} at {self.college.name}"


def agent_profile_path(instance, filename):
    return f'agents/{instance.agent_id}/profile/{filename}'

def agent_profile_path(instance, filename):
    return f'agents/{instance.agent_id}/profile/{filename}'

class Agent(models.Model):
    agent_id = models.CharField(max_length=20, unique=True, editable=False, null=True, blank=True)
    password = models.CharField(max_length=128)  # Increased length for hashed passwords
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=15)
    web_details = models.CharField(max_length=200, blank=True)
    address = models.TextField(blank=True)
    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    profile_pic = models.ImageField(upload_to=agent_profile_path, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.agent_id:
            base = ''.join(e for e in self.full_name.lower() if e.isalnum())[:6]
            similar = Agent.objects.filter(agent_id__startswith=base).count() + 1
            self.agent_id = f"{base}{similar:04d}"

        if not self.password:
            # Generate random 10-character password (plain text)
            self.password = get_random_string(length=10)
            
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.full_name} ({self.agent_id})"
    

class StudentRegistration(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    course_type = models.CharField(max_length=50)
    course = models.CharField(max_length=100)
    max_fees = models.DecimalField(max_digits=10, decimal_places=2)
    country = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    college = models.CharField(max_length=200)
    mobile = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.TextField(blank=True)
    registration_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"