import React from "react"
import { Helmet } from "react-helmet"
import Nav from "./nav"

export default function Layout({ children }) {
  return (
    <>
      <Helmet title="Gatsby Complex MDX Pages Tutorial"></Helmet>
      <div className="flex justify-center">
        <div className="max-w-[800px] w-full m-5">
          <Nav />
          <section className="flex flex-col sm:flex-row justify-between my-5">
            {children}
          </section>
        </div>
      </div>
    </>
  )
}
