'use strict'

const readPackage = require('read-package')

module.exports = async ({ dev = true, peer = true } = {}) => {
  try {
    const pkg = await readPackage()
    const dependencies = []
    const devDependencies = []
    const peerDependencies = []

    if (pkg.hasOwnProperty('dependencies')) {
      const keys = Object.keys(pkg.dependencies)

      keys.map(name => {
        const version = pkg.dependencies[name]
        return dependencies.push({ name, version })
      })
    }

    if (pkg.hasOwnProperty('devDependencies') && dev) {
      const keys = Object.keys(pkg.devDependencies)

      keys.map(name => {
        const version = pkg.devDependencies[name]
        return devDependencies.push({ name, version })
      })
    }

    if (pkg.hasOwnProperty('peerDependencies') && peer) {
      const keys = Object.keys(pkg.peerDependencies)

      keys.map(name => {
        const version = pkg.peerDependencies[name]
        return peerDependencies.push({ name, version })
      })
    }

    return {
      dependencies,
      devDependencies,
      peerDependencies
    }
  } catch (err) {
    return err
  }
}
