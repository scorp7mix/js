#! /usr/bin/env python
# -*- coding: utf-8 -*-

from django.shortcuts import render_to_response, redirect
from django.http.response import HttpResponse, Http404
from django.contrib import auth
from django.core.context_processors import csrf
import json

from models import Gamer

# Main page
def start(request):
    args = {}
    gamer = Gamer.objects.get(gamer_name="Sergey")
    args["gamer"] = gamer
    # Getting data from JSON (old version)
    # with open('static/data.json', 'r') as json_data:
    #     args = json.load(json_data)
    #     json_data.close()
    return render_to_response('index.html', args)

# Starting game
def game(request):
    args = {}
    gamer = Gamer.objects.get(gamer_name="Sergey")
    args["gamer"] = gamer

    # Getting data from JSON (old version)
    # with open('static/data.json', 'r') as json_data:
    #     args = json.load(json_data)
    #     json_data.close()
    return render_to_response('game.html', args)

# Here python save results in json file (how to do it ????????????????)
# def saveRes(request):
    # with open('static/data.json', 'r') as json_data:
    #     args = json.load(json_data)

    # if request.POST:
    #     new = int(request.POST.get('last_result', ''))
    #     args['last_result'] = new['last_result']

    #     if (args["last_result"] > args["best_result"]):
    #         args["best_result"] = args["last_result"]

    #     # Just test (does not work!!!):
    #     f = open('static/test.txt', 'w')
    #     f.write(args)
    #     f.close()

    #     # Why this does not work ?
    #     with open('static/data.json', 'w') as json_data:
    #         json.dump(args, json_data)

# -rwxrwxr-x 1 root plugdev 0 чер  9 13:23 test.txt
# -rwxrwxr-x 1 root plugdev 0 чер  9 13:23 data.json

# Trying do it by models
def saveRes(request):
    if request.POST:
        args = {}
        gamer = Gamer.objects.get(gamer_name="Sergey")
        new = int(request.POST.get('last_result', ''))
        gamer.gamer_last_result = new['last_result']

        if (gamer.gamer_last_result > gamer.gamer_best_result):
            gamer.gamer_best_result = gamer.gamer_last_result

        gamer.save()
        args["gamer"] = gamer
    return redirect("/")


# This code ignore please:
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def login(request):
    args = {}
    # args.update(csrf(request))
    args.update(request)
    if request.POST:
        username = request.POST.get("username", "")
        password = request.POST.get("password", "")
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            args['login_error'] = "Not correct data"
            return redirect('/')
    else:
        return redirect('/')
        # render_to_response('index.html', args)

def logout(request):
    auth.logout(request)
    return redirect('/')

