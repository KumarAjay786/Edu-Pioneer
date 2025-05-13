from django.contrib import admin
from .models import College

@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'state', 'country', 'created_at')
    search_fields = ('name', 'email', 'district')
    list_filter = ('state', 'country', 'created_at')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'website', 'email')
        }),
        ('Contact Details', {
            'fields': ('mobile', 'address')
        }),
        ('Location Information', {
            'fields': ('district', 'state', 'country')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )