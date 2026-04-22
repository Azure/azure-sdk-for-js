// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function writeStdout(message = ""): void {
  process.stdout.write(`${message}\n`);
}

export function writeStderr(message = ""): void {
  process.stderr.write(`${message}\n`);
}

export function writeUnknownError(error: unknown): void {
  if (error instanceof Error) {
    writeStderr(error.stack ?? error.message);
    return;
  }
  writeStderr(String(error));
}
