// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import childProcess from "node:child_process";

/**
 * Easy to mock childProcess utils.
 * @internal
 */
export const processUtils = {
  /**
   * Promisifying childProcess.execFile
   * @internal
   */
  execFile(
    file: string,
    params: string[],
    options?: Omit<childProcess.ExecFileOptionsWithStringEncoding, "shell">,
  ): Promise<string | Buffer> {
    return new Promise((resolve, reject) => {
      const args = [...params];
      const command = [file, ...args].join(" ");
      childProcess.exec(command, options, (error, stdout, stderr) => {
        if (Buffer.isBuffer(stdout)) {
          stdout = stdout.toString("utf8");
        }
        if (Buffer.isBuffer(stderr)) {
          stderr = stderr.toString("utf8");
        }
        if (stderr || error) {
          reject(stderr ? new Error(stderr) : error);
        } else {
          resolve(stdout);
        }
      });
    });
  },
};
