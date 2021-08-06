/* Решаем задачу переселения душ из футурамы :-)*/
/* Релиз 1.0
        добавили комментарий
 */
function t(a, b){
    return {a:a, b:b};
}
transpositions = [  t(0, 1)
                    , t(0, 2)
                    , t(0, 3)
                    , t(1, 2)
                    , t(1, 3)
                    , t(2, 3)
                   ];


Object.clone = function(o2){
    if (o2 == null) return null;
    if (typeof(o2) != 'object') return o2;
    if (o2 instanceof Date) return new Date(o2);
    if (o2 instanceof Array) 
        var o = new Array();
    else 
        var o = {};

    for (x in o2 ){
        o[x] = Object.clone(o2[x]);
    }

    return o;
}


function man(body, mind){
    return {body:body, mind:mind};
}


var pos = { men:[ man("Бендер", "Бендер")
                , man("Профессор", "Профессор")
                , man("Лила", "Лила")
                , man("Фрай", "Фрай")
                ]
            , changes: []
           };


pos.checkChange = function (man1, man2){
    for (i in this.changes){
        if (this.changes[i].body1 == man1.body && this.changes[i].body2 == man2.body) return true;
        if (this.changes[i].body1 == man2.body && this.changes[i].body2 == man1.body) return true;
    }
    return false;
}

pos.change = function change(man1, man2){
    if (this.checkChange(man1, man2)) return;

    lMind = man1.mind;
    man1.mind = man2.mind;
    man2.mind = lMind;
    
    lChange = {body1:man1.body, body2:man2.body};
    this.changes.push(lChange);
};

pos.print = function(){
    WScript.echo('============');
    WScript.echo('man:');
    for(i in this.men){
        WScript.echo(this.men[i].body + " => " + this.men[i].mind);
    }
    WScript.echo('====');
    WScript.echo('changes:');
    for (i in this.changes){
        WScript.echo(this.changes[i].body1 + ' <=> ' + this.changes[i].body2);
    }
    WScript.echo('============');
};
pos.checkResult = function (){
    if (this.men[0].mind == "Бендер" 
        && this.men[1].mind == "Профессор"
        && this.men[2].mind == "Лила"
        && this.men[3].mind == "Фрай"
        ) return true;
    return false;
}

pos.change(pos.men[0], pos.men[1]);

stack = [];

stack.push(pos);

lDate = new Date();
while (stack.length > 0){
    lPos = stack.shift();

    if (lPos.checkResult()){
        lPos.print();
        break;
    }

    if (lPos.changes.length < 6){
        for (i in transpositions){
            var lNewPos = Object.clone(lPos);
            lMan1 = transpositions[i].a;
            lMan2 = transpositions[i].b;
            lNewPos.change(lNewPos.men[lMan1], lNewPos.men[lMan2]);
            stack.push(lNewPos);
        }
    }
}
