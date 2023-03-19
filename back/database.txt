CREATE TABLE textes (
  id SERIAL PRIMARY KEY,
  titre TEXT NOT NULL,
  contenu TEXT NOT NULL
);

CREATE TABLE mots_uniques (
  id SERIAL PRIMARY KEY,
  mot TEXT NOT NULL UNIQUE
);

CREATE TABLE frequences (
  id SERAIL PRIMARY KEY,
  texte_id INTEGER NOT NULL,
  mot_unique_id INTEGER NOT NULL,
  frequence INTEGER NOT NULL,
  FOREIGN KEY (texte_id) REFERENCES textes(id),
  FOREIGN KEY (mot_unique_id) REFERENCES mots_uniques(id)
);


CREATE USER tooken_user;

GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE textes TO tooken_user;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE frequences TO tooken_user;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE mots_uniques TO tooken_user;
