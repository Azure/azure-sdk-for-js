// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export class StorageUri {
  uri: string;
  expiresAt: string;
  accessLevel: AccessLevel;
  constructor(uri: string, expiresAt: string, accessLevel: AccessLevel) {
    this.uri = uri;
    this.expiresAt = expiresAt;
    this.accessLevel = accessLevel;
  }
}

export enum AccessLevel {
  Read,
  Write,
  ReadWrite,
  ReadAddCreateWrite,
}
