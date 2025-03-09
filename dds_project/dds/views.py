from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import DDS 
from ddsBD.models import *
from .forms import DDSForm, DDSEditForm
import datetime
from django.views.decorators.http import require_POST
import logging

#обработка удаления
@require_POST
def delete_dds(request, id):
    try:
        dds = get_object_or_404(DDS, id=id)
        dds.delete()
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})
    
# Настройка логгера
logger = logging.getLogger(__name__)
#функции для получения категорий и подкатегорий для списка
def get_categories(request):
    typedds_id = request.GET.get('typedds_id')
    categories = Category.objects.filter(typedds_id=typedds_id).values('id', 'name')
    return JsonResponse(list(categories), safe=False)

def get_subcategories(request):
    category_id = request.GET.get('category_id')
    subcategories = SubCategory.objects.filter(category_id=category_id).values('id', 'name')
    return JsonResponse(list(subcategories), safe=False)

#отображения страниц и некоторые действия№№№№№№№№№№№№№ 
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

#страница создания записи ддс
def create(request):
    status_data = Status.objects.all()
    type_data = Type.objects.all()
    category_data = Category.objects.all()
    subcategory_data = SubCategory.objects.all()

    if request.method == 'POST':
        form = DDSForm(request.POST)
        if form.is_valid():
            # Доп валидация
            created_at = form.cleaned_data['created_at']
            if created_at > datetime.date.today():
                form.add_error('created_at', "Дата не может быть в будущем")
            else:
                form.save()
                return redirect('success_url')
    else:
        form = DDSForm(initial={'created_at': datetime.date.today()})

    context = {
        'status_data': status_data,
        'type_data': type_data,
        'category_data': category_data,
        'subcategory_data': subcategory_data,
        'form': form,
    }
    return render(request, 'create.html', context)

#страница редактирования
def edit_dds(request, id):
    
    dds_entry = get_object_or_404(DDS, id=id)

    if request.method == 'POST':
        # Если данные отправлены, обновляем запись
        form = DDSEditForm(request.POST, instance=dds_entry)
        if form.is_valid():
            form.save()
            return redirect('index')  
    else:
        # Если запрос GET, отображаем форму с текущими данными
        form = DDSEditForm(instance=dds_entry)
    return render(request,'edit.html',{'form': form})

#Страница успеха
def success_view(request):
    return render(request, 'success.html')


