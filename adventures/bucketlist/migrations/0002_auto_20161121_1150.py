# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-21 11:50
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bucketlist', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='item',
            options={'ordering': ['name']},
        ),
        migrations.AlterUniqueTogether(
            name='bucketlist',
            unique_together=set([('name', 'creator')]),
        ),
        migrations.AlterUniqueTogether(
            name='item',
            unique_together=set([('name', 'bucketlist')]),
        ),
    ]