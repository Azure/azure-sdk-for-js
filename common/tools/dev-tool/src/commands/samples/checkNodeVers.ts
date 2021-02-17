// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";
import pr from "child_process";
import os from "os";

import { createPrinter } from "../../util/printer";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { S_IRWXO } from "constants";
import { resolveProject } from "../../util/resolveProject";

const log = createPrinter("check-node-vers-samples");

function spawnCMDIgnoreError(
  cmd: string,
  args: string[],
  errorMessage?: string,
  callback?: () => void
) {
  const spawnedProcess = pr.spawn(cmd, args);
  spawnedProcess.on("error", function() {
    log.info(errorMessage);
    callback?.();
  });
  spawnedProcess.on("exit", function() {
    callback?.();
  });
}

function deleteDockerContainerCallback(deleteContainerNames?: string[], callback?: () => void) {
  if (deleteContainerNames) {
    log.info(`cleanup: deleting ${deleteContainerNames.join(", ")} docker containers`);
    spawnCMDIgnoreError(
      "docker",
      ["rm", ...deleteContainerNames, "-f"],
      `Attempted to delete ${deleteContainerNames.join(
        ", "
      )} docker containers but encountered an error doing so`,
      callback
    );
  } else {
    callback?.();
  }
}

function deleteDockerImageCallback(dockerImageNames?: string[], callback?: () => void) {
  if (dockerImageNames) {
    log.info(`cleanup: deleting ${dockerImageNames.join(", ")} docker images`);
    spawnCMDIgnoreError(
      "docker",
      ["rmi", ...dockerImageNames, "-f"],
      `Attempted to delete the ${dockerImageNames.join(
        ", "
      )} docker images but encountered an error doing so`,
      callback
    );
  } else {
    callback?.();
  }
}

function deleteDockerContextCallback(dockerContextDirectory?: string, callback?: () => void) {
  if (dockerContextDirectory) {
    log.info(`cleanup: deleting the ${dockerContextDirectory} docker context directory`);
    spawnCMDIgnoreError("rm", ["-rf", dockerContextDirectory], undefined, callback);
  } else {
    callback?.();
  }
}

function cleanup(
  dockerContextDirectory?: string,
  dockerContainerNames?: string[],
  dockerImageNames?: string[],
  callback?: () => void
) {
  deleteDockerContextCallback(dockerContextDirectory, () =>
    deleteDockerContainerCallback(dockerContainerNames, () =>
      deleteDockerImageCallback(dockerImageNames, callback)
    )
  );
}

function buildRunSamplesScript(
  containerWorkspacePath: string,
  packageName: string,
  envFileName: string,
  logFilePath?: string
) {
  function compileCMD(cmd: string, printToScreen?: boolean) {
    return printToScreen ? cmd : `${cmd} >> ${logFilePath} 2>&1`;
  }
  const printToScreen = logFilePath === undefined;
  const packagePath = `${containerWorkspacePath}/${packageName}`;
  const envFilePath = `${containerWorkspacePath}/${envFileName}`;
  const javascriptSamplesPath = `${containerWorkspacePath}/samples/javascript`;
  const typescriptCompiledSamplesPath = `${containerWorkspacePath}/samples/typescript/dist`;
  const scriptContent = `#!/bin/sh

function install_dependencies_helper() {
\tlocal samples_path=\$1;
\tcd \${samples_path};
\t${compileCMD(`npm install ${packagePath}`, printToScreen)}
\t${compileCMD(`npm install`, printToScreen)}
}

function install_packages() {
\techo "Using node \$(node -v) to install dependencies";
\tinstall_dependencies_helper ${containerWorkspacePath}/samples/javascript
\tinstall_dependencies_helper ${containerWorkspacePath}/samples/typescript;
\tcp ${envFilePath} ${containerWorkspacePath}/samples/javascript/;
}

function run_samples() {
\tsamples_path=\$1;
\techo "Using node \$(node -v) to run samples in \${samples_path}";
\tcd "\${samples_path}";
\tfor SAMPLE in *.js; do
\t\tnode \${SAMPLE};
\tdone
}

function build_typescript() {
\techo "Using node \$(node -v) to build the typescript samples";
\tcd ${containerWorkspacePath}/samples/typescript
\t${compileCMD(`npm run build`, printToScreen)}
\tcp ${envFilePath} ${containerWorkspacePath}/samples/typescript/dist/
}

function main() {
\tinstall_packages;
\trun_samples "${javascriptSamplesPath}";
\tbuild_typescript && run_samples "${typescriptCompiledSamplesPath}";
}

main`;
  return scriptContent;
}

function createDockerContextDirectory(
  dockerContextDirectory: string,
  containerWorkspacePath: string,
  samples_path: string,
  envPath: string,
  packagePath?: string,
  logFilePath?: string,
  callback?: () => void
): void {
  if (packagePath === undefined) {
    throw new Error("package_path is a required argument but it was not passed");
  }
  const packageName = path.basename(packagePath);
  const envFileName = path.basename(envPath);
  fs.copySync(samples_path, path.join(dockerContextDirectory, "samples"));
  fs.copyFileSync(packagePath, path.join(dockerContextDirectory, packageName));
  fs.copyFileSync(envPath, path.join(dockerContextDirectory, envFileName));
  fs.writeFileSync(
    path.join(dockerContextDirectory, "run_samples.sh"),
    buildRunSamplesScript(containerWorkspacePath, packageName, envFileName, logFilePath),
    { mode: S_IRWXO }
  );
  callback?.();
}

function runDockerContainer(
  dockerContextDirectory: string,
  dockerImageName: string,
  dockerContainerName: string,
  containerWorkspace: string,
  stdoutListener: (chunk: string | Buffer) => void,
  stderrListener: (chunk: string | Buffer) => void,
  callback?: () => void
) {
  const args = [
    "run",
    "--name",
    dockerContainerName,
    "--workdir",
    containerWorkspace,
    "-v",
    `${dockerContextDirectory}:${containerWorkspace}`,
    dockerImageName,
    "./run_samples.sh"
  ];
  const dockerContainerRunProcess = pr.spawn("docker", args, {
    cwd: dockerContextDirectory
  });
  log.info(`Started running the docker container ${dockerContainerName}`);
  dockerContainerRunProcess.stdout.on("data", stdoutListener);
  dockerContainerRunProcess.stderr.on("data", stderrListener);
  dockerContainerRunProcess.on("exit", function(code) {
    if (code === 0) {
      log.info("Docker container finished running");
      callback?.();
    } else {
      log.error("Docker container encountered an error");
    }
  });
}

export const commandInfo = makeCommandInfo(
  "checkNodesVers",
  "execute samples with different node versions, typically in preparation for release",
  {
    package_path: {
      kind: "string",
      description: "Path to the downloaded package built by the release pipeline"
    },
    directory: {
      kind: "string",
      description: "Base dir, default is process.cwd()",
      default: process.cwd()
    },
    node_versions: {
      kind: "string",
      description: "A comma separated list of node versions to use",
      default: "8,10,12"
    },
    context_directory_path: {
      kind: "string",
      description: "Absolute path to a directory used for mounting inside docker containers",
      default: ""
    },
    keep_docker_context: {
      kind: "boolean",
      description: "Boolean to indicate whether to keep the current docker context directory",
      default: false
    },
    log_in_file: {
      kind: "boolean",
      description:
        "Boolean to indicate whether to save the the stdout and sterr for npm commands to the log.txt log file",
      default: true
    },
    use_existing_docker_container: {
      kind: "boolean",
      description: "Boolean to indicate whether to use existing docker containers if any",
      default: false
    },
    keep_docker_container: {
      kind: "boolean",
      description: "Boolean to indicate whether to keep docker containers",
      default: false
    },
    keep_docker_image: {
      kind: "boolean",
      description: "Boolean to indicate whether to keep the downloaded docker images",
      default: false
    }
  }
);

export default leafCommand(commandInfo, async (options) => {
  const nodeVersions = options.node_versions?.split(",");
  const dockerContextDirectory: string =
    options.context_directory_path === ""
      ? await fs.mkdtemp(path.join(os.tmpdir(), "context"))
      : options.context_directory_path;
  const pkg = await resolveProject(options.directory);
  const samplesPath = path.join(pkg.path, "samples");
  const envFilePath = path.join(pkg.path, ".env");
  const keepDockerContextDirectory = options.keep_docker_context;
  const dockerImageNames = nodeVersions.map((version: string) => `node:${version}-alpine`);
  const dockerContainerNames = nodeVersions.map((version: string) => `${version}-container`);
  const containerWorkspace = "/workspace";
  const containerLogFilePath = options.log_in_file ? `${containerWorkspace}/log.txt` : undefined;
  const useExistingDockerContainer = options.use_existing_docker_container;
  const keepDockerContainers = options.keep_docker_container;
  const keepDockerImages = options.keep_docker_image;
  const stdoutListener = (chunk: Buffer | string) => log.info(chunk.toString());
  const stderrListener = (chunk: Buffer | string) => log.error(chunk.toString());
  async function cleanupBeforeCallback(callback?: () => void) {
    cleanup(
      (await fs.readdir(dockerContextDirectory)).length === 0 ? undefined : dockerContextDirectory,
      useExistingDockerContainer ? undefined : dockerContainerNames,
      undefined,
      callback
    );
  }
  function cleanupAfterCallback(callback?: () => void) {
    cleanup(
      keepDockerContextDirectory ? undefined : dockerContextDirectory,
      keepDockerContainers ? undefined : dockerContainerNames,
      keepDockerImages ? undefined : dockerImageNames,
      callback
    );
  }
  function createDockerContextDirectoryCallback(callback?: () => void) {
    createDockerContextDirectory(
      dockerContextDirectory,
      containerWorkspace,
      samplesPath,
      envFilePath,
      options.package_path,
      containerLogFilePath,
      callback
    );
  }
  function runContainersCallback(callback?: () => void) {
    dockerImageNames
      .map((imageName, containerIndex) => [imageName, dockerContainerNames[containerIndex]])
      .reverse()
      .reduce(
        (acc, [dockerImageName, dockerContainerName]) => () =>
          runDockerContainer(
            dockerContextDirectory,
            dockerImageName,
            dockerContainerName,
            containerWorkspace,
            stdoutListener,
            stderrListener,
            acc
          ),
        callback
      )?.();
  }
  await cleanupBeforeCallback(() =>
    createDockerContextDirectoryCallback(() => runContainersCallback(() => cleanupAfterCallback()))
  );
  return true;
});
