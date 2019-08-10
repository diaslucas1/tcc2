from website.views import IndexTemplateView, PropriedadeCreateView

from django.urls import path

app_name = 'website'

urlpatterns = [
  # GET / 
  path('', IndexTemplateView.as_view(), name="index"),

  # GET /propriedade/cadastrar
  path('propriedade/cadastrar', PropriedadeCreateView.as_view(),
  name="cadastra_propriedade"),
]