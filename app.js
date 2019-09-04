const imgWrapper = document.querySelector(".img-wrapper");

let imgNum = 1;
// setting distance to show the next image
const threshold = 100;

let lastPosX, lastPosY, curPosX, curPosY;
let isCounting = true;
let startFromX, startFromY;

document.body.addEventListener("mousemove", function(e) {
  const [x, y] = [e.x, e.y];

  const hasCrossedThresHold = // Boolean value wheather the mouse has crossed the theshold or not
    x > startFromX + threshold ||
    x < startFromX - threshold ||
    y > startFromY + threshold ||
    y < startFromY - threshold;

  if (hasCrossedThresHold) {
    // if it has call the show the next image
    showNextImage(e);
    isCounting = true; // changing the isCounting to true
  }

  if (isCounting) {
    // So that we can record the another point here again !!
    startFromX = x;
    startFromY = y;
  }

  isCounting = false; // Changing the isCounting to false to not let recording the startFromX and
  //startFromY points on every mouse-move
});

function showNextImage(e) {
  // Creating and appending image
  const draggingImg = document.createElement("img");
  imgWrapper.append(draggingImg);
  imgNum++; // incresing num to show different image  each time
  draggingImg.src = `img/${imgNum}.jpg`;

  [curPosX, curPosY] = [e.x, e.y];

  // Setting the position of image
  draggingImg.style.left = `${curPosX}px`;
  draggingImg.style.top = `${curPosY}px`;

  // making the image visibile here
  draggingImg.classList.add("visible");

  if (imgNum === 13) {
    // if it is the last image
    imgNum = 1;
  }

  // calculating a dragging distance
  const dragDistanceX = ((curPosX - lastPosX || 0) * 80) / 100;
  const dragDistanceY = ((curPosY - lastPosY || 0) * 80) / 100;

  setTimeout(function() {
    // animating image towards the current position of mouse 
    draggingImg.style.left = `${lastPosX + dragDistanceX}px`;
    draggingImg.style.top = `${lastPosY + dragDistanceY}px`;

    setTimeout(function() {
      draggingImg.classList.add("grow-scale"); // hiding image after 800ms 

      setTimeout(function() {
        imgWrapper.removeChild(draggingImg); // removing the image from the node
      }, 600);
    }, 800);
  }, 10);

  // Setting the last position values of image 
  lastPosX = curPosX;
  lastPosY = curPosY;
}
