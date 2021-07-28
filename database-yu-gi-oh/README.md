# Banco de Dados Para um Jogo de Yu-Gi-Oh!

## Descrição

​	O presente projeto é um banco de dados para um jogo de Yu-Gi-Oh!. O presente documento contém os comandos SQL utilizados na criação de todas as entidades utilizadas e imagem mostrando a relação entre essas entidades.

## Schema

* Comando para a criação do schema utilizado nesse projeto:

  ```sql
  CREATE SCHEMA IF NOT EXISTS yugioh AUTHORIZATION postgres;
  ```

  

## Tabelas:

![entidades](https://github.com/gpm22/talentosSNNE/blob/master/database-yu-gi-oh/entities.png?raw=true)

* Comando para criar a tabela para duelistas:

  ```sql
  CREATE TABLE yugioh.duelists (
  	duelist_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	duelist_login VARCHAR(20) NOT NULL UNIQUE,
  	duelist_name VARCHAR(50) NOT NULL,
  	duelist_cpf CHAR(14) NOT NULL UNIQUE,
  	duelist_password VARCHAR(20) NOT NULL,
  	duelist_victories INTEGER NOT NULL DEFAULT 0,
      duelist_defeats INTEGER NOT NULL DEFAULT 0
  );
  ```

  

* Comando para criar a tabela para cartas de monstros:

  ```sql
  CREATE TYPE yugioh.monsterType AS ENUM('FAIRY', 'WATER', 'BEAST', 'WARRIOR BEAST', 'DINOSSAUR', 'DIVINE BEAST', 'DRAGON', 'ANGEL', 'MAGE', 'DEMON', 'FISH', 'BUG', 'MACHINE', 'PLANT', 'PYRO', 'REPTILE', 'ROCK', 'SEA SERPENT', 'THUNDER', 'WARRIOR', 'WINGED BEAST', 'ZUMBI', 'PSY');
  
  CREATE TYPE yugioh.cardType AS ENUM('NORMAL', 'EFFECT', 'RITUAL', 'FUSION', 'SYNCHRO', 'XYZ', 'PENDULUM', 'LINK');
  
  CREATE TYPE yugioh.monsterAttribute AS ENUM('DARK', 'DIVINE', 'EARTH', 'FIRE', 'LIGHT', 'WATER', 'WIND');
  
  CREATE TABLE yugioh.monster_cards (
  	monster_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	monster_name VARCHAR(50) NOT NULL,
  	monster_type yugioh.monsterType NOT NULL,
  	card_type yugioh.cardType NOT NULL,
  	monster_attribute yugioh.monsterAttribute NOT NULL, 
  	monster_level INTEGER NOT NULL,
  	monster_ATK CHAR(4) NOT NULL,
  	monster_DEF CHAR(4) NOT NULL,
  	monster_text TEXT NOT NULL,
  	monster_img_URL VARCHAR(255) NOT NULL DEFAULT 'empty'	
  );
  ```

* Comando para criar a tabela que faz a relação many to many entre os duelistas e as cartas de monstros:

  ```sql
  CREATE TABLE yugioh.duelists_monster_cards (
  	duelist_id INTEGER REFERENCES yugioh.duelists (duelist_id) ON UPDATE CASCADE ON DELETE CASCADE, 
  	monster_id INTEGER REFERENCES yugioh.monster_cards (monster_id) ON UPDATE CASCADE,
  	monster_amount INTEGER NOT NULL DEFAULT 1,
  	CONSTRAINT dulists_monsters_PK PRIMARY KEY (duelist_id, monster_id)
  );
  ```
  
* Comando para criar a tabela para cartas que não são monstros, isto é, cartas de feitiço e armadilha:

  ```sql
  CREATE TYPE yugioh.nmCardType AS ENUM('SPELL', 'TRAP');
  
  CREATE TABLE yugioh.non_monster_cards (
  	nm_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  	nm_name VARCHAR(50) NOT NULL,
  	nm_type yugioh.nmCardType NOT NULL,
  	nm_text TEXT NOT NULL,
  	nm_img_URL VARCHAR(255) NOT NULL 	
  );
  ```

* Comando para criar a tabela que faz a relação many to many entre os duelistas e as cartas que não são monstros:

  ```sql
  CREATE TABLE yugioh.duelists_non_monster_cards (
  	duelist_id INTEGER REFERENCES yugioh.duelists (duelist_id) ON UPDATE CASCADE ON DELETE CASCADE, 
  	nm_id INTEGER REFERENCES yugioh.non_monster_cards (nm_id) ON UPDATE CASCADE,
  	nm_amount INTEGER NOT NULL DEFAULT 1,
  	CONSTRAINT duelists_non_monsters_PK PRIMARY KEY (duelist_id, nm_id)
  );
  ```

* Comando para criar a tabela decks:

  ```sql
  CREATE TABLE yugioh.decks (
      deck_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      duelist_id INTEGER REFERENCES yugioh.duelists (duelist_id) ON UPDATE CASCADE ON DELETE CASCADE, 
      deck_name VARCHAR(50) NOT NULL
  );
  ```

* Comando para criar a tabela que faz a relação many to many entre os decks e as cartas de monstros:

  ```sql
  CREATE TABLE yugioh.decks_monster_cards (
  	deck_id INTEGER REFERENCES yugioh.decks (deck_id) ON UPDATE CASCADE ON DELETE CASCADE, 
  	monster_id INTEGER REFERENCES yugioh.monster_cards (monster_id) ON UPDATE CASCADE,
  	monster_amount INTEGER NOT NULL DEFAULT 1,
  	CONSTRAINT decks_monsters_PK PRIMARY KEY (deck_id, monster_id)
  );
  ```

* Comando para criar a tabela que faz a relação many to many entre os decks e as cartas que não são monstros:

  ```sql
  CREATE TABLE yugioh.decks_non_monster_cards (
  	deck_id INTEGER REFERENCES yugioh.decks (deck_id) ON UPDATE CASCADE ON DELETE CASCADE, 
  	nm_id INTEGER REFERENCES yugioh.non_monster_cards (nm_id) ON UPDATE CASCADE,
  	nm_amount INTEGER NOT NULL DEFAULT 1,
  	CONSTRAINT decks_non_monsters_PK PRIMARY KEY (deck_id, nm_id)
  );
  ```

* Comando para criar a tabela de partidas:

  ```sql
  CREATE TABLE yugioh.matches (
      match_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      duelist_1_id INTEGER REFERENCES yugioh.duelists (duelist_id) ON UPDATE CASCADE,
      duelist_2_id INTEGER REFERENCES yugioh.duelists (duelist_id) ON UPDATE CASCADE,
      winner_id INTEGER,
      defeated_id INTEGER 
  );
  ```

* Comando para criar a tabela de turnos:

  ```sql
  CREATE TABLE yugioh.rounds (
      round_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      active_duelist_id INTEGER REFERENCES yugioh.duelists (duelist_id) ON UPDATE CASCADE,
      passive_duelist_id INTEGER REFERENCES yugioh.duelists (duelist_id) ON UPDATE CASCADE,
      match_id INTEGER REFERENCES yugioh.matches (match_id) ON UPDATE CASCADE ON DELETE CASCADE,
      round_number INTEGER NOT NULL DEFAULT 1,
      active_duelist_actions TEXT NOT NULL DEFAULT ' ',
      life_points_active_duelist INTEGER NOT NULL DEFAULT 8000,
      life_points_passive_duelist INTEGER NOT NULL DEFAULT 8000
  );
  ```

* Conexões no DBeaver:

  ![entidades_dBeaver](https://github.com/gpm22/talentosSNNE/blob/master/database-yu-gi-oh/entities_dBeaver.png?raw=true)

## Índices

* Foram criados 2 índices para facilitar buscar:

  1. Cartas pelo Nome;

     ```sql
     CREATE UNIQUE INDEX monster_name_idx ON yugioh.monster_cards (monster_name);
     CREATE UNIQUE INDEX non_monster_name_idx ON yugioh.non_monster_cards (nm_name);
     ```

  2. Duelistas pelo login:

     ```sql
     CREATE UNIQUE INDEX duelist_login_idx ON yugioh.duelists (duelist_login);
     ```

## Stored Procedures

* salvar duelista

  ```sql
  CREATE OR REPLACE PROCEDURE yugioh.saveDuelist (login TEXT, name TEXT, cpf TEXT, duelist_password TEXT)
  LANGUAGE plpgsql
  AS $$
  BEGIN
  	IF (yugioh.validatecpf(cpf)) THEN
          INSERT INTO yugioh.duelists(duelist_login, duelist_name, duelist_cpf, duelist_password)
          VALUES (login, name, cpf, duelist_password);
      END IF;
  END
  $$;
  ```

* salvar cartas de monstro

  ```sql
  CREATE OR REPLACE PROCEDURE yugioh.saveMonsterCard (m_name TEXT, m_type yugioh.monsterType, c_type yugioh.cardType, m_attribute yugioh.monsterAttribute, m_level INTEGER, m_ATK TEXT, m_DEF TEXT, m_text TEXT, m_img_URL TEXT)
  LANGUAGE plpgsql
  AS $$
  BEGIN
      INSERT INTO yugioh.monster_cards(monster_name, monster_type, card_type, monster_attribute, monster_level, monster_ATK, monster_DEF, monster_text, monster_img_URL)
      VALUES (m_name, m_type, c_type, m_attribute, m_level, m_ATK, m_DEF, m_text, m_img_URL);
  END
  $$;
  ```

* salvar cartas que não são monstros:

  ```sql
  CREATE OR REPLACE PROCEDURE yugioh.saveNonMonsterCard (n_name TEXT, n_type yugioh.nmCardType, n_text TEXT, n_img_URL TEXT)
  LANGUAGE plpgsql
  AS $$
  BEGIN
      INSERT INTO yugioh.non_monster_cards(nm_name, nm_type, nm_text, nm_img_URL)
      VALUES (n_name, n_type, n_text, n_img_URL);
  END
  $$;
  ```

* Salvar deck

  ```sql
  CREATE OR REPLACE PROCEDURE yugioh.saveDeck (d_id INTEGER, d_name TEXT)
  LANGUAGE plpgsql
  AS $$
  BEGIN
      INSERT INTO yugioh.decks(duelist_id, deck_name)
      VALUES (d_id, d_name);
  END
  $$;
  ```

* iniciar partida

  ```sql
  CREATE OR REPLACE PROCEDURE yugioh.startMatch (id_1 INTEGER, id_2 INTEGER)
  LANGUAGE plpgsql
  AS $$
  BEGIN
      INSERT INTO yugioh.matches(duelist_1_id, duelist_2_id)
      VALUES (id_1, id_2);
  END
  $$;
  ```

* iniciar turno;

  ```sql
  CREATE OR REPLACE PROCEDURE yugioh.startRound (active_id INTEGER, passive_id INTEGER, m_id INTEGER)
  LANGUAGE plpgsql
  AS $$
  BEGIN
      INSERT INTO yugioh.rounds(active_duelist_id, passive_duelist_id, match_id)
      VALUES (active_id, passive_id, m_id);
  END
  $$;
  ```

## Funções

* Retornar pontuação de um usuário;

  ```sql
  CREATE OR REPLACE FUNCTION yugioh.duelistPoints (d_id INTEGER) RETURNS INT
  AS $$
  	DECLARE
  		victories INTEGER;
  		defeats INTEGER;
  	BEGIN
  		SELECT INTO victories duelist_victories
  		FROM yugioh.duelists
  		WHERE duelist_id = d_id;
  		
  		SELECT INTO defeats duelist_defeats
  		FROM yugioh.duelists
  		WHERE duelist_id = d_id;
  		
  		RETURN victories*100 - defeats*50;
  	END;
  $$ LANGUAGE plpgsql;
  ```

  

* Validar CPF;

  ```sql
  CREATE OR REPLACE FUNCTION yugioh.validateCPF(cpf TEXT) RETURNS BOOLEAN
  AS $$
  	BEGIN
  		RETURN cpf SIMILAR TO '[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}';
  	END;
  $$ LANGUAGE plpgsql;
  ```

  

## View

* View contendo todas as cartas:

  ```sql
  CREATE OR REPLACE VIEW yugioh.all_cards (card_name, card_text, card_type) AS 
  	SELECT monster_name, monster_text, 'MONSTER'
  	FROM yugioh.monster_cards
  	UNION ALL
  	SELECT nm_name, nm_text, 'NON MONSTER'
  	FROM yugioh.non_monster_cards;
  ```

  

* View contendo um ranking dos duelistas:

  ```sql
  CREATE OR REPLACE VIEW yugioh.ranking (points, duelist_name) AS 
  	SELECT yugioh.duelistPoints(duelist_id) AS points, duelist_name
  	FROM yugioh.duelists
  	ORDER BY points DESC;
  ```

