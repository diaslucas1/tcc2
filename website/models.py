# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

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
  fonte_fosforo = models.CharField(max_length=255, null=False, default="")
  eficiencia_fosforo = models.CharField(max_length=255, null=False, default="")
  valor_fosforo = models.CharField(max_length=255, null=False, default="")

  # Correção/recuperação de Potássio
  potassio_atingir = models.CharField(max_length=255, null=False, default="")
  fonte_potassio = models.CharField(max_length=255, null=False, default="")
  valor_potassio = models.CharField(max_length=255, null=False, default="")

  # Correção/recuperação de Cálcio e Magnésio
  calcio_atingir = models.CharField(max_length=255, null=False, default="")
  fonte_calmag = models.CharField(max_length=255, null=False, default="")
  prnt = models.CharField(max_length=255, null=False, default="")
  cao_corretivo = models.CharField(max_length=255, null=False, default="")