from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User


class StyledAuthenticationForm(AuthenticationForm):
    """Form de login com estilização TailwindCSS"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Aplicar classes TailwindCSS aos widgets (com dark mode)
        input_classes = 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm transition-colors'
        
        self.fields['username'].widget.attrs.update({
            'class': input_classes,
            'placeholder': 'Digite seu nome de usuário'
        })
        
        self.fields['password'].widget.attrs.update({
            'class': input_classes,
            'placeholder': 'Digite sua senha'
        })
        
        # Atualizar labels
        self.fields['username'].label = 'Usuário'
        self.fields['password'].label = 'Senha'
    
    def add_error_class_to_fields(self):
        """Adiciona classes de erro aos campos com erros"""
        for field_name, field in self.fields.items():
            if field_name in self.errors:
                current_class = field.widget.attrs.get('class', '')
                # Remove classes de borda normais e adiciona classes de erro (dark mode aware)
                error_class = current_class.replace('border-gray-300 dark:border-gray-600', 'border-red-300 dark:border-red-600').replace('focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400', 'focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400') + ' pr-10'
                field.widget.attrs['class'] = error_class


class StyledUserCreationForm(UserCreationForm):
    """Form de registro com estilização TailwindCSS"""
    
    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Aplicar classes TailwindCSS aos widgets (com dark mode)
        common_classes = 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-sm transition-colors'
        
        self.fields['username'].widget.attrs.update({
            'class': common_classes,
            'placeholder': 'Digite seu nome de usuário'
        })
        
        self.fields['password1'].widget.attrs.update({
            'class': common_classes,
            'placeholder': 'Digite sua senha'
        })
        
        self.fields['password2'].widget.attrs.update({
            'class': common_classes,
            'placeholder': 'Confirme sua senha'
        })
        
        # Atualizar labels
        self.fields['username'].label = 'Usuário'
        self.fields['password1'].label = 'Senha'
        self.fields['password2'].label = 'Confirmação de senha'
    
    def add_error_class_to_fields(self):
        """Adiciona classes de erro aos campos com erros"""
        for field_name, field in self.fields.items():
            if field_name in self.errors:
                current_class = field.widget.attrs.get('class', '')
                # Remove classes de borda normais e adiciona classes de erro (dark mode aware)
                error_class = current_class.replace('border-gray-300 dark:border-gray-600', 'border-red-300 dark:border-red-600').replace('focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400', 'focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400') + ' pr-10'
                field.widget.attrs['class'] = error_class