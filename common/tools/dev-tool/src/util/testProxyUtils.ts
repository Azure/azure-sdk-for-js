// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChildProcess, spawn, SpawnOptions } from "child_process";
import { createPrinter } from "./printer";
import { resolveRoot } from "./resolveProject";
import fs from "fs-extra";
import path from "path";
import axios from "axios";
import decompress from "decompress";
import envPaths from "env-paths";

const log = createPrinter("test-proxy");
const downloadLocation = path.join(envPaths("azsdk-dev-tool").cache, "test-proxy");

/**
 * Represents a test proxy binary artifact archive that is built against a specific platform and architecture.
 */
interface TestProxyBinary {
  /**
   * The platform targeted by this artifact. For example, "win32", "darwin" (macOS), "linux".
   */
  platform: string;

  /**
   * The architecture supported by this artifact. For example, "x64" or "arm64".
   */
  architecture: string;

  /**
   * File name of the binary archive to download.
   */
  fileName: string;

  /**
   * Location of the executable inside the downloaded archive.
   */
  executableLocation: string;
}

/**
 * Set of available test proxy artifact bundles for download.
 */
const AVAILABLE_TEST_PROXY_BINARIES: TestProxyBinary[] = [
  {
    platform: "win32",
    architecture: "x64",
    fileName: "test-proxy-standalone-win-x64.zip",
    executableLocation: "Azure.Sdk.Tools.TestProxy.exe",
  },
  {
    platform: "linux",
    architecture: "x64",
    fileName: "test-proxy-standalone-linux-x64.tar.gz",
    executableLocation: "Azure.Sdk.Tools.TestProxy",
  },
  {
    platform: "linux",
    architecture: "arm64",
    fileName: "test-proxy-standalone-linux-arm64.tar.gz",
    executableLocation: "Azure.Sdk.Tools.TestProxy",
  },
  {
    platform: "darwin",
    architecture: "x64",
    fileName: "test-proxy-standalone-osx-x64.zip",
    executableLocation: "Azure.Sdk.Tools.TestProxy",
  },
  {
    platform: "darwin",
    architecture: "arm64",
    fileName: "test-proxy-standalone-osx-arm64.zip",
    executableLocation: "Azure.Sdk.Tools.TestProxy",
  },
];

/**
 * Gets a test proxy artifact supported by the current environment.
 */
function getTestProxyBinary(): TestProxyBinary {
  const result = AVAILABLE_TEST_PROXY_BINARIES.find(
    ({ platform, architecture }) => platform === process.platform && architecture === process.arch
  );

  if (!result) {
    throw new Error(
      `Unsupported platform/architecture combination: ${process.platform}/${process.arch}`
    );
  }

  return result;
}

/**
 * Gets the download URL for a specific binary and version.
 */
function getDownloadUrl(binary: TestProxyBinary, version: string): string {
  return `https://github.com/Azure/azure-sdk-tools/releases/download/Azure.Sdk.Tools.TestProxy_${version}/${binary.fileName}`;
}

async function downloadTestProxy(downloadLocation: string, downloadUrl: string): Promise<void> {
  log(`Downloading test proxy binary from ${downloadUrl}`);
  const { data } = await axios.get<ArrayBuffer>(downloadUrl, { responseType: "arraybuffer" });
  log(`Extracting test proxy binary to ${downloadLocation}`);
  await decompress(Buffer.from(data), downloadLocation);
}

/**
 * Gets the path to the test-proxy executable. If the test-proxy executable has not been downloaded already, it will first be downloaded.
 */
export async function getTestProxyExecutable(): Promise<string> {
  const targetVersion = await getTargetVersion();
  const binary = await getTestProxyBinary();

  // The artifact is downloaded and extracted to <sdk root>/.test-proxy/<version>/.
  const downloadLocationWithVersion = path.join(downloadLocation, targetVersion);
  const executableLocation = path.join(downloadLocationWithVersion, binary.executableLocation);

  // Check the executable is already downloaded and is, in fact, executable. If it's not, download it.
  try {
    await fs.access(executableLocation, fs.constants.X_OK);
    log(`Test proxy executable already exists at ${executableLocation}, not downloading it.`);
  } catch {
    // Nuking the root .test-proxy folder, without the version, ensures that older versions of the test proxy
    // get cleaned up, so we don't end up with a ton of different test proxy versions using up disk space.
    await fs.remove(downloadLocation);

    await fs.mkdirp(downloadLocationWithVersion);
    await downloadTestProxy(downloadLocationWithVersion, getDownloadUrl(binary, targetVersion));

    // Mark the executable as executable by all
    await fs.chmod(executableLocation, 0o755);
  }

  return executableLocation;
}

interface CommandRun {
  result: Promise<void>;
  command: ChildProcess;
}

function runCommand(executable: string, argv: string[], options: SpawnOptions = {}): CommandRun {
  const command = spawn(executable, argv, options);

  // Stop on exit
  process.on("exit", () => {
    command.kill("SIGINT");
  });

  return {
    command,
    result: new Promise<void>((resolve, reject) => {
      command.on("exit", (exitCode, signal) => {
        if (exitCode === 0) {
          resolve();
        } else if (!signal) {
          reject(new Error(`${executable} exited with code ${exitCode}`));
        }
      });
    }),
  };
}

export async function runTestProxyCommand(argv: string[]): Promise<void> {
  return runCommand(await getTestProxyExecutable(), argv, { stdio: "inherit" }).result;
}

export function createAssetsJson(): Promise<void> {
  return runMigrationScript(false);
}

export async function runMigrationScript(initialPush: boolean): Promise<void> {
  const migrationScriptLocation = path.join(
    await resolveRoot(),
    "eng/common/testproxy/transition-scripts/generate-assets-json.ps1"
  );

  const argv = [migrationScriptLocation, "-TestProxyExe", await getTestProxyExecutable()];
  if (initialPush) {
    argv.push("-InitialPush");
  }

  await runCommand("pwsh", argv, { stdio: "inherit" }).result;
}

export interface TestProxy {
  stop(): Promise<void>;
}

export async function startTestProxy(): Promise<TestProxy> {
  const testProxy = await runCommand(await getTestProxyExecutable(), [
    "start",
    "-l",
    await resolveRoot(),
    `http://0.0.0.0:${process.env.TEST_PROXY_HTTP_PORT ?? 5000}/`,
    `https://0.0.0.0:${process.env.TEST_PROXY_HTTPS_PORT ?? 5001}/`,
  ]);

  const log = fs.createWriteStream("./testProxyOutput.log", { flags: "a" });
  testProxy.command.stdout?.pipe(log);
  testProxy.command.stderr?.pipe(log);

  return {
    async stop() {
      testProxy.command.kill("SIGKILL");
      await testProxy.result;
    },
  };
}

export async function isProxyToolActive(): Promise<boolean> {
  try {
    await axios.get(`http://localhost:${process.env.TEST_PROXY_HTTP_PORT ?? 5000}/info/available`);

    log.info(
      `Proxy tool seems to be active at http://localhost:${process.env.TEST_PROXY_HTTP_PORT ?? 5000
      }\n`
    );
    return true;
  } catch (error: any) {
    return false;
  }
}

async function getTargetVersion() {
  // Grab the tag from the `/eng/common/testproxy/target_version.txt` file [..is used to control the default version]
  // Example content:
  //
  // 1.0.0-dev.20220224.2
  // (Bot regularly updates the tag in the file above.)
  try {
    const contentInVersionFile = await fs.readFile(
      `${path.join(await resolveRoot(), "eng/common/testproxy/target_version.txt")}`,
      "utf-8"
    );

    const tag = contentInVersionFile.trim();
    if (tag === undefined) {
      throw new Error();
    }

    log.info(`Image tag obtained from the powershell script => ${tag}\n`);
    return tag;
  } catch (_: any) {
    log.warn(
      `Unable to get the image tag from the powershell script, trying "latest" tag instead\n`
    );
    return "latest";
  }
}
