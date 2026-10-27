// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Voting {
    address public owner;
    bool public electionActive;

    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    Candidate[] private candidates;
    mapping(address => bool) public hasVoted;

    event CandidateAdded(uint256 indexed id, string name);
    event VoteCast(address indexed voter, uint256 indexed candidateId);
    event ElectionStatusChanged(bool active);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only admin");
        _;
    }

    constructor() {
        owner = msg.sender;
        electionActive = false;
    }

    function addCandidate(string calldata _name) external onlyOwner {
        require(bytes(_name).length > 0, "Name required");
        candidates.push(Candidate(candidates.length, _name, 0));
        emit CandidateAdded(candidates.length - 1, _name);
    }

    function startElection() external onlyOwner {
        electionActive = true;
        emit ElectionStatusChanged(true);
    }

    function stopElection() external onlyOwner {
        electionActive = false;
        emit ElectionStatusChanged(false);
    }

    function vote(uint256 _candidateId) external {
        require(electionActive, "Election is not active");
        require(!hasVoted[msg.sender], "Wallet has already voted");
        require(_candidateId < candidates.length, "Invalid candidate");

        candidates[_candidateId].voteCount += 1;
        hasVoted[msg.sender] = true;
        emit VoteCast(msg.sender, _candidateId);
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    function getCandidateCount() external view returns (uint256) {
        return candidates.length;
    }
}