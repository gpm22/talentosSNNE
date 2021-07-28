CREATE SCHEMA IF NOT EXISTS yugioh AUTHORIZATION postgres;

CREATE TABLE yugioh.duelists (
	duelist_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	duelist_login VARCHAR(20) NOT NULL UNIQUE,
	duelist_name VARCHAR(50) NOT NULL,
	duelist_cpf CHAR(14) NOT NULL UNIQUE,
	duelist_password VARCHAR(20) NOT NULL,
	duelist_victories INTEGER NOT NULL DEFAULT 0,
    	duelist_defeats INTEGER NOT NULL DEFAULT 0
);

CREATE UNIQUE INDEX duelist_login_idx ON yugioh.duelists (duelist_login);

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

CREATE UNIQUE INDEX monster_name_idx ON yugioh.monster_cards (monster_name);



CREATE TABLE yugioh.duelists_monster_cards (
	duelist_id INTEGER REFERENCES yugioh.duelists (duelist_id) ON UPDATE CASCADE ON DELETE CASCADE, 
	monster_id INTEGER REFERENCES yugioh.monster_cards (monster_id) ON UPDATE CASCADE,
	monster_amount INTEGER NOT NULL DEFAULT 1,
	CONSTRAINT dulists_monsters_PK PRIMARY KEY (duelist_id, monster_id)
);




CREATE TYPE yugioh.nmCardType AS ENUM('SPELL', 'TRAP');

CREATE TABLE yugioh.non_monster_cards (
	nm_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nm_name VARCHAR(50) NOT NULL,
	nm_type yugioh.nmCardType NOT NULL,
	nm_text TEXT NOT NULL,
	nm_img_URL VARCHAR(255) NOT NULL 	
);

CREATE UNIQUE INDEX non_monster_name_idx ON yugioh.non_monster_cards (nm_name);


CREATE TABLE yugioh.duelists_non_monster_cards (
	duelist_id INTEGER REFERENCES yugioh.duelists (duelist_id) ON UPDATE CASCADE ON DELETE CASCADE, 
	nm_id INTEGER REFERENCES yugioh.non_monster_cards (nm_id) ON UPDATE CASCADE,
	nm_amount INTEGER NOT NULL DEFAULT 1,
	CONSTRAINT duelists_non_monsters_PK PRIMARY KEY (duelist_id, nm_id)
);

CREATE TABLE yugioh.decks (
    deck_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    duelist_id INTEGER REFERENCES yugioh.duelists (duelist_id) ON UPDATE CASCADE ON DELETE CASCADE, 
    deck_name VARCHAR(50) NOT NULL
);

CREATE TABLE yugioh.decks_monster_cards (
	deck_id INTEGER REFERENCES yugioh.decks (deck_id) ON UPDATE CASCADE ON DELETE CASCADE, 
	monster_id INTEGER REFERENCES yugioh.monster_cards (monster_id) ON UPDATE CASCADE,
	monster_amount INTEGER NOT NULL DEFAULT 1,
	CONSTRAINT decks_monsters_PK PRIMARY KEY (deck_id, monster_id)
);

CREATE TABLE yugioh.decks_non_monster_cards (
	deck_id INTEGER REFERENCES yugioh.decks (deck_id) ON UPDATE CASCADE ON DELETE CASCADE, 
	nm_id INTEGER REFERENCES yugioh.non_monster_cards (nm_id) ON UPDATE CASCADE,
	nm_amount INTEGER NOT NULL DEFAULT 1,
	CONSTRAINT decks_non_monsters_PK PRIMARY KEY (deck_id, nm_id)
);

CREATE TABLE yugioh.matches (
    match_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    duelist_1_id INTEGER REFERENCES yugioh.duelists (duelist_id) ON UPDATE CASCADE,
    duelist_2_id INTEGER REFERENCES yugioh.duelists (duelist_id) ON UPDATE CASCADE,
    winner_id INTEGER,
    defeated_id INTEGER 
);

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