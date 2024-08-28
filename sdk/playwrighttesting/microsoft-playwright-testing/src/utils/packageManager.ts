// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PackageManager } from "../common/types";

export class NPM implements PackageManager {
  runCommand = (command: string, args: string): string => {
    return `npx ${command} ${args}`;
  };
  getVersionFromStdout = (stdout: string): string => {
    const match = stdout.match(/Version\s(\d+\.\d+\.\d+(-\w+-\d{4}-\d{2}-\d{2})?)/);
    return match ? match[1] : "Unknown version";
  };
}

export class PNPM implements PackageManager {
  runCommand = (command: string, args: string): string => {
    return `pnpm ${command} ${args}`;
  };
  getVersionFromStdout = (stdout: string): string => {
    const match = stdout.match(/Version\s(\d+\.\d+\.\d+(-\w+-\d{4}-\d{2}-\d{2})?)/);
    return match ? match[1] : "Unknown version";
  };
}

export class Yarn implements PackageManager {
  runCommand = (command: string, args: string): string => {
    return `yarn ${command} ${args}`;
  };
  getVersionFromStdout = (stdout: string): string => {
    const match = stdout.match(/Version\s(\d+\.\d+\.\d+(-\w+-\d{4}-\d{2}-\d{2})?)/);
    return match ? match[1] : "Unknown version";
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
