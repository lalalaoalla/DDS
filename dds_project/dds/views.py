# для рендеринга
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
#импорт моделей
from .models import DDS 
from ddsBD.models import *
#импорт форм
from .forms import DDSForm, DDSEditForm


def index(request):

    #Получаем данные
    dds_data = DDS.objects.all()

    # Данные для фильтрации
    status_data = Status.objects.all()
    type_data = Type.objects.all()
    category_data = Category.objects.all()
    subcategory_data = SubCategory.objects.all()

    # Получаем параметры фильтрации из GET-запроса
    date_from = request.GET.get('date_from')
    date_to = request.GET.get('date_to')
    status = request.GET.get('status')
    type_dds = request.GET.get('type')
    category = request.GET.get('category')
    subcategory = request.GET.get('subcategory')

    if date_from:
        dds_data = dds_data.filter(created_at__gte=date_from)
    if date_to:
        dds_data = dds_data.filter(created_at__lte=date_to)
    if status:
        dds_data = dds_data.filter(status__name=status)
    if type_dds:
        dds_data = dds_data.filter(typedds__name=type_dds)
    if category:
        dds_data = dds_data.filter(category__name=category)
    if subcategory:
        dds_data = dds_data.filter(subcategory__name=subcategory)
    

    context = {
        'dds_data': dds_data,
        'status_data': status_data,
        'type_data': type_data,
        'category_data': category_data,
        'subcategory_data': subcategory_data,  
    }

    return render(request, 'index.html', context)


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


def edit_dds(request, id):
    # Получаем объект записи по id
    dds_entry = get_object_or_404(DDS, id=id)

    if request.method == 'POST':
        # Если данные отправлены, обновляем запись
        form = DDSEditForm(request.POST, instance=dds_entry)
        if form.is_valid():
            form.save()
            return redirect('index')  # Перенаправляем на список записей
    else:
        # Если запрос GET, отображаем форму с текущими данными
        form = DDSEditForm(instance=dds_entry)
    return render(request,'edit.html',{'form': form})

#Страница успеха
def success_view(request):
    return render(request, 'success.html')




