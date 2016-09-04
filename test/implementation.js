'use strict'
var test = require('tap').test
var impl = require('..')

test('Get a required implementation.', function (t) {
  var requiredTap = impl('foo').require('tap')
  t.equal(requiredTap.test, test)
  t.end()
})
test('Get a non-existing dependency should result in a helpful error.', function (t) {
  try {
    impl('foo').require('os-user')
    t.fail('os-user should not have been available.')
  } catch (e) {
    t.equal(e.code, 'EPACKAGEMISSING')
    t.deepEqual(e.recommendedPackages, ['os-user'])
  }
  t.end()
})
test('Getting a fallback implementation.', function (t) {
  var requiredTap = impl('foo').requireFirst(['os-user', 'tap'])
  t.equal(requiredTap.name, 'tap')
  t.equal(requiredTap.pkg.test, test)
  t.end()
})
test('Failing with fallback implementations.', function (t) {
  try {
    impl('foo').requireFirst(['os-user', 'os-path'])
    t.fail('os-user or os-path should not have been available.')
  } catch (e) {
    t.equal(e.code, 'EPACKAGEMISSING')
    t.deepEqual(e.recommendedPackages, ['os-user', 'os-path'])
  }
  t.end()
})
