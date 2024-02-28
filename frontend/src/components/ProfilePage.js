import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Предполагаем, что Web3 и контракт уже импортированы и настроены

function ProfilePage({ account }) {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({ name: '', bio: '', skills: '' });

  // Функция для загрузки данных пользователя
  const fetchUserData = async () => {
    // Здесь должен быть код для получения данных пользователя из блокчейна
    // Пример:
    // const data = await contract.methods.getUserData(account).call();
    // setUserData({ name: data.name, bio: data.bio, skills: data.skills.join(', ') });
    console.log('Fetching user data...');
  };

  // Функция для обновления данных пользователя
  const updateUserData = async (newData) => {
    // Здесь должен быть код для отправки транзакции на обновление данных пользователя
    console.log('Updating user data...', newData);
  };

  useEffect(() => {
    const fetchUser = async () => {
        const dummyUsers = [
            { id: 1, name: 'Alice', profession: 'Developer', location: 'New York', bio: 'Experienced developer specializing in web and mobile applications.' },
            { id: 2, name: 'Bob', profession: 'Designer', location: 'San Francisco', bio: 'Creative designer with a passion for branding and UX/UI.' },
            { id: 3, name: 'Charlie', profession: 'Marketer', location: 'Chicago', bio: 'Digital marketer focused on SEO and content marketing strategies.' }
        ];
        // Поиск пользователя по id
        const userFound = dummyUsers.find(user => user.id.toString() === userId);
        setUser(userFound);
    };

    fetchUser();
}, [userId]);

  const handleEditToggle = () => setEditMode(!editMode);

  const handleSave = async () => {
    // Возможно, вам потребуется преобразование данных, например, разделение skills по запятым
    await updateUserData(userData);
    setEditMode(false);
    fetchUserData(); // Перезагрузка данных пользователя после обновления
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      {editMode ? (
        <div>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Name"
          /><br/>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            placeholder="Bio"
          /><br/>
          <input
            type="text"
            name="skills"
            value={userData.skills}
            onChange={handleChange}
            placeholder="Skills (comma-separated)"
          /><br/>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      ) : (
        <div>
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
            <p>Profession: {user.profession}</p>
            <p>Location: {user.location}</p>
            <button onClick={handleEditToggle}>Edit Profile</button>
      </div>
      )}
    </div>
  );
}

export default ProfilePage;
