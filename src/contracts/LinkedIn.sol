// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Web3Linkedin {
    struct UserProfile {
        string name;
        string bio;
        string profilePictureCID;
        address[] friends;
        address[] friendRequests;
        address[] incomingFriendRequests;  
    }

    mapping(address => UserProfile) public users;

    event FriendRequestSent(address indexed from, address indexed to);
    event FriendRequestAccepted(address indexed from, address indexed to);
    event FriendRequestDeclined(address indexed from, address indexed to);
    event ProfileUpdated(address indexed user);

    modifier notAlreadyFriends(address _user) {
        require(!isFriend(msg.sender, _user), "Users are already friends");
        _;
    }

    modifier notDuplicateFriendRequest(address _to) {
        require(!isFriendRequestSent(_to), "Friend request already sent");
        _;
    }

    function getFriendRequests(address _user) external view returns (address[] memory) {
        return users[_user].friendRequests;
    }

    function getincomingFriendRequests(address _user) external view returns (address[] memory) {
        return users[_user].incomingFriendRequests;
    }

    function getUserProfile(address _user) external view returns (
        string memory name,
        string memory bio,
        string memory profilePicture,
        address[] memory friends
    ) {
        UserProfile memory userProfile = users[_user];
        return (userProfile.name, userProfile.bio, userProfile.profilePictureCID, userProfile.friends);
    }

    function registerProfile(string memory _name) external {
        require(bytes(users[msg.sender].name).length == 0, "User already registered");
        users[msg.sender] = UserProfile(_name, "", "", new address[](0), new address[](0), new address[](0));
    }
    
    function updateProfilePicture(string memory _profilePictureCID) external {
        users[msg.sender].profilePictureCID = _profilePictureCID;
        emit ProfileUpdated(msg.sender);
    }

    function updateProfileBio(string memory _bio) external {
        users[msg.sender].bio = _bio;
        emit ProfileUpdated(msg.sender);
    }
        
    function updateProfileName(string memory _name) external {
        users[msg.sender].name = _name;
        emit ProfileUpdated(msg.sender);
    }

    function sendFriendRequest(address _to) external notAlreadyFriends(_to) notDuplicateFriendRequest(_to) {
         require(msg.sender != _to, "Cannot send friend request to yourself"); // Prevent self-sending
        users[msg.sender].friendRequests.push(_to);
        users[_to].incomingFriendRequests.push(msg.sender);  // Add sender to incoming requests of recipient
        emit FriendRequestSent(msg.sender, _to);
    }

    function acceptFriendRequest(address _from) external {
        require(isFriendRequestReceived(_from), "No friend request from this user");
        
        users[msg.sender].friends.push(_from);
        users[_from].friends.push(msg.sender);

        removeFriendRequest(_from, msg.sender);
        removeIncomingFriendRequest(msg.sender, _from);

        emit FriendRequestAccepted(_from, msg.sender);
    }

    function declineFriendRequest(address _from) external {
        require(isFriendRequestReceived(_from), "No friend request from this user");
        removeFriendRequest(_from, msg.sender);
        removeIncomingFriendRequest(msg.sender, _from);

        emit FriendRequestDeclined(_from, msg.sender);
    }

    function removeFriend(address _friend) external {
        require(isFriend(msg.sender, _friend), "User is not a friend");

        removeFriendFromList(msg.sender, _friend);
        removeFriendFromList(_friend, msg.sender);
    }

    function removeFriendFromList(address _user, address _friend) internal {
        for (uint256 i = 0; i < users[_user].friends.length; i++) {
            if (users[_user].friends[i] == _friend) {
                users[_user].friends[i] = users[_user].friends[users[_user].friends.length - 1];
                users[_user].friends.pop();
                break;
            }
        }
    }
    
    function removeFriendRequest(address _user, address _from) internal {
        for (uint256 i = 0; i < users[_user].friendRequests.length; i++) {
            if (users[_user].friendRequests[i] == _from) {
                users[_user].friendRequests[i] = users[_user].friendRequests[users[_user].friendRequests.length - 1];
                users[_user].friendRequests.pop();
                break;
            }
        }
    }

    function removeIncomingFriendRequest(address _user, address _from) internal {
        for (uint256 i = 0; i < users[_user].incomingFriendRequests.length; i++) {
            if (users[_user].incomingFriendRequests[i] == _from) {
                users[_user].incomingFriendRequests[i] = users[_user].incomingFriendRequests[users[_user].incomingFriendRequests.length - 1];
                users[_user].incomingFriendRequests.pop();
                break;
            }
        }
    }

    function isFriendRequestSent(address _to) internal view returns (bool) {
        for (uint256 i = 0; i < users[msg.sender].friendRequests.length; i++) {
            if (users[msg.sender].friendRequests[i] == _to) {
                return true;
            }
        }
        return false;
    }

    function isFriendRequestReceived(address _from) internal view returns (bool) {
        for (uint256 i = 0; i < users[_from].friendRequests.length; i++) {
            if (users[_from].friendRequests[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function isFriend(address _user1, address _user2) internal view returns (bool) {
        for (uint256 i = 0; i < users[_user1].friends.length; i++) {
            if (users[_user1].friends[i] == _user2) {
                return true;
            }
        }
        return false;
    }


}