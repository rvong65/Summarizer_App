from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import TextArea
from transformers import pipeline
import json
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

#Load summarization model
summarizer = pipeline("summarization", model="t5-base", tokenizer="t5-base", framework="tf")

#Send model's response
class SendTextInputView(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        text_input = dict(request.data)['text_input']
        output = summarizer(text_input, min_length = 5, max_length = 72)
        return_text = output[0]['summary_text'].capitalize()
        return_text_json = json.dumps(dict(response = return_text))
        queryset = TextArea.objects.filter()

        if queryset.exists():
            text = queryset[0]
            text.text = text_input 
            text.save(update_fields=['text'])
        else:
            text = TextArea(text = text_input)
            text.save()

        return Response(return_text_json)

#Enable user to create an account
class signUpView(APIView):
    def post(self, request):
        request_data = dict(request.data)
        username_li = request_data["username"]
        username = ' '.join(map(str, username_li))
        password_li = request_data["password"]
        password = ' '.join(map(str, password_li))
        try:
            user = User.objects.create_user(username, password=password)
            if user is not None:
                return Response(json.dumps(dict(response ="Success")))
            else:
                return Response(json.dumps(dict(response ="Failed")))
        except IntegrityError:
            return Response(json.dumps(dict(response ="Duplicate")))

#Enable user to log in
class loginView(APIView):
    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            return Response(json.dumps(dict(response ="Success")))
        else:
            return Response(json.dumps(dict(response ="Failed")))


            
