// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  accessAsync,
  appendFileAsync,
  confirmDirExists,
  getShallowDirectorySize,
  getShallowDirectorySizeSync,
  getShallowFileSize,
  readdirAsync,
  readFileAsync,
  statAsync,
  lstatAsync,
  mkdirAsync,
  writeFileAsync,
  unlinkAsync,
} from "./fileSystem.js";
export { ignoreOutgoingRequestHook } from "./common.js";
