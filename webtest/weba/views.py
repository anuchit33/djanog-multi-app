from django.shortcuts import get_object_or_404, render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login ,logout
from django.http import JsonResponse
from django.core import serializers
import datetime
from django.http import HttpResponse
from django.template import loader
from weba.models import UserA

def indexView(request):
    if request.user.is_authenticated == True and UserA(user=request.user) is not None :
        return render(request, 'index.html', { })
    else:
        return redirect('/login/')

def loginView(request):
    if request.user.is_authenticated == True and UserA(user=request.user) is not None :
        return redirect('/')

    error_message = None
    if request.method == 'POST':
        username = request.POST.get('username','')
        password = request.POST.get('password','')
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                request.session.set_expiry(86400) #sets the exp. value of the session 
                login(request, user) #the user is now logged in
                return redirect('/')
            else:
                error_message = 'Error1 Login!'
        else:
            error_message = 'Error2 Login!'
    return render(request, 'login.html', {
            'error_message': error_message
        })

def registerView(request):

    error_message = None
    if request.method == 'POST':
        username = request.POST.get('username','')
        password = request.POST.get('password','')
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                request.session.set_expiry(86400) #sets the exp. value of the session 
                login(request, user) #the user is now logged in
                return redirect('/')
            else:
                error_message = 'Error1 Login!'
        else:
            error_message = 'Error2 Login!'
    return render(request, 'register.html', {
            'error_message': error_message
        })