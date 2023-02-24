// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Status } from '../../../src/models'

export function getVerificationValue(): string {
  return "MS123456";
}

export function getDomain(): string {
  return "contoso.com";
}

export function getEmptyDomain(): any {
  return undefined;
}

export function getInvalidDomain(): string {
  return "contosocom";
}

export function getDomainStatus(): Status {
  return  "NotVerified";
}
