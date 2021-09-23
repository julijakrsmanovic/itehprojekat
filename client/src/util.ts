import { useContext, useEffect, useState } from "react";


import axios from 'axios'
import React from "react";
import { User } from "./model";
axios.defaults.withCredentials = true;
export const Context = React.createContext({
    user: undefined as User | undefined,
    loading: true,
    setUser: (u: User) => { }
});
export const SERVER = 'https://localhost:4000';
export function useFetch<T>(path: string) {

    const [state, setState] = useState<T[]>([])
    const loading = useContext(Context).loading;

    useEffect(() => {
        if (loading) {
            return;
        }
        axios.get(SERVER + path).then(res => {
            console.log(res)
            setState(res.data);
        })
    }, [path, loading])

    return [state, setState] as [T[], React.Dispatch<React.SetStateAction<T[]>>]
}

export const setFormInputState = (setter: ((val: string) => void)) => (e: any) => {
    const value = e.currentTarget.value;
    setter(value);
}

export function isFriend(user1: User, user2: User) {
    return user2.id !== user1.id && ((user2.rel1 || []).find(r => r.userId2 === user1.id && r.status === 'accepted') !== undefined || (user2.rel2 || []).find(r => r.userId1 === user1.id && r.status === 'accepted') !== undefined)
}