import { useEffect, useState } from "react";

import axios from 'axios'
axios.defaults.withCredentials = true;
export const SERVER = 'https://localhost:4000';
export function useFetch<T>(path: string, loading: boolean) {
    const [state, setState] = useState<T[]>([])

    useEffect(() => {
        if (loading) {
            return;
        }
        axios.get(SERVER + 'path').then(res => {
            setState(res.data);
        })
    }, [path, loading])

    return [state, setState] as [T[], React.Dispatch<React.SetStateAction<T[]>>]
}

export const setFormInputState = (setter: ((val: string) => void)) => (e: any) => {
    const value = e.currentTarget.value;
    setter(value);
}