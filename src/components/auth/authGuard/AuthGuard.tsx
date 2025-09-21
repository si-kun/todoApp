"use client"

import { getUser } from '@/actions/auth/getUser'
import { userAtom } from '@/atom/userAtom'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

interface AuthGuradProps {
    children: React.ReactNode
}

const AuthGuard  = ({children}:AuthGuradProps) => {

  // userのatom
  const setUser = useSetAtom(userAtom);

  const router = useRouter();

    useEffect(() => {

        // 認証状態を確認する
        const checkAuth = async () => {
           const res = await getUser();

           if(!res.success || !res.data) {
            router.replace("/login")
           } else {
            router.replace("/")
            setUser(res.data);
           }
        }
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div>{children}</div>
  )
}

export default AuthGuard