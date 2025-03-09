from django import forms
from .models import DDS
from ddsBD.models import *
import datetime

class DDSForm(forms.ModelForm):
    class Meta:
        model = DDS
        fields = ['created_at', 'status', 'typedds', 'comment', 'category', 'subcategory', 'summa']
        widgets = {
            'created_at': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'comment': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Введите комментарий'}),
            'summa': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': '5000'}),
        }


    def clean_created_at(self):
        created_at = self.cleaned_data['created_at']
        if created_at > datetime.date.today():
            raise forms.ValidationError("Дата не может быть в будущем.")
        return created_at

    def clean_amount(self):
        amount = self.cleaned_data['amount']
        if amount < 0:
            raise forms.ValidationError("Сумма должна быть положительной.")
        return amount

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['status'].queryset = Status.objects.all()
        self.fields['typedds'].queryset = Type.objects.all()

class DDSEditForm(forms.ModelForm):
    class Meta:
        model = DDS
        fields = ['created_at', 'status', 'typedds', 'comment', 'category', 'subcategory', 'summa']

    widgets = {
        'created_at': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        'status': forms.Select(attrs={'class': 'form-control'}),
        'typedds': forms.Select(attrs={'class': 'form-control'}),
        'comment': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Введите комментарий'}),
        'category': forms.Select(attrs={'class': 'form-control'}),
        'subcategory': forms.Select(attrs={'class': 'form-control'}),
        'summa': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': '5000'}),
    }