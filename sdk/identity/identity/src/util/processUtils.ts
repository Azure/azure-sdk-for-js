// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as childProcess from "child_process";

/**
 * Easy to mock childProcess utils.
 * @internal
 */
export const processUtils = {
  /**
   * Promisifying childProcess.execFile
   * @internal
   */
  execFile(file: string, params: string[]): Promise<string | Buffer> {
    return new Promise((resolve, reject) => {
      childProcess.execFile(file, params, (error, stdout, stderr) => {
        if (error || stderr) {
          reject(error || stderr);
        } else {
          resolve(stdout);
        }
      });
    });
  }
};
