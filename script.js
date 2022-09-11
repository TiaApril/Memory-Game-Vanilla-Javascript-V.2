const container = document.getElementById("game-container")


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard, array, clonedArray, memoryCard




const image = [
    { name: "bee", image: "/img/bee.png" },
  { name: "crocodile", image: "/img/crocodile.png" },
  { name: "macaw", image: "/img/macaw.png" },
  { name: "gorilla", image: "/img/gorilla.png" },
  { name: "tiger", image: "/img/tiger.png" },
  { name: "monkey", image: "/img/monkey.png" },
  { name: "chameleon", image: "/img/chameleon.png" },
  { name: "piranha", image: "/img/piranha.png" },
  { name: "anaconda", image: "/img/anaconda.png" },
  { name: "sloth", image: "/img/sloth.png" },
  { name: "cockatoo", image: "/img/cockatoo.png" },
  { name: "toucan", image: "/img/toucan.png" },
];

const logo = {name: "logo", image:"/img/logo.png"}
// make new array from image array that can shuffle the array

const shuffle = image => {
    for (let i = image.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [image[i], image[j]] = [image[j], image[i]];
    }
    return image;
}


function generateImage () {
    // done - add if to generate all the image, we will use the cloneArray instead of
    // image array
    // done = try to get only 8 random image to double it later
    shuffle(image);
    for(let i = 0; i<image.length; i++) {
        array = image.slice(4)
        clonedArray = [...array, ...array]
        
    }
    for(let i = 0; i<clonedArray.length; i++ ) {
        const memoryCard = document.createElement("div");
        memoryCard.classList = "memory-card";
        memoryCard.setAttribute("data-frame", clonedArray[i].name)

        const face = document.createElement("img");
        face.classList = "front-face";
        face.src = clonedArray[i].image;

        const back = document.createElement("img");
        back.classList = "back-face";
        back.src = logo.image;

        memoryCard.appendChild(face);
        memoryCard.appendChild(back)
        container.appendChild(memoryCard);

        memoryCard.style.order = Math.floor(Math.random()*16);

        memoryCard.addEventListener("click", flipCard);
    }
    
}

function flipCard () {
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add("toggleCard");
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;
        checkMatchCard();
    }
}



function checkMatchCard() {
    if (firstCard.dataset.frame === secondCard.dataset.frame) {
        disableCard()
    } else {
        unflippedCard()
    }
}


function disableCard() {
    firstCard.removeEventListener("click", flipCard)
    secondCard.removeEventListener("click",flipCard)

}

function unflippedCard() {
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove("toggleCard");
        secondCard.classList.remove("toggleCard");

        resetBoard();
    }, 1500)
}

function resetBoard() {
    [hasFlipCard, lockBoard] = [false, false],
    [firstCard, secondCard] = [null, null]
}



// function shuffleCard() {
//     memoryCard.style.order = Math.floor(Math.random()*16);
// }


generateImage()