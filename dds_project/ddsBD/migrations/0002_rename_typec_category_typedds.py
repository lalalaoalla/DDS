# Generated by Django 5.0.6 on 2025-03-09 04:48

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("ddsBD", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="category",
            old_name="typec",
            new_name="typedds",
        ),
    ]
