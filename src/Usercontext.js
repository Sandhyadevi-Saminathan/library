import { createContext, useState } from "react";

let UserContext = createContext();

export const Userprovider = ({ children }) => {
    const [user, setuser] = useState({ name: "" })
    return <UserContext.Provider value={{ user, setuser }}>{children}</UserContext.Provider>;

};

export default UserContext;