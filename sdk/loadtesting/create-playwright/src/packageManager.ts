// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { existsSync } from "node:fs";
import type { PackageManager, ProcessCommand } from "./types.js";
import { cwd } from "node:process";
import { resolve } from "node:path";

export class NPM implements PackageManager {
  installDevDependencyCommand = (packageNames: string[]): ProcessCommand => {
    return { command: "npm", args: ["install", "--save-dev", ...packageNames] };
  };
  runCommand = (command: string, args: string[]): ProcessCommand => {
    return { command: "npx", args: [command, ...args] };
  };
}

export class PNPM implements PackageManager {
  private useWorkspace: boolean;

  constructor(useWorkspace = existsSync(resolve(cwd(), "pnpm-workspace.yaml"))) {
    this.useWorkspace = useWorkspace;
  }

  installDevDependencyCommand = (packageNames: string[]): ProcessCommand => {
    return {
      command: "pnpm",
      args: ["add", "--save-dev", ...(this.useWorkspace ? ["-w"] : []), ...packageNames],
    };
  };
  runCommand = (command: string, args: string[]): ProcessCommand => {
    return { command: "pnpm", args: [command, ...args] };
  };
}

export class Yarn implements PackageManager {
  installDevDependencyCommand = (packageNames: string[]): ProcessCommand => {
    return { command: "yarn", args: ["add", "--dev", ...packageNames] };
  };
  runCommand = (command: string, args: string[]): ProcessCommand => {
    return { command: "yarn", args: [command, ...args] };
  };
}

// https://stackoverflow.com/questions/68133683/is-there-a-cross-platform-way-to-get-the-name-of-the-parent-process-in-node-js
export const getPackageManager = (): PackageManager => {
  if (process.env["npm_config_user_agent"]) {
    const userAgent = process.env["npm_config_user_agent"];
    if (userAgent.includes("yarn")) return new Yarn();
    if (userAgent.includes("pnpm")) return new PNPM();
  }
  return new NPM();
};
