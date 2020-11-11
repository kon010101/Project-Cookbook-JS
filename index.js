const url = window.location.pathname;
const filename = url.substring(url.lastIndexOf('/') + 1);

//load just if index.html
if (filename === 'index.html') {

    const mainCards = document.querySelectorAll('.main-card');

    // console.log(document.querySelector("./dinner.html #rec5"));

    mainCards.forEach((card, index) => {
        //EVENT mouse in
        card.addEventListener('mouseenter', () => {
            const listItems = document.querySelectorAll(`#card${index + 1} .recipe-list li`);
            //picture slides up
            document.querySelectorAll('.main-card .card-img-top')[index]
                .classList.add('card-img-move');
            document.querySelectorAll('.main-card ul')[index]
                .classList.remove('ul-hide');
            //text slides down
            document.querySelectorAll('.card-body')[index].style.transform = 'translateY(100%)';

            //animate li's
            listItems.forEach((item, ind) => {
                item.style.animation = `recipeListFade 0.5s ease forwards ${ind / 7 +0.2}s`;
            });

        });
    });
    
    mainCards.forEach((card,index) => {
        //EVENT mouse out
        card.addEventListener('mouseleave', () => {
            document.querySelectorAll('.main-card .card-img-top')[index]
                .classList.remove('card-img-move');
            document.querySelectorAll('.main-card ul')[index]
                .classList.add('ul-hide');

            document.querySelectorAll('.card-body')[index].style.transform = 'translateY(0)';
        });
    })

} else {
    ///////servings buttons
    //read in document elements for all +/- buttons
    const btnsLess = document.querySelectorAll('.btn-less-servings');
    const btnsMore = document.querySelectorAll('.btn-more-servings');

    const getNumOfServings = (tabNum) => {
        return document.querySelectorAll(".num-servings")[tabNum - 1].innerHTML;
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
        for (let i = 0; i < newAmounts.length; i++) {
            document.querySelectorAll(`#rec${tableNum} .table .data-amount`)[i].innerHTML = newAmounts[i];
        }
    }

    //events on btn click
    const less = () => {
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

        const newAmounts = calcAmounts(numOfServingsOld, actualNumOfServings, getAmounts(tabNum));
        setNewAmounts(newAmounts, tabNum);
    }

    const more = () => {
        //detect tab and get servings and Amount-array
        const tabNum = getNumOfTab();
        const numOfServingsOld = getNumOfServings(tabNum);
        let actualNumOfServings = numOfServingsOld;

        console.log("More");

        actualNumOfServings++;
        document.querySelectorAll(".num-servings")[tabNum - 1].innerHTML = actualNumOfServings;

        const newAmounts = calcAmounts(numOfServingsOld, actualNumOfServings, getAmounts(tabNum));
        setNewAmounts(newAmounts, tabNum);
    }

    //add eventlistener for every less-btn in the html
    btnsLess.forEach(btn => {
        btn.addEventListener('click', less);
    });

    //add eventlistener for every more-btn in the html
    btnsMore.forEach(btn => {
        btn.addEventListener('click', more);
    });

    ///////share buttons
    // Select all buttons

    const shareButtons = document.querySelectorAll('.share-btn');

    // Add eventlistener to all buttons
    shareButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const tabNum = getNumOfTab();
            const recipe = document.querySelector(`#rec${tabNum} h3`).innerText;
            alert(`Thank you for Sharing the ${recipe}!`);
        });
    });

}