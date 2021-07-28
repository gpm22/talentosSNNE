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



CREATE OR REPLACE FUNCTION yugioh.validateCPF(cpf TEXT) RETURNS BOOLEAN
AS $$
	BEGIN
		RETURN cpf SIMILAR TO '[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}';
	END;
$$ LANGUAGE plpgsql;


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

CREATE OR REPLACE PROCEDURE yugioh.saveMonsterCard (m_name TEXT, m_type yugioh.monsterType, c_type yugioh.cardType, m_attribute yugioh.monsterAttribute, m_level INTEGER, m_ATK TEXT, m_DEF TEXT, m_text TEXT, m_img_URL TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO yugioh.monster_cards(monster_name, monster_type, card_type, monster_attribute, monster_level, monster_ATK, monster_DEF, monster_text, monster_img_URL)
    VALUES (m_name, m_type, c_type, m_attribute, m_level, m_ATK, m_DEF, m_text, m_img_URL);
END
$$;

CREATE OR REPLACE PROCEDURE yugioh.saveNonMonsterCard (n_name TEXT, n_type yugioh.nmCardType, n_text TEXT, n_img_URL TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO yugioh.non_monster_cards(nm_name, nm_type, nm_text, nm_img_URL)
    VALUES (n_name, n_type, n_text, n_img_URL);
END
$$;

CREATE OR REPLACE PROCEDURE yugioh.saveDeck (d_id INTEGER, d_name TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO yugioh.decks(duelist_id, deck_name)
    VALUES (d_id, d_name);
END
$$;

CREATE OR REPLACE PROCEDURE yugioh.startMatch (id_1 INTEGER, id_2 INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO yugioh.matches(duelist_1_id, duelist_2_id)
    VALUES (id_1, id_2);
END
$$;

CREATE OR REPLACE PROCEDURE yugioh.startRound (active_id INTEGER, passive_id INTEGER, m_id INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO yugioh.rounds(active_duelist_id, passive_duelist_id, match_id)
    VALUES (active_id, passive_id, m_id);
END
$$;
