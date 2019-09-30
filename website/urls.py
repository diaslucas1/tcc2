from website.views import IndexTemplateView, PropriedadeCreateView, PropriedadeListView, PropriedadeUpdateView, PropriedadeDeleteView, PropriedadeDetailView

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

  #GET /propriedades/{pk}
  path('propriedade/<pk>', PropriedadeDetailView.as_view(), name="detalhe_propriedade"),

  # GET/POST /propriedade/{pk}
  path('propriedade/editar/<pk>', PropriedadeUpdateView.as_view(), name="atualiza_propriedade"),

  # GET/POST /propriedades/excluir/{pk}
  path('propriedade/excluir/<pk>', PropriedadeDeleteView.as_view(), name="deleta_propriedade"),
]