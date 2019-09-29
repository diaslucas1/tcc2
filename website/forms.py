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
      'text_solo',
      'sist_cultivo',
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
      'aplicar_fosforo',
      'custo_fosforo',
      'potassio_atingir',
      'fonte_potassio',
      'valor_potassio',
      'particip_potassio',
      'aplicar_potassio',
      'custo_potassio',
      'calcio_atingir',
      'fonte_calmag',
      'prnt',
      'cao_corretivo',
      'valor_calmag',
      'particip_calc',
      'particip_magnes',
      'aplicar_calmag',
      'custo_calmag'
    ]


    