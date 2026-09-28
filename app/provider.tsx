
"use client"
import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import axios from 'axios'
import React, { useEffect } from 'react';

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