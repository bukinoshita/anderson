'use strict'

import test from 'ava'
import m from './'

test(async t => {
  const n = await m()
  t.is(typeof n, 'object')
  t.is(n.length, 2)
  n.map(j => {
    t.truthy(j.name)
    t.truthy(j.version)
    t.truthy(j.license)
    t.false(j.contraband)

    return true
  })
})
