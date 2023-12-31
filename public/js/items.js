window.addEventListener("DOMContentLoaded", async function () {

//1. get the parameter:

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const brand = urlParams.get('brand')
const brand = $('#brandName').text();

console.log(brand);
//2. send request to firebase to get the content

// db = firebase.firestore();

async function getItmes (brand) {
  let products = [];
  try {
    const querySnapshot = await db.collection("Products").where("brand", "==", brand.toLowerCase()).get();
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      products.push(product);
    });
    return products
  } catch (err) {
    console.error('err: ', err)
  }
};

products = await getItmes (brand);

// localStorage.setItem('products', products)
// console.log("products: ", products)

//3. display content using DOM

  $('#brandName').text(brand);
  const cardContainer = $('#cardContainer');

  if (products && products.length > 0) {
    products.forEach((product, index) => {

      let cardItem =$('<div></div>')
      cardItem.addClass('col-12 col-lg-6 my-3 h-100');
      
      //create badges:
      let badgesList ='';
      if (product.badges && product.badges.length > 0) {
        product.badges.forEach((badge) => {
          badgesList += `<span class="badge filled-pink mx-1">${badge}</span>`
        });
      }

      //create stars:
      let stars = '';
      for (let i = 0; i < 5; i++) {
        stars += (i < product.stars) ? 
        `<img width="20px" height="20px" src="/assets/Page6/star-filled.svg" />` :
        `<img width="20px" height="20px" src="/assets/Page6/star-blank.svg" />`
      }

      //create reviews:
      let reviews ='';
      if (product.reviews && product.reviews.length > 0) {

        product.reviews.forEach((review, index) => {
          if (index < 3) {
            //create review stars:
            let reviewStars = '';
            for (let j = 0; j < 5; j++) {
              reviewStars += (j < review.rating) ? 
              `<img width="15px" height="15px" src="/assets/Page6/star-filled.svg" />` :
              `<img width="15px" height="15px" src="/assets/Page6/star-blank.svg" />`
            }

            reviews += `
            <p class="d-inline"><span><img src="/assets/Page6/personIcon.svg" /></span>${review.author}<span class="text-black-50 mx-3" style="font-size: 12px">${review.timestamp}</span></p>
            <div class="d-inline float-end">${reviewStars}</div>
            <p> ${review.comment}</p>
            `
          }
        });
      }

      // console.log(product.images[0])
      cardItem.html(`
      <a href="/itemDetails/${product.id}" style="text-decoration: none;">
      <div class="card border border-dark rounded-3">
        <div class="row m-0" style="height: 400px;">
          <div class="border border-dark rounded-3 col-5 p-0 h-100">
              <img class="w-100 h-100 rounded-3" src=${product.images[0]} alt=${product.title}>
          </div>
          <div class="card-body col-7">
            <h5 class="card-title text-center my-2">${product.title}</h5>
            
            <div class="row justify-content-between">
              <div class="d-inline col-auto">${badgesList}</div>
              <div class="d-inline col-auto">${stars}</div>
            </div>

            <div class="my-3 rounded-3 p-3 overflow-auto">
              <h4>Reviews</h4>
              ${reviews}
            </div>
          </div>
        </div>
      </div>
      </a>`);

      cardContainer.append(cardItem);
    });
  } else {
    cardContainer.Text("There is not any product for this brand so far!")
  }

});