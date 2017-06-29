'use strict'

const fs = require('fs')
const readPackage = require('read-package')

module.exports = async () => {
  const nm = `${process.cwd()}/node_modules`

  if (!fs.lstatSync(nm).isDirectory()) {
    return nm
  }

  const directories = fs.readdirSync(nm)
  const n = []

  directories.forEach(directory => {
    return readPackage(`${nm}/${directory}`)
      .then(pkg => n.push({ name: directory, pkg }))
      .catch(err => n.push({ name: directory, pkg: err }))
  })

  return n
}
