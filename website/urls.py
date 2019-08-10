from website.views import IndexTemplateView, PropriedadeCreateView, PropriedadeListView, PropriedadeUpdateView, PropriedadeDeleteView

from django.urls import path

app_name = 'website'

urlpatterns = [
  # GET / 
  path('', IndexTemplateView.as_view(), name="index"),

  # GET /propriedade/cadastrar
  path('propriedade/cadastrar', PropriedadeCreateView.as_view(),
  name="cadastra_propriedade"),

   # GET /propriedades
  path('propriedades/', PropriedadeListView.as_view(), name="lista_propriedades"),

  # GET/POST /propriedade/{pk}
  path('propriedade/<pk>', PropriedadeUpdateView.as_view(), name="atualiza_propriedade"),

  # GET/POST /propriedades/excluir/{pk}
  path('propriedade/excluir/<pk>', PropriedadeDeleteView.as_view(), name="deleta_propriedade"),
]