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
      'resultado_analise',
      'fosforo',
      'potassio', 
      'calcio',
      'magnesio', 
      'enxofre',
      'aluminio', 
      'hal',
      'materia_organica',
      'fosforo_atingir',
      'fonte_fosforo',
      'eficiencia_fosforo',
      'valor_fosforo',
      'potassio_atingir',
      'fonte_potassio',
      'valor_potassio',
      'calcio_atingir',
      'fonte_calmag',
      'prnt',
      'cao_corretivo',
      'valor_calmag',
    ]

    