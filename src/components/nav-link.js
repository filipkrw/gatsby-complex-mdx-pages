import React from "react"
import { Link } from "gatsby"

export default function NavLink({ to, children }) {
  return (
    <li className="mr-8 last:mr-0 my-2">
      <Link
        to={to}
        className="border-b-2 border-gray-300 hover:border-gray-400 pb-px"
        activeClassName="!border-gray-500"
      >
        {children}
      </Link>
    </li>
  )
}
