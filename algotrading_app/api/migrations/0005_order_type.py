# Generated by Django 3.1.5 on 2021-02-03 00:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210202_0521'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='type',
            field=models.CharField(default='', max_length=15),
        ),
    ]
