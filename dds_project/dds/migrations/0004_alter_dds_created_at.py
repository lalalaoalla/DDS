# Generated by Django 5.1.7 on 2025-03-07 15:10

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("dds", "0003_alter_dds_comment"),
    ]

    operations = [
        migrations.AlterField(
            model_name="dds",
            name="created_at",
            field=models.DateField(verbose_name="Дата создания записи"),
        ),
    ]
