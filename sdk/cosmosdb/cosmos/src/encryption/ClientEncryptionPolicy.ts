// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorResponse } from "../request";
import { ClientEncryptionIncludedPath } from "./ClientEncryptionIncludedPath";
import { EncryptionAlgorithm } from "./enums";

export class ClientEncryptionPolicy {
  public includedPaths: ClientEncryptionIncludedPath[];

  public policyFormatVersion: number;

  constructor(includedPaths: ClientEncryptionIncludedPath[], policyFormatVersion?: number) {
    this.validatePolicyVersion(this.policyFormatVersion);
    this.validateIncludedPaths(includedPaths, this.policyFormatVersion);
    this.includedPaths = includedPaths;
    this.policyFormatVersion = policyFormatVersion || 1;
  }

  private validatePolicyVersion(policyFormatVersion: number) {
    if (policyFormatVersion < 1 || policyFormatVersion > 2) {
      throw new ErrorResponse("Supported versions of client encryption policy are 1 and 2.");
    }
  }

  private validateIncludedPaths(
    includedPaths: ClientEncryptionIncludedPath[],
    policyFormatVersion: number,
  ) {
    const paths = new Set<string>();
    for (const includedPath of includedPaths) {
      if (paths.has(includedPath.path)) {
        throw new ErrorResponse(
          `Duplicate path found: ${includedPath.path} in client encryption policy.`,
        );
      }
      this.validateClientEncryptionIncludedPath(includedPath, policyFormatVersion);
      paths.add(includedPath.path);
    }
  }

  private validateClientEncryptionIncludedPath(
    includedPath: ClientEncryptionIncludedPath,
    policyFormatVersion: number,
  ) {
    if (includedPath.path === undefined || includedPath.path === null || includedPath.path === "") {
      throw new ErrorResponse("Path needs to be defined in ClientEncryptionIncludedPath.");
    }
    if (
      includedPath.clientEncryptionKeyId === undefined ||
      includedPath.clientEncryptionKeyId === null ||
      includedPath.clientEncryptionKeyId === "" ||
      typeof includedPath.clientEncryptionKeyId !== "string"
    ) {
      throw new ErrorResponse(
        "ClientEncryptionKeyId needs to be defined in ClientEncryptionIncludedPath.",
      );
    }
    if (includedPath.encryptionAlgorithm !== EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA256) {
      throw new ErrorResponse("Invalid encryption algorithm in ClientEncryptionIncludedPath.");
    }
    // TODO: add check for checking encryption type
    if (includedPath.path[0] !== "/") {
      throw new ErrorResponse("Path in ClientEncryptionIncludedPath needs to start with '/'.");
    }
    // TODO: place further checks for path
  }

  // TODO: add checks for checking partition key paths
}
