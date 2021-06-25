import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "./layout"
import Title from "./title"
import Main from "./main"
import Aside from "./aside"

import "../styles.css"

export const query = graphql`
  query($pagePath: String!) {
    allFile(filter: { fields: { pagePath: { eq: $pagePath } } }) {
      nodes {
        fields {
          sectionName
        }
        childMdx {
          frontmatter {
            title
          }
          body
        }
      }
    }
  }
`

export default function ComplexPage({ data }) {
  const { content, aside } = data.allFile.nodes.reduce((result, node) => {
    result[node.fields.sectionName] = node.childMdx
    return result
  }, {})

  return (
    <Layout>
      {content && (
        <Main>
          <Title>{content.frontmatter.title}</Title>
          <MDXRenderer>{content.body}</MDXRenderer>
        </Main>
      )}
      {aside && (
        <Aside>
          <MDXRenderer>{aside.body}</MDXRenderer>
        </Aside>
      )}
    </Layout>
  )
}
