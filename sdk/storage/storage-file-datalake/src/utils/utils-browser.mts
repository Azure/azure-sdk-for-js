// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const fsStat = async function stat(
  _path: string,
): Promise<{ size: number }> {
  throw new Error("fsStat is not supported in the browser.");
};

export const fsCreateReadStream = function createReadStream(
  _path: string,
  _options?: { autoClose?: boolean; end?: number; start?: number },
): NodeJS.ReadableStream {
  throw new Error("fsCreateReadStream is not supported in the browser.");
};
