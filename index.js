'use strict'

const readAnderson = require('./lib/read-anderson')
const getDependencies = require('./lib/get-dependencies')
const licenseSearch = require('./lib/license-search')

module.exports = async () => {
  const { blacklist } = await readAnderson()
  const { dependencies } = await getDependencies()
  const licenses = await licenseSearch()
  const pkgs = []

  licenses.filter(license => {
    return dependencies.filter(dependency => {
      if (license.pkg.name === dependency.name) {
        const hasList = blacklist ? blacklist : undefined
        const contraband = hasList
          ? blacklist.indexOf(license.pkg.license) !== -1
          : false
        const pkg = Object.assign(
          {},
          {
            name: license.pkg.name,
            version: license.pkg.version,
            license: license.pkg.license,
            contraband
          }
        )

        return pkgs.push(pkg)
      }

      return false
    })
  })

  return pkgs
}
