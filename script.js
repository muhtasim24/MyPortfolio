let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active')
}

function sendMail(){
    var body = document.getElementById('message').value;
    var subject = document.getElementById('subject').value;
    var name = document.getElementById('name').value;
    var number = document.getElementById('number').value;
    var email = document.getElementById('email').value;

    window.location.href = "mailto:muhtasim01@gmail.com"
    + "?from=" + encodeURIComponent(email)
    + "&subject=" + encodeURIComponent(subject)
    + "&body=" 
    + encodeURIComponent("Email: " + email + "\nName: " + name + "\nPhone Number: " + number + "\n\n" + body);
}

function readMore(){
    var moreText = document.getElementById('read-more');
    var readBtn = document.getElementById('readBtn');

    if (readBtn.innerHTML === "Read More"){
        moreText.style.display = "inline";
        readBtn.innerHTML = "Read Less";
    }
    else {
        readBtn.innerHTML = "Read More";
        moreText.style.display = "none";
    }
    
}