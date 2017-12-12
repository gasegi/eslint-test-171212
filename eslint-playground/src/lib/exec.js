const child_process = require('child_process');

function exec(command) {
    return new Promise((s, t) => {
        childProcess.exec(command, {
            encoding: 'utf8'
        }, (err, stdout, stderr) => {
            if (err) {
                t(err);
            } else if (stderr) {
                t(stderr);
            } else {
                s(stdout);
            }
        });
    });
}

module.exports = {
    exec: exec
};