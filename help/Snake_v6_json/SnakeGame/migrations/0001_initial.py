# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Gamer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('gamer_name', models.CharField(max_length=20)),
                ('gamer_last_result', models.IntegerField(default=0)),
                ('gamer_best_result', models.IntegerField(default=0)),
            ],
        ),
    ]
