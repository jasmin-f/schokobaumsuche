// lightmode / darkmode switch
document.getElementById('darkmode').addEventListener("click", switchLight(false));
document.getElementById('lightmode').addEventListener("click", switchLight(true));

function switchLight(status) {
  console.log('status: ' + status);
  if (status == true) {
    document.getElementById('body').classList.add('lightmode');
    document.getElementById('body').classList.remove('darkmode');
  } else if (status == false) {
    document.getElementById('body').classList.add('darkmode');
    document.getElementById('body').classList.remove('lightmode');
  }
}


// document.addEventListener('DOMContentLoaded', function () {

// fenster zurücksetzen
document.getElementById('reloadFunction').addEventListener("click", reloadFunction);

function reloadFunction() {
  document.getElementById("1_window").style.top = "calc(40% - 200px)";
  document.getElementById("1_window").style.left = "unset";
}
// window draggable
cW = 1;

// onclick="closeWindow('1_window')"
// document.getElementById('closeWindow1').addEventListener("click", closeWindow());
function closeWindow(id) {
  console.log(id);
  document.getElementById(id).style.display = "none";
  document.getElementById(id).style.position = "relative";
  cW = 2;
  console.log("cW zu 2");
  let idfooter = id + 'footer';
  document.getElementById(idfooter).classList.add('hidden-window');
  document.getElementById(idfooter).classList.remove('active-window');

}

var windowsNumber = 1;
while (windowsNumber > 0) {
  // make elements draggable at first click
  dragElement(document.getElementById(windowsNumber + "_window"));
  windowsNumber--;
}


/* onmousedowindowsNumber, update clicked element to selected*/
//  onmousedown="selectWindow('1_window') #1_window"
let selectWindowid = document.getElementById('1_window');
selectWindowid.addEventListener("mousedown", selectWindow('1'));

function selectWindow(idNr) {
  let id = idNr + '_window';
  document.getElementById(idNr + '_windowfooter').classList.remove('hidden-window');
  document.getElementById(idNr + '_windowfooter').classList.add('active-window');

  console.log(id);
  // console.log('selectWindow function start' + id)

  var div = document.getElementById(id + '_window');

  // reset z-index values
  var windowsNumber = 1;
  while (windowsNumber > 0) {
    document.getElementById(windowsNumber + "_window").style.zIndex = "1";
    windowsNumber--;
  }

  // set z-index 2 to selected element
  document.getElementById(id).style.zIndex = "2";
  document.getElementById(id).style.display = "block";

  // // position absolute only for selected window and margin 0

  if (cW = 1) {
    document.getElementById(id).style.position = "absolute";
    document.getElementById(id).style.margin = "0";
    console.log("cW war 1");
  } else {
    cW = 1;
    console.log("cW zu 1");
  }

  // document.getElementById(id).style.top = cell.ofsetTop;
  // document.getElementById(id).style.left = cell.offsetLeft;

  // animation to movable/draggable elements
  var header = document.getElementById(id + "-header");
  header.classList.add("window-animation");

};


function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  // get window height, for not leaving viewport
  let windowHeight = window.innerHeight;
  console.log('höhe' + windowHeight);
  let stopFunction = false;


  if (document.getElementById(elmnt.id + "-header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the div: */
    elmnt.onmousedown = dragMouseDown;
  };

  function dragMouseDown(objMouseEvent) {
    objMouseEvent = objMouseEvent || window.event;
    objMouseEvent.preventDefault();

    // get the mouse cursor position at startup:
    pos3 = objMouseEvent.clientX;
    pos4 = objMouseEvent.clientY;
    document.onmouseup = closeDragElement;

    // calls function whenever the cursor moves:
    document.onmousemove = elementDrag;
  };

  function elementDrag(objMouseEvent) {
    objMouseEvent = objMouseEvent || window.event;
    objMouseEvent.preventDefault();


    // calculate the new cursor position:
    pos1 = pos3 - objMouseEvent.clientX;
    pos2 = pos4 - objMouseEvent.clientY;
    pos3 = objMouseEvent.clientX;
    pos4 = objMouseEvent.clientY;

    // don't leave window
    windowHeaderHeight = 40;
    // windowHeaderHeight = elmnt.offsetTop;
    windowWidth = 350;

    // if (elmnt.offsetTop == 0) {
    //   pos2 = -10;
    //   e.preventDefault();
    //   stopFunction = true;
    // }

    // console.log('clientX' + objMouseEvent.clientX);
    if (elmnt.offsetLeft <= 0) {
      // client X ist Mauszeiger und offset ist das Fenster
      console.log('zu weit links');
      elmnt.style.left = "1px";
      stopFunction = true;
    } else {
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    // Fenster verlässt nicht viewport vertikal (oben und unten)
    if (elmnt.offsetTop <= 0) {
      // client X ist Mauszeiger und offset ist das Fenster
      console.log('zu weit oben');
      elmnt.style.top = "1px";
      stopFunction = true;
    } else if (elmnt.offsetTop >= windowHeight - 130) {
      // nicht zu weit nach unten gehen
      elmnt.style.top = elmnt.offsetTop - 10 + "px";
      // stop Function        //

    } else {
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }

    // // set the element's new position:
    // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  };

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


// }, false); // document ready