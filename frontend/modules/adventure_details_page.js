import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  const adventure = params.get("adventure");
  return adventure;

  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    const data = await response.json();
    return data;
  } catch(error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
const{name, subtitle, images, content} = adventure
const headingElem = document.getElementById("adventure-name");
const subtitleElem = document.getElementById("adventure-subtitle");

const photoGallery = document.getElementById("photo-gallery");
const contentElem = document.getElementById("adventure-content")

headingElem.innerHTML = name;
subtitleElem.innerHTML = subtitle;

images.map((image) => {
const newElement = document.createElement("div");
newElement.className = "col-lg-12";

newElement.innerHTML = ` 
<img
src=${image} class="activity-card-image pb-3 pb-md-0"
/>
`
photoGallery.appendChild(newElement);
})

contentElem.innerHTML = content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = ` 
<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

`
const carousalInner = document.getElementById("carousel-inner");

  images.map((image, index) => {
    const newElement = document.createElement("div");
    newElement.className = `carousel-item ${index === 0 ? "active" : ""}`;
  
    newElement.innerHTML = ` 
  <img
  src=${image} class="activity-card-image pb-3 pb-md-0"
  />
  `
    carousalInner.appendChild(newElement);
  });
}
//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById('reservation-person-cost').innerHTML = adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  let totalCost = persons * adventure.costPerHead;
  document.getElementById("reservation-cost").innerHTML = totalCost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 
const form = document.getElementById("myForm");
form.addEventListener("submit", async (event) =>{

  event.preventDefault();
  let url = config.backendEndpoint + "/reservations/new";

  let formElements = form.elements;
  console.log("formElements", formElements);

  let payload = {
    name: formElements["name"].value.trim(),
    date: formElements["date"].value,
    person: formElements["person"].value,
    adventure: adventure.id,
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json"
      }

    });
    if(response.ok){
      alert("success");
    } else {
      alert("failed");
      }


  } catch (error) {
    alert("Failed-to fetch");
  }


});

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
      document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
    }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
