const rules = require('../lib/rules/alternative-camelcase');
const rule = rules;
const message = rules.message;

const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

const valid = [
  {
    code: 'const CONST_VAR = "";',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
  },
  {
    code: 'const CONST_VAR = true;',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
  },
  {
    code: 'const CONST_VAR = 123;',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
  },
  // {
  //   code: 'const objectVar = {};',
  // parserOptions: { ecmaVersion: 6, sourceType: "module" },
  // },
  // {
  //   code: 'const objectVar = [];',
  // parserOptions: { ecmaVersion: 6, sourceType: "module" },
  // },
  {
    code: 'const objectVar = require(\'child_process\');',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
  },
  {
    code: 'let objectVar = "";',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
  },
  {
    code: 'let objectVar = {};',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
  },
];

const invalid = [
  {
    code: 'const constVar = "";',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
    errors: [{
      message: "Identifier 'constVar' should use ALL_CAP instead of lowerCamelCase."
    }]
  },
  {
    code: 'const constVar = true;',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
    errors: [{
      message: "Identifier 'constVar' should use ALL_CAP instead of lowerCamelCase."
    }]
  },
  {
    code: 'const constVar = 123.45;',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
    errors: [{
      message: "Identifier 'constVar' should use ALL_CAP instead of lowerCamelCase."
    }]
  },
  {
    code: 'const objVar = {};',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
    errors: [{
      message: message.useLet
    }]
  },
  {
    code: 'const objVar = [];',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
    errors: [{
      message: message.useLet
    }]
  },
  {
    code: 'const OBJ_VER = {};',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
    errors: [{
      message: message.useLet
    }]
  },
  {
    code: 'const OBJ_VER = [];',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
    errors: [{
      message: message.useLet
    }]
  },
  {
    code: 'let CONST_VAR = 123.45;',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
    errors: [{
      message: "Identifier 'CONST_VAR' should use lowerCamelCase instead of ALL_CAP."
    }]
  },
  {
    code: 'let CONST_VAR = {};',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
    errors: [{
      message: "Identifier 'CONST_VAR' should use lowerCamelCase instead of ALL_CAP."
    }]
  },
  {
    code: 'const IMPORT_VAR = require(\'child_process\');',
    parserOptions: { ecmaVersion: 6, sourceType: "module" },
    errors: [{
      message: "Identifier 'IMPORT_VAR' should use lowerCamelCase instead of ALL_CAP."
    }]
  },
];

ruleTester.run('alternative-camelcase', rule, { valid, invalid });
