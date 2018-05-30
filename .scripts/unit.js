const { major } = require("semver");
const { spawn, exec } = require("child_process");
const { join } = require("path");

const webpackDevServer = spawn(join(__dirname, "../node_modules/.bin/ts-node"), [join(__dirname, "../testserver")], { shell: true })
function cleanupDevServer() {
  webpackDevServer.stderr.destroy();
  webpackDevServer.stdout.destroy();
  webpackDevServer.kill();
};

let mochaRunning = false
const webpackDevServerHandler = (data) => {
  if (!mochaRunning) {
    mochaRunning = true

    const mochaChromePromise = new Promise((resolve, reject) => {
      if (major(process.version) < 8) {
        // Skip browser tests in pre-node 8
        resolve();
      } else {
        const mochaChromeExecutable = join(__dirname, "../node_modules/.bin/mocha-chrome");
        exec(`${mochaChromeExecutable} http://localhost:3001`, (err, stdout, stderr) => {
          if (err) {
            reject(err);
          } else {
            console.log(stdout);
            console.error(stderr);
            resolve();
          }
        });
      }
    });

    const mochaPromise = new Promise((resolve, reject) => {
      const mochaExecutable = join(__dirname, "../node_modules/.bin/_mocha");
      const mocha = exec(mochaExecutable, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          console.log(stdout);
          console.error(stderr);
          resolve();
        }
      });
    });

    Promise.all([mochaPromise, mochaChromePromise]).then(res => {
      cleanupDevServer();
      process.exit(0);
    }).catch((err) => {
      console.error(err);
      cleanupDevServer();
      process.exit(1);
    });
  }
}

webpackDevServer.stderr.on('data', data => {
  console.error("webpack dev server error:", data.toString());
});

webpackDevServer.stdout.on('data', webpackDevServerHandler);
webpackDevServer.on('exit', webpackDevServerHandler);
