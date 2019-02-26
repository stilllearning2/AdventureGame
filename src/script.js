/*global window: false */
/*global document: false */
/*jslint node: true */
"use strict";

// arrays
var domLocation = [
        "loc0",
        "loc1",
        "loc2",
        "loc3",
        "loc4",
        "loc5",
        "loc6",
        "loc7",
        "loc8"
    ],

    domImage = [
        "image0",
        "image1",
        "image2",
        "image3",
        "image4",
        "image5",
        "image6",
        "image7",
        "image8"
     ],

    visited = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],

    locationName = [
        "Ballard Locks",
        "Woodland Park Zoo",
        "Gas Works Park",
        "Pacific Science Center",
        "Museum of History and Industry",
        "Washington Park Arboretum",
        "Pike Place Market",
        "Seattle Central Libary",
        "Pioneer Square"
    ],

    description = [
        "The Hiram M. Chittenden Locks, or Ballard Locks, is a complex of locks at the west end of Salmon Bay, in Lake Washington Ship Canal",
        "The zoo, located in the Phinney Ridge neighborhood started in 1899 as a small menagerie on the estate of Guy C.Phinney, sold to the city by his widow.",
        "Gas Works Park is a 19.1 - acre public park on the site of the former Seattle Gas Light Company gasification plant  on the north shore of Lake Union in the Wallingford neighborhood.",
        "The Pacific Science Center is an independent, non-profit science center in Seattle, Washington with a mission to ignite curiosity and fuel a passion for discovery, experimentation, and critical thinking.",
        "MOHAI is a history museum at the south end of Lake Union.",
        "The Arboretum was founded 1934 and contains one of the most diverse and important plant collections in North America displayed among 230 acres of woodlands, wetlands, gardens, and walking trails.",
        "A public market overlooking the Elliott Bay waterfront opened in 1907, one of the oldest continuously operated public farmers' markets in the United States.",
        "The flagship library of The Seattle Public Library system is an 11-story glass and steel building downtown.",
        "Pioneer Square is a neighborhood in the southwest corner of Downtown Seattle, Washington, USA. It was once the heart of the city: Seattle's founders settled there in 1852."
    ],

    itemList = [
        "apple",
        "bell",
        "cat",
        "dog",
        "eagle",
        "fox",
        "gorilla",
        "hen",
        "igloo"
    ],

    locationItem = [
        "apple",
        "bell",
        "cat",
        "dog",
        "eagle",
        "fox",
        "gorilla",
        "hen",
        "igloo"
    ],

    locationItems = [],

    backpack = [],

    found = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],

    knownWord = [
        "north",
        "east",
        "south",
        "west",
        "pickup",
        "use",
        "drop"
    ],

    left = [
        0,
        0
    ],

    center = [
        0,
        0
    ],

    right = [
        0,
        0
    ],

    // variables
    cl = 0, // current location integer
    pl = 0, // previous location integer
    currentLeftX = 0,
    currentLeftY = 0,
    currentCenterX = 0,
    currentCenterY = 0,
    currentRightX = 0,
    currentRightY = 0,
    response = "",
    today = new Date(),
    startTime = 0,
    minutesUsed = 0,
    minutesEnd = 0,
    minutesRemain = 0,
    gameOver = 0,
    userInput = "",
    i = 0,
    tween = TweenLite.tween,
    drop = false,
    use = false,

    // DOM elements
    // location, rider elements
    location0Element = document.getElementById("loc0"),
    location1Element = document.getElementById("loc1"),
    location2Element = document.getElementById("loc2"),
    location3Element = document.getElementById("loc3"),
    location4Element = document.getElementById("loc4"),
    location5Element = document.getElementById("loc5"),
    location6Element = document.getElementById("loc6"),
    location7Element = document.getElementById("loc7"),
    location8Element = document.getElementById("loc8"),
    currentLocationElement = document.getElementById("loc0"),
    currentImageElement = document.getElementById("image0"),
    previousLocationElement = document.getElementById("loc0"),
    riderRightElement = document.getElementById("riderRight"),
    riderLeftElement = document.getElementById("riderLeft"),

    // information elements
    nameElement = document.getElementById("name"),
    descriptionElement = document.getElementById("description"),
    itemListElement = document.getElementById("itemList"),
    backpackElement = document.getElementById("backpack"),
    itemsElement = document.getElementById("items"),
    actionElement = document.getElementById("action"),
    responseElement = document.getElementById("response"),
    entryElement = document.getElementById("entry"),
    minutesRemainElement = document.getElementById("minutesRemain"),
    minutesUsedElement = document.getElementById("minutesUsed"),
    minutesEndElement = document.getElementById("minutesEnd"),

    // buttons
    btnEnter = document.getElementById("btnEnter"),
    btnSave = document.getElementById("btnSave"),
    btnStart = document.getElementById("btnStart");

function getIndex(array, element) {
    for (i = 0; i < array.length; i++) {
        if (array[i] == element) {
            return i;
        }
    }
    return -1;
}

function set(array, index, value) {
    for (i = 0; i < array.length; i++) {
        if (array[i] == index) {
            array[i] = value; {}
        }
    }
}

function remove(array, index) {
    let temp = [];
    for (i = 0; i < array.length; i++) {
        if (array[i] != index) {
            temp.push(array.pop())
        } else {
            array.pop();
        }
    }
    for (i = 0; i < temp.length; i++) {
        array.push(temp[i]);
    }
}

// bicycle functions
function getRiderPoints() {
    left[0] = currentLocationElement.top - 116;
    left[1] = currentLocationElement.left - 60;
    center[0] = currentLocationElement.top - 116;
    center[1] = currentLocationElement.left + 100;
    right[0] = currentLocationElement.top - 116;
    right[1] = currentLocationElement.left + 250 + 60;
};

function riderEnterLeft () {
    // lower current location so rider can come on top
    currentLocationElement.style.zIndex = 1;
    // set location of rider and display
    riderLeftElement.top = left[0] + "px";
    riderLeftElement.left = left[1] + "px";
    riderLeftElement.style.visibility = "display",
    // move rider to center of current location
    TweenLite.to(riderLeftElement, 0.75, {
        top: center[0],
        left: center[1],
        ease: Power1.easeIn
    });
};

function riderLeaveLeft() {
    // move rider to right of location
    TweenLite.to(riderLeftElement, 0.75, {
        top: right[0],
        left: right[1],
        ease: Power1.easeOut
    }),
    // hide rider
    riderLeftElement.style.visibility = "hidden";
    // restore current location to default level
    currentLocationElement.style.zIndex =  3;
};

function riderEnterRight() {
    // lower current location so rider can come on top
    currentLocationElement.style.zIndex = 1;
    // set location of rider and display
    riderRightElement.left = currentLeftX + "px";
    riderRightElement.top = currentLeftY + "px";
    // move rider to center of current location
    TweenLite.to(riderRightElement, 0.75, {
        top: currentCenterY,
        left: currentCenterX,
        ease: Power1.easeIn
    });
};

function riderLeaveRight() {
    // move rider to right of location
    TweenLite.from(riderRightElement, 0.75, {
        top: currentLeftY,
        left: currentLeftX,
        ease: Power1.easeOut
    });
    // hide rider
    riderLeftElement.style.visibility = "hidden";
    // restore current location to default level
    currentLocationElement.style.zIndex = 3;
};

function riderMoveRight() {
    // lower current location so rider can come on top
    currentLocationElement.style.zIndex = 1;
    // move rider to right of location
    TweenLite.to(riderLeftElement, 0.75, {
        top: currentCenterY,
        left: currentCenterX,
        ease: Power1.easeOut
    });
    // restore previous location to default level
    previousLocationElement.style.zIndex = 3;
};

function riderMoveLeft() {
    // lower current location so rider can come on top
    currentLocationElement.style.zIndex = 1;
    // move rider to right of location
    TweenLite.to(riderRightElement, 0.75, {
        top: currentLeftY,
        left: currentLeftX,
        ease: Power1.easeOut
    });
    // hide rider
    riderLeftElement.style.visibility = "hidden";
    // restore previous location to default level
    previousLocationElement.style.zIndex = 3;
};

// display lists functions
function displayItemList() {
    let result = "<br />Item List:  ";
    for (i = 0; i < itemList.length; i++) {
        if (i == 0) {
            result = result + itemList[i];
        } else {
            result = result + ", " + itemList[i];
        }
    }
    document.getElementById("itemList").innerHTML = result;
};

function displayVisited() {
    for (i = 0; i < visited.length; i++) {
        if (visited[i] == 1) {
            document.getElementById("image" + i).style.display = "block";
        }
    }
};

function displayBackpack() {
    let result = "<br />Back Pack:  ";
    for (i = 0; i < backpack.length; i++) {
        if (i== 0) {
            result = result + backpack[i];
        } else {
            result = result + ", " + backpack[i];
        }
    }
    document.getElementById("backpack").innerHTML = result;
};

function displayLocationItems() {
    itemsElement.innerHTML = locationItem[cl];
}

// location functions
function displayCurrentLocation() {
    // display location
    let img = "image" + cl;
    document.getElementById(img).style.display = "block";
    visited[cl] = 1;

    // display information
    nameElement.innerHTML = locationName[cl];
    descriptionElement.innerHTML = description[cl];
};

function displayActionWords() {
    let result = "Action Words:  " + knownWord[0];
    for (i = 1; i < knownWord.length; i++) {
        result = result + ", " + knownWord[i];
    }
    document.getElementById("action").innerHTML = result ;
}

// game functions
function calculateNewPosition(userInput) {
    if (userInput == "north") {
        if ([0, 1, 2].indexOf(cl) >= 0) {
            response = "Cannot move. That would be out of Seattle."
        } else {
            cl = cl - 3;
        }
    } else if (userInput == "west") {
        if ([0, 3, 6].indexOf(cl) >= 0) {
            response = "Cannot move. That would put you in Lake Washington."
        } else {
            cl = cl - 1;
        }
    } else if (userInput == "south") {
        if ([6, 7, 8].indexOf(cl) >= 0) {
            response = "Cannot move. You would be out of the game area."
        } else {
            cl = cl + 3;
        }
    } else if (userInput == "east") {
        if ([2, 5, 8].indexOf(cl) >= 0) {
            response = "Cannot move. That would put you in Puget Sound."
        } else {
            cl = cl + 1;
        }
    } 
};

function pickupItem() {
    backpack.push(locationItem[cl]);
    found[cl] = 1;
    locationItem[cl] = "";
    itemsElement.innerHTML = "";
    response = "A " + locationItem[cl] + " has been put in your backpack."
};

function dropItem() {
    let temp = [];
    let length = backpack.length;
    for (i = length -1; i >= 0; i--) {
        if (backpack[i] != userInput) {
            temp.push(backpack.pop())
        } else {
            backpack.pop();
        }
    }
    for (i = length - 2; i >= 0; i--) {
        backpack.push(temp[i]);
    }

    locationItem[cl] = userInput;
    itemsElement.innerHTML = userInput;
    response = userInput + " has been dropped."
    drop = false;
};

function useItem() {
    for (i = 0; i < backpack.length; i++) {
        if (backpack[i] = userInput) {
            backpack[i] = "";
        }
    }
    locationItem[cl] = userInput;
};

function clickSave() {
    localStorage.setItem("locationStore", cl);
    localStorage.setItem("minutesUsed", minutesUsedElement.innerHTML)
    localStorage.setItem("visitedLength", visited.length);
    for (i = 0; i < visited.length; i++) {
        localStorage.setItem("visited" + i, visited[i]);
    }
    localStorage.setItem("backpackLength", backpack.length);
    for (i = 0; i < backpack.length; i++) {
        localStorage.setItem("backpack" + i, backpack[i]);
    }
    localStorage.setItem("startNewStore", "false");
};

function clickEnter() {
    userInput = entryElement.value;

    if (["north", "east", "west", "south"].indexOf(userInput) >= 0) {
        calculateNewPosition(userInput);

    } else if (userInput == "pickup") {
        pickupItem();

    } else if (userInput == "drop") {
        response = "Drop what?";
        drop = true;

    } else if (userInput == "use") {
        response = "Use what?"
        use = true;

    } else if (drop == true) {
        dropItem();

    } else if (use == true) {
        useItem();
    }

    entryElement.value = null;
    render();
};

function clickStart() {
    localStorage.setItem("startNewStore", "true");
    location.reload();
}



function render() {
    // display current location
    displayCurrentLocation();
    getRiderPoints();

    // move rider
    if ([3, 6, 9].indexOf(cl)) {
        riderEnterRight();
    } else {
        riderEnterLeft();
    };

    // display Information
    // diplay backpack
    displayBackpack();
    // display location items
    displayLocationItems();
    // display times
    let time = new Date();
    let diff = (time.getTime() - startTime) / 1000 / 60;
    minutesUsedElement.innerHTML = diff;
    minutesRemainElement.innerHTML = minutesEndElement.innerHTML - diff;


    // display response
    // dtermine win
    let won = true;
    for (i = 0; i < found.length; i++) {
        if (found[i] === 0) {
            won = false;
            break;
        }
    }

    // deterermine lose
    let lost = minutesUsedElement.innerHTML >= minutesEndElement.innerHTML;

    // display response
    if (won) {
        response = "You WON!  You have found all the items!";
    } else if (lost) {
        response = "You LOST!  Time ran out...";
    }

    responseElement.innerHTML = response;
    entryElement.focus();
};

function init() {
    // create event listeners
    btnEnter.addEventListener("click", clickEnter, false);
    btnSave.addEventListener("click", clickSave, false);
    btnStart.addEventListener("click", clickStart, false);

    if (localStorage.getItem("startNewStore") == "true") {
        localStorage.clear("locationStore");
    };

    // check for local storage
    if (localStorage.getItem("locationStore") != null) {
        // game was saved
        // restore saved elements from localStorage
        cl = parseInt(localStorage.getItem("locationStore"), 10);
        minutesUsedElement.innerHTML = parseFloat(localStorage.getItem("minutesUsed"));
        let length = parseInt(localStorage.getItem("visitedLength"), 10);
        for (i = 0; i < length; i++) {
            visited[i] = parseInt(localStorage.getItem("visited" + i), 10);
        }
        length = parseInt(localStorage.getItem("backpackLength"), 10);
        for (i = 0; i < length; i++) {
            backpack[i] = localStorage.getItem("backpack" + i);
        }

        displayVisited();

    } else {
        // new game
        // random select starting location
        cl = Math.floor(Math.random() * 9);
        minutesUsedElement.innerHTML = 0;
    }

    displayItemList();

    displayBackpack();

    displayActionWords();

    minutesEndElement.innerHTML = 60;
    let today = new Date();
    startTime = today.getTime();
    
    minutesRemainElement.innerHTML = 60 - minutesUsedElement.innerHTML;


    // diplay game state
    render()
}

window.onload = init();
