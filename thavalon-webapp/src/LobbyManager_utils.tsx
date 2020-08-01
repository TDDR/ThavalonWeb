const FRIEND_CODE_LEN = 6

function createGame() {
    console.log("Creating Game!");
    // TODO: Communicate with server to create new lobby
}

function joinGame() {
    console.log("Joining Game!");

    let errorText = document.getElementById("errorText");
    if (errorText === null) {
        console.log("Unable to find error text <p>, unable to join game as a result");
        return;
    }

    let joinText = document.getElementById("joinText") as HTMLInputElement;
    if (joinText === null) {
        errorText.innerHTML = "Unable to find joinText element";
        return;
    }

    let friendCode = joinText.value;
    console.log("Received friend code: " + friendCode);

    if (friendCode.length !== FRIEND_CODE_LEN) {
        errorText.innerHTML = "Friend code must be " + FRIEND_CODE_LEN + " characters long.";
        return;
    }

    // TODO: Send friend code to server to either join lobby or get error
}

const lobbymanager_utils = {
    createGame,
    joinGame,
    FRIEND_CODE_LEN
}

export default lobbymanager_utils;
