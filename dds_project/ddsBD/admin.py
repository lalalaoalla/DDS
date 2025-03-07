from django.contrib import admin
from .models import *
# Register your models here.

#Регистрация таблицы статусов
class StatusAdmin(admin.ModelAdmin):
    list_display=['name']

    class Meta:
        model= Status

admin.site.register(Status,StatusAdmin)

#Регистрация таблицы типов
class TypeAdmin(admin.ModelAdmin):
    list_display=['name']

    class Meta:
        model=Type

admin.site.register(Type, TypeAdmin)

#Регистрация таблицы категорий
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

    class Meta:
        model=Category

admin.site.register(Category,CategoryAdmin)

#Регистрация таблицы подкатегорий
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

    class Meta:
        model=SubCategory

admin.site.register(SubCategory,SubCategoryAdmin)
