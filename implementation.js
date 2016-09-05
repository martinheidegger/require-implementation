'use strict'

var PackageMissingError = require('package-missing')

module.exports = function (task) {
  return {
    require: function (dependency) {
      try {
        return require(dependency)
      } catch (e) {
        throw new PackageMissingError(task, dependency)
      }
    },

    requireFirst: function (dependencies) {
      var length = dependencies.length
      for (var i = 0; i < length; i++) {
        var dependency = dependencies[i]
        try {
          return {
            name: dependency,
            pkg: require(dependency)
          }
        } catch (e) {}
      }
      throw new PackageMissingError(task, dependencies)
    }
  }
}
