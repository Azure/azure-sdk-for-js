// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { Status as DomainVerificationStatus } from "./generated/src/models";

export { Status as DomainVerificationStatus } from "./generated/src/models";

/** Represents Domain that was verified */
export interface DomainOwnership {
  /** Status of domain verification */
  status: DomainVerificationStatus;
}

/** Represents Domain ownership verification challenge */
export interface DomainOwnershipChallenge {
  /** Expected verification value */
  value: string;
}

/**
 * Additional options for the Create Domain Ownership Challenge
 */
export interface CreateDomainOwnershipChallengeOptions extends OperationOptions {}

/**
 * Additional options for the Verify Domain Ownership
 */
export interface VerifyDomainOwnershipOptions extends OperationOptions {}
