# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

TEXTURAS = (
  ('1', 'Argiloso'),
  ('2', 'Textura Média')
)

CULTIVOS = (
  ('1', 'Plantio Direto'),
  ('2', 'Convencional')
)

FONTES_FOSFORO = (
  ('1', 'Superfosfato Simples'),
  ('2', 'Superfosfato Triplo'),
  ('3', 'MAP'),
  ('4', 'DAP'),
  ('5', 'Yoorin'),
  ('6', 'Fosfato Arad'),
  ('7', 'Fosfato Gafsa'),
  ('8', 'Fosfato Daoui'),
  ('9', 'Fosfato de Patos de Minas'),
  ('10', 'Escória de Thomas'),
  ('11', 'Ácido Fosfórico'),
  ('12', 'Multifosfato Magnesiano')
)

FONTES_POTASSIO = (
  ('1', 'Cloreto de Potássio'),
  ('2', 'Sulfato de Potássio'),
  ('3', 'Sulfato de Potássio/Magnésio'), 
)

FONTES_CALMAG = (
  ('1', 'Calcário Dolomítico'),
  ('2', 'Calcário Calcítico'),
  ('3', 'Calcário de Concha'),
  ('4', 'Gesso Agrícola'),
  ('5', 'Hidróxido de Cálcio'),
  ('6', 'Calcário Magnesiano')  
)


class Propriedade(models.Model):

  # Informações sobre a propriedade do produtor
  nome_produtor = models.CharField(max_length=255, null=False, default="")
  data = models.CharField(max_length=255, null=False, default="")
  municipio = models.CharField(max_length=255, null=False, default="")
  lote = models.CharField(max_length=255, null=False, default="")
  area_total = models.CharField(max_length=255, null=False, default="")
  talhao = models.CharField(max_length=255, null=False, default="")
  area_talhao = models.CharField(max_length=255, null=False, default="")
  matricula_lote = models.CharField(max_length=255, null=False, default="")
  profundidade_amostras = models.CharField(max_length=255, null=False, default="")
  resultado_analise = models.CharField(max_length=255, null=False, default="")
  text_solo = models.CharField(max_length=3, choices=TEXTURAS, default="1")
  sist_cultivo = models.CharField(max_length=3, choices=CULTIVOS, default="1")

  # Dados do laudo laboratorial
  fosforo = models.CharField(max_length=255, null=False, default="")
  potassio = models.CharField(max_length=255, null=False, default="")
  calcio = models.CharField(max_length=255, null=False, default="")
  magnesio = models.CharField(max_length=255, null=False, default="")
  enxofre = models.CharField(max_length=255, null=False, default="")
  aluminio = models.CharField(max_length=255, null=False, default="")
  hal = models.CharField(max_length=255, null=False, default="")
  materia_organica = models.CharField(max_length=255, null=False, default="")
  #Alumínio e H+AL não possuem fórmulas de valores ideais

  # Correção/recuperação de Fósforo
  fosforo_atingir = models.CharField(max_length=255, null=False, default="")
  fonte_fosforo = models.CharField(max_length=3, choices=FONTES_FOSFORO, default="1")
  eficiencia_fosforo = models.CharField(max_length=255, null=False, default="")
  valor_fosforo = models.CharField(max_length=255, null=False, default="")
  aplicar_fosforo = models.CharField(max_length=255, null=False, default="")
  custo_fosforo = models.CharField(max_length=255, null=False, default="")

  # Correção/recuperação de Potássio
  potassio_atingir = models.CharField(max_length=255, null=False, default="")
  fonte_potassio = models.CharField(max_length=3, choices=FONTES_POTASSIO, default="1")
  valor_potassio = models.CharField(max_length=255, null=False, default="")
  particip_potassio = models.CharField(max_length=255, null=False, default="")
  aplicar_potassio = models.CharField(max_length=255, null=False, default="")
  custo_potassio = models.CharField(max_length=255, null=False, default="")

  # Correção/recuperação de Cálcio e Magnésio
  calcio_atingir = models.CharField(max_length=255, null=False, default="")
  fonte_calmag = models.CharField(max_length=3, choices=FONTES_CALMAG, default="1")
  prnt = models.CharField(max_length=255, null=False, default="")
  cao_corretivo = models.CharField(max_length=255, null=False, default="")
  valor_calmag = models.CharField(max_length=255, null=False, default="")
  particip_calc = models.CharField(max_length=255, null=False, default="")
  particip_magnes = models.CharField(max_length=255, null=False, default="")
  aplicar_calmag = models.CharField(max_length=255, null=False, default="")
  custo_calmag = models.CharField(max_length=255, null=False, default="")