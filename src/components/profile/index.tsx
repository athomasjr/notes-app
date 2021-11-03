import { RouteComponentProps } from "@reach/router"
import supabase from "lib/db"
import React from "react"

interface IProfileProps extends RouteComponentProps {}

export default function Profile({}: IProfileProps) {
  return <div>profile</div>
}

export async function getServerData() {}
