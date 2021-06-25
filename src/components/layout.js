import React from "react"
import Nav from "./nav"

export default function Layout({ children }) {
  return (
    <div className="flex justify-center">
      <div className="max-w-[800px] w-full m-5">
        <Nav />
        <section className="flex flex-col sm:flex-row justify-between my-5">
          {children}
        </section>
      </div>
    </div>
  )
}
