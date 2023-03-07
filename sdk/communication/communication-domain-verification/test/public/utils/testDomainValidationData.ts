// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DomainVerificationStatus } from "../../../src/models";
import { API_VERSION, ROOT_DOMAIN } from "../../../src/utils/constants";
import { env } from "@azure-tools/test-recorder";

const DEFAULT_ACS_VERIFIED_DOMAIN = `domain-1-${API_VERSION}.${ROOT_DOMAIN}`;
const DEFAULT_ACS_DOMAIN_OWNERSHIP_CHALLENGE = "MS402217";

export function getVerificationValue(): string {
  return env.ACS_DOMAIN_OWNERSHIP_CHALLENGE || DEFAULT_ACS_DOMAIN_OWNERSHIP_CHALLENGE;
}

export function getDomain(): string {
  return env.ACS_VERIFIED_DOMAIN_NAME || DEFAULT_ACS_VERIFIED_DOMAIN;
}

export function getEmptyDomain(): any {
  return "";
}

export function getInvalidDomain(): string {
  return "invaliddomain";
}

export function getDomainStatus(): DomainVerificationStatus {
  return "NotVerified";
}
