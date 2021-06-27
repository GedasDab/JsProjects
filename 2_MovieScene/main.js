const container = document.querySelector('.container');
/* We pick the row that has not occupied */
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
/* Element actual from pick movie */
const movieSelect = document.getElementById('movie');
/* Makes a value parseInt() also it can mae " + " */
let ticketPrice = +movieSelect.value;

populateUI();

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total account
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  //console.log(selectedSeats);

  const seatsIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat));
  //setting the item to selectedSeast it's like session
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  //console.log(selectedSeatsCount);

  /** innerText we will change */
  /** The innerText property sets or returns the text content of the specified node */
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from localStorage and populate UI
function populateUI() {
  //Getting what we set
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  //console.log(selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    //We gona loop through all the seats 
    seats.forEach((seat, index) => {
      //Takes from every seats index ar compares with selectedSeats if it matches then that seats it picked
      if (selectedSeats.indexOf(index) > -1) {
        //So the seats that are picked we make class="selected"
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}


//Movie select event
/** change - changes the option */
movieSelect.addEventListener('change', e => {

  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();

});

/* addEventListener - sets up a function that will be called whenever the specified event is delivered to the target. */
// Seat click even
container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    //console.log(e.target);

    /** 
     * Toggle between adding a class name
     */
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total set
// Updates the total and count
updateSelectedCount();