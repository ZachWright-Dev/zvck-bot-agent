
"use client"
import { useSession } from 'next-auth/react';
import axios from 'axios'
import React, { useEffect } from 'react';

/**
 * Ingests the session data from sessionProvider and creates a user
 * if the session data changed
 */
function Provider({ children }: { children: React.ReactNode }) {
    const { data } = useSession();

    const createNewUser = async() => {
        const result = await axios.post('/api/user', {});
        console.log(result);
    }

    useEffect(()=> {
        data?.user?.email && createNewUser();
    },[data])

    return (
        <div>{children}</div>
    )
}

export default Provider;