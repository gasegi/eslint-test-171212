const exec = require('./lib/exec'); // NO ERROR

const TIMEOUT = 3000; // ERROR(full upperに変更が必要)
const obj = {}; // ERROR(letに変更が必要)

// let はすべて lower camelcase

console.log('program start');

new Promise((s, t) => {
    s(exec.exec('qwinsta'))
}).then(result => {
    obj.result = result;
    console.log(result);;;;;;;
}).then(() => {
    return new Promise((s, t) => {
        setTimeout(() => {
            console.log('program end:', TIMEOUT, 'ms');
            s();
        }, TIMEOUT)
    });
}).catch(err => {
    console.error(err)
});