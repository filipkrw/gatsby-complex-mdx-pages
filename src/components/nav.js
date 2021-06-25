import React from "react"
import NavLink from "./nav-link"

export default function Nav() {
  return (
    <nav className="bg-gray-100 rounded-md px-5 py-3">
      <ul className="w-full flex flex-col sm:flex-row">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/about/filip">About Filip</NavLink>
        <NavLink to="/about/zuzanna">About Zuzanna</NavLink>
      </ul>
    </nav>
  )
}
