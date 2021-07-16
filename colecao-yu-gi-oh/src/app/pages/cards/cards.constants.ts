import { MonsterType, CardType } from "./cards.models";

export const CARD_TYPES = {
    [CardType.normal]: 'Normal',
    [CardType.effect] : 'Efeito',
    [CardType.ritual] : 'Ritual',
    [CardType.fusion] : 'Fusão',
    [CardType.synchro] : 'Sincro',
    [CardType.xyz] : 'XYZ',
    [CardType.pendulum] : 'Pêndulo',
    [CardType.link] : 'Link'
};

export const MONSTER_TYPES = {
    [MonsterType.fairy] : 'Fada',
    [MonsterType.water] : 'Água',
    [MonsterType.beast] : 'Besta',
    [MonsterType. warriorBeast] : 'Besta Guerreira',
    [MonsterType.dinossaur] : 'Dinossauro',
    [MonsterType.divineBeast] : 'Besta Divina',
    [MonsterType.dragon] : 'Dragão',
    [MonsterType.angel] : 'Anjo',
    [MonsterType.mage] : 'Mago',
    [MonsterType.demon] : 'Demônio',
    [MonsterType.fish] : 'Peixe',
    [MonsterType.bug] : 'Inseto',
    [MonsterType.machine] : 'Máquina',
    [MonsterType.plant] : 'Planta',
    [MonsterType.pyro] : 'Pyro',
    [MonsterType.reptile]: 'Réptil',
    [MonsterType.rock] : 'Rocha',
    [MonsterType.seaSerpent] : 'Serpente Marinha',
    [MonsterType.thunder] : 'Trovão',
    [MonsterType.warrior] : 'Guerreiro',
    [MonsterType.wingedBeast] : 'Besta Alada',
    [MonsterType.zumbi] : 'Zumbi',
    [MonsterType.psy] : 'Psíquico'
};