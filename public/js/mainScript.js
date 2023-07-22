
window.addEventListener("DOMContentLoaded", async function () {
  // Update progress bar width based on viewport position
  function updateProgressBar() {
    // Get document height, viewport height, and current scroll position
    var documentHeight = $(document).height();
    var viewportHeight = $(window).height();
    var scrollTop = $(window).scrollTop();

    // Calculate progress based on current scroll position
    var progress = (scrollTop / (documentHeight - viewportHeight)) * 100;

    // Set progress bar width
    $('#progress-bar').css('width', progress + '%');
    $('#progress-bar').attr('aria-valuenow', progress);
  }

  // Call updateProgressBar on window scroll event
  $(window).on('scroll', updateProgressBar);

  // Call updateProgressBar on window resize event
  $(window).on('resize', updateProgressBar);

  // Call updateProgressBar on window load event
  $(window).on('load', updateProgressBar);

  // firebase.auth().onAuthStateChanged(async function (user) {
  //   if (user) {
  //     let userUid = user.uid;
  //     db.collection('Users').doc(userUid).get().then((doc) => {
  //       const userData = doc.data();
  //       userName = userData.firstName + ' ' + userData.lastName;
  //       return userName
  //     }).then((userName) => {
  //       switchNavbar(userName)
  //     })
  //   } else {
  //     console.log("User is not logged in!")
  //   }
  // });

  // async function getUserName(userUid) {
  //   let userName = ''
    
  //   return "userName"
  // }

  if (sessionStorage.getItem('token')) {
    switchNavbar(sessionStorage.getItem('userName'))
  }

  function switchNavbar(userName) {
    $('#navbarRight').html(`
      <li class="nav-item order-lg-2">
        <a class="nav-link text-white" href="/profile"><span class="badge bg-danger ">${userName}</span></a>
      </li>
      <li class="nav-item order-lg-2">
        <a class="nav-link text-white" href="/" id="signOutBtn">LOG OUT</a>
      </li>
      `);

    $('signOutBtn').on();
    signOutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('token');
    })
  }

});