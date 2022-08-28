// animated header
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('text-enter');
      }
    });
  });
  
  observer.observe(document.querySelector('.animated-text1'));
  observer.observe(document.querySelector('.animated-text2'));
  observer.observe(document.querySelector('.animated-text3'));

//animate profile
const observer1 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('profile-enter');
    }
  });
});

observer1.observe(document.querySelector('.profile'));

// firebase
const firebaseConfig = {
    apiKey: "AIzaSyB7uBBFhNrRIeRZUkM39ueDA9f9EgQTqMU",
    authDomain: "project-fe-599b1.firebaseapp.com",
    projectId: "project-fe-599b1",
    storageBucket: "project-fe-599b1.appspot.com",
    messagingSenderId: "66189429366",
    appId: "1:66189429366:web:524d974ff1febeb3b2ed57",
    measurementId: "G-YT3LENY9EY"
  };

firebase.initializeApp(firebaseConfig); //harus initialize dulu
const db = firebase.firestore(); //dibuat const biar bisa di panggil lg
let formCollect = db.collection("contactus"); //ngambil collection

var contactus = [];

function init() {
  formCollect.get().then((response) => {
    response.docs.forEach((item) => {
      contactus.push(item);
    });
  });
}

//validation
$('#contact-form').submit(function(e){
    //empty
    if ($('#inputEmail').val()==='') {
        e.preventDefault();
        $('#err-msg').text('Email must not be empty!');
    }
    else if ($('#inputFullName').val()==='') {
        e.preventDefault();
        $('#err-msg').text('Full name must not be empty!');
    }
    else if ($('#inputPhone').val()==='') {
        e.preventDefault();
        $('#err-msg').text('Phone number must not be empty!');
    }
    else if ($('#inputComment').val()==='') {
        e.preventDefault();
        $('#err-msg').text('Comment must not be empty!');
    }

    //email
    else if (!$('#inputEmail').val().includes("@")) {
        e.preventDefault();
        $('#err-msg').text('Email must include @!');
    }

    //phone number
    else if ($('#inputPhone').val().length>14) {
        e.preventDefault();
        $('#err-msg').text('Phone number must not exceed 14 digits!');
    }
    else if (!$('#inputPhone').val().startsWith('08')) {
        e.preventDefault();
        $('#err-msg').text('Phone number must start with 08!');
    }

    //comment
    else if ($('#inputComment').val().split(' ').length<5 || $('#inputComment').val().split(' ').length>100) {
        e.preventDefault();
        $('#err-msg').text('Comment must be between 5-100 words!');
    }

    else{
      e.preventDefault();
      const fullname = $("#inputFullName").val();
      const email = $("#inputEmail").val();
      const phone = $("#inputPhone").val();
      const comment = $("#inputComment").val();
  
      let newForm = {
        fullname: fullname,
        email: email,
        phone: phone,
        comment: comment
      }
  
      formCollect
      .add(newForm)
      .then((response) => response.get());
      $('#err-msg').text('Successfully submitted!');
      $("#inputFullName").val("");
      $("#inputEmail").val("");
      $("#inputPhone").val("");
      $("#inputComment").val("");
    }
});

$(document).ready(function () {
    init();
  });