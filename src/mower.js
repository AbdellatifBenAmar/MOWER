const mowerConfig = {
    size: {
        x: 0,
        y: 0 
    },
    startPosition: {
        x: 0,
        y: 0,
        direction: null
    }
};

/* The rotation orientation rule : right of T[i] is T[i+1] */
const rotationRule = ['N', 'E', 'S', 'W'];

/* Local functions */
function getCurrentConfig() {
    return mowerConfig;
};

function setConfigOption(elementName, elementValue ) {
    //console.log('[setConfigOption]', elementName);
    mowerConfig[elementName] = elementValue;
}

function applyRotation (rotationDirection, currentDirection) {
    let index = (rotationRule.indexOf(currentDirection) + rotationDirection + rotationRule.length) % rotationRule.length;
    //console.log('[applyRotation]', rotationDirection, '::' , currentDirection, '=>', rotationRule[index]);
    return rotationRule[index];
}

function applyForward (currentPositionObj, currentDirection) {
    const config = getCurrentConfig();
    switch(currentDirection) {
        case 'N':
            if (currentPositionObj.y < config.size.y) {
                currentPositionObj.y ++;
            }
            break;
        case 'S':
                if (currentPositionObj.y > 0) {
                    currentPositionObj.y --;
                }
            break;
        case 'E':
            if (currentPositionObj.x < config.size.x) {
                currentPositionObj.x ++;
            }
            break;
        case 'W':
            if (currentPositionObj.x > 0 ) {
                    currentPositionObj.x --;
                }
            break;
        default:
            /* impossible case */
            console.log('undef move');
            break;
    }
    return currentPositionObj;
}

function applyMove (moveOperation, currentPositionObj) {
    const currentDirection = currentPositionObj.direction;
    switch (moveOperation) {
        case 'R':
            currentPositionObj.direction = applyRotation(1, currentDirection); 
            break;
        case 'L':
            currentPositionObj.direction = applyRotation(-1, currentDirection); 
            break;
        case 'F':
            currentPositionObj = applyForward(currentPositionObj, currentDirection);
            break;
        default:
            console.log('Indefined move ');
            return currentPositionObj;
    }
    //console.log('>>>>>>> position after move', JSON.stringify(currentPositionObj));
    return currentPositionObj;
}

/* Exported functions */
function initialisation(sizeStr, positionStr) {
    if (sizeStr.length && positionStr.length === 0) {
        return Promise.reject('WrongParam');
    }
    let words = sizeStr.split(' ');
    const size = {
        x: words[0],
        y: words[1]
    };
    words = positionStr.split(' ');
    const position = {
        x: words[0],
        y: words[1],
        direction: words[2]
    };
    if (position.x > size.x || position.y > size.y ) {
        return Promise.reject('WrongParam');
    }
    setConfigOption('size', size);
    setConfigOption('startPosition', position);
    return Promise.resolve(true);
};

function lunchSequence(moveSeq) {
    const str = moveSeq;
    if (str.replace(/L|R|F/g, '').length){
        return Promise.reject('WrongParam: Invalid Seq');
    }
    let position = getCurrentConfig().startPosition;
    for(let i = 0, len=moveSeq.length ; i < len; i++) {    
        position = applyMove(moveSeq[i], position);
    }
    const returnStr = `${position.direction} ${position.x} ${position.y}`;
    return Promise.resolve(returnStr);
};


module.exports = {
	initialisation,
    lunchSequence
};