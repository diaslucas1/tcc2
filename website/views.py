# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.urls import reverse_lazy
from django.views.generic import TemplateView, CreateView, ListView, UpdateView, DeleteView, DetailView
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
  success_url = reverse_lazy("website:lista_propriedades")

# LISTA PROPRIEDADES
class PropriedadeListView(ListView):
  template_name = "lista.html"
  model = Propriedade
  context_object_name = "propriedades"

# DETALHE PROPRIEDADE
class PropriedadeDetailView(DetailView):
  template_name = "detalhe.html"
  model = Propriedade
  fields = '__all__'
  context_object_name = 'propriedade'

# ATUALIZA PROPRIEDADE
class PropriedadeUpdateView(UpdateView):
  template_name = "atualiza.html"
  model = Propriedade
  fields = '__all__'
  context_object_name = 'propriedade'
  success_url = reverse_lazy("website:lista_propriedades")

# EXCLUI PROPRIEDADE
class PropriedadeDeleteView(DeleteView):
  template_name = "exclui.html"
  model = Propriedade
  context_object_name = 'propriedade'
  success_url = reverse_lazy("website:lista_propriedades")