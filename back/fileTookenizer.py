
import time
from flask import Flask, request, jsonify, make_response
import nltk
from nltk.corpus import stopwords
from nltk.stem.snowball import FrenchStemmer


def fileTookenizer(text):
    # Set the more useful symbols
    symboles = ["'",'.', ',', ';', ':', '!', '?', '"', '(', ')', '[', ']', '{', '}', '+', '-', '*', '/', '=', '<', '>', '≤', '≥', '%', '$', '€', '£', '¥', '元', '@', '#', '&', '~', '/', '\\', '¿', '☎', '✉', '❌', '✔', 'ℹ', '⚠', '❓', '⏰', '📅', '📆', '🎂', '←', '→', '↑', '↓', '👉', '🏠', '⭐', '❤']
    symboles = set(symboles)
    # Download stopword list
    nltk.download('stopwords')
    # stemmer initializer
    stemmer = FrenchStemmer()
    # Replace symboles by spaces
    for symb in symboles :
        text = text.replace(symb, " ")
    # Convert to lowerCase
    words = nltk.word_tokenize(text.lower())
    # Get stopWords
    stop_words = set(stopwords.words('french')) 
    # Initialize word_freq object
    word_freq = {}
    # Loop words
    for word in words:
        if (word not in stop_words) and (len(word)>2):
            # Use stemmer for words
            word = stemmer.stem(word)
            # Add the word as key and frequence as value
            if word not in word_freq:
                word_freq[word] = 1
            else:
                word_freq[word] += 1
        else :
            continue
    # return word_freq
    return word_freq