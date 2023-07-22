$(document).ready(async function () {

  $('#signUpForm').submit(async function (e) {
    e.preventDefault();

    hideAlert()
    const formEl = e.target.elements

    // console.log(formEl)
    if (formEl.firstName.value && formEl.lastName.value &&
      formEl.email.value && formEl.password.value ) {

      createUser({
        firstName: formEl.firstName.value,
        lastName: formEl.lastName.value,
        email: formEl.email.value,
        password: formEl.password.value,
        DOB: formEl.DOB.value || "",
        age: formEl.age.value || "",
        favoriteBrand: formEl.favoriteBrand.value || "",
        from: formEl.from.value || "",
        livesIn: formEl.livesIn.value || "",
        occupation: formEl.occupation.value || "",
        profileImageUrl: ""
      });

    } else {
      showAlert("please enter all values first for register!", 'danger')
    }
  });

  async function createUser (userData) {
    firebase.auth()
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then(() => {
      console.log("User successfully created");
      showAlert("User successfully created", 'success')
      const user = firebase.auth().currentUser;
      addUsertoDb(user.uid, userData)
    })
    .catch((err) => {
      console.log("Error creating user", err)
      showAlert(err.message, 'danger')  
    });
  }

  async function addUsertoDb (uid, userData) {
    delete userData.password;
    delete userData.email;
    db.collection("Users")
    .doc(uid)
    .set(userData)
    .then(() => {
      showAlert( `Hello ${userData.firstName} ${userData.lastName}! Thank you for registeration!` , 'success')
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    })
    .catch((err) => console.log("Error creating user", err));
  }

  function showAlert(alertText, color) {
    $("#alertContainer").html(`
    <div class="col-md-9 col-lg-7 col-12">
      <div class="alert alert-${color}" role="alert">
        ${alertText}
      </div>
    </div>`)
  }

  function hideAlert() {
    $('#alertContainer').html('');
  }

  $("#resetBtn").click(() => {
    hideAlert() 
  })

  $('#age').on('change', function() {
    $('#ageDisplay').text($('#age').val());
  });

  $('#DOB').on('change', function() {
    let today = new Date();
    let birthDate = new Date($('#DOB').val());
    let age = today.getFullYear() - birthDate.getFullYear();
    $('#ageDisplay').text(age);
  });
});
