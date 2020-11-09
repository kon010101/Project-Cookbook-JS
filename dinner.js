//read in document elements
const btnsLess = document.querySelectorAll('.btn-less-servings');
const btnsMore = document.querySelectorAll('.btn-more-servings');
// let numOfServings = document.querySelector('#number-of-servings').innerHTML;

const getNumOfServings = (tabNum) => {
    return document.querySelector(`#number-of-servings${tabNum}`).innerHTML;
}

//detect tab
const getNumOfTab = () => {
    const currentTab = document.getElementsByClassName('nav-link active');
    const href = currentTab[0].href;
    const num = href.slice(href.length - 1);
    return num;
}

//get NodeArray
const getAmounts = (tabNum) => {
    const amountNodes = document.querySelectorAll(`#rec${tabNum} .table .data-amount`);
    const amounts = Array.from(amountNodes, obj => obj.innerHTML);
    return amounts;
}

//calculate amounts
const calcAmounts = (oldServings, newServings, actualAmounts) => {
    const newAmounts = actualAmounts.map(amount => {
        return (amount/oldServings)*newServings;
    });    
    return newAmounts;
}

console.log(document.querySelectorAll(`#rec${1} .table .data-amount`)[0].innerHTML);

//set new Amounts to dom elements
const setNewAmounts = (newAmounts, tableNum) => {
    for(let i = 0; i < newAmounts.length; i++) {
        document.querySelectorAll(`#rec${tableNum} .table .data-amount`)[i].innerHTML = newAmounts[i];
    }
}

btnsLess.forEach(btn => {
    btn.addEventListener('click', e => less());
});

btnsMore.forEach(btn => {
    btn.addEventListener('click', e => more());
});

function less() {
    //detect tab and get servings and Amount-array
    const tabNum = getNumOfTab();
    const numOfServingsOld = getNumOfServings(tabNum);
    let actualNumOfServings = numOfServingsOld;

    if (actualNumOfServings > 1) {
        actualNumOfServings--;
        document.querySelector(`#number-of-servings${tabNum}`).innerHTML = actualNumOfServings;
    }
    else
        alert('You need to chose at least one serving!');

    const newAmounts = calcAmounts(numOfServingsOld, actualNumOfServings ,getAmounts(tabNum));
    setNewAmounts(newAmounts, tabNum);
}

function more() {
    //detect tab and get servings and Amount-array
    const tabNum = getNumOfTab();
    console.log("num of tab: " + tabNum);
    const numOfServingsOld = getNumOfServings(tabNum);
    let actualNumOfServings = numOfServingsOld;

    actualNumOfServings++;
    document.querySelector(`#number-of-servings${tabNum}`).innerHTML = actualNumOfServings;
    
    const newAmounts = calcAmounts(numOfServingsOld, actualNumOfServings, getAmounts(tabNum));
    setNewAmounts(newAmounts, tabNum);
}
