// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelinePolicy } from "@azure/core-rest-pipeline";
export interface CertificateCredential {}

/**
 * Gets a pipeline policy that adds the client certificate to the HttpClient agent for authentication.
 * Only supported on NodeJS
 */
export function getClientCertificatePolicy(_cert?: CertificateCredential): PipelinePolicy {
  throw new Error("Client certificate authentication is only supported in NodeJS");
}
