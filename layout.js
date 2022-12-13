const movButtonsInnerHtml = {
    'btn-left': '<div class="btn-left btn-action-movement btn-cloned" draggable="true"><i class="fa fa-arrow-left"></i></div>',
    'btn-right': '<div class="btn-right btn-action-movement btn-cloned" draggable="true"><i class="fa fa-arrow-right"></i></div>',
    'btn-up': '<div class="btn-up btn-action-movement btn-cloned" draggable="true"><i class="fa fa-arrow-up"></i></div>',
    'btn-down': '<div class="btn-down btn-action-movement btn-cloned" draggable="true"><i class="fa fa-arrow-down"></i></div>',
    'btn-eat': '<div class="btn-eat btn-action-movement btn-cloned" draggable="true"><i class="fa fa-cutlery"></i></i></div>',
    'btn-f1': '<div class="btn-f1 btn-action-movement btn-cloned" draggable="true"><span>F1</span></i></div>',
    'btn-f2': '<div class="btn-f2 btn-action-movement btn-cloned" draggable="true"><span>F2</span></i></div>'
}

const actionsDefault = {
    'p1': null,
    'p2': null,
    'p3': null,
    'p4': null,
    'p5': null,
    'p6': null,
    'p7': null,
    'p8': null,
    'p9': null,
    'p10': null,
};

let actionList = {
    'p1': null,
    'p2': null,
    'p3': null,
    'p4': null,
    'p5': null,
    'p6': null,
    'p7': null,
    'p8': null,
    'p9': null,
    'p10': null,
};

let function1Actions = {
    'p1': null,
    'p2': null,
    'p3': null,
    'p4': null,
    'p5': null,
    'p6': null,
    'p7': null,
    'p8': null,
    'p9': null,
    'p10': null,
};

let function2Actions = {
    'p1': null,
    'p2': null,
    'p3': null,
    'p4': null,
    'p5': null,
    'p6': null,
    'p7': null,
    'p8': null,
    'p9': null,
    'p10': null,
};

let clonedDataElementMoving = null;
let clonedIconElementMoving = null;

const playButton = document.querySelector('.btn-action-play-play');
playButton.addEventListener('click', () => {
    console.log('start game')
})

const restartButton = document.querySelector('.btn-action-play-restart');
restartButton.addEventListener('click', () => {
    console.log('restart all')
    actionList = actionsDefault;
    function1Actions = actionsDefault;
    function2Actions = actionsDefault;
})

document.querySelectorAll('.btn-action-movement').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

document.querySelectorAll('.btn-action-movement-placeholder').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

function dragOver(e) {
    if(e.currentTarget.querySelector('.btn-action-movement') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}

function drop(e) {
    if(e.currentTarget.querySelector('.btn-action-movement') === null) {
        e.currentTarget.classList.remove('hover');

        let location;
        let data;
        let position;

        let clonedItem = document.querySelector('.btn-action-movement.dragging-cloned');
        if (clonedItem) {
            location = e.currentTarget.parentElement.classList.value.split(' ')[0];
            data = document.querySelector('.btn-action-movement.dragging-cloned').classList[0];
            position = e.currentTarget.classList.value.split(' ')[0];
            e.currentTarget.appendChild(clonedItem.parentElement)
        } else {
            location = e.currentTarget.parentElement.classList.value.split(' ')[0];
            data = document.querySelector('.btn-action-movement.dragging').classList[0];
            position = e.currentTarget.classList.value.split(' ')[0];

            const newMovBtn = document.createElement('div');
            newMovBtn.innerHTML = movButtonsInnerHtml[data]
    
            newMovBtn.addEventListener('dragstart', dragStartCloned);
            newMovBtn.addEventListener('dragend', dragEndCloned);
    
            e.currentTarget.appendChild(newMovBtn);
        }

        updateAreas(location, position, data);
    }
}

function dragStartCloned(e) {
    e.currentTarget.firstChild.classList.add('dragging-cloned');
    clonedIconElementMoving = e.currentTarget.firstChild;

    clonedDataElementMoving = {
        oldLoacation: e.currentTarget.parentElement.parentElement.classList.value.split(' ')[0],
        oldPosition: e.currentTarget.parentElement.classList.value.split(' ')[0]
    }
}

function dragEndCloned(e) {
    e.currentTarget.firstChild.classList.remove('dragging-cloned');
    clonedIconElementMoving.classList.remove('delete')
}

document.querySelectorAll('.box').forEach(droppableArea => {
    droppableArea.addEventListener('dragover', dragoverDelete)
    droppableArea.addEventListener('dragleave', dragLeaveDelete);
    droppableArea.addEventListener('drop', dropDelete);
})

function dragoverDelete(e) {
    e.preventDefault()
    if(clonedIconElementMoving) {
        if (e.currentTarget.querySelector('.placeholders')?.classList.value.split(' ')[0] 
            !== clonedDataElementMoving.oldLoacation
            && e.target.classList.value.split(' ')[1] !== 'btn-action-movement-placeholder') {
                clonedIconElementMoving.classList.add('delete')
        } else {
            clonedIconElementMoving.classList.remove('delete')
        }
    }
}

function dragLeaveDelete(e) {
    // ...
}

function dropDelete(e) {
    console.log(e.target.classList.value.split(' ')[1] === 'btn-action-movement-placeholder')
    if (clonedDataElementMoving?.oldLoacation !== 
        e.currentTarget.querySelector('.placeholders')?.classList.value.split(' ')[0]
        && e.target.classList.value.split(' ')[1] !== 'btn-action-movement-placeholder') {
        if (clonedIconElementMoving) {
            clonedIconElementMoving.parentElement.remove(clonedIconElementMoving)
            updateAreas('', '', '')
        }
    }
}

function updateAreas(location, position, data) {
    if (location === 'function-1') function1Actions[position] = data.split('-')[1];
    if (location === 'function-2') function2Actions[position] = data.split('-')[1];
    if (location === 'action-list') actionList[position] = data.split('-')[1];


    if (clonedDataElementMoving) {
        if (clonedDataElementMoving.oldLoacation === 'function-1') function1Actions[clonedDataElementMoving.oldPosition] = null;
        if (clonedDataElementMoving.oldLoacation === 'function-2') function2Actions[clonedDataElementMoving.oldPosition] = null;
        if (clonedDataElementMoving.oldLoacation === 'action-list') actionList[clonedDataElementMoving.oldPosition] = null;
    }
    clonedDataElementMoving = null;

    if (Object.values(actionList).some((item) => item !== null)) {
        playButton.removeAttribute('disabled')
        playButton.style.cursor = 'pointer'
        playButton.classList.remove('disabled')
    } else {
        playButton.setAttribute('disabled', 'disabled')
        playButton.style.cursor = 'not-allowed'
        playButton.classList.add('disabled')
        restartButton.setAttribute('disabled', 'disabled')
        restartButton.style.cursor = 'not-allowed'
        restartButton.classList.add('disabled')
    }

    if (Object.values(actionList).some((item) => item !== null)
        || Object.values(function1Actions).some((item) => item !== null)
        || Object.values(function2Actions).some((item) => item !== null)) {
        restartButton.removeAttribute('disabled')
        restartButton.style.cursor = 'pointer'
        restartButton.classList.remove('disabled')
    }

    // console.log(clonedDataElementMoving)
    console.log('f1', function1Actions)
    console.log('f2', function2Actions)
    console.log('al', actionList)
    console.log('-'.repeat(50))
}
