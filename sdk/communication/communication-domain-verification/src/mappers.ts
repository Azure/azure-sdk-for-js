// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { VerifyDomainOwnershipPostResponse } from "./generated/src/models";
import { DomainOwnership, DomainVerificationStatus } from "./models";

export function ConvertToDomainOwnership(
  verifyDomainOwnershipResponse: VerifyDomainOwnershipPostResponse
): DomainOwnership {
  const result: DomainOwnership = {
    status: verifyDomainOwnershipResponse.status as DomainVerificationStatus,
  };
  return result;
}
