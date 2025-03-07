from django import forms
from .models import DDS

class DDSForm(forms.ModelForm):
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