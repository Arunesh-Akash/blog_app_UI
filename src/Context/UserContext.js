import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({});

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const token = localStorage.getItem('token');

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3005/login/current', { token });
                setCurrentUser(response.data.user);
            } catch (error) {
                console.log({ message: 'User is not load' });
                setCurrentUser(null);
                localStorage.removeItem('currentUser');
            }

        }
        fetchData();
    },[token])

    return (
        <UserContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;