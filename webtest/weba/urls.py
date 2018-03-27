from django.conf.urls import url , include
from django.conf import settings
from django.conf.urls.static import static


from weba import views

urlpatterns = [
    # back-end
    #url('', views.backend.index,name='index'),
    url(r'^$', views.indexView,name='index'),
    url(r'^login/$', views.loginView,name='login'),
    url(r'^register/$', views.registerView,name='register'),
]
