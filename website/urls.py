from website.views import IndexTemplateView

from django.urls import path

app_name = 'website'

urlpatterns = [
  # GET / 
  path('', IndexTemplateView.as_view(), name="index"),
]