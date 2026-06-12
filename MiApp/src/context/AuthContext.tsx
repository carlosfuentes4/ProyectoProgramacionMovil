import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
    email: string | null;
}

type AuthContextType = {
    user: User | null;
    login: (email: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string) => {
        const allowed=email.includes('@');

        if(allowed){
            setUser({ email });
        }
        return allowed;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};