import { Session, User, UserCredentials } from "@supabase/supabase-js"
import supabase from "lib/db"
import React, { createContext, useContext, useEffect, useState } from "react"

interface IAuthContext {
  user?: User
  signUp: (userCredentials: UserCredentials) => Promise<{
    user: User | null
    session: Session | null
    error: Error | null
  }>
  signIn: (userCredentials: UserCredentials) => Promise<{
    user: User | null
    session: Session | null
    error: Error | null
  }>
  signOut: () => Promise<{ error: Error | null }>
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = supabase.auth.session()
    setUser(session?.user ?? undefined)
    setLoading(false)

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? undefined)
        setLoading(false)
      }
    )

    return () => {
      listener?.unsubscribe()
    }
  }, [])

  const test = supabase.auth.signOut()

  const value: IAuthContext = {
    user,
    signUp: data => supabase.auth.signUp(data),
    signIn: data => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)!
}
