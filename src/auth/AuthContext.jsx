import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );


const login = (userData, token) => {
    localStorage.setItem( "user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
};

const updateUser = (updatedUser) => {
  setUser(updatedUser);
  localStorage.setItem("user", JSON.stringify(updatedUser));
};

const logout = () => {
    localStorage.clear();
    setUser(null);
};

return(
    <AuthContext.Provider value={{ user, login, logout, updateUser}}>
        {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);