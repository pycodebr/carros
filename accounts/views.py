from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from accounts.forms import StyledUserCreationForm, StyledAuthenticationForm


def register_view(request):
    if request.method == "POST":
        user_form = StyledUserCreationForm(request.POST)
        if user_form.is_valid():
            user_form.save()
            return redirect('login')
        else:
            # Adicionar classes de erro aos campos com erro
            user_form.add_error_class_to_fields()
    else:
        user_form = StyledUserCreationForm()
    return render(request, 'register.html', {'user_form': user_form})


def login_view(request):
    if request.method == "POST":
        login_form = StyledAuthenticationForm(request, data=request.POST)
        if login_form.is_valid():
            username = login_form.cleaned_data.get('username')
            password = login_form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('cars_list')
        else:
            # Adicionar classes de erro aos campos com erro
            login_form.add_error_class_to_fields()
    else:
        login_form = StyledAuthenticationForm()
    return render(request, 'login.html', {'login_form': login_form})


def logout_view(request):
    logout(request)
    return redirect('cars_list')
