import time
from flask import Flask, request, jsonify, make_response
import nltk
from fileTookenizer import fileTookenizer
from dbHandler import save_text
from dbHandler import save_mots_uniques
from dbHandler import delete_all_tables
from dbHandler import search_word_db
from sqlalchemy import create_engine
from fileHandler import read_directory
import os

nltk.download('punkt')
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

# Configure the database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://tooken_user:password@localhost:5432/tp_tooken_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Initialize the database connection
db = SQLAlchemy(app)

# Define textes table model
class textesTable(db.Model):
    __tablename__ = 'textes'
    id = db.Column(db.Integer, primary_key=True)
    titre = db.Column(db.String(255))
    contenu = db.Column(db.String(255))

# Define mots_uniques table model
class motsUniquesTable(db.Model):
    __tablename__ = 'mots_uniques'
    id = db.Column(db.Integer, primary_key=True)
    mot = db.Column(db.String(255))


# Define frequences table model
class frequencesTable(db.Model):
    __tablename__ = 'frequences'
    id = db.Column(db.Integer, primary_key=True)
    texte_id = db.Column(db.Integer)
    mot_unique_id = db.Column(db.Integer)
    frequence = db.Column(db.Integer)



@app.route("/api/tokens", methods=['POST'])
def get_current_time():
    # Empty tables
    try :
        delete_all_tables(db,textesTable,frequencesTable,motsUniquesTable) 
    except Exception as e:
        print("Error in function delete_all_tables ",str(e))

    # Get the list of files with their contents and their paths 
    file_content_list = read_directory('./files')

    # For each file 
    for file in file_content_list :
        # Get the file path
        file_name = file["file_path"]
        # Get the file content
        text = file["content"]  
        # Text tookenization
        try :
            # Get the list of words with their frequences
            mot_freq = fileTookenizer(text) 
        except Exception as e:
            print("Error in function fileTookenizer ",str(e))

        try :
            # Save the text name in the data table 
            new_text_id = save_text(db,textesTable ,file_name)
        except Exception as e:
            print("Error in function save_text ",str(e))

        try :
            # Save words in the table mots_uniques + freqences
            resp = save_mots_uniques(db,motsUniquesTable,frequencesTable,mot_freq, new_text_id)
        except Exception as e:
            print("Error in function save_mots_uniques ",str(e))

    return mot_freq


# Search for word frequences
@app.route("/api/search_word", methods=['POST'])
def search_word():
    # Initialize text_freq
    text_freq =[]
    # Get the request body
    body = request.get_json()
    # Get the word to search 
    word_to_search = body["word"]
    try :
        # Search for word 
        text_freq = search_word_db(db,word_to_search) 
    except Exception as e:
        print("Error in function search_word ",str(e))

    return text_freq

    

if __name__ == "__main__" :
    app.run(debug=True)
