# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-01-03 22:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0056_auto_20190103_2227'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='credittradehistory',
            name='credit_trade_update_time',
        ),
        migrations.RemoveField(
            model_name='credittradehistory',
            name='user',
        ),
    ]