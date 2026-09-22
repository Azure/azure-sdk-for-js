// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  execFile,
  isProcessError,
  type ExecFileOptionsWithStringEncoding,
} from "@azure/core-process";

function outputToString(output: string | Buffer | undefined): string {
  if (output === undefined) {
    return "";
  }
  return Buffer.isBuffer(output) ? output.toString("utf8") : output;
}

/**
 * Easy to mock childProcess utils.
 * @internal
 */
export const processUtils = {
  /**
   * Executes a file and preserves output when the process exits nonzero.
   *
   * @internal
   */
  async execFileWithResult(
    file: string,
    params: string[],
    options: ExecFileOptionsWithStringEncoding,
  ): Promise<{ stdout: string; stderr: string; error: Error | null }> {
    try {
      const result = await execFile(file, params, options);
      return { ...result, error: null };
    } catch (error: unknown) {
      if (isProcessError(error)) {
        return {
          stdout: outputToString(error.stdout),
          stderr: outputToString(error.stderr),
          error,
        };
      }
      throw error;
    }
  },

  /**
   * Executes a file and rejects when it writes to stderr or exits nonzero.
   *
   * @internal
   */
  async execFile(
    file: string,
    params: string[],
    options: ExecFileOptionsWithStringEncoding,
  ): Promise<string> {
    const { stdout, stderr, error } = await processUtils.execFileWithResult(file, params, options);
    if (stderr || error) {
      throw stderr ? new Error(stderr) : error;
    }
    return stdout;
  },
};
