
const getUsers = ( params) => {
   const response = fetch('http://localhost:8080/api/users')
    .then((response) => response.json());
    
    return response;
};
export default getUsers;