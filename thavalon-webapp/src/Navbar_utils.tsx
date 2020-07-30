function openMenu() {
    let x = document.getElementById("navbar");
    if (x === null) {
        return;
    }
    if (x.classList.contains("responsive")) {
        x.className = "topnav";
    } else if (x.classList.contains("topnav")) {
        x.className = "topnav responsive";
    }
}

function setActiveButton(activeId: string) {
    console.log("Active button is: "+ activeId)
    let lights = document.getElementsByClassName("active");
    while (lights.length) lights[0].className = "";
    let activeLink = document.getElementById(activeId);
    if (activeLink === null) {
        return;
    }
    activeLink.className = "active";
}

const navbar_utils = {
    openMenu,
    setActiveButton
}

export default navbar_utils;