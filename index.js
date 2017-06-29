'use strict'

const readAnderson = require('./lib/read-anderson')
const getDependencies = require('./lib/get-dependencies')
const licenseSearch = require('./lib/license-search')

module.exports = async ({ dev = false, peer = false } = {}) => {
  const modules = await licenseSearch()
  const anderson = await readAnderson()
  const whitelist = anderson.whitelist
  const { dependencies } = await getDependencies({ dev, peer })

  whitelist.map(license => {
    return modules.map(module => {
      return dependencies.map(dependency => {
        if (module.pkg.name === dependency.name) {
          dependency.license = module.pkg.license

          if (module.pkg.license !== license) {
            return (dependency.contraband = true)
          }

          return (dependency.contraband = false)
        }

        return false
      })
    })
  })

  return dependencies
}
