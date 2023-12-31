$(document).ready(async function () {

  let userUid = null;
  let isSaved = false;

  // firebase.auth().onAuthStateChanged(async function (user) {
  //   if (user) {
  //     userUid = user.uid;
  //   } 
  //   // find out whether the product is saved by the user

  //   // change the icon 
  // });

  async function getUserDetails(userUid) {
    console.log('beginning of getUser')
    db.collection('Users')
    .doc(userUid)
    .get()
    .then((doc) => doc.data())
    .then((userDetails) => {
      console.log(userDetails)
      userData = userDetails;

    })
    .catch((err) => console.log("err", err));
  }

  //1. get the parameter:
  const id = $('#productId').text();
  const product = await getProduct(id);

  changeContent(product);

  const similarProducts = await getSimilarProducts(product.category);
  // console.log(similarProducts)
  addSimilarProductsSection(similarProducts);

  async function getProduct (id) {
    let products = [];
    try {
      // // console.log("brand: ", brand.toLowerCase())
      const querySnapshot = await db.collection("Products").where("id", "==", id).get();
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        products.push(product);
      });
      return products[0]
    } catch (err) {
      // console.error('err: ', err)
    }
  };

  async function getSimilarProducts (category) {
    let products = [];
    try {
      // console.log("category: ", category)
      const querySnapshot = await db.collection("Products").where("category", "==", category).limit(5).get();
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        products.push(product);
      });
      return products
    } catch (err) {
      console.error('err: ', err)
    }
  };

  async function changeContent (product) {
    console.log(product.id)
    isItemSaved(product.id);

    $('#brandTitle').text(product.brand.toUpperCase());
    $('#productTitle').text(product.title);

    //create stars:
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += (i < product.stars) ? 
      `<img width="30px" height="30px" src="/assets/Page6/star-filled.svg" />` :
      `<img width="30px" height="30px" src="/assets/Page6/star-blank.svg" />`
    }
    $('#productStars').html(stars);

    let images = '';
    product.images.forEach((image, index) => {
      images += ` <img 
      class="px-2"
      src=${image}
      alt=${product.title+ '' +index}
      width="300"
      height="300"
    />`
    });
    $('#imagesContainer').html(images)
    
    $('#productDescription').text(product.content);

    //create badges:
    let badgesList ='';
    if (product.badges && product.badges.length > 0) {
      product.badges.forEach((badge) => {
        badgesList += `<span class="badge filled-pink mx-1">${badge}</span>`
      });
    }

    $('#productBadges').html(badgesList);

    //create reviews:
    let reviews ='';
    if (product.reviews && product.reviews.length > 0) {

      product.reviews.forEach((review) => {
        //create review stars:
        let reviewStars = '';
        for (let j = 0; j < 5; j++) {
          reviewStars += (j < review.rating) ? 
          `<img width="15px" height="15px" src="/assets/Page6/star-filled.svg" />` :
          `<img width="15px" height="15px" src="/assets/Page6/star-blank.svg" />`
        }

        reviews += `
        <div class="row m-3">
          <div class="col-2">
            <p>
              <span>
                <img src="/assets/Page6/personIcon.svg"/>
              </span>
              <strong>${review.author}</strong>
              </p>
          </div>
          <div class=" col-10">
            <p class="d-inline text-secondary m-0">${review.timestamp}
            <div class="d-inline float-end">${reviewStars}</div>
            </p>
            <p>${review.comment}</p>
          </div>
        </div>`
      });
    }
    $('#productReviews').html(reviews);

  }

  function addSimilarProductsSection (similarProducts) {

    similarList = ''
    if (similarProducts && similarProducts.length > 0) {
      similarProducts.forEach((similar) => {
        // console.log(product.id)
        if (similar.id != product.id) {
            similarList += `<a href="/itemDetails/${similar.id}" style="text-decoration: none;">
            <div class="mx-4">
              <img 
                src=${similar.images[0]}
                alt=${similar.title}
                width="250"
                height="300"
              />
              <p class="text-center title-pink">
                <strong>${similar.title}</strong>
              </p>
            </div>
          </a>`
        }
      });
    }
    
    $('#similarProductsContainer').html(similarList);
  }

  async function isItemSaved (id) {
    fetch('/api/user/userSavedItems', {
      method: 'GET',
      headers: {
        'token': sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.savedItems.includes(id))
      changeSaveIcon(data.savedItems.includes(id))
    })
    .catch((err) => {
      console.log('not signed in!');
    })
  }

  function changeSaveIcon(show) {
    if (show) {
      $('#saveBtnImg').attr('src','/assets/icons/text-filled.svg')
    } else {
      $('#saveBtnImg').attr('src','/assets/icons/text-blank.svg')
    }
  }

  $('#saveBtn').on('click', function() {
    const url = `/api/user/saveItem?id=${id}`
    fetch(url, {
      method: 'PUT',
      headers: {
        'token': sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      changeSaveIcon(data.savedItems.includes(id))
    })
    .catch((err) => {
      console.log('not signed in!');
    })
  })
});