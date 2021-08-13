// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CertificateCredential } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { PipelinePolicy } from "@azure/core-rest-pipeline";

/**
 * Dummy policy for client certificate authentication.
 * Certificate authentication is not supported in the browser
 * this policy does nothing when running in the browser
 */
export function certificatePolicy(
  _ledgerTlsCertificate: string,
  _credential: TokenCredential | CertificateCredential
): PipelinePolicy {
  return {
    name: "ledgerTlsCertificatePolicy",
    sendRequest: (request, next) => next(request),
  };
}
