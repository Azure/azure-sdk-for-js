// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export function log(message: string, ...args: any[]): void {
  console.log(`%s ${message}`, new Date().toISOString(), ...args);
}

let currentCommand: "send" | "receive" | "send-receive" | "testhub" | "eph" = "testhub";

export function setCurrentCommand(cmd: "send" | "receive" | "send-receive" | "eph"): void {
  currentCommand = cmd;
}

export function getCurrentCommand(): "send" | "receive" | "send-receive" | "testhub" | "eph" {
  return currentCommand;
}