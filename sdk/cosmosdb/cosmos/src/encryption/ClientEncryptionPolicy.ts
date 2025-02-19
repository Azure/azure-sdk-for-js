// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorResponse } from "../request";
import type { ClientEncryptionIncludedPath } from "./ClientEncryptionIncludedPath";
/**
 * Represents the client encryption policy associated with a container.
 */
export class ClientEncryptionPolicy {
  /** list of paths that needs to be encrypted along with their encryption settings. */
  public includedPaths: ClientEncryptionIncludedPath[];
  /**
   * Version of the client encryption policy definition.
   * The supported versions are 1 and 2. Default is 1.
   * Id and partition key paths encryption are only supported in version 2.
   */
  public policyFormatVersion: number;

  constructor(includedPaths: ClientEncryptionIncludedPath[], policyFormatVersion?: number) {
    this.validatePolicyVersion(policyFormatVersion);
    this.validateIncludedPaths(includedPaths);
    this.includedPaths = includedPaths;
    this.policyFormatVersion = policyFormatVersion || 1;
  }

  private validatePolicyVersion(policyFormatVersion: number): void {
    if (policyFormatVersion < 1 || policyFormatVersion > 2) {
      throw new ErrorResponse("Supported versions of client encryption policy are 1 and 2.");
    }
  }

  private validateIncludedPaths(includedPaths: ClientEncryptionIncludedPath[]): void {
    const paths = new Set<string>();
    for (const includedPath of includedPaths) {
      if (paths.has(includedPath.path)) {
        throw new ErrorResponse(
          `Duplicate path found: ${includedPath.path} in client encryption policy.`,
        );
      }
      this.validateClientEncryptionIncludedPath(includedPath);
      paths.add(includedPath.path);
    }
  }

  private validateClientEncryptionIncludedPath(includedPath: ClientEncryptionIncludedPath): void {
    if (
      includedPath.path === undefined ||
      includedPath.path === null ||
      includedPath.path === "" ||
      includedPath.path === "/"
    ) {
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
    if (includedPath.path[0] !== "/") {
      throw new ErrorResponse("Path in ClientEncryptionIncludedPath needs to start with '/'.");
    }
    const pathSegments = includedPath.path.split("/").filter((segment) => segment.length > 0);
    if (pathSegments.length > 1) {
      throw new ErrorResponse("Only top-level paths are currently supported for encryption");
    }
  }
}
