
import os


def table_data(MyTable):
    # Query the table
    data = MyTable.query.all()
    # Format the data
    formatted_data = []
    for row in data:
        formatted_data.append({
            'id': row.id,
            'titre': row.titre,
            'contenu': row.contenu
        })
    # Return the data as JSON
    return {'data': formatted_data}


def save_text(db,textes_table, titre):
    data = textes_table(titre=titre, contenu="")
    db.session.add(data)
    db.session.commit()
    # Return 
    return data.id


def save_mots_uniques(db,mots_uniques_table ,frequences_table,mot_freq_list, new_text_id):
    # Query the table
    data = mots_uniques_table.query.all()
    # # Format the data
    formatted_data = []
    existant_word_id = -1
    # print(mot_freq)
    for word, freq in mot_freq_list.items():
        # print(word, freq)
        for row in data :
            #   print(row.id)
            # print(word +" => "+ row.mot)
            if(word == row.mot):
                # print(" Word '"+word+"' Already exists ")
                existant_word_id = row.id
                break
            else :
                continue

        if(existant_word_id != -1):
            # Add the association between the word and frequences to frequences table
            new_row = frequences_table(texte_id=new_text_id, mot_unique_id=existant_word_id,frequence = freq)
            db.session.add(new_row)
            db.session.commit()
            existant_word_id = -1
            # print(" Element added succ to frequences table ",new_row.id)

        else : 
            # Add the new word to mots_uniques_table 
            nouveau_mot = mots_uniques_table(mot=word)
            db.session.add(nouveau_mot)
            db.session.commit()

            # Add the association between the word and frequences to frequences table
            new_row = frequences_table(texte_id=new_text_id, mot_unique_id=nouveau_mot.id, frequence = freq)
            db.session.add(new_row)
            db.session.commit()

    return {'Doc with id '+str(new_text_id)+' Indexed Successfully'}


def delete_all_tables(db,textes_table,frequences_table,mots_uniques_table):
    # Empty frequence table
    db.session.query(frequences_table).delete()
    db.session.commit()

    # Empty textes table
    db.session.query(textes_table).delete()
    db.session.commit()

    # Empty mots_uniques table
    db.session.query(mots_uniques_table).delete()
    db.session.commit()

    return 'All tables have been emptied!'

    
file_path = './files/'

def search_word_db(db,word):

    mot_response = []
    formatted_data = []
    # Stem the word before starting search 
    with db.engine.begin() as conn:
        mot_response = conn.exec_driver_sql(f"SELECT * FROM mots_uniques WHERE mots_uniques.mot = '{word}'").all()
    # The word doesn't exist in files 
    if(len(mot_response) == 0):
        return []
    else : 
        text_freq = []
        # Get the id of the word on table
        word_id = mot_response[0][0]
        # print(" Word id => ", word_id)
        with db.engine.begin() as conn:
            query = f"SELECT textes.titre, frequences.frequence FROM frequences INNER JOIN textes ON frequences.texte_id = textes.id WHERE frequences.mot_unique_id = '{word_id}'"
            text_freq = conn.exec_driver_sql(query).all()

        # Search the frequency of the appearence of the word in each file 
        for row in text_freq:
            with open(file_path+row[0], 'r') as f:
                formatted_data.append({
                    'texte_title': row[0],
                    'frequences': row[1],
                    'content': f.read(),
                })

        print(formatted_data)

    return formatted_data


