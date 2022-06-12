let ans = "";   //Screen Text
let errorSound = new Audio('Error Audio.mp3');

let button = document.querySelectorAll('.btn');
let arr = Array.from(button);   //Creating an array

//Looping inside the array
arr.forEach((button)=> 
{
    button.addEventListener('click', (e)=> 
    {
        // console.log(e.target.innerText);

        /* ERROR FUNCTION */
        function Error(str)
        {
            let error = false;
            let charArray = ['+', '-', '*', '/', '%', '.'];     //Array containing all the possibilities
            for(let i=0; i<str.length; i++)
            {
                ch1 = str.charAt(i);
                ch2 = str.charAt(i+1);

                if(charArray.includes(ch1) && charArray.includes(ch2))
                    error = true;
            }
            return error;
        }

        /* <---LOGIC STARTS HERE---> */
        let x = e.target.innerText;
        navigator.vibrate(25);  // For Vibration on mobile devices

        /* Changing Symbols */
        if(x == 'x')
            x = x.replace('x', '*');
        if(x == '÷')
            x = x.replace('÷', '/');

        switch(x) 
        {
            case '=':
                //If screen text includes decimal points
                if(x.includes('.'))
                {
                    ans = eval(ans).toFixed(2);
                    document.querySelector('#screen-element').innerText = ans;
                }
                //If screen text does not include decimal points
                else
                {
                    ans = eval(ans);
                    document.querySelector('#screen-element').innerText = ans;
                }
                break;
            
            case 'CLR':
                ans = "";
                document.querySelector('#screen-element').innerText = ans;
                break;
            
            case 'DEL':
                ans = ans.substring(ans.length-1, 0);
                document.querySelector('#screen-element').innerText = ans;
                break;

            default:
                ans = ans + x;
                document.querySelector('#screen-element').innerText = ans;

                /* Check for consecutive operators */
                if(Error(ans) === true)
                {
                    // <--- OPTION 1 --->
                    errorSound.play();
                    alert("You have made an Error!");
                    ans = ans.substring(ans.length-1, 0);
                    document.querySelector('#screen-element').innerText = ans;

                    // <--- OPTION 2 --->
                    /* 
                    ans = "Error!"
                    document.querySelector('#screen-element').innerText = ans;
                    ans = "";   //To remove the error message when any button is pressed 
                    */
                }
                break;
        }
    })
})