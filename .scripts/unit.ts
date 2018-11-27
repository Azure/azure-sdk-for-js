import { major } from "semver";
import { spawn, ChildProcess, spawnSync, SpawnSyncReturns } from "child_process";
import { join } from "path";

const repositoryRootFolderPath: string = join(__dirname, "..");
const nodeModulesBinFolderPath: string = join(repositoryRootFolderPath, "node_modules/.bin/");
const tsNodeFilePath: string = join(nodeModulesBinFolderPath, "ts-node");
const testServerFolderPath: string = join(repositoryRootFolderPath, "testserver");
const mochaExecutable = join(nodeModulesBinFolderPath, "_mocha");
const mochaChromeFilePath: string = join(nodeModulesBinFolderPath, "mocha-chrome");

interface ServerProcess extends ChildProcess {
  serverPid?: number;
}

/**
 * Execute the provided command on the shell synchronously.
 * @param {string} command The command to execute.
 * @param {string} workingDirectory The working directory to execute the command in.
 * @returns {void}
 */
function executeSync(command: string, workingDirectory: string): SpawnSyncReturns<string> {
  console.log(`Running "${command}"...`);
  const result: SpawnSyncReturns<string> = spawnSync(command, { cwd: workingDirectory, stdio: [0, 1, 2], encoding: "utf8", shell: true });
  if (result.error) {
    throw result.error;
  }
  return result;
}

function startTestServer(): Promise<ServerProcess> {
  return new Promise((resolve, reject) => {
    console.log(`Starting "${tsNodeFilePath} ${testServerFolderPath}"...`);
    const testServer: ServerProcess = spawn(tsNodeFilePath, [testServerFolderPath], { cwd: repositoryRootFolderPath, shell: true });

    let testServerRunning = false;
    testServer.stdout.on("data", (chunk: any) => {
      const chunkString: string = chunk.toString("utf8");
      const matchResult: RegExpMatchArray | null = chunkString.match(/ms-rest-js testserver \((.*)\) listening on port (.*).../);
      if (matchResult) {
        testServer.serverPid = parseInt(matchResult[1]);
      }

      if (testServer.serverPid == undefined) {
        reject(new Error("Test server didn't output its process id in its start message."));
      } else if (!testServerRunning) {
        testServerRunning = true;
        resolve(testServer);
      }
    });
    testServer.stderr.on("data", (data: any) => {
      console.error(`Test server error: "${data}"`);
      reject();
    });
    testServer.on("exit", (code: number, signal: string) => {
      console.log(`Test server exit code: ${code}, signal: ${signal}`);
      if (!testServerRunning) {
        testServerRunning = true;
        resolve(testServer);
      }
    });
  });
}

function stopProcess(processId: number | undefined): void {
  if (processId != undefined) {
    console.log(`Stopping process ${processId}...`);
    process.kill(processId);
  }
}

function stopTestServer(testServer: ServerProcess): void {
  stopProcess(testServer.pid);
  stopProcess(testServer.serverPid);
}

function runNodeJsUnitTests(): number {
  console.log(`Running Node.js Unit Tests...`);
  return executeSync(mochaExecutable, repositoryRootFolderPath).status;
}

function runBrowserUnitTests(): number {
  console.log(`Running Browser Unit Tests...`);
  const portNumber: string | number = process.env.PORT || 3001;
  return executeSync(`${mochaChromeFilePath} http://localhost:${portNumber} --timeout 60000`, repositoryRootFolderPath).status;
}

let exitCode = 0;
startTestServer()
  .then((testServer: ChildProcess) => {
    try {
      exitCode = runNodeJsUnitTests();
      if (exitCode === 0) {
        if (major(process.version) >= 8) {
          exitCode = runBrowserUnitTests();
        }
      }
    } finally {
      stopTestServer(testServer);
    }
  })
  .catch((error: Error) => {
    console.log(`Error: ${error}`);
  })
  .finally(() => {
    process.exit(exitCode);
  });