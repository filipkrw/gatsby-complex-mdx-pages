import React from "react"

export default function Aside({ children }) {
  return (
    <aside className="w-full sm:w-[60%] p-3 border border-gray-200 rounded-md sm:mt-0 mt-5">
      {children}
    </aside>
  )
}
