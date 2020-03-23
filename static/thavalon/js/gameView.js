import { Card } from "./gameConstants";
import "bootstrap-select";
import * as $ from "jquery";
export class GameView {
    //#region constructors
    constructor() {
        this._proposalVoteTab = document.getElementById("nav-profile-tab");
        this._proposalVoteHeaderSection = document.getElementById("proposalVoteHeader");
        this._proposalVoteContent = document.getElementById("proposalVoteContent");
        this._proposalListLocation = document.getElementById("proposalListLocation");
        this._missionBodyLocation = document.getElementById("nav-about");
        const proposalListTemplate = document.getElementById("proposerSelectionListTemplate");
        if (this._proposalVoteTab === null ||
            this._proposalVoteHeaderSection === null ||
            this._proposalVoteContent === null ||
            this._proposalListLocation === null ||
            this._missionBodyLocation === null ||
            proposalListTemplate === null) {
            throw new Error("Document is missing key nodes.");
        }
        this._proposalSelectionList = proposalListTemplate.content.cloneNode(true);
    }
    //#endregion
    //#region public methods
    /**
     * Populates the player order tab given a list of players.
     * @param playerOrder A list of player names in proposal order.
     */
    populatePlayerOrder(playerOrder) {
        // If the list is empty, just return.
        if (playerOrder.length === 0) {
            return;
        }
        // Get the player order location node. For each name in the list, 
        // create a new list entry, add the name, and append the list entry 
        // to the list.
        const playerOrderNode = document.getElementById("playerOrderLocation");
        for (let i = 0; i < playerOrder.length; i++) {
            const playerListEntry = this.createHTMLElement("LI", i.toString());
            playerListEntry.textContent = playerOrder[i];
            playerOrderNode.appendChild(playerListEntry);
        }
    }
    populateAllRoleInformation(role, team, information) {
        // Populate both the role blurb and the role information tab.
        // This is static and should only be called on a reconnect or game start.
        this.populateRoleBlurb(role, team);
        this.populateRoleInformationTab(information);
    }
    /**
     * Populates the proposal body for players not proposing with the current proposal list.
     * @param proposerName The name of the proposer.
     * @param proposedPlayerList Current list of people on the proposal.
     * @param isProposing Boolean to indicate if this player is proposing.
     */
    recieveProposal(proposerName, proposedPlayerList, isProposing) {
        this.popoulateProposalBodyOther(proposerName, proposedPlayerList, isProposing);
    }
    /**
     * Populates the proposal header and content areas for any player.
     * @param isProposing Boolean to indicate if the player is the proposer.
     * @param proposerIndex Index of the name of the proposer
     * @param proposalOrder Proposal order for the game.
     * @param proposalNumber Current proposal number
     * @param maxNumProposals Max number of proposals in the round
     * @param numOnMission Number of players on the proposal/mission
     * @param skipForceIndicator If true, hides the force indicator in the header
     * @param currentProposal String array of players on the current proposal.
     */
    populateProposalTab(isProposing, proposerIndex, proposalOrder, proposalNumber, maxNumProposals, numOnMission, skipForceIndicator = false, currentProposal) {
        this.populateProposalHeader(isProposing, proposalOrder[proposerIndex], proposalNumber, maxNumProposals, numOnMission, skipForceIndicator);
        if (isProposing) {
            this.populateProposalBodyProposing(proposalOrder, numOnMission);
        }
        else {
            this.popoulateProposalBodyOther(proposalOrder[proposerIndex], currentProposal, isProposing);
        }
    }
    /**
     * Populates relavent proposal information for a new proposal.
     * @param isProposing Boolean to indicate if the current player is proposing
     * @param proposerIndex Index of the name of the proposer
     * @param proposalOrder Proposal order for the game.
     * @param proposalNumber Current proposal number
     * @param maxNumProposals Max number of proposals in the round
     * @param numOnMission Number of players on the proposal/mission
     * @param skipForceIndicator If true, hides the force indicator in the header
     * @param currentProposal String array of players on the current proposal.
     */
    newProposal(isProposing, proposerIndex, proposalOrder, proposalNumber, maxNumProposals, proposalSize, numOnMission, skipForceIndicator = false, currentProposal) {
        this.populateProposalTab(isProposing, proposerIndex, proposalOrder, proposalNumber, maxNumProposals, numOnMission, skipForceIndicator, currentProposal);
    }
    /**
     * Populates the prior vote results for the last vote. Currently uses the shared chat.
     * @param priorVoteInfo Object of player names to votes. Also includes total counts.
     * @param wasObscured Did someone obscure the vote results.
     */
    populatePriorProposalVoteResults(priorVoteInfo, wasObscured) {
        // TODO: Don't use the shared chat for prior vote info.
        const priorVoteInfoLocation = document.getElementById("nav-home");
        priorVoteInfoLocation.innerHTML = "";
        priorVoteInfoLocation.textContent = "Prior proposal votes:";
        if (wasObscured) {
            priorVoteInfoLocation.appendChild(document.createTextNode("Someone has obscured the votes."));
        }
        // Actually add the voting information.
        const voteListNode = this.createHTMLElement("UL");
        let vote = "";
        for (const playerName in priorVoteInfo) {
            const voteListEntry = this.createHTMLElement("LI");
            voteListEntry.textContent = playerName + ": ";
            if (priorVoteInfo[playerName] === 1 /* Upvote */) {
                vote = "Upvoted";
            }
            else if (priorVoteInfo[playerName] === 0 /* Downvote */) {
                vote = "Downvoted";
            }
            else {
                vote = priorVoteInfo[playerName].toString();
            }
            voteListEntry.textContent += vote;
            voteListNode.appendChild(voteListEntry);
        }
        priorVoteInfoLocation.appendChild(voteListNode);
    }
    /**
     * Populates the mission in progress sentence for players who submitted
     * a card before the last person.
     */
    missionStillInProgress(cardPlayed) {
        this._missionBodyLocation.innerHTML = "";
        let missionInProgressSentence = "You have played a " + cardPlayed + ". ";
        if (cardPlayed === Card.Success) {
            missionInProgressSentence += "Good job!";
        }
        else if (cardPlayed === Card.Fail) {
            missionInProgressSentence += "Why did you ahve to fail :(.";
        }
        else {
            missionInProgressSentence += "I see a bus in your future.";
        }
        this._missionBodyLocation.textContent = missionInProgressSentence;
    }
    /**
     * Populates the mission content when a mission goes for any player.
     * @param isOnMission Indicates if the player is on the mission.
     * @param playersOnMission A list of players on the mission.
     */
    populateMissionStartInfo(isOnMission, playersOnMission) {
        if (isOnMission) {
            this.populateMissionTabOnMission();
        }
        else {
            this.populateMissionTabSpectating(playersOnMission);
        }
        this._proposalVoteContent.innerHTML = "";
        this._proposalVoteContent.textContent = "Mission is going.";
    }
    /**
     * Updates the UI to show the results of the previous mission.
     * @param priorMissionNum The number of the mission that just went
     * @param missionResult The result of the mission
     * @param playersOnMission Player names on the mission
     * @param playedCards Cards played on the mission
     */
    populateMissionResults(priorMissionNum, missionResult, playersOnMission, playedCards) {
        let missionResultTemplate = null;
        if (missionResult === 0 /* Pass */) {
            missionResultTemplate = document.getElementById("missionPassedTemplate");
        }
        else {
            missionResultTemplate = document.getElementById("missionFailedTemplate");
        }
        if (typeof missionResultTemplate === null) {
            throw new Error("Could not find appropriate mission templates.");
        }
        const missionIndicatorLocation = document.getElementById("m" + priorMissionNum.toString() + "Indicator");
        missionIndicatorLocation.innerHTML = "";
        const missionResultNode = missionResultTemplate.content.cloneNode(true);
        missionIndicatorLocation.appendChild(missionResultNode);
        this._missionBodyLocation.innerHTML = "";
        this._missionBodyLocation.textContent = "Waiting for the next mission.";
        this.updateMissionPopovers(playersOnMission, playedCards, missionIndicatorLocation);
    }
    /**
     * Adds all relevant information for voting for any player.
     * @param playersOnProposal Players to on the proposal.
     */
    populateVotingInformation(playersOnProposal) {
        if (typeof playersOnProposal !== "object" || playersOnProposal.length === 0) {
            throw new Error("Players on the proposal cannot be empty.");
        }
        this.populateVoteHeader();
        this.populateVoteBody(playersOnProposal);
    }
    /**
     * Populates the vote tab for a player that submitted a vote while voting has not ended.
     * @param submittedVote The player's submitted vote.
     */
    voteStillInProgress(submittedVote) {
        // Remove the buttons and put a message in their place to inform the user voting is complete.
        this._proposalVoteContent.innerHTML = "";
        // Format the sentence based on the vote boolean.
        let alreadyVotedSentence = "You have ";
        if (submittedVote === 1 /* Upvote */) {
            alreadyVotedSentence += "upvoted. ";
        }
        else {
            alreadyVotedSentence += "downvoted. ";
        }
        alreadyVotedSentence += "Please wait while others finish voting.";
        // Create the text node and add it to the voting section.
        const alreadyVotedTextNode = document.createTextNode(alreadyVotedSentence);
        this._proposalVoteContent.appendChild(alreadyVotedTextNode);
    }
    //#endregion
    //#region private methods
    /**
     * Populates the role blurb above the mission indicators
     * @param role The name of the role.
     * @param team Team of the role (Good or Evil).
     */
    populateRoleBlurb(role, team) {
        const roleBlurbTemplate = document.getElementById("roleBlurbTemplate");
        const roleBlurbLocation = document.getElementById("roleBlurbLocation");
        if (typeof roleBlurbTemplate === "undefined" ||
            typeof roleBlurbLocation === "undefined") {
            throw new Error("Could not locate role information locations.");
        }
        // Clone the template and find all spans.
        const roleBlurb = roleBlurbTemplate.content.cloneNode(true);
        const spans = roleBlurb.querySelectorAll("span");
        // Add the role information to the blurb.
        spans[0].textContent = "You are " + role;
        // Add the team information.
        let teamString = "";
        if (team === 1 /* Evil */) {
            teamString = " [EVIL]";
            spans[1].classList.add("text-danger");
        }
        else {
            teamString = " [GOOD]";
            spans[1].classList.add("text-success");
        }
        // Finally, add everything to the role location.
        spans[1].textContent = teamString;
        spans[0].appendChild(spans[1]);
        roleBlurbLocation.appendChild(roleBlurb);
    }
    /**
     * Populates the role information tab with the formatted information string.
     * @param information Formatted information for display
     */
    populateRoleInformationTab(information) {
        const roleInformationTabLocation = document.getElementById("roleInformationLocationTemplate");
        roleInformationTabLocation.textContent = "-------------------------\r\n";
        roleInformationTabLocation.textContent += information + "\r\n";
        roleInformationTabLocation.textContent += "-------------------------";
    }
    /**
     * Creates an HTML element node using the information given.
     * The type of element is required. All else is optional.
     * @param elementType The HTML tag name
     * @param id ID for the tag
     * @param classList List of classes to add
     */
    createHTMLElement(elementType, id, classList) {
        if (typeof elementType !== "string" || elementType.length === 0) {
            throw new Error("Cannot create HTML element with no type.");
        }
        // Initialize the node.
        const node = document.createElement(elementType);
        // Handle ID if passed in.
        if (typeof id === "string") {
            node.id = id;
        }
        // Handle any classes to add.
        if (classList instanceof Array && classList.length > 0) {
            node.classList.add(classList.join(","));
        }
        return node;
    }
    /**
     * Populates the proposal header during the proposal phase.
     * @param isProposing Indicates if this player is the proposer
     * @param proposerName Name of the proposing player
     * @param proposalNumber Current number of proposals that have occurred (1-indexed)
     * @param maxNumProposals Max number of the proposals in the round
     * @param numOnMission Number of players on the proposal/mission
     * @param skipForceIndicator If true, doesn't show the force indicator
     */
    populateProposalHeader(isProposing, proposerName, proposalNumber, maxNumProposals, numOnMission, skipForceIndicator = false) {
        this._proposalVoteTab.textContent = "Proposals";
        // Write the header section. This includes proposal number, force indicator,
        // and who is proposing.
        this._proposalVoteHeaderSection.innerHTML = "";
        this._proposalVoteHeaderSection.textContent = `Proposal ${proposalNumber}/${maxNumProposals}`;
        if (proposalNumber === maxNumProposals && skipForceIndicator) {
            const forceIndicatorNode = this.createHTMLElement("SPAN", undefined, ["text-danger"]);
            forceIndicatorNode.textContent = "[FORCE]";
            this._proposalVoteHeaderSection.appendChild(forceIndicatorNode);
        }
        // Blank line for formatting
        this._proposalVoteHeaderSection.appendChild(this.createHTMLElement("BR"));
        // Write the sentence on whom is proposing with correct grammar.
        let proposerSentence = "";
        if (isProposing) {
            proposerSentence += "You are ";
        }
        else {
            proposerSentence += proposerName + " is ";
        }
        proposerSentence += `proposing a ${numOnMission} person mission.`;
        const sentenceTextNode = document.createTextNode(proposerSentence);
        this._proposalVoteHeaderSection.appendChild(sentenceTextNode);
    }
    /**
     * Writes the proposal content area with information for non-proposers.
     * This includes the current proposal list or a message to wait for a proposal.
     * @param proposerName The current proposer name.
     * @param currentProposal An array of names on the proposer (can be empty).
     * @param isProposing Boolean to indicate if this player is the proposer.
     */
    popoulateProposalBodyOther(proposerName, currentProposal, isProposing) {
        // TODO: Figure out what this is doing.
        if (!isProposing) {
            this._proposalListLocation.innerHTML = "";
        }
        // If the proposal is undefined or empty, then the proposal round just started.
        if (currentProposal === undefined || currentProposal.length === 0) {
            this._proposalVoteContent.textContent = `Please wait while ${proposerName} proposes a mission.`;
            return;
        }
        // Otherwise, print the proposal information.
        this._proposalVoteContent.textContent = `${proposerName} has proposed:`;
        const listNode = this.createHTMLElement("UL");
        for (const playerName of currentProposal) {
            const listEntry = this.createHTMLElement("LI");
            listEntry.textContent = playerName;
            listNode.appendChild(listEntry);
        }
        this._proposalVoteContent.appendChild(listNode);
        return;
    }
    /**
     * Populates the proposal content area for the active proposer.
     * @param playerOrder The order of proposers in the game
     * @param numOnMission Number of players on the proposal/mission
     */
    populateProposalBodyProposing(playerOrder, numOnMission) {
        // TODO: handle the current proposal if the player disconnects and reconnects
        // during proposal.
        // Get the template for the list, clone it, and add options.
        const selectNode = this._proposalSelectionList.querySelector("select");
        selectNode.setAttribute("data-max-options", numOnMission.toString());
        selectNode.id = "proposedPlayerList";
        for (const playerName of playerOrder) {
            const optionNode = this.createHTMLElement("OPTION");
            optionNode.setAttribute("value", playerName);
            optionNode.textContent = playerName;
            selectNode.appendChild(optionNode);
        }
        // Clear old values from the proposal tab.
        this._proposalListLocation.innerHTML = "";
        this._proposalListLocation.appendChild(this._proposalSelectionList);
        $("#proposedPlayerList").selectpicker("render");
    }
    /**
     * Changes the vote tab title to "Voting".
     */
    populateVoteHeader() {
        this._proposalVoteTab.textContent = "Voting";
    }
    /**
     * Populates the content of the voting section for players.
     * @param playerList The players to vote on.
     */
    populateVoteBody(playerList) {
        // Clear old values before writing voting information.
        this._proposalVoteContent.innerHTML = "";
        this._proposalListLocation.innerHTML = "";
        this._proposalVoteContent.textContent = "Voting on:";
        const listNode = this.createHTMLElement("UL");
        for (const playerName of playerList) {
            const listEntry = this.createHTMLElement("LI");
            listEntry.textContent = playerName;
            listNode.appendChild(listEntry);
        }
        this._proposalVoteContent.appendChild(listNode);
        // Add the vote buttons.
        const votingButtonsTemplate = document.getElementById("voteButtonsTemplate");
        const votingButtons = votingButtonsTemplate.content.cloneNode(true);
        this._proposalVoteContent.appendChild(votingButtons);
    }
    /**
     * Populates the mission buttons for players on a mission.
     */
    populateMissionTabOnMission() {
        this._missionBodyLocation.innerHTML = "";
        const missionBodyTemplate = document.getElementById("onMissionTemplate");
        const missionBodyOnMission = missionBodyTemplate.content.cloneNode(true);
        this._missionBodyLocation.appendChild(missionBodyOnMission);
    }
    /**
     * Populates the mission tab for players not on the mission.
     * @param playersOnMission A string array of players on the mission
     */
    populateMissionTabSpectating(playersOnMission) {
        const missionBodyTemplate = document.getElementById("notOnMissionTemplate");
        const missionBodySpectating = missionBodyTemplate.content.cloneNode(true);
        this._missionBodyLocation.innerHTML = "";
        const preNode = missionBodySpectating.querySelector("pre");
        let missionSentence = "Please wait while " + playersOnMission.join(", ") +
            " go on a mission.";
        preNode.textContent = missionSentence;
        this._missionBodyLocation.appendChild(missionBodySpectating);
    }
    /**
     * Builds and initializes the popover for the correct mission
     * @param playersOnMission List of player names on the mission
     * @param playedCards List of cards played on the mission
     * @param missionIndicatorLocation HTMLElement of the correct mission indicator
     */
    updateMissionPopovers(playersOnMission, playedCards, missionIndicatorLocation) {
        // First, add the players on the mission.
        let popoverText = "Players: ";
        const numPlayers = playersOnMission.length;
        for (let i = 0; i < numPlayers; i++) {
            //Handle cases of the last player (and), a two player mission (no comma), or generic case.
            if (i + 1 === numPlayers) {
                popoverText += "and " + playersOnMission[i] + " (" + numPlayers + ")";
            }
            else if (numPlayers === 2) {
                popoverText += playersOnMission[i] + " ";
            }
            else {
                popoverText += playersOnMission[i] + ", ";
            }
        }
        // Add a linebreak for formatting.
        popoverText += "<br />";
        // Handle cards played.
        popoverText += "Cards Played: ";
        for (const card in playedCards) {
            popoverText += Card[card] + ", ";
        }
        // Add cards to popover and initialize.
        missionIndicatorLocation.setAttribute("data-content", popoverText);
        const popover = $(missionIndicatorLocation);
        popover.popover();
    }
}
//# sourceMappingURL=gameView.js.map