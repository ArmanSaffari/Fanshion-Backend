window.addEventListener("DOMContentLoaded", async function () {

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    hideAlert()
    const formEl = event.target.elements

    console.log(formEl)
    if (formEl.email.value && formEl.password.value ) {

        await signInUser(formEl.email.value, formEl.password.value);

      } else {
        showAlert("Please Enter Email and Password First!", 'danger')
      }
  });

  // firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     this.setTimeout(() => window.location.href = "/" , 2000)
  //   }
  // });

  async function signInUser (email, password) {

    fetch("/api/user/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
    }),
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        showAlert(`Hello ${data.message}! You have signed in successfully.`, 'success');
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userName', data.userName);
        sessionStorage.setItem('userUid', data.userUid);

        setTimeout(() => window.location.href = "/" , 2000)
      })
      .catch(err => {
        console.error('Request failed:', err);
        showAlert(err.message, 'danger')
      });

  };

  async function signOut (email, password) {
    try {
      const cred = await auth.signOut()
      console.log("user successfully signed out!")
    } catch (err) {
      console.error('err: ', err)
    }
  };
  
  function showAlert(alertText, color) {
    const alertContainer = document.getElementById('alertContainer')
    alertContainer.innerHTML = `
    <div class="col-md-9 col-lg-7 col-12">
      <div class="alert alert-${color}" role="alert">
        ${alertText}
      </div>
    </div>`;
  }

  function hideAlert() {
    const alertContainer = document.getElementById('alertContainer')
    alertContainer.innerHTML = '';
  }

  async function getUserName(userUid) {
    const userDetails = await db.collection('Users').where("uid", "==", userUid.toString()).get()
      let userName = ''
      userDetails.forEach((doc) => {
        const userData = doc.data();
        userName = userData.firstName + ' ' + userData.lastName;
      });
      return userName
  }
});
