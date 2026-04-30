// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function writeStdout(message = ""): void {
  process.stdout.write(`${message}\n`);
}

export function writeStderr(message = ""): void {
  process.stderr.write(`${message}\n`);
}

export function writeUnknownError(error: unknown): void {
  writeStderr(error instanceof Error ? (error.stack ?? error.message) : String(error));
}
