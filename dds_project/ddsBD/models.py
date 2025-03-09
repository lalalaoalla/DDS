from django.db import models

# Create your models here.

#Модель, содержащая статусы
class Status(models.Model):
    name=models.CharField(max_length=128,unique=True, verbose_name="Название статуса")

    class Meta: 
        verbose_name='Статус'
        verbose_name_plural='Статусы'
    
    def __str__(self):
        return self.name

#Модель типов
class Type(models.Model):
    name = models.CharField(max_length=128, unique= True, verbose_name="Название типа")

    class Meta:
        verbose_name = 'Тип'
        verbose_name_plural = 'Типы'

    def __str__(self):
        return self.name
    
#Модель категорий
class Category(models.Model):
    name=models.CharField(max_length=128, unique=True, verbose_name="Название категории")
    typedds=models.ForeignKey(Type, on_delete=models.CASCADE, verbose_name="К какому типу привязана")

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name
    
#Модель подкатегорий
class SubCategory(models.Model):
    name=models.CharField(max_length=128, verbose_name="Название подкатегории")
    category=models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name="К какой категории относится")

    class Meta:
        verbose_name='Подкатегория'
        verbose_name_plural = 'Подкатегории'

    def __str__(self):
        return self.name
    