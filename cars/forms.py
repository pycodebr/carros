from django import forms
from cars.models import Car


class CarModelForm(forms.ModelForm):
    class Meta:
        model = Car
        fields = '__all__'
        widgets = {
            'model': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm transition-colors',
                'placeholder': 'Ex: Civic, Corolla, Onix...'
            }),
            'brand': forms.Select(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm transition-colors'
            }),
            'factory_year': forms.NumberInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm transition-colors',
                'placeholder': 'Ex: 2020',
                'min': 1975,
                'max': 2025
            }),
            'model_year': forms.NumberInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm transition-colors',
                'placeholder': 'Ex: 2021',
                'min': 1975,
                'max': 2025
            }),
            'plate': forms.TextInput(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm transition-colors uppercase',
                'placeholder': 'Ex: ABC-1234 ou ABC1D23',
                'maxlength': 8
            }),
            'value': forms.NumberInput(attrs={
                'class': 'w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm transition-colors',
                'placeholder': '20000',
                'min': 20000,
                'step': 1000
            }),
            'photo': forms.FileInput(attrs={
                'class': 'sr-only',
                'accept': 'image/*'
            }),
            'bio': forms.Textarea(attrs={
                'class': 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm transition-colors resize-y min-h-[100px]',
                'placeholder': 'Descreva informações adicionais sobre o carro (opcional)...',
                'rows': 4
            }),
        }

    def clean_value(self):
        value = self.cleaned_data.get('value')
        if value < 20000:
            self.add_error('value', 'Valor mínimo do carro deve ser de R$20.000')
        return value

    def clean_factory_year(self):
        factory_year = self.cleaned_data.get('factory_year')
        if factory_year < 1975:
            self.add_error('factory_year', 'Não é possível cadastrar carros fabricados antes de 1975')
        return factory_year

    def add_error_class_to_fields(self):
        """Adiciona classes de erro aos campos com erros"""
        for field_name, field in self.fields.items():
            if field_name in self.errors:
                current_class = field.widget.attrs.get('class', '')
                if 'border-gray-300' in current_class:
                    # Remove classes de borda normais e adiciona classes de erro (dark mode aware)
                    error_class = current_class.replace('border-gray-300 dark:border-gray-600', 'border-red-300 dark:border-red-600').replace('focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400', 'focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400')
                    # Adicionar espaço para ícone de erro apenas se não for file input
                    if 'sr-only' not in current_class:
                        error_class += ' pr-10'
                    field.widget.attrs['class'] = error_class
