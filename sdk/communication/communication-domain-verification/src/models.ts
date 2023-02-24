// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import {
  Status
} from "./generated/src/models";

export {
  Status
} from "./generated/src/models";

/** Represents Domain that was verified */
export interface DomainOwnership {
  /** Status of domain verification */
  status: Status;
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
