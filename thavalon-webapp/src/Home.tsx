import React from 'react';
import navbar_utils from "./Navbar_utils"

interface HomeProp {}

class Home extends React.Component {
    render() {
        return (
            <h1>Hello World! This is a home page!</h1>
        )
    }

    componentDidMount() {
        navbar_utils.setActiveButton("homeLink");
    }
}

export default Home;