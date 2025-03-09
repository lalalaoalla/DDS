from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt 
import json
from .models import *  
import logging


logger = logging.getLogger(__name__)

@csrf_exempt  # Отключаем проверку CSRF для простоты 

# Create your views here.

############функции для статуса##################3
def save_status(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data['name']
            #проверка на длину
            if len(name) > 128:
                return JsonResponse({'success': False, 'error': 'Название статуса не должно превышать 128 символов'})
            
            # Проверка на пустое поле
            if not name:
                return JsonResponse({'success': False, 'error': 'Название не может быть пустым'})
            
            # Проверка уникальности
            if Status.objects.filter(name=name).exists():
                return JsonResponse({'success': False, 'error': 'Статус с таким названием уже существует'})

            
            status = Status(name=name)
            status.save()  # Сохраняем в базе данных

            # Возвращаем JSON с ID нового объекта
            return JsonResponse({'success': True, 'id': status.id})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})
    
#обновление
def update_status(request, status_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data['name']

            # Получаем объект Status по ID
            status = Status.objects.get(pk=status_id)
            status.name = name
            status.save()

            return JsonResponse({'success': True})
        except Status.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Status not found'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})
    
#удаляем
def delete_status(request, status_id):
    try:
        status = get_object_or_404(Status, pk=status_id) 
        status.delete()  

        return JsonResponse({'success': True})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)  
    
############комментарии для типов№№№№№№№№№№№№№№
def save_type(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data['name']

            if len(name) > 128:
                return JsonResponse({'success': False, 'error': 'Название типа не должно превышать 128 символов'})
            
            # Проверка уникальности
            if Type.objects.filter(name=name).exists():
                return JsonResponse({'success': False, 'error': 'Тип с таким названием уже существует'})
            
            # Проверка на пустое поле
            if not name:
                return JsonResponse({'success': False, 'error': 'Название не может быть пустым'})

            
            typec = Type(name=name)
            typec.save()

            return JsonResponse({'success': True, 'id': typec.id})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})
    
#редактирование
    
def update_type(request, type_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data['name']

            # Получаем объект Type по ID
            typec = Type.objects.get(pk=type_id)
            typec.name = name
            typec.save()

            return JsonResponse({'success': True})
        except Type.DoesNotExist:  
            return JsonResponse({'success': False, 'error': 'Type not found'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})
    
#удаление
def delete_type(request, type_id):
    try:
        typec = get_object_or_404(Type, pk=type_id)
        typec.delete()

        return JsonResponse({'success': True})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500) 
    
############для категорий№№№№№№№№№№№№№№
def save_category(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))  # Декодируем байтовую строку
            name = data['name']
            type_id = data['type_id']
            new_category = Category.objects.create(name=name, typedds_id=type_id)

            if len(name) > 128:
                return JsonResponse({'success': False, 'error': 'Название категории не должно превышать 128 символов'})
            
            
            if Category.objects.filter(name=name).exists():
                return JsonResponse({'success': False, 'error': 'Категория с таким названием уже существует'})
            
            
            if not name:
                return JsonResponse({'success': False, 'error': 'Название не может быть пустым'})
            
            return JsonResponse({'success': True, 'id': new_category.id})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=400)
    return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=405)

#обновление
def update_category(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            logger.info('Получены данные для обновления категории: %s', data)

            category = Category.objects.get(pk=data['id'])
            category.name = data['name']
            category.typec_id = data['type_id']
            category.save()

            logger.info('Категория успешно обновлена: %s', category)
            return JsonResponse({'success': True})
        except Category.DoesNotExist:
            logger.error('Категория не найдена: %s', data['id'])
            return JsonResponse({'success': False, 'error': 'Категория не найдена'})
        except Exception as e:
            logger.error('Ошибка при обновлении категории: %s', str(e))
            return JsonResponse({'success': False, 'error': str(e)})
    return JsonResponse({'success': False})

#удаление
def delete_category(request, category_id):
    try:
        category = get_object_or_404(Category, pk=category_id)  
        category.delete()  
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500) 

############для подкатегорий№№№№№№№№№№№№№
def save_subcategory(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data['name']
            category_id = data['category_id'] 
            new_subcategory = SubCategory.objects.create(name=name, category_id=category_id) 

            if len(name) > 128:
                return JsonResponse({'success': False, 'error': 'Название подкатегории не должно превышать 128 символов'})
            
            
            if SubCategory.objects.filter(name=name).exists():
                return JsonResponse({'success': False, 'error': 'Подкатегория с таким названием уже существует'})
            
            
            if not name:
                return JsonResponse({'success': False, 'error': 'Название не может быть пустым'})
            
            return JsonResponse({'success': True, 'id': new_subcategory.id})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    return JsonResponse({'success': False})
    
#обновление
def update_subcategory(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            logger.info('Получены данные для обновления подкатегории: %s', data)

            subcategory = SubCategory.objects.get(pk=data['id'])
            subcategory.name = data['name']
            subcategory.category_id = data['category_id']
            subcategory.save()

            logger.info('Подкатегория успешно обновлена: %s', subcategory)
            return JsonResponse({'success': True})
        except Category.DoesNotExist:
            logger.error('Категория не найдена: %s', data['id'])
            return JsonResponse({'success': False, 'error': 'Категория не найдена'})
        except Exception as e:
            logger.error('Ошибка при обновлении категории: %s', str(e))
            return JsonResponse({'success': False, 'error': str(e)})
    return JsonResponse({'success': False})

#удаление
def delete_subcategory(request, subcategory_id):
    try:
        subcategory = get_object_or_404(SubCategory, pk=subcategory_id)
        subcategory.delete()
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)

#отображение страницы
def guide(request):
    #считывание данных

    status_data = Status.objects.all()
    type_data = Type.objects.all()
    category_data = Category.objects.all()
    subcategory_data = SubCategory.objects.all()

    context = {
        'status_data': status_data,
        'type_data': type_data,
        'category_data': category_data,
        'subcategory_data': subcategory_data,

    }
    return render(request,'guide.html',context)