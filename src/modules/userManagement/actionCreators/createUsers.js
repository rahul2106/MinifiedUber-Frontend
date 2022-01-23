async function createUsers(params) {
    return async dispatch => {const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    };
    const response = await fetch('http://localhost:8080/api/users/', requestOptions);
    const data = await response.json();}
}

export default createUsers;