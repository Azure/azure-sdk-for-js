// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Type declarations for @azure/storage-blob workspace dependency
// This allows the build to succeed even when the workspace dependency hasn't been built yet
declare module "@azure/storage-blob" {
  export class ContainerClient {
    constructor(url: string);
    [key: string]: any;
  }
}
