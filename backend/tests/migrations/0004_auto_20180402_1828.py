# Generated by Django 2.0.2 on 2018-04-02 18:28

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0003_auto_20180402_1818'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4),
        ),
        migrations.AddField(
            model_name='question',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4),
        ),
        migrations.AddField(
            model_name='questionanswer',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4),
        ),
        migrations.AddField(
            model_name='test',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4),
        ),
    ]
