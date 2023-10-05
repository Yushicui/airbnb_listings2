function MainModule(listingsID = "#listings") {
  const me = {};

  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {

    let amenitiesList = "";
    try {
      const amenities = JSON.parse(listing.amenities);
      amenitiesList = `<ul>${amenities.map(amenity => `<li>${amenity}</li>`).join('')}</ul>`;
  } catch (e) {
      console.error('Error parsing amenities:', e);
  }
    return `
    <div class="col-4"> 
      <div class="listing card">
        <img
          src="${listing.picture_url}"
          class="card-img-top"
          alt="AirBNB Listing"
        />
        <div class="card-body">
          <h2 class="card-title">${listing.name}</h2>
          
          <div><strong>Price:${listing.price}</strong></div>
          <p><strong>Host Name: ${listing.host_name}</strong></p>
          <img src="${listing.host_picture_url}" alt="host picture" class="host-img"/>
          <p class="card-text"><strong>Description:</strong>${listing.description}</p>
          <div><strong>Amenities:</strong> ${amenitiesList}</div>
          <a href="${listing.listing_url}" class="btn btn-primary">View Detail</a>
        </div>
      </div>
    </div>
    `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();
    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();