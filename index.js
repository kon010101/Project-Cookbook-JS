// Select all buttons

const shareButtons = document.querySelectorAll('.share-btn');

// Add eventlistener to all buttons
shareButtons.forEach( ( button) => {
    button.addEventListener ('click', ( ) => {
        alert('Thank you for Sharing' ) ;
    });
});

