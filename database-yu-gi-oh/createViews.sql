CREATE OR REPLACE VIEW yugioh.all_cards (card_name, card_text, card_type) AS 
	SELECT monster_name, monster_text, 'MONSTER'
	FROM yugioh.monster_cards
	UNION ALL
	SELECT nm_name, nm_text, 'NON MONSTER'
	FROM yugioh.non_monster_cards;

CREATE OR REPLACE VIEW yugioh.ranking (points, duelist_name) AS 
	SELECT yugioh.duelistPoints(duelist_id) AS points, duelist_name
	FROM yugioh.duelists
	ORDER BY points DESC;