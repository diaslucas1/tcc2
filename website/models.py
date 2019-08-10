# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Propriedade(models.Model):

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