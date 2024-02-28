// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ProfileManager is Ownable {
    struct Profile {
        string name;
        string bio;
        string profileImageURI;
        address[] friends;
    }

    mapping(address => Profile) public profiles;
    mapping(address => mapping(address => bool)) private _friendRequests;

    event ProfileCreated(address user);
    event FriendRequestSent(address from, address to);
    event FriendRequestAccepted(address from, address to);

    function createProfile(string memory name, string memory bio, string memory profileImageURI) public {
        profiles[msg.sender] = Profile(name, bio, profileImageURI, new address[](0));
        emit ProfileCreated(msg.sender);
    }

    function sendFriendRequest(address to) public {
        require(to != msg.sender, "Cannot send friend request to yourself");
        require(!_friendRequests[to][msg.sender], "Friend request already sent");

        _friendRequests[to][msg.sender] = true;
        emit FriendRequestSent(msg.sender, to);
    }

    function acceptFriendRequest(address from) public {
        require(_friendRequests[msg.sender][from], "Friend request not found");

        _friendRequests[msg.sender][from] = false;
        profiles[msg.sender].friends.push(from);
        profiles[from].friends.push(msg.sender);
        emit FriendRequestAccepted(from, msg.sender);
    }

    function getFriends(address user) public view returns (address[] memory) {
        return profiles[user].friends;
    }
}
