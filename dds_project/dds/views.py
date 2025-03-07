from django.shortcuts import render, redirect, get_object_or_404
from .models import DDS 
from ddsBD.models import *
from .forms import DDSForm

# Create your views here.

def index(request):

    #получаем с бД
    dds_data = DDS.objects.all()

    # передаем их в наш шаблон через контекст
    context = {
        'dds_data': dds_data,
    }

    return render(request,'index.html', context)


def create(request):

    #получаем данные с БД
    status_data = Status.objects.all()
    type_data = Type.objects.all()
    category_data = Category.objects.all()
    subcategory_data = SubCategory.objects.all()


    if request.method == 'POST':
        form = DDSForm(request.POST)
        if form.is_valid():
            form.save()  # Сохраняем запись в базу данных
            return redirect('success_url')  # Перенаправляем на страницу успеха
    else:
        form = DDSForm()

    context = {
        'status_data' : status_data,
        'type_data' : type_data,
        'category_data' : category_data,
        'subcategory_data' : subcategory_data,
        'form': form,
    }
    return render(request,'create.html', context)

def success_view(request):
    return render(request, 'success.html')

def edit_dds(request, id):
    # Получаем объект записи по id
    dds_entry = get_object_or_404(DDS, id=id)

    if request.method == 'POST':
        # Если данные отправлены, обновляем запись
        form = DDSForm(request.POST, instance=dds_entry)
        if form.is_valid():
            form.save()
            return redirect('dds_list')  # Перенаправляем на список записей
    else:
        # Если запрос GET, отображаем форму с текущими данными
        form = DDSForm(instance=dds_entry)
    return render(request,'edit.html')