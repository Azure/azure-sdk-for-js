// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { existsSync } from "fs";
import { PackageManager } from "./types";
import { cwd } from "process";
import { resolve } from "path";

export class NPM implements PackageManager {
  installDevDependencyCommand = (packageName: string): string => {
    return `npm install --save-dev ${packageName}`;
  };
  runCommand = (command: string, args: string): string => {
    return `npx ${command} ${args}`;
  };
}

export class PNPM implements PackageManager {
  private useWorkspace: boolean = false;

  constructor() {
    this.useWorkspace = existsSync(resolve(cwd(), "pnpm-workspace.yaml"));
  }

  installDevDependencyCommand = (packageName: string): string => {
    return `pnpm add --save-dev ${this.useWorkspace ? "-w " : ""}${packageName}`;
  };
  runCommand = (command: string, args: string): string => {
    return `pnpm ${command} ${args}`;
  };
}

export class Yarn implements PackageManager {
  installDevDependencyCommand = (packageName: string): string => {
    return `yarn add --dev ${packageName}`;
  };
  runCommand = (command: string, args: string): string => {
    return `yarn ${command} ${args}`;
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
