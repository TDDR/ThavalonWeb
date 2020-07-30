import "./Rules.scss"
import React from 'react';
import navbar_utils from "./Navbar_utils"

class Rules extends React.Component {
    render() {
        return (
            <div id="rulesPage">
                <h1 id="rulesTitle">Rules</h1>
                <div id="rulesContent">
                    <div id="rulesLinks">
                        <div id="linksTitle">Contents</div>
                        <ol>
                            <li><a href="#roles">Roles</a></li>
                            <ol>
                                <li><a href="#goodRoles">Good Roles</a></li>
                                <ol>
                                    <li><a href="#priorityRoles">Priority Roles</a></li>
                                    <ol>
                                        <li><a href="#merlinInfo">Merlin</a></li>
                                        <li><a href="#loversInfo">Tristan and Iseult</a></li>
                                        <li><a href="#guinevereInfo">Guinevere</a></li>
                                    </ol>
                                    <li><a href="#otherRoles">Other Roles</a></li>
                                </ol>
                                <li><a href="#evilRoles">Evil Roles</a></li>
                            </ol>
                        </ol>
                    </div>

                    <h1 id="roles">Roles</h1>
                    <h2 id="goodRoles">Good Roles</h2> 
                        <h3 id="priorityRoles">Priority Roles</h3>
                            <h4 id="merlinInfo">Merlin</h4>
                            <p>Sees all players that are evil (except Mordred).</p>

                            <h4 id="loversInfo">Tristan and Iseult</h4>
                            <p>Are told each other when they go on a mission together; receive hints before they find each other; must be Assassinated as a pair.</p>

                            <h4 id="guinevereInfo">Guinevere</h4>
                            <p>When not on a mission, may select one player on that mission and see the card they selected.</p>
                        <h3 id="otherRoles">Other Roles</h3>
                    <h2 id="evilRoles">Evil Roles</h2>
                </div>
            </div>
        )
    }

    componentDidMount() {
        navbar_utils.setActiveButton("rulesLink");
    }
}

export default Rules;