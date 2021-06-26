Recently I saw a Reddit post asking how to create more complex blog posts in Gatsby with use of MDX. Without diving into MDX implementation, remark plugins and remark plugins, the easiest way to achieve that is to create pages from multiple MDX files. In this article I'll demonstrate just that.

It's pretty straightforward if you already know the inner workings of Gatsby, but for less experienced, it might be a daunting task. This is a very minimal implementation, to demonstrate how to achieve that without any distractions. For the same reason, I didn't use TypeScript in this project.

You can find the final code [here](https://github.com/filipkrw/gatsby-multiple-mdx-pages-tutorial). If you want to talk to me, you can find me on Twitter [@filipkrw](https://twitter.com/filipkrw).

## Structure

We'll put all our pages in `src/complex-pages`. Every directory in that location with a file in it, will be transformed into a page. For example, with this file structure...

```
src/
├─ complex-pages/
│  ├─ aside.mdx
│  ├─ content.mdx
│  ├─ about/
│  │  ├─ aside.mdx
│  │  ├─ content.mdx
│  │  ├─ filip/
│  │  │  ├─ aside.mdx
│  │  │  ├─ content.mdx
│  │  ├─ zuzanna/
│  │  │  ├─ aside.mdx
│  │  │  ├─ content.mdx
```

...four pages will be produced: `/` (index page), `/about`, `/about/filip`, and `/about/zuzanna`, where each except of the index page, is composed of two `mdx` files: `aside.mdx` and `content.mdx`.

## Set-up

First, we need to install `gatsby-source-filesystem` and `gatsby-plugin-mdx`...

```
npm install gatsby-source-filesystem gatsby-plugin-mdx
```

...and add them as plugins to `gatsby-config.js`:

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `complexPage`,
        path: `${__dirname}/src/complex-pages`,
      },
    },
    `gatsby-plugin-mdx`,
  ],
}
```

`gatsby-source-filesystem` will grab every `mdx` file in `src/complex-pages`, attach the `complexPage` name to them (usefull later), and make them into graphql nodes. `gatsby-plugin-mdx` will transform the content of those files into React components and append them to those graphql nodes.

## Creating pages

Every `mdx` file path (relative to `src/complex-pages`) can be divided into two parts: directory path and filename. For example, for `/about/zuzanna/aside.mdx`, the directory path will be `/about/zuzanna` and the filename, obviously, is `aside.mdx`. **We'll use the directory path as the page path, and the filename (without the `mdx` extension) as a section name.**

To add those to graphql, we'll use the `onCreateNode` hook in `gatsby-node.js`, which facilitates creating new node fields.

```js
// gatsby-node.js
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.sourceInstanceName === "complexPage") {
    const filePath = createFilePath({ node, getNode, trailingSlash: false })
    const pagePath = path.dirname(filePath)
    const sectionName = path.basename(filePath)

    createNodeField({
      name: `pagePath`,
      value: pagePath,
      node,
    })

    createNodeField({
      name: `sectionName`,
      value: sectionName,
      node,
    })
  }
}
```

Here, for every `complexPage` file, we get its path, divide it to the page path and section name, and add them as new fields.

With those set-up, we can finally create the pages. For that we'll use the `createPages` hook in `gatsby-node.js`.

```js
// gatsby-node.js
exports.createPages = async ({ actions, graphql, reporter }) => {
  const sections = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "complexPage" } }) {
        nodes {
          fields {
            pagePath
          }
        }
      }
    }
  `)

  // Get paths and filter out duplicates
  const pagePaths = sections.data.allFile.nodes
    .map(node => node.fields.pagePath)
    .filter((value, index, self) => self.indexOf(value) === index)

  pagePaths.forEach(pagePath => {
    actions.createPage({
      path: pagePath,
      component: require.resolve("./src/components/complexPage.js"),
      context: { pagePath },
    })
  })
}
```

Here, we grab the page paths of all the `complexPage` files, filter out duplicates, and finally, create the pages based on them.

## Render

All that's left, is to grab all the sections in the component specified in `createPages`, and render them. Earlier, while creating the pages, we added `pagePath` to page context. We'll now use it to grab sections for a particular page.

```js
// src/components/complex-page.js
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
```

In the component itself, we can map section content to its name, and render accordingly.

```js
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
```

And voila!

There a couple more things you can do to make the code more resilient. For example, if the `complex-pages` directory doesn't exist, `gatsby-source-filesystem` will throw and error and Gatsby won't run. We can aid that, by checking if the directory exists, and if not, create it automatically (see `onPreBootstrap` ...).

```
code here
```

Similarly, if there are no files in the directory, GraphQL will cry about not being able to locate the `fields` and `childMdx` fields (which we are querying in the page component). This we can fix by defining those fields using the [`createSchemaCustomization` hook](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createSchemaCustomization).

```javascript
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type File {
			childMdx: Mdx
      fields: Fields
    }
    type Fields {
      pagePath: String
			sectionName: String
    }
  `
  createTypes(typeDefs)
}
```

This is just one way to achieve this (...).

---

1. Grab files from `src/complex-pages` with `gatsby-source-filesystem`.
2. In `onCreateNode` hook, add `pagePath` and `sectionName` fields based on their paths.
3. In `createPages` hook, create a page for every unique `pagePath`.
4. In the page component, grab all MDX files which have the specified `pagePath`.
5. Profit!

- Maybe customise schema?
- Maybe customise component? Based on frontmatter?

An overview, if in doubt, refer to the documentation, or ask me on Twitter.
