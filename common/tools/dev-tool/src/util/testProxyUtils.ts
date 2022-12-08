// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChildProcess, spawn, SpawnOptions } from "child_process";
import { IncomingMessage, request, RequestOptions } from "http";
import { createPrinter } from "./printer";
import { resolveRoot } from "./resolveProject";
import os from "os";
import { readFile } from "fs/promises";
import fs from "fs-extra";
import path from "path";

const log = createPrinter("test-proxy");

const TEST_PROXY_ARTIFACT_BASE_URL = "http://localhost:8081/";
const TEST_PROXY_ARTIFACTS: Record<string, Record<string, string>> = {
  Windows_NT: {
    // Windows is a .zip, special case. The rest are tarballs.
    x64: "test-proxy-standalone-win-x64.zip",
  },
  Linux: {
    x64: "test-proxy-standalone-linux-x64.tar.gz",
    arm64: "test-proxy-standalone-linux-arm64.tar.gz",
  },
  Darwin: {
    x64: "test-proxy-standalone-osx-x64.tar.gz",
    arm64: "test-proxy-standalone-osx-x64.tar.gz", // Using the x64 release for ARM Mac until arm64 binaries are released (requires test proxy upgrade to .NET 6)
  },
};

function getTestProxyArtifact(): string {
  const result = TEST_PROXY_ARTIFACTS[os.type()]?.[os.arch()];
  if (!result) {
    throw new Error(`Unsupported OS/architecture combination: ${os.type()}/${os.arch()}`);
  }

  return result;
}

export async function getTestProxyExecutable(): Promise<string> {
  const targetVersion = await getTargetVersion();
  const downloadDir = path.join(await resolveRoot(), ".test-proxy");
  const dirWithVersion = path.join(downloadDir, targetVersion);

  const executable = path.join(
    dirWithVersion,
    os.type() === "Windows_NT" ? "test-proxy.exe" : "test-proxy"
  );

  // If we don't have the version that we're targeting downloaded, nuke the entire folder and redownload. This has the side effect of removing old test proxy versions
  // that we don't want.
  if (!(await fs.pathExists(executable))) {
    await fs.remove(downloadDir);

    await fs.ensureDir(dirWithVersion);
    const artifact = await getTestProxyArtifact();

    // download to dirWithVersion & extract
    console.log(`Downloading test proxy ${targetVersion}...`);

    // All reasonable development operating systems (including Windows 10+), have both curl and tar installed
    const curl = runCommand(
      "curl",
      [
        // Flags in order: progress bar, follow redirects, don't use .curlrc, output to standard output
        "-#Lqo-",
        // URL to download from
        `${TEST_PROXY_ARTIFACT_BASE_URL}${artifact}`,
      ],
      {
        cwd: dirWithVersion,
        stdio: [
          "ignore", // stdin can be ignored
          "pipe", // pipe stdout to tar
          "inherit", // pass stderr to process.stderr
        ],
      }
    );

    // tar on windows can extract a .zip fine, and of course works with .tar.gz on Linux/Mac.
    const tar = runCommand(
      "tar",
      [
        "--strip-components=8", // the packaged tarballs currently have like 8 layers of unnecessary nesting, this parameter removes them
        "-zxf",
        "-",
      ],
      {
        cwd: dirWithVersion,
        stdio: [
          "pipe", // stdin comes from curl
          "inherit", // stdout and stderr to console
          "inherit",
        ],
      }
    );

    // set up the pipe
    curl.command.stdout!.pipe(tar.command.stdin!);

    await tar.result;
  }

  return executable;
}

export interface CommandRun {
  result: Promise<void>;
  command: ChildProcess;
}

export function runCommand(
  executable: string,
  argv: string[],
  options: SpawnOptions = {}
): CommandRun {
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
          reject(new Error(`Command exited with code ${exitCode}`));
        }
      });
    }),
  };
}

export async function runTestProxyCommand(argv: string[]): Promise<void> {
  return runCommand(await getTestProxyExecutable(), argv, { stdio: "inherit" }).result;
}

export interface TestProxyHandle {
  stop(): Promise<void>;
}

export async function startTestProxy(): Promise<TestProxyHandle> {
  const testProxy = await runCommand(await getTestProxyExecutable(), [
    "start",
    "-l",
    await resolveRoot(),
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
    await makeRequest(
      `http://localhost:${process.env.TEST_PROXY_HTTP_PORT ?? 5000}/info/available`,
      {}
    );
    log.info(
      `Proxy tool seems to be active at http://localhost:${
        process.env.TEST_PROXY_HTTP_PORT ?? 5000
      }\n`
    );
    return true;
  } catch (error: any) {
    return false;
  }
}

async function makeRequest(uri: string, requestOptions: RequestOptions): Promise<IncomingMessage> {
  return new Promise<IncomingMessage>((resolve, reject) => {
    const req = request(uri, requestOptions, resolve);
    req.once("error", reject);
    req.end();
  });
}

async function getTargetVersion() {
  // Grab the tag from the `/eng/common/testproxy/target_version.txt` file [..is used to control the default version]
  // Example content:
  //
  // 1.0.0-dev.20220224.2
  // (Bot regularly updates the tag in the file above.)
  try {
    const contentInVersionFile = await readFile(
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
