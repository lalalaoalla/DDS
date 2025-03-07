from django.db import models
from ddsBD.models import *
from django.core.validators import MinValueValidator


# класс выводимой информации  
class DDS(models.Model):
    created_at = models.DateField(verbose_name="Дата создания записи")
    #так как в тз не сказано, что поле статус необязательно к заполнению, тогда пускай будет обязательно
    status = models.ForeignKey(Status, on_delete=models.CASCADE, verbose_name="Статус")
    typedds = models.ForeignKey(Type,on_delete=models.CASCADE, blank=False, null=False, verbose_name="Тип")
    category=models.ForeignKey(Category, on_delete=models.CASCADE, blank=False, null=False, verbose_name="Категория")
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE, blank=False, null=False, verbose_name="Подкатегория")
    summa=models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        blank=False, 
        null=False,
        validators=[MinValueValidator(0.01)],
        verbose_name="Сумма")
    comment = models.TextField(blank=True, null=True, verbose_name="Комментарий")

    class Meta:
        verbose_name = "Данные о движении денежных средств"
        verbose_name_plural = "Даннные о движениях денежных средств"