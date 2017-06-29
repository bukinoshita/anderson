'use strict'

const fs = require('fs')
const yaml = require('js-yaml')

module.exports = async () => {
  try {
    return yaml.safeLoad(
      fs.readFileSync(`${process.cwd()}/.anderson.yml`, 'utf8')
    )
  } catch (err) {
    return err
  }
}
