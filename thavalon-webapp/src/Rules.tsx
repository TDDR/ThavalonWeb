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
                                        <ol>
                                            <li><a href="#percivalInfo">Percival</a></li>
                                            <li><a href="#lancelotInfo">Lancelot</a></li>
                                            <li><a href="#nimueInfo">Nimue</a></li>
                                            <li><a href="#titaniaInfo">Titania</a></li>
                                            <li><a href="#arthurInfo">Arthur</a></li>
                                            <li><a href="#bedivereInfo">Bedivere</a></li>
                                        </ol>
                                    </ol>
                                <li><a href="#evilRoles">Evil Roles</a></li>
                                    <ol>
                                        <li><a href="#mordredInfo">Mordred</a></li>
                                        <li><a href="#morganaInfo">Morgana</a></li>
                                        <li><a href="#maeveInfo">Maeve</a></li>
                                        <li><a href="#maelegantInfo">Maelegant</a></li>
                                        <li><a href="#agravaineInfo">Agravaine</a></li>
                                        <li><a href="#balorInfo">Balor</a></li>
                                        <li><a href="#oberonInfo">Oberon</a></li>
                                        <li><a href="colgrevanceInfo">Colgrevance</a></li>
                                    </ol>
                            </ol>
                            <li><a href="#setup">Setup</a></li>
                            <li><a href="#proposals">Proposals</a></li>
                            <li><a href="#voting">Voting</a></li>
                            <li><a href="#missions">Going on Missions</a></li>
                            <li><a href="#assassination">Assassination</a></li>
                        </ol>
                    </div>

                    <h1 id="roles">Roles</h1>
                    <h2 id="goodRoles">Good Roles</h2> 
                        <h3 id="priorityRoles">Priority Roles</h3>
                            <ul>
                                <li>
                                    <h4 id="merlinInfo">Merlin</h4>
                                    <p className="roleInfo">Sees all players that are evil (except Mordred).</p>
                                </li>
                                <li>
                                    <h4 id="loversInfo">Tristan and Iseult</h4>
                                    <p className="roleInfo">Are told each other when they go on a mission together; receive hints before they find each other; must be Assassinated as a pair.</p>
                                </li>
                                <li>
                                    <h4 id="guinevereInfo">Guinevere (8+)</h4>
                                    <p className="roleInfo">When not on a mission, may select one player on that mission and see the card they selected.</p>
                                </li>
                            </ul>
                        <h3 id="otherRoles">Other Roles</h3>
                            <ul>
                                <li>
                                    <h4 id="percivalInfo">Percival</h4>
                                    <p className="roleInfo">Sees the Priority Target(s) and Morgana, but cannot distinguish which role each seen player has.</p>
                                </li>
                                <li>
                                    <h4 id="lancelotInfo">Lancelot</h4>
                                    <p className="roleInfo">May play Reversal cards while on missions; cannot be Assassinated.</p>
                                </li>
                                <li>
                                    <h4 id="nimueInfo">Nimue (5/7)</h4>
                                    <p className="roleInfo">Knows which roles are in the game.</p>
                                </li>
                                <li>
                                    <h4 id="titaniaInfo">Titania (7+)</h4>
                                    <p className="roleInfo">You are told how all other players voted on each proposal prior to submitting your own vote</p>
                                </li>
                                <li>
                                    <h4 id="arthurInfo">Arthur (8+)</h4>
                                    <p className="roleInfo">Kows which Good roles are present; may declare after 2 Failed and 0-1 Successful missions to become immune to vote manipulation and early Assassinations and make their votes on mission proposals count twice, but lose the ability to be on mission teams until the 5th mission; is immune to endgame Assassinations.</p>
                                </li>
                                <li>
                                    <h4 id="bedivereInfo">Bedivere (7+) [temporarily removed]</h4>
                                    <p className="roleInfo">Once per round after the first, may give a player a proposal immediately and move them to the current position in the proposal order; is immune to endgame Assassinations. This ability cannot be used on the same player more than once per game, and cannot be used once Force has activated.</p>
                                </li>
                            </ul>
                    <h2 id="evilRoles">Evil Roles</h2>
                        <ul>
                            <li>
                                <h4 id="#mordredInfo">Mordred</h4>
                                <p className="roleInfo">Hidden from Merlin.</p>
                            </li>
                            <li>
                                <h4 id="morganaInfo">Morgana</h4>
                                <p className="roleInfo">Appears like the priority target to Percival.</p>
                            </li>
                            <li>
                                <h4 id="maeveInfo">Maeve</h4>
                                <p className="roleInfo">Up to 2/3/4 times per game, may choose to obscure how players voted on a single mission proposal, instead showing a simple tally of votes.</p>
                            </li>
                            <li>
                                <h4 id="maelegantInfo">Maelegant</h4>
                                <p className="roleInfo">May play Reversal cards while on missions; knows whether there is a Lancelot in the game.</p>
                            </li>
                            <li>
                                <h4 id="agravaineInfo">Agravaine (7+)</h4>
                                <p className="roleInfo">Must play Fails; may declare after having been on a successful mission to cause it to Fail instead.</p>
                            </li>
                            <li>
                                <h4 id="balorInfo">Balor (7+)</h4>
                                <p className="roleInfo">Once per round after the first until two missions have Failed, may prevent two players from being on proposals together for the rest of the round. This ability cannot be used on the same player more than once per game.</p>
                            </li>
                            <li>
                                <h4 id="oberonInfo">Oberon (8+)</h4>
                                <p className="roleInfo">Once per round after the first until two missions have Failed, before votes are revealed, may choose another player's vote on a proposal.</p>
                            </li>
                            <li>
                                <h4 id="colgrevanceInfo">Colgrevance (10)</h4>
                                <p className="roleInfo">Hidden from other Evil roles; knows which player has each Evil role.</p>
                            </li>
                        </ul>
                    
                    <h1 id="setup">Setup</h1>
                    <p className="gameInfo">Once a game has been started (via the !start command), each player will receive a private message from the bot informing them of their role and associated information. The only thing that is guaranteed about teams is that there will be at least one Priority Target role on the Good team. Player order is randomly determined and the first person to propose a mission is randomly selected.</p>

                    <h1 id="proposals">Proposals</h1>
                    <p className="gameInfo">In each round, players take turns proposing teams with the appropriate number of players. During the first round, only two players are permitted to make proposals; in subsequent rounds, players take turns proposing teams of appropriate size. When making a proposal, the leader of the mission selects an appropriate number of people for the mission and submits their final selection via the !propose &lt;A&gt; &lt;B&gt;... command.</p>

                    <h1 id="voting">Voting</h1>
                    <p className="gameInfo">After a proposal has been submitted, players may privately submit their vote to the bot (!upvote if they want the proposed team to go on a mission, !downvote if they do not). Once all players have submitted votes, the voting results are made publicly available. If a proposal received more "upvotes" than "downvotes", then the proposed team goes on the mission. Otherwise, the next player in the proposal order gets the opportunity to submit their proposal. During the first round, "upvoting" supports the first team and "downvoting" supports the second team, with ties going to the team that was proposed second goes on the mission.</p>

                    <p className="gameInfo">After a certain number of rejected proposals (currently 5 in 5-player, 8 in 7-player, 10 in 8-player, and 14 in 10-player), every remaining mission is sent without voting by the current proposer.</p>

                    <h1 id="missions">Going on Missions</h1>
                    <p className="gameInfo">Once a team has been sent on a mission, each person on that team may choose which card they wish to play via a private message (!success for Success, !fail for Fail, !reverse for Reverse). Good players must play Success cards and Evil players may choose to play either Success or Fail. Lancelot and Maelegant are also able to play Reverse cards, and Agravaine may only play Fail cards. Once all players on the team have submitted their selection, the result of the mission, including which cards were played, is made publicly available.</p>

                    <p className="gameInfo">A mission Fails if at least one Fail card and an even number of Reverse cards are played, or if an odd number of Reverse cards and no Fail cards are played. In games with at least 7 players, the fourth mission Fails if at least two Fail cards and an even number of Reverse cards are played, or if one Fail card and an odd number of Reverse cards are played. Otherwise, the mission Succeeds.</p>

                    <p className="gameInfo">In situations where Agravaine may declare (a mission that Succeeded despite at least one Fail card being played in a game with at least 8 players), the player who is Agravaine has a 10-second window to declare as Agravaine (via !declare command in the public channel) to cause the mission to Fail before the game finalizes the mission result and moves onto the next round of proposals.</p>

                    <p className="gameInfo">If a mission Succeeding or Failing would result in there being three Successful or Failed missions, the game ends and the winning team is declared. Good wins if 3 missions have Succeeded, and Evil wins if 3 missions have Failed. If Good wins, the game moves into the Assassination phase.</p>

                    <h1 id="assassination">Assassination</h1>
                    <p className="gameInfo">Once the Good team has won, the Evil team is permitted one final chance at winning the game by correctly identifying their Priority Target (Merlin, Lovers, or Guinevere) and one other role that is neither Lancelot nor a declared Arthur. One player on the Evil team is selected as the Assassin, and is given the final say on who the Evil team would like to assassinate (via the !assassinate &lt;target(s)&gt; command in the public channel). Currently, the Assassin may choose whether to assassinate one person as any valid target or two people as Lovers. Evil is welcome to discuss amongst themselves who they wish to kill, but the decision is not finalized until the !assassinate &lt;target(s)&gt; &lt;role&gt; command is submitted. If Evil correctly identifies two Assassination targets, they win. Otherwise, Good has won!</p>

                </div>
            </div>
        )
    }

    componentDidMount() {
        navbar_utils.setActiveButton("rulesLink");
    }
}

export default Rules;