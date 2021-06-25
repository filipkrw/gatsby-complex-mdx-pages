const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const fs = require(`fs`)

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

  if (sections.data.allFile.nodes.length === 0) {
    return
  }

  // Get paths and filter out duplicates
  const pagePaths = sections.data.allFile.nodes
    .map(node => node.fields.pagePath)
    .filter((value, index, self) => self.indexOf(value) === index)

  pagePaths.forEach(pagePath => {
    actions.createPage({
      path: pagePath,
      component: require.resolve("./src/components/complex-page.js"),
      context: { pagePath },
    })
  })
}

exports.onPreBootstrap = () => {
  const dir = `src/complex-pages`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

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
