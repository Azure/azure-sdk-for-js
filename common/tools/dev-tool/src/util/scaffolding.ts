// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { spawn } from "child_process";
import { createPrinter } from "./printer";
import { resolveRoot } from "./resolveProject";
import * as path from "path";

export interface ScaffoldingOptions {
  name: string;
  folderName: string;
  tracingNamespace?: string;
  version?: string;
  packageDescription?: string;
  productName?: string;
  generator: "template-clone";
}

const log = createPrinter("scaffolding");

export async function runAutorest(projectPath: string): Promise<void> {
  const subprocess = spawn("rushx", ["generate:client"], {
    cwd: projectPath,
    shell: true,
    stdio: "inherit",
  });

  return new Promise<void>((resolve, reject) => {
    subprocess.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Could not complete rushx generate:client\n`));
      }
    });
  });
}

export async function buildProject(projectPath: string): Promise<void> {
  const update = spawn("rush", ["update"], {
    cwd: projectPath,
    shell: true,
    stdio: "inherit",
  });

  await new Promise<void>((resolve, reject) => {
    update.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Could not complete rush update\n`));
      }
    });
  });

  const build = spawn("rush", ["build", "-t", "."], {
    cwd: projectPath,
    shell: true,
    stdio: "inherit",
  });

  return new Promise<void>((resolve, reject) => {
    build.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Could not complete rush update\n`));
      }
    });
  });
}

export async function scaffold(options: ScaffoldingOptions): Promise<void> {
  const repoRoot = await resolveRoot();
  const scaffoldingPath = path.join(
    repoRoot,
    "common",
    "tools",
    "dev-tool",
    "src",
    "commands",
    "scaffolding"
  );
  log.info(`Attempting to run Scaffolding\n`);

  const subprocess = spawn(
    "npx",
    [
      "hygen",
      options.generator,
      "new",
      options.name,
      `--service-folder=${options.folderName}`,
      `--repo-root=${repoRoot}`,
    ],
    {
      cwd: scaffoldingPath,
      shell: true,
      stdio: "inherit",
    }
  );

  return new Promise<void>((resolve, reject) => {
    subprocess.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Could not complete scaffolding.\n`));
      }
    });
  });
}
