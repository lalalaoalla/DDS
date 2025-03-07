from django.contrib import admin
from .models import DDS
# Register your models here.

#регистрация таблицы с информацией
class DDSAdmin(admin.ModelAdmin):
    list_display = ['created_at', 'status', 'typedds', 'category', 'subcategory', 'summa', 'comment']

    # Поля, по которым можно фильтровать записи
    list_filter = ['created_at', 'status', 'typedds', 'category', 'subcategory']

    class Meta:
        model= DDS

admin.site.register(DDS,DDSAdmin)