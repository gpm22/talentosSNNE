export interface Card {
    id?: string; 
    name?: string;
    monsterType?: MonsterType;
    cardType?: CardType;
    level? : number;
    ATK? : number;
    DEF? : number;
    text?: string;
    img? : string;
}

export enum MonsterType {
    fairy = 'FADA',
    water = 'ÁGUA',
    beast = 'BESTA',
    warriorBeast = 'BESTA GUERREIRA',
    dinossaur = 'DINOSSAURO',
    divineBeast = 'BESTA DIVINA',
    dragon = 'DRAGÃO',
    angel = 'ANJO',
    mage = 'MAGO',
    demon = 'DEMÔNIO',
    fish = 'PEIXE',
    bug = 'INSETO',
    machine = 'MÁQUINA',
    plant = 'PLANTA',
    pyro = 'PYRO',
    reptile = 'RÉPTIL',
    rock = 'ROCHA',
    seaSerpent = 'SERPENTE MARINHA',
    thunder = 'TROVÃO',
    warrior = 'GUERREIRO',
    wingedBeast = 'BESTA ALADA',
    zumbi = 'ZUMBI',
    psy = 'PSÍQUICO'
}

export enum CardType {
    normal = 'NORMAL',
    effect = 'EFEITO',
    ritual = 'RITUAL',
    fusion = 'FUSÃO',
    synchro = 'SINCRO',
    xyz = 'XYZ',
    pendulum = 'PÊNDULO',
    link = 'LINK'
}