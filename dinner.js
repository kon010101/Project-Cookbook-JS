//read in document elements
const btnLess = document.querySelector('#btn-less-servings');
const btnMore = document.querySelector('#btn-more-servings');
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
const calcAndSetAmounts = (oldServings, newServings, actualAmounts) => {

}

btnLess.onclick = e => {
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

    calcAndSetAmounts(numOfServingsOld, actualNumOfServings ,getAmounts(tabNum));
}

btnMore.onclick = e => {
    numOfServings++;
    document.querySelector('#number-of-servings').innerHTML = numOfServings;
    // console.log(amount1[0].innerHTML);
    console.log(amounts);

}

//1. initialize - set variables to default on load up

//2. btn does it all (the buttons detect the tab and set the "servingsvariable" to servings displayed in 
//current tab and the amounts to displayed amounts in current tab)

//3. add 1 / or minus 1

//4. calculate array with foreach