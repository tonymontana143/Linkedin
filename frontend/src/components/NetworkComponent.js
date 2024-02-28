import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

const NetworkComponent = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Инициализируем useNavigate

    useEffect(() => {
        const fetchUsers = async () => {
            const dummyUsers = [
                { id: 1, name: 'Alice', profession: 'Developer', location: 'New York', bio: 'Experienced developer specializing in web and mobile applications.' },
                { id: 2, name: 'Bob', profession: 'Designer', location: 'San Francisco', bio: 'Creative designer with a passion for branding and UX/UI.' },
                { id: 3, name: 'Charlie', profession: 'Marketer', location: 'Chicago', bio: 'Digital marketer focused on SEO and content marketing strategies.' }
            ];
            setUsers(dummyUsers);
        };

        fetchUsers();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.profession.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const viewProfile = (userId) => {
        // Функция для перехода на страницу профиля пользователя
        navigate(`/profile/${userId}`);
    };

    return (
        <div>
            <Form.Control
                type="text"
                placeholder="Search users by name or profession..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-3"
            />
            {filteredUsers.map((user) => (
                <Card key={user.id} className="mb-3">
                    <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Text>Profession: {user.profession}</Card.Text>
                        <Button variant="primary" onClick={() => viewProfile(user.id)}>View Profile</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default NetworkComponent;
