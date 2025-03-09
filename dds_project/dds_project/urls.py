from django.contrib import admin
from django.urls import path

from dds.views import *
from ddsBD.views import *

urlpatterns = [
    #основные страницы
    path("admin/", admin.site.urls),
    path('',index, name='index'),
    #создание
    path('create/',create, name='create'),
    path('success/', success_view, name='success_url'),
    #редактирование
    path('edit_dds/<int:id>/', edit_dds, name='edit_dds'),
    #словарь
    path('guide/',guide,name='guide'),

    #для сохраниния, словари
    path('save_status/', save_status, name='save_status'),
    path('save_type/', save_type, name='save_type'),
    path('save_category/', save_category, name='save_category'),
    path('save_subcategory/', save_subcategory, name='save_subcategory'),
    #для изменения, словари
    path('update_status/<int:status_id>/', update_status, name='update_status'),
    path('update_type/<int:type_id>/', update_type, name='update_stype'),
    path('update_category/', update_category, name='update_category'),
    path('update_subcategory/', update_subcategory, name='update_subcategory'),
    #для удаления, словари
    path('delete_status/<int:status_id>/', delete_status, name='delete_status'),
    path('delete_type/<int:type_id>/', delete_type, name='delete_type'),
    path('delete_category/<int:category_id>/', delete_category, name='delete_category'),
    path('delete_subcategory/<int:subcategory_id>/', delete_subcategory, name='delete_subcategory'),


    #для получения списков категорий и подкатегорий
    path('get_categories/', get_categories, name='get_categories'),
    path('get_subcategories/', get_subcategories, name='get_subcategories'),
    # Удаление записи ддс
    path('delete_dds/<int:id>/', delete_dds, name='delete_dds'),
]
