// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { PipelinePolicy } from "@azure/core-rest-pipeline";
import { CertificateCredential, isCertificateCredential } from "@azure-rest/core-client";
import { Agent } from "https";
interface AgentOptions {
  /** Custom certificate authority to trust Self-Signed certificate */
  ca: string;
  /** Client certificate for authentication */
  cert?: string;
  /** Client private key for certificate authentication */
  key?: string;
}

export function certificatePolicy(
  ledgerTlsCertificate: string,
  credential: TokenCredential | CertificateCredential
): PipelinePolicy {
  // Create default agent and options if they don't exist
  let agentOptions: AgentOptions = {
    // Add CA to trust Confidential Ledger self signed certificate
    ca: ledgerTlsCertificate,
  };

  // Add certificate for authentication if one was provided
  if (isCertificateCredential(credential)) {
    agentOptions = { ...agentOptions, cert: credential.cert, key: credential.certKey };
  }

  return {
    name: "ledgerTlsCertificatePolicy",
    sendRequest: (request, next) => {
      request.agent = new Agent(agentOptions);
      return next(request);
    },
  };
}
