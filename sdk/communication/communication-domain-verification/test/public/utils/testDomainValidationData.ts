// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DomainVerificationStatus } from '../../../src/models';
import { API_VERSION, ROOT_DOMAIN } from '../../../src/utils/constants'

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

const DEFAULT_ACS_VERIFIED_DOMAIN = `domain-1-${API_VERSION}.${ROOT_DOMAIN}`;
const DEFAULT_ACS_DOMAIN_OWNERSHIP_CHALLENGE = "MS300941";

export function getVerificationValue(): string {
  return process.env.ACS_DOMAIN_OWNERSHIP_CHALLENGE || DEFAULT_ACS_DOMAIN_OWNERSHIP_CHALLENGE;
}

export function getDomain(): string {
  return process.env.ACS_VERIFIED_DOMAIN_NAME || DEFAULT_ACS_VERIFIED_DOMAIN;
}

export function getEmptyDomain(): any {
  return undefined;
}

export function getInvalidDomain(): string {
  return "invaliddomain";
}

export function getDomainStatus(): DomainVerificationStatus {
  return  "NotVerified";
}
