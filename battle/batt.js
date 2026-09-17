var heroes = [],
    monsters = []
    hClass = "hero",
    mClass = "mon";

function Unit(theName, theAtk, theDmgLow, theDmgHigh, theStr, theAC, theHP, theType) {
    this.name   = theName;
    this.atk    = Number(theAtk);
    this.dmg    = [Number(theDmgLow), Number(theDmgHigh)];
    this.strBon = Number(theStr);
    this.AC     = Number(theAC);
    this.maxHP  = Number(theHP);
    this.HP     = Number(theHP);
    this.type   = theType,
    this.id     = generateId();
    if (theType === hClass) {
        heroes.push(this);
    } else if (theType === mClass) {
        monsters.push(this);
    }
}

Unit.prototype = {
    constructor: Unit,
    setAtk: function (num)  {
        this.atk = num;
    },
    setDmg: function ([low, high])  {
        this.dmg = [low, high];
    },
    setDmgLow: function (num)  {
        this.dmg[0] = num;
    },
    setDmgHigh: function (num)  {
        this.dmg[1] = num;
    },
    setStrBon: function (num)  {
        this.strBon = num;
    },
    setAC: function (num)  {
        this.AC = num;
    },
    setHP: function (num)  {
        this.HP = num > this.maxHP ? this.maxHP : num;
    },
    getAtk: function () {
        return this.atk;
    },
    getDmg: function () {
        return this.dmg;
    },
    getStrBon: function () {
        return this.strBon;
    },
    getAC: function () {
        return this.AC;
    },
    getHP: function () {
        return this.HP;
    },
    getType: function () {
        return this.type;
    },
    getMaxHP: function () {
        return this.maxHP;
    },
    getId: function () {
        return this.id;
    },
    toHtml: function () {
        nl = "<br />";
        return '<div class="' + this.type + '">' +
                "Name: " + this.name + nl +
                "Attack: +" + this.atk + nl +
                "Damage: " + this.dmg[0] + "-" + this.dmg[1] + nl +
                "Str Bonus: " + this.strBon + nl +
                "AC: " + this.AC + nl +
                "HP: " + this.HP + "/" + this.maxHP + nl +
                '<input type="button" value="Remove ' + this.name + '" class="' + this.type + '" id="' + this.id + '" />' +
                "</div>";
    }
}

function generateId() {
    var now = new Date();
    return now.getTime();
}

function clearUnits(type) {
    if (type === hClass) {
        heros = [];
    } else if (type === mClass) {
        monsters = [];
    }    
}

function removeUnit(id, type) {
    var i = 0,
        arr = type === hClass ? this.heroes : type === mClass ? this.monsters : null,
        arrLen = arr.length;

    for (i; i < arrLen; i++) {
        if (arr[i].getId() == id) {
            arr.splice(i, 1);
            break;
        }
    }

}

