'use strict'

const readAnderson = require('./lib/read-anderson')
const getDependencies = require('./lib/get-dependencies')
const licenseSearch = require('./lib/license-search')

module.exports = async ({ dev = false, peer = false } = {}) => {
  const modules = await licenseSearch()
  const anderson = await readAnderson()
  const {
    dependencies,
    devDependencies,
    peerDependencies
  } = await getDependencies({ dev, peer })

  let result = []

  modules.forEach(module => {
    dependencies.forEach(dependency => {
      if (module.pkg.name === dependency.name) {
        if (anderson && anderson.whitelist) {
          anderson.whitelist.forEach(license => {
            if (module.pkg.license !== license) {
              return (dependency.contraband = true)
            }

            return (dependency.contraband = false)
          })
        }

        if (anderson && anderson.blacklist) {
          anderson.blacklist.forEach(license => {
            if (module.pkg.license === license) {
              return (dependency.contraband = true)
            }

            return (dependency.contraband = false)
          })
        }

        dependency.license = module.pkg.license

        return dependency
      }
    })

    if (dev) {
      devDependencies.forEach(dependency => {
        if (module.pkg.name === dependency.name) {
          if (anderson && anderson.whitelist) {
            anderson.whitelist.forEach(license => {
              if (module.pkg.license !== license) {
                return (dependency.contraband = true)
              }

              return (dependency.contraband = false)
            })
          }

          if (anderson && anderson.blacklist) {
            anderson.blacklist.forEach(license => {
              if (module.pkg.license === license) {
                return (dependency.contraband = true)
              }

              return (dependency.contraband = false)
            })
          }

          dependency.license = module.pkg.license

          return dependency
        }
      })
    }

    if (peer) {
      peerDependencies.forEach(dependency => {
        if (module.pkg.name === dependency.name) {
          if (anderson && anderson.whitelist) {
            anderson.whitelist.forEach(license => {
              if (module.pkg.license !== license) {
                return (dependency.contraband = true)
              }

              return (dependency.contraband = false)
            })
          }

          if (anderson && anderson.blacklist) {
            anderson.blacklist.forEach(license => {
              if (module.pkg.license === license) {
                return (dependency.contraband = true)
              }

              return (dependency.contraband = false)
            })
          }

          dependency.license = module.pkg.license

          return dependency
        }
      })
    }
  })

  result = [...result, ...dependencies, ...devDependencies, ...peerDependencies]

  return result
}
