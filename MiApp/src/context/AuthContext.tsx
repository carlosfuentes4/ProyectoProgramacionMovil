import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "../services/supabase";
import { Session } from "@supabase/supabase-js";

type User = {
    email: string | null | undefined;
}

type AuthContextType = {
    user: User | null;
    loading: boolean; 
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        // Al iniciar, verificamos la sesión
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) setUser({ email: session.user.email });
            setLoading(false); 
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session: Session | null) => {
            setUser(session ? { email: session.user.email } : null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signUpWithEmail = async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
    };

    const signInWithEmail = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    const signInWithGoogle = async () => {
        console.log("Google Auth pausado temporalmente");
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithEmail, signUpWithEmail, logout, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};