from django.contrib import admin
from django.urls import path

from dds.views import *
from ddsBD.views import *

urlpatterns = [
    path("admin/", admin.site.urls),
    path('',index, name='index'),
    #создание
    path('create/',create, name='create'),
    path('success/', success_view, name='success_url'),
    #редактирование
    path('edit_dds/<int:id>/', edit_dds, name='edit_dds'),
    #словарь
    path('guide/',guide,name='guide'),
]
