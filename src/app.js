const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const conf = require('./config/defaultConfig');
const route = require('./helper/router');
const openUrl = require('./helper/openUrl');

class Server {
    constructor (config) {
        this.conf = Object.assign({}, conf, config);
    }

    start() {
        const serve = http.createServer((req,res) => {
            const filePath = path.join(this.conf.root, req.url);
            route(req, res, filePath, this.conf);
        })
        
        serve.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            console.info(`Server started at ${chalk.green(addr)}`)
            openUrl(addr);
        })
    }
}

module.exports = Server;