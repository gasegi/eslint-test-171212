const message = {
    uselet: "Identifier '{{name}}' should use `let` statement instead of `const`.",
    useUpper: "Identifier '{{name}}' should use ALL_CAP instead of lowerCamelCase.",
    useCamel: "Identifier '{{name}}' should use lowerCamelCase instead of ALL_CAP.",
};

function isUnderscored(name) {
    return name.indexOf("_") > -1 || /^[A-Z]*$/.test(name.replace(/^_+|_+$/g, ""));
}

function isCamelCase(name) {
    return name.indexOf("_") === -1 || /^[a-z]\w*[a-z]$/.test(name);
}

module.exports = {
    meta: {
        schema: [] // no options
    },
    create: alternativeCamelcase,
    message
};

function alternativeCamelcase(context) {
    return {
        VariableDeclarator: node => {
            const { parent, id, init } = node;
            const name = id.name.replace(/^_+|_+$/g, "");

            // console.log('Literal', init.type, id.name);
            // console.log('parent.kind', parent.kind);
            // console.log('isUnderscored', name, isUnderscored(name));
            // console.log('isCamelCase', name, isCamelCase(name));
            // console.log(name, 'isUnderscored(name): ', isUnderscored(name));

            if (parent.kind === 'const') {
                if (init.type === 'Literal') {
                    if (!isUnderscored(name)) {
                        // console.log('id:', id);
                        context.report({
                            node: id,
                            message: message.useUpper,
                            data: {
                                name: id.name
                            }
                        });
                    }
                } else if (init.type === 'CallExpression') {
                    if (!isCamelCase(name)) {
                        context.report({
                            node: id,
                            message: message.useCamel,
                            data: {
                                name: id.name
                            }
                        });
                    }
                } else if (init.type === 'ObjectExpression' || init.type === 'ArrayExpression') {
                    context.report({
                        node: id,
                        message: message.uselet,
                        data: {
                            name: id.name
                        }
                    });
                }

            } else if (parent.kind === 'let') {

                if (!isCamelCase(name)) {
                    // console.log('!id:', id);
                    context.report({
                        node: id,
                        message: message.useCamel,
                        data: {
                            name: id.name
                        }
                    });
                }
            }

            // id.properties.forEach(property => {
            //     if (test(property.key.name)) {
            //         context.report(property, message[RegExp.$1.toLowerCase()]);
            //     }
            // });
        }
    };
};

