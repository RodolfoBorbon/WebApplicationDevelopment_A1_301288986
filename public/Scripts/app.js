/*
File name: app.js
Student’s Name: Rodolfo Borbon
StudentID: 301288986
Date: June 04, 2023
 */

//IIFE -- immediately Invoked Function Expression
(function(){
    function Start()
    {
        console.log("App Started...");

        //Confirm Delete contact functionality
        let deleteButtons = document.querySelectorAll('.btn-danger')

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign('/contacts-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);
})();