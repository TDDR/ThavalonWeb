import "./LobbyManager.scss"
import React from 'react';
import lobbymanager_utils from "./LobbyManager_utils"
import navbar_utils from "./Navbar_utils"

class LobbyManager extends React.Component {
    render() {
        return (
            <div id="lobbyManager">
                <button type="button" className="lobbyButton" id="createButton" onClick={lobbymanager_utils.createGame}>Create Game</button>
                <hr />
                <input type="text" id="joinText" minLength={lobbymanager_utils.FRIEND_CODE_LEN} maxLength={lobbymanager_utils.FRIEND_CODE_LEN} placeholder="Friend Code" />
                <button type="button" className="lobbyButton" id="joinButton" onClick={lobbymanager_utils.joinGame}>Join Game</button>
                <p id="errorText"></p>
            </div>
        )
    }

    componentDidMount() {
        navbar_utils.setActiveButton("playLink");
    }
}

export default LobbyManager;