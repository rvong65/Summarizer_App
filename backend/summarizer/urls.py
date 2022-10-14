from django.urls import path
from .views import SendTextInputView, signUpView, loginView

urlpatterns = [
    path('submit/', SendTextInputView.as_view()),
    path('signUp/', signUpView.as_view()), 
    path('signIn/', loginView.as_view())
]