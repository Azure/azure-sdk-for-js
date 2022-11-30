// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChildProcess, spawn } from "child_process";
import { createWriteStream } from "fs";
import { IncomingMessage, request, RequestOptions } from "http";
import { createPrinter } from "./printer";
import { resolveRoot } from "./resolveProject";

const log = createPrinter("test-proxy");

export interface TestProxyCommandRun {
  result: Promise<void>;
  command: ChildProcess;
}

async function getTestProxyExecutable(): Promise<string> {
  // TODO: once the binaries are being published, download them to a nice location (detecting OS and architecture for which binary to download)
  // For now, provide an environment variable.

  const testProxyExe = process.env.TEST_PROXY_EXE;

  if (testProxyExe === undefined) {
    throw new Error("Need to set process.env.TEST_PROXY_EXE");
  }

  return testProxyExe;
}

export async function runTestProxyCommand(
  argv: string[],
  stdio: "inherit" | "log" = "inherit"
): Promise<TestProxyCommandRun> {
  const command = spawn(await getTestProxyExecutable(), argv, {
    stdio: stdio === "inherit" ? ["inherit", "inherit", "inherit"] : undefined,
  });

  if (stdio === "log") {
    const out = createWriteStream("./testProxyOutput.log", { flags: "a" });
    command.stderr?.pipe(out);
    command.stdout?.pipe(out);
  }

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
          reject(new Error(`Test proxy exited with code ${exitCode}`));
        }
      });
    }),
  };
}

export async function startTestProxy() {
  return runTestProxyCommand(["start", "-l", await resolveRoot()], "log");
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

// async function getTargetVersion() {
//   // Grab the tag from the `/eng/common/testproxy/target_version.txt` file [..is used to control the default version]
//   // Example content:
//   //
//   // 1.0.0-dev.20220224.2
//   // (Bot regularly updates the tag in the file above.)
//   try {
//     const contentInVersionFile = await fs.readFile(
//       `${path.join(await resolveRoot(), "eng/common/testproxy/target_version.txt")}`,
//       "utf-8"
//     );

//     const tag = contentInVersionFile.trim();
//     if (tag === undefined) {
//       throw new Error();
//     }

//     log.info(`Image tag obtained from the powershell script => ${tag}\n`);
//     return tag;
//   } catch (_: any) {
//     log.warn(
//       `Unable to get the image tag from the powershell script, trying "latest" tag instead\n`
//     );
//     return "latest";
//   }
// }
