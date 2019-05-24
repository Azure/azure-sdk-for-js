import path from "path";
import { run, RunResult, RunOptions, Command, commandToString } from "@ts-common/azure-js-dev-tools";

async function execAndLog(executable: string, args?: string[], options?: RunOptions): Promise<any> {
  const command: Command = {
    executable,
    args,
  };

  console.log(`\n\nRunning ${commandToString(command)}`);

  const result: RunResult = await run(command, undefined, {
    ...options,
    log: console.log,
    showCommand: true,
    showResult: true,
  });

  console.log(`\Result of "${commandToString(command)}" [Exit code: ${result.exitCode}]:\n` + result.stdout + "\n");

  if (result.exitCode) {
    console.error(`Error while running "${commandToString(command)}": ${result.error}`);
    throw new Error(result.stderr);
  }

  return Promise.resolve(result);
}

(async () => {
  try {
    console.log(`Passed parameters:\n${process.argv}`);
    const msRestJsDirectory = path.join(__dirname, "..");
    console.log(`ms-rest-js directory: ${msRestJsDirectory}`);

    const projectName = process.argv[2];
    const projectDirectory = path.join(msRestJsDirectory, `../.tmp/${projectName}`);
    const gitHubUrl = `https://github.com/Azure/${projectName}.git`;

    await execAndLog(`git`, ["clone", gitHubUrl, projectDirectory, "--recursive"]);
    await execAndLog(`npm`, [ "install", msRestJsDirectory ], { executionFolderPath: projectDirectory });
    await execAndLog(`npm`, [ "install" ], { executionFolderPath: projectDirectory });

    const additionalCommands: string[] = process.argv.slice(3);
    for (const command of additionalCommands) {
      await execAndLog(command, undefined, { executionFolderPath: projectDirectory });
    }

    await execAndLog(`npm`, [ "run", "build" ], { executionFolderPath: projectDirectory });
    await execAndLog(`npm`, [ "run", "test" ], { executionFolderPath: projectDirectory });
    await execAndLog(`rm`, [ "-rf", projectDirectory ]);
  } catch (error) {
    process.exit(1);
  }
})();
