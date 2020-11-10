//read in document elements for all +/- buttons
const btnsLess = document.querySelectorAll('.btn-less-servings');
const btnsMore = document.querySelectorAll('.btn-more-servings');

const getNumOfServings = (tabNum) => {
    return document.querySelectorAll(".num-servings")[tabNum-1].innerHTML;
}

//detect tab
const getNumOfTab = () => {
    const currentTab = document.getElementsByClassName('nav-link active');
    const href = currentTab[0].href;
    const num = href.slice(href.length - 1);
    return num;
}

//get NodeArray and return amounts of units
const getAmounts = (tabNum) => {
    const amountNodes = document.querySelectorAll(`#rec${tabNum} .table .data-amount`);
    const amounts = Array.from(amountNodes, obj => obj.innerHTML);
    return amounts;
}

//calculate amounts
const calcAmounts = (oldServings, newServings, actualAmounts) => {
    const newAmounts = actualAmounts.map(amount => {
        return Number.parseFloat((amount / oldServings) * newServings).toFixed(2);
    });    
    return newAmounts;
}

//set new Amounts to dom elements
const setNewAmounts = (newAmounts, tableNum) => {
    for(let i = 0; i < newAmounts.length; i++) {
        document.querySelectorAll(`#rec${tableNum} .table .data-amount`)[i].innerHTML = newAmounts[i];
    }
}

//add eventlistener for every less-btn in the html
btnsLess.forEach(btn => {
    btn.addEventListener('click', e => less());
});

//add eventlistener for every more-btn in the html
btnsMore.forEach(btn => {
    btn.addEventListener('click', e => more());
});

//events on btn click
function less() {
    //detect tab and get servings and Amount-array
    const tabNum = getNumOfTab();
    const numOfServingsOld = getNumOfServings(tabNum);
    let actualNumOfServings = numOfServingsOld;

    if (actualNumOfServings > 1) {
        actualNumOfServings--;
        document.querySelectorAll(".num-servings")[tabNum - 1].innerHTML = actualNumOfServings;
    }
    else
        alert('You need to chose at least one serving!');

    const newAmounts = calcAmounts(numOfServingsOld, actualNumOfServings ,getAmounts(tabNum));
    setNewAmounts(newAmounts, tabNum);
}

function more() {
    //detect tab and get servings and Amount-array
    const tabNum = getNumOfTab();
    const numOfServingsOld = getNumOfServings(tabNum);
    let actualNumOfServings = numOfServingsOld;

    actualNumOfServings++;
    document.querySelectorAll(".num-servings")[tabNum - 1].innerHTML = actualNumOfServings;
    
    const newAmounts = calcAmounts(numOfServingsOld, actualNumOfServings, getAmounts(tabNum));
    setNewAmounts(newAmounts, tabNum);
}
