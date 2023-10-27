// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";
import pr from "child_process";
import os from "os";
import { URL } from "url";

import { createPrinter } from "../../util/printer";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { S_IRWXO } from "constants";
import { resolveProject } from "../../util/resolveProject";
import { findSamplesRelativeDir } from "../../util/findSamplesDir";

const defaultVersions = [18, 20, 21];

const log = createPrinter("check-node-versions-samples");

async function spawnCMD(cmd: string, args: string[], errorMessage?: string): Promise<void> {
  const spawnedProcess = pr.spawn(cmd, args);
  await new Promise((resolve, reject) => {
    spawnedProcess.on("exit", resolve);
    spawnedProcess.on("error", (err: Error) => {
      log.info(errorMessage);
      reject(err);
    });
  });
}

async function deleteDockerContainers(deleteContainerNames?: string[]): Promise<void> {
  if (deleteContainerNames) {
    log.info(`Cleanup: deleting ${deleteContainerNames.join(", ")} docker containers`);
    await spawnCMD(
      "docker",
      ["rm", ...deleteContainerNames, "-f"],
      `Attempted to delete ${deleteContainerNames.join(
        ", "
      )} docker containers but encountered an error doing so`
    );
  }
}

async function deleteDockerImages(dockerImageNames?: string[]) {
  if (dockerImageNames) {
    log.info(`Cleanup: deleting ${dockerImageNames.join(", ")} docker images`);
    await spawnCMD(
      "docker",
      ["rmi", ...dockerImageNames, "-f"],
      `Attempted to delete the ${dockerImageNames.join(
        ", "
      )} docker images but encountered an error doing so`
    );
  }
}

async function deleteDockerContext(dockerContextDirectory?: string) {
  if (dockerContextDirectory) {
    log.info(`Cleanup: deleting the ${dockerContextDirectory} docker context directory`);
    await spawnCMD("rm", ["-rf", dockerContextDirectory], undefined);
  }
}

async function cleanup(
  dockerContextDirectory?: string,
  dockerContainerNames?: string[],
  dockerImageNames?: string[]
) {
  await deleteDockerContext(dockerContextDirectory);
  await deleteDockerContainers(dockerContainerNames);
  await deleteDockerImages(dockerImageNames);
}

function buildRunSamplesScript(
  containerWorkspacePath: string,
  samplesPath: string,
  artifactURL: string,
  envFileName: string,
  logFilePath?: string
) {
  function compileCMD(cmd: string, printToScreen?: boolean) {
    return printToScreen ? cmd : `${cmd} >> ${logFilePath} 2>&1`;
  }
  const samplesDir = `${containerWorkspacePath}/${findSamplesRelativeDir(samplesPath)}`;
  const printToScreen = logFilePath === undefined;
  const envFilePath = `${containerWorkspacePath}/${envFileName}`;
  const javascriptSamplesPath = `${samplesDir}/javascript`;
  const typescriptCompiledSamplesPath = `${samplesDir}/typescript/dist`;
  const scriptContent = `#!/bin/sh

function install_dependencies_helper() {
  local samples_path=$1;
  cd \${samples_path};
  ${compileCMD(`npm install ${artifactURL}`, printToScreen)}
  ${compileCMD(`npm install`, printToScreen)}
}

function install_packages() {
  echo "Using node $(node -v) to install dependencies";
  install_dependencies_helper ${samplesDir}/javascript
  install_dependencies_helper ${samplesDir}/typescript;
  cp ${envFilePath} ${samplesDir}/javascript/;
}

function run_samples() {
  samples_path=$1;
  echo "Using node $(node -v) to run samples in \${samples_path}";
  cd "\${samples_path}";
  for SAMPLE in *.js; do
    node \${SAMPLE};
  done
}

function build_typescript() {
  echo "Using node $(node -v) to build the typescript samples";
  cd ${samplesDir}/typescript
  ${compileCMD(`npm run build`, printToScreen)}
  cp ${envFilePath} ${samplesDir}/typescript/dist/
}

function main() {
  install_packages;
  run_samples "${javascriptSamplesPath}";
  build_typescript && run_samples "${typescriptCompiledSamplesPath}";
}

main`;
  return scriptContent;
}

function createDockerContextDirectory(
  dockerContextDirectory: string,
  containerWorkspacePath: string,
  samplesPath: string,
  envPath: string,
  artifactPath?: string,
  logFilePath?: string
): void {
  const stringIsAValidUrl = (s: string) => {
    try {
      new URL(s);
      return true;
    } catch (err: any) {
      return false;
    }
  };
  if (artifactPath === undefined) {
    throw new Error("artifact_path is a required argument but it was not passed");
  }
  const envFileName = path.basename(envPath);
  fs.copySync(samplesPath, path.join(dockerContextDirectory, "samples"));
  let artifactURL: string | undefined = undefined;
  if (fs.existsSync(artifactPath)) {
    const artifactName = path.basename(artifactPath);
    fs.copyFileSync(artifactPath, path.join(dockerContextDirectory, artifactName));
    artifactURL = `${containerWorkspacePath}/${artifactName}`;
  } else if (stringIsAValidUrl(artifactPath)) {
    artifactURL = artifactPath;
  } else {
    throw new Error(`artifact path passed does not exist: ${artifactPath}`);
  }
  fs.copyFileSync(envPath, path.join(dockerContextDirectory, envFileName));
  fs.writeFileSync(
    path.join(dockerContextDirectory, "run_samples.sh"),
    buildRunSamplesScript(
      containerWorkspacePath,
      samplesPath,
      artifactURL,
      envFileName,
      logFilePath
    ),
    { mode: S_IRWXO }
  );
}

async function runDockerContainer(
  dockerContextDirectory: string,
  dockerImageName: string,
  dockerContainerName: string,
  containerWorkspace: string,
  stdoutListener: (chunk: string | Buffer) => void,
  stderrListener: (chunk: string | Buffer) => void
): Promise<void> {
  pr.execSync(`docker pull ${dockerImageName}`);
  const args = [
    "run",
    "--name",
    dockerContainerName,
    "--workdir",
    containerWorkspace,
    "-v",
    `${dockerContextDirectory}:${containerWorkspace}`,
    "--entrypoint",
    "sh",
    dockerImageName,
    "./run_samples.sh",
  ];
  const dockerContainerRunProcess = pr.spawn("docker", args, {
    cwd: dockerContextDirectory,
  });
  log.debug(`Running docker container with the following args: ${args.join(" ")}`);
  log.info(`Started running the docker container ${dockerContainerName}`);
  dockerContainerRunProcess.stdout.on("data", stdoutListener);
  dockerContainerRunProcess.stderr.on("data", stderrListener);
  const exitCode = await new Promise((resolve, reject) => {
    dockerContainerRunProcess.on("exit", resolve);
    dockerContainerRunProcess.on("error", reject);
  });
  if (exitCode === 0) {
    log.info(`Docker container ${dockerContainerName} finished running`);
  } else {
    log.error(`Docker container ${dockerContainerName} encountered an error`);
  }
}

export const commandInfo = makeCommandInfo(
  "check-node-versions",
  "execute samples with different node versions, typically in preparation for release",
  {
    "artifact-path": {
      kind: "string",
      description: "The URL/path to the artifact built by the release pipeline",
    },
    directory: {
      kind: "string",
      description: "Base dir, default is process.cwd()",
      default: process.cwd(),
    },
    "node-versions": {
      kind: "string",
      description: "A comma separated list of node versions to use",
      default: defaultVersions.join(","),
    },
    "node-version": {
      kind: "string",
      description:
        "A node version to use. You can specify multiple versions by having multiple arguments",
      default: "",
      allowMultiple: true,
    },
    "context-directory-path": {
      kind: "string",
      description: "Absolute path to a directory used for mounting inside docker containers",
      default: "",
    },
    "keep-docker-context": {
      kind: "boolean",
      description: "Boolean to indicate whether to keep the current docker context directory",
      default: false,
    },
    "log-in-file": {
      kind: "boolean",
      description:
        "Boolean to indicate whether to save the the stdout and sterr for npm commands to the log.txt log file",
      default: true,
    },
    "use-existing-docker-containers": {
      kind: "boolean",
      description: "Boolean to indicate whether to use existing docker containers if any",
      default: false,
    },
    "keep-docker-containers": {
      kind: "boolean",
      description: "Boolean to indicate whether to keep docker containers",
      default: false,
    },
    "keep-docker-images": {
      kind: "boolean",
      description: "Boolean to indicate whether to keep the downloaded docker images",
      default: false,
    },
  }
);

export default leafCommand(commandInfo, async (options) => {
  const nodeVersions = [
    ...new Set(
      options["node-versions"]
        ?.split(",")
        .concat(options["node-version"])
        .filter((ver) => ver !== "" && !isNaN(parseInt(ver)))
    ),
  ];
  const dockerContextDirectory: string =
    options["context-directory-path"] === ""
      ? await fs.mkdtemp(path.join(os.tmpdir(), "context"))
      : options["context-directory-path"];
  const pkg = await resolveProject(options.directory);
  const samplesPath = path.join(pkg.path, "samples");
  const envFilePath = path.join(pkg.path, ".env");
  const keepDockerContextDirectory = options["keep-docker-context"];
  const dockerImageNames = nodeVersions.map((version: string) => `node:${version}-alpine`);
  const dockerContainerNames = nodeVersions.map((version: string) => `${version}-container`);
  const containerWorkspace = "/workspace";
  const containerLogFilePath = options["log-in-file"] ? `${containerWorkspace}/log.txt` : undefined;
  const useExistingDockerContainer = options["use-existing-docker-containers"];
  const keepDockerContainers = options["keep-docker-containers"];
  const keepDockerImages = options["keep-docker-images"];
  const stdoutListener = (chunk: Buffer | string) => log.info(chunk.toString());
  const stderrListener = (chunk: Buffer | string) => log.error(chunk.toString());
  async function cleanupBefore(): Promise<void> {
    const dockerContextDirectoryChildren = await fs.readdir(dockerContextDirectory);
    await cleanup(
      // If the directory is empty, we will not delete it.
      dockerContextDirectoryChildren.length === 0 ? undefined : dockerContextDirectory,
      useExistingDockerContainer ? undefined : dockerContainerNames,
      // Do not delete the image
      undefined
    );
  }
  async function cleanupAfter(): Promise<void> {
    await cleanup(
      keepDockerContextDirectory ? undefined : dockerContextDirectory,
      keepDockerContainers ? undefined : dockerContainerNames,
      keepDockerImages ? undefined : dockerImageNames
    );
  }
  function createDockerContextDirectoryThunk(): void {
    createDockerContextDirectory(
      dockerContextDirectory,
      containerWorkspace,
      samplesPath,
      envFilePath,
      options["artifact-path"],
      containerLogFilePath
    );
  }
  async function runContainers(): Promise<void> {
    const containerRuns = dockerImageNames.map(
      (imageName, containerIndex) => () =>
        runDockerContainer(
          dockerContextDirectory,
          imageName,
          dockerContainerNames[containerIndex],
          containerWorkspace,
          stdoutListener,
          stderrListener
        )
    );
    for (const run of containerRuns) {
      await run();
    }
  }
  await cleanupBefore();
  createDockerContextDirectoryThunk();
  await runContainers();
  await cleanupAfter();

  return true;
});
