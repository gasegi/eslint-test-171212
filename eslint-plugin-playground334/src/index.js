//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
const alternativeCamelcase = require('./rules/alternative-camelcase');
module.exports = {
  rules: {
    'alternative-camelcase': alternativeCamelcase
  }
}
