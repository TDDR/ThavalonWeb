from abc import ABC, abstractmethod
from typing import Dict, List


class Response(ABC):
    def __init__(self, message_type: str, success: bool = False, error_message: str = ""):
        self.type = message_type
        self.success = success
        self.error_message = error_message

    def send(self) -> Dict[str, object]:
        object_dict = dict()
        object_dict["type"] = self.type
        object_dict["success"] = self.success
        object_dict["error_message"] = self.error_message
        return self._send_core(object_dict)

    def _send_core(self, object_dict):
        return object_dict


class JoinLeaveGameResponse(Response):
    def __init__(self, message_type: str,
                 success: bool = False,
                 error_message: str = "",
                 player_names: List[str] = None,
                 player_list: List[str] = None):
        super().__init__(message_type, success, error_message)
        self.player_names = player_names
        self.player_list = player_list

    def _send_core(self, object_dict):
        object_dict["player_names"] = self.player_names
        object_dict["player_list"] = self.player_list
        return object_dict


class GameStateResponse(Response):
    def __init__(self, success: bool = False, error_message: str = ""):
        super().__init__("gamestate", success, error_message)
        self.proposal_order = None
        self.mission_sizes = None
        self.mission_results = None
        self.role_information = ""
        self.mission_players = None
        self.proposer_index = None
        self.proposal_num = 1
        self.current_phase = None
        self.declarations = None
        self.last_vote_information = None

    def _send_core(self, object_dict):
        object_dict["proposalOrder"] = self.proposal_order
        object_dict["missionSizes"] = self.mission_sizes
        object_dict["missionResults"] = self.mission_results
        object_dict["roleInformation"] = self.role_information
        object_dict["missionPlayers"] = self.mission_players
        object_dict["proposerIndex"] = self.proposer_index
        object_dict["proposalNum"] = self.proposal_num
        object_dict["currentPhase"] = self.current_phase
        object_dict["declarations"] = self.declarations
        object_dict["lastVoteInfo"] = self.last_vote_information
        return object_dict
