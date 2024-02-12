const API_URL = 'http://localhost:5000/auth';
let token = null;



const handleRegistration = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('confirmPassword').value;

    if(password == password2){
    try {
        const response = await fetch(`${API_URL}/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error('Registration error:', error);
    }
}else{console.log("Two different passwords")}};

const handleLogin = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        token = data.token;
        
        
        if (token) {
            window.location.href = 'lobby.html';
            console.log('Login successful');
        }

        
    } catch (error) {
        console.error('Login error:', error);
    }
};

const gotohome = async () => {
    window.location.href = 'login.html';
}

const handleGetUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log('Users:', data);
    } catch (error) {
        console.error('Get users error:', error);
    }
};
