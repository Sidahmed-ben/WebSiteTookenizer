
import time
from flask import Flask, request, jsonify, make_response
import nltk
from nltk.corpus import stopwords
from nltk.stem.snowball import FrenchStemmer


def fileTookenizer(text):
    symboles = ["'",'.', ',', ';', ':', '!', '?', '"', '(', ')', '[', ']', '{', '}', '+', '-', '*', '/', '=', '<', '>', '≤', '≥', '%', '$', '€', '£', '¥', '元', '@', '#', '&', '~', '/', '\\', '¿', '☎', '✉', '❌', '✔', 'ℹ', '⚠', '❓', '⏰', '📅', '📆', '🎂', '←', '→', '↑', '↓', '👉', '🏠', '⭐', '❤']
    symboles = set(symboles)
    # télécharger les stopwords si nécessaire
    nltk.download('stopwords')
    # initialiser le stemmer pour la langue française
    stemmer = FrenchStemmer()
    # Replace symboles by spaces
    for symb in symboles :
        # print("symbole => ",symb)
        text = text.replace(symb, " ")
    # print("================> ",text)
    # convertir le texte en minuscules et le diviser en mots
    words = nltk.word_tokenize(text.lower())
    # print(words)
    # récupérer les stopwords de la langue française
    stop_words = set(stopwords.words('french'))
    # Rajouter les symboles aux stop_words
    stop_words = stop_words.union(symboles) 
    # initialiser un dictionnaire pour stocker les mots et leurs occurrences
    # print(stop_words)
    word_freq = {}
    # parcourir chaque mot dans la liste de mots
    for word in words:
        # ignorer les stopwords
        if (word not in stop_words) and (len(word)>2):
            # appliquer la racinisation (stemming) pour obtenir le mot de base
            word = stemmer.stem(word)
            # ajouter le mot et son occurrence au dictionnaire
            if word not in word_freq:
                word_freq[word] = 1
            else:
                word_freq[word] += 1
        else :
            continue
            # print(word)
    # Afficher les mots avec leurs fréquences
    # print(word_freq)
    response = word_freq

    return response