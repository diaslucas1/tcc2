from django import forms
from website.models import Propriedade

class InserePropriedadeForm(forms.ModelForm):

  class Meta:
    model = Propriedade

    fields = [
      'nome_produtor',
      'data',
      'municipio',
      'lote',
      'area_total',
      'talhao',
      'area_talhao',
      'matricula_lote',
      'profundidade_amostras',
      'resultado_analise'
    ]