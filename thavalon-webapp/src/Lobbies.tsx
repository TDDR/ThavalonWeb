import React from 'react';
import navbar_utils from "./Navbar_utils"

class Lobbies extends React.Component {
    render() {
        return (
            <h1>Hello World!</h1>
        )
    }

    componentDidMount() {
        navbar_utils.setActiveButton("lobbiesLink");
    }
}

export default Lobbies;