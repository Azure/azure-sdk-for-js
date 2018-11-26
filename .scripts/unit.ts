import { major } from "semver";
import { spawn, exec, ExecException, ChildProcess, spawnSync, execSync } from "child_process";
import { join } from "path";
import kill from "tree-kill";
import { execute } from "./dependencies";

const repositoryRootFolderPath: string = join(__dirname, "..");
const nodeModulesBinFolderPath: string = join(repositoryRootFolderPath, "node_modules/.bin/");
const tsNodeFilePath: string = join(nodeModulesBinFolderPath, "ts-node");
const testServerFolderPath: string = join(repositoryRootFolderPath, "testserver");
const mochaExecutable = join(nodeModulesBinFolderPath, "_mocha");
const mochaChromeFilePath: string = join(nodeModulesBinFolderPath, "mocha-chrome");

/**
 * Execute the provided command on the shell synchronously.
 * @param {string} command The command to execute.
 * @param {string} workingDirectory The working directory to execute the command in.
 * @returns {void}
 */
function execute(command: string, workingDirectory: string): number {
  log(workingDirectory, `Running "${command}"...`);
  return spawnSync(command, { cwd: workingDirectory, stdio: [0, 1, 2] }).status;
}

function runNodeJsUnitTests(): number {
  return spawnSync(mochaExecutable)
}

const webpackDevServer: ChildProcess = spawn(tsNodeFilePath, ["-T", testServerFolderPath], { shell: true });
function cleanupDevServer(): void {
  webpackDevServer.stderr.destroy();
  webpackDevServer.stdout.destroy();
  console.log(`kill ${webpackDevServer.pid}`);
  kill(webpackDevServer.pid);
  console.log(`Killed dev server.`);
}

let mochaRunning = false;
const webpackDevServerHandler = () => {
  if (!mochaRunning) {
    mochaRunning = true;

    const mochaChromePromise = new Promise((resolve, reject) => {
      if (major(process.version) < 8) {
        // Skip browser tests in pre-node 8
        resolve();
      } else {
        exec(`${mochaChromeFilePath} http://localhost:${process.env.PORT || 3001} --timeout 60000`, (err, stdout, stderr) => {
          console.log(`Browser output: "${stdout}"`);
          console.error(`Browser error: "${stderr}"`);
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });

    const mochaPromise = new Promise((resolve, reject) => {
      exec(mochaExecutable, (err: ExecException | null, stdout: string, stderr: string) => {
        console.log(stdout);
        console.log(`Node.js error: "${stderr}"`);
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    Promise.all([mochaPromise, mochaChromePromise]).then(() => {
      console.log(`Overall done.`);
      cleanupDevServer();
      process.exit(0);
    }).catch((err) => {
      console.log(`Error: ${JSON.stringify(err)}`);
      cleanupDevServer();
      process.exit(1);
    });
  }
};

webpackDevServer.stderr.on("data", data => {
  console.error("webpack dev server error:", data.toString());
});

webpackDevServer.stdout.on("data", webpackDevServerHandler);
webpackDevServer.on("exit", webpackDevServerHandler);
