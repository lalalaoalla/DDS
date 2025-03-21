# Generated by Django 5.1.7 on 2025-03-07 13:59

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("dds", "0001_initial"),
        ("ddsBD", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="DDS",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created_at",
                    models.DateField(
                        auto_now_add=True, verbose_name="Дата создания записи"
                    ),
                ),
                (
                    "summa",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=10,
                        validators=[django.core.validators.MinValueValidator(0.01)],
                        verbose_name="Сумма",
                    ),
                ),
                ("comment", models.TextField(verbose_name="Комментарий")),
                (
                    "category",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="ddsBD.category",
                        verbose_name="Категория",
                    ),
                ),
                (
                    "status",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="ddsBD.status",
                        verbose_name="Статус",
                    ),
                ),
                (
                    "subcategory",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="ddsBD.subcategory",
                        verbose_name="Подкатегория",
                    ),
                ),
                (
                    "typedds",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="ddsBD.type",
                        verbose_name="Тип",
                    ),
                ),
            ],
            options={
                "verbose_name": "Данные о движении денежных средств",
                "verbose_name_plural": "Даннные о движениях денежных средств",
            },
        ),
        migrations.DeleteModel(
            name="Status",
        ),
    ]
