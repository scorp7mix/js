#! /usr/bin/env python
# -*- coding: utf-8 -*-

from django.db import models
from django.contrib import admin

class Gamer(models.Model):
    gamer_name = models.CharField(max_length=20)
    gamer_last_result = models.IntegerField(default=0)
    gamer_best_result = models.IntegerField(default=0)

class GamerAdmin(admin.ModelAdmin):
    list_display = ('gamer_name', 'gamer_last_result', 'gamer_best_result')

admin.site.register(Gamer, GamerAdmin)
