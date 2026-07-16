// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { access, copyFile, cp, mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { constants as fsConstants, createWriteStream } from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "@azure/core-process";
import os from "node:os";
import { pipeline } from "node:stream/promises";
import { URL } from "node:url";

import { createPrinter } from "../../util/printer.ts";
import { leafCommand, makeCommandInfo } from "../../framework/command.ts";
import { resolveProject } from "../../util/resolveProject.ts";
import { findSamplesRelativeDir } from "../../util/findSamplesDir.ts";

const defaultVersions = [20, 22, 24];

const log = createPrinter("check-node-versions-samples");

async function spawnCMD(cmd: string, args: string[], errorMessage?: string): Promise<void> {
  const spawnedProcess = spawn(cmd, args);
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
        ", ",
      )} docker containers but encountered an error doing so`,
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
        ", ",
      )} docker images but encountered an error doing so`,
    );
  }
}

async function deleteDockerContext(dockerContextDirectory?: string) {
  if (dockerContextDirectory) {
    log.info(`Cleanup: deleting the ${dockerContextDirectory} docker context directory`);
    await rm(dockerContextDirectory, { recursive: true, force: true });
  }
}

async function cleanup(
  dockerContextDirectory?: string,
  dockerContainerNames?: string[],
  dockerImageNames?: string[],
) {
  await deleteDockerContext(dockerContextDirectory);
  await deleteDockerContainers(dockerContainerNames);
  await deleteDockerImages(dockerImageNames);
}

export function buildRunSamplesScript(): string {
  const scriptContent = `#!/bin/sh

container_workspace_path=$1
samples_relative_path=$2
artifact_url=$3
env_file_name=$4
log_file_path=$5

samples_dir="\${container_workspace_path}/\${samples_relative_path}"
env_file_path="\${container_workspace_path}/\${env_file_name}"
javascript_samples_path="\${samples_dir}/javascript"
typescript_compiled_samples_path="\${samples_dir}/typescript/dist"

run_command() {
  if [ -n "\${log_file_path}" ]; then
    "$@" >> "\${log_file_path}" 2>&1
  else
    "$@"
  fi
}

function install_dependencies_helper() {
  samples_path=$1
  cd "\${samples_path}"
  run_command npm install -- "\${artifact_url}"
  run_command npm install
}

function install_packages() {
  echo "Using node $(node -v) to install dependencies"
  install_dependencies_helper "\${samples_dir}/javascript"
  install_dependencies_helper "\${samples_dir}/typescript"
  cp "\${env_file_path}" "\${samples_dir}/javascript/"
}

function run_samples() {
  samples_path=$1
  echo "Using node $(node -v) to run samples in \${samples_path}"
  cd "\${samples_path}"
  for SAMPLE in *.js; do
    [ -e "\${SAMPLE}" ] || continue
    node -- "\${SAMPLE}"
  done
}

function build_typescript() {
  echo "Using node $(node -v) to build the typescript samples"
  cd "\${samples_dir}/typescript"
  run_command npm run build
  cp "\${env_file_path}" "\${samples_dir}/typescript/dist/"
}

function main() {
  install_packages
  run_samples "\${javascript_samples_path}"
  build_typescript && run_samples "\${typescript_compiled_samples_path}"
}

main`;
  return scriptContent;
}

export function validateNodeVersions(versions: string[]): string[] {
  const uniqueVersions = [...new Set(versions)].filter((version) => version !== "");
  for (const version of uniqueVersions) {
    if (!/^(?:0|[1-9]\d*)(?:\.(?:0|[1-9]\d*)){0,2}$/.test(version)) {
      throw new Error(`Invalid Node.js version: ${version}`);
    }
  }
  return uniqueVersions;
}

interface DockerScriptOptions {
  artifactUrl: string;
  envFileName: string;
  logFilePath: string;
  samplesRelativePath: string;
}

async function createDockerContextDirectory(
  dockerContextDirectory: string,
  containerWorkspacePath: string,
  samplesPath: string,
  envPath: string,
  artifactPath?: string,
  logFilePath?: string,
): Promise<DockerScriptOptions> {
  const stringIsAValidUrl = (s: string): boolean => {
    try {
      return new URL(s).protocol === "https:";
    } catch (err: unknown) {
      return false;
    }
  };
  if (artifactPath === undefined) {
    throw new Error("artifact_path is a required argument but it was not passed");
  }
  const envFileName = path.basename(envPath);
  await cp(samplesPath, path.join(dockerContextDirectory, "samples"), { recursive: true });
  let artifactURL: string | undefined = undefined;
  try {
    await access(artifactPath);
    const artifactName = path.basename(artifactPath);
    await copyFile(artifactPath, path.join(dockerContextDirectory, artifactName));
    artifactURL = `${containerWorkspacePath}/${artifactName}`;
  } catch {
    if (stringIsAValidUrl(artifactPath)) {
      const response = await fetch(artifactPath);
      if (!response.ok) {
        throw new Error(`Downloading the artifact failed with status ${response.status}.`);
      }
      if (!response.body) {
        throw new Error("Downloading the artifact returned an empty response body.");
      }
      const artifactName = "artifact.tgz";
      await pipeline(
        response.body,
        createWriteStream(path.join(dockerContextDirectory, artifactName)),
      );
      artifactURL = `${containerWorkspacePath}/${artifactName}`;
    } else {
      throw new Error(`artifact path passed does not exist: ${artifactPath}`);
    }
  }
  await copyFile(envPath, path.join(dockerContextDirectory, envFileName));
  await writeFile(path.join(dockerContextDirectory, "run_samples.sh"), buildRunSamplesScript(), {
    mode: fsConstants.S_IRWXO,
  });
  return {
    artifactUrl: artifactURL,
    envFileName,
    logFilePath: logFilePath ?? "",
    samplesRelativePath: findSamplesRelativeDir(samplesPath),
  };
}

async function runDockerContainer(
  dockerContextDirectory: string,
  dockerImageName: string,
  dockerContainerName: string,
  containerWorkspace: string,
  scriptOptions: DockerScriptOptions,
  stdoutListener: (chunk: string | Buffer) => void,
  stderrListener: (chunk: string | Buffer) => void,
): Promise<void> {
  const pullResult = spawnSync("docker", ["pull", dockerImageName], { stdio: "inherit" });
  if (pullResult.error) {
    throw pullResult.error;
  }
  if (pullResult.status !== 0) {
    throw new Error(`docker pull exited with code ${pullResult.status}`);
  }
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
    containerWorkspace,
    scriptOptions.samplesRelativePath,
    scriptOptions.artifactUrl,
    scriptOptions.envFileName,
    scriptOptions.logFilePath,
  ];
  const dockerContainerRunProcess = spawn("docker", args, {
    cwd: dockerContextDirectory,
  });
  log.debug(`Running docker container with the following args: ${args.join(" ")}`);
  log.info(`Started running the docker container ${dockerContainerName}`);
  dockerContainerRunProcess.stdout?.on("data", stdoutListener);
  dockerContainerRunProcess.stderr?.on("data", stderrListener);
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
  },
);

export default leafCommand(commandInfo, async (options) => {
  const nodeVersions = validateNodeVersions(
    options["node-versions"]?.split(",").concat(options["node-version"]),
  );
  const dockerContextDirectory: string =
    options["context-directory-path"] === ""
      ? await mkdtemp(path.join(os.tmpdir(), "context"))
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
  let scriptOptions: DockerScriptOptions | undefined;
  async function cleanupBefore(): Promise<void> {
    const dockerContextDirectoryChildren = await readdir(dockerContextDirectory);
    await cleanup(
      // If the directory is empty, we will not delete it.
      dockerContextDirectoryChildren.length === 0 ? undefined : dockerContextDirectory,
      useExistingDockerContainer ? undefined : dockerContainerNames,
      // Do not delete the image
      undefined,
    );
  }
  async function cleanupAfter(): Promise<void> {
    await cleanup(
      keepDockerContextDirectory ? undefined : dockerContextDirectory,
      keepDockerContainers ? undefined : dockerContainerNames,
      keepDockerImages ? undefined : dockerImageNames,
    );
  }
  async function createDockerContextDirectoryThunk(): Promise<void> {
    scriptOptions = await createDockerContextDirectory(
      dockerContextDirectory,
      containerWorkspace,
      samplesPath,
      envFilePath,
      options["artifact-path"],
      containerLogFilePath,
    );
  }
  async function runContainers(): Promise<void> {
    const currentScriptOptions = scriptOptions;
    if (!currentScriptOptions) {
      throw new Error("The Docker context has not been created.");
    }
    const containerRuns = dockerImageNames.map(
      (imageName, containerIndex) => () =>
        runDockerContainer(
          dockerContextDirectory,
          imageName,
          dockerContainerNames[containerIndex],
          containerWorkspace,
          currentScriptOptions,
          stdoutListener,
          stderrListener,
        ),
    );
    for (const run of containerRuns) {
      await run();
    }
  }
  await cleanupBefore();
  await createDockerContextDirectoryThunk();
  await runContainers();
  await cleanupAfter();

  return true;
});
