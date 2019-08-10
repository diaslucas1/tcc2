# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.urls import reverse_lazy
from django.views.generic import TemplateView, CreateView
from website.models import Propriedade
from website.forms import InserePropriedadeForm

# Create your views here.

# HOME PAGE
class IndexTemplateView(TemplateView):
  template_name = "index.html"

# CADASTRO PROPRIEDADE
class PropriedadeCreateView(CreateView):
  template_name = "cadastro.html"
  model = Propriedade
  form_class = InserePropriedadeForm
