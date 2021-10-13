//Get DOM elements
const section = document.querySelector('section');
const triesCount = document.querySelector('span');
const msg = document.querySelector('.msg');
let tries = 6;

//Changes lives count
triesCount.textContent = tries;

//Generate the Data
const getData = ()=> [
    { imgSrc: "./images/c1.jpeg", id: 1, name: "c1" },
    { imgSrc: "./images/c2.jpeg", id: 2, name: "c2" },
    { imgSrc: "./images/c3.jpeg", id: 3, name: "c3" },
    { imgSrc: "./images/c4.jpeg", id: 4, name: "c4" },
    { imgSrc: "./images/c5.jpeg", id: 5, name: "c5" },
    { imgSrc: "./images/c6.jpeg", id: 6, name: "c6" },
    { imgSrc: "./images/c7.jpeg", id: 7, name: "c7" },
    { imgSrc: "./images/c8.jpeg", id: 8, name: "c8" },
    { imgSrc: "./images/c1.jpeg", id: 9, name: "c1" },
    { imgSrc: "./images/c2.jpeg", id: 10, name: "c2" },
    { imgSrc: "./images/c3.jpeg", id: 11, name: "c3" },
    { imgSrc: "./images/c4.jpeg", id: 12, name: "c4" },
    { imgSrc: "./images/c5.jpeg", id: 13, name: "c5" },
    { imgSrc: "./images/c6.jpeg", id: 14, name: "c6" },
    { imgSrc: "./images/c7.jpeg", id: 15, name: "c7" },
    { imgSrc: "./images/c8.jpeg", id: 16, name: "c8" },
  ];


//Randomize
const randomize = ()=>{
  const cardData = getData();
  cardData.sort(()=>Math.random() - 0.5);
  return cardData;
}

//Card Generator Funciton
const cardGenerator = () =>{
  const cardData = randomize();
  //Generate HTML
  cardData.forEach(item=> {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';
    //Attach info to card
    face.src = item.imgSrc;
    card.setAttribute('name',item.name);
    //Attach cards to section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click',(e)=>{
      card.classList.toggle('toggleCard');
      checkCards(e);
    });
  });
}

//Check if cards are right
const checkCards = (e) =>{
  msg.textContent="";
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped")
  const toggleCards = document.querySelectorAll(".toggleCard")
  console.log("test");
  if(flippedCards.length === 2){
     if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
       console.log("match");
        flippedCards.forEach(card =>{
           card.classList.remove("flipped");
           card.style.pointerEvents = "none";
        });
     }
     else {
       console.log("wrong");
       flippedCards.forEach(card =>{
         card.classList.remove("flipped");
         setTimeout(()=>card.classList.remove("toggleCard"),1000);
       })
       tries--;
       triesCount.textContent = tries
       //check if game lost
       if(tries === 0) restart("Try Again !","red");
     }
  }

  //Check if game win
  if(toggleCards.length === 16) restart("You Won !","green");
};


//Restart Game
const restart = (text,color) =>{
  let cardData = randomize();
  let faces = document.querySelectorAll('.face');
  let cards = document.querySelectorAll('.card');
  section.style.pointerEvents = 'none';
  cardData.forEach((item,index)=>{
    cards[index].classList.remove('toggleCard');
    //Randomize again
    setTimeout(()=>{
      cards[index].style.pointerEvents = 'all';
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name",item.name);
      section.style.pointerEvents = 'all';
    },1000);
  });
  tries = 6;
  triesCount.textContent = tries;
  setTimeout(()=> { msg.textContent=text;
    msg.style.color=color},100)
}
cardGenerator();