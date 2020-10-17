const withTM = require('next-transpile-modules')(['@radui/radui/src']) // pass the modules you would like to see transpiled

module.exports = withTM()
