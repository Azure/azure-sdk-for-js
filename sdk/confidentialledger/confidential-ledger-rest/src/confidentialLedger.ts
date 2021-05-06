import { ClientOptions } from "@azure-rest/core-client";
import { TokenCredential, CertificateCredential, isCertificateCredential } from "@azure/core-auth";
import { PipelinePolicy } from "@azure/core-rest-pipeline";
import { Agent } from "./agent";
import GeneratedConfidentialLedger, {
  ConfidentialLedgerClient,
} from "./generated/src/confidentialLedger";

export default function ConfidentialLedger(
  ledgerBaseUrl: string,
  ledgerTlsCertificate: string,
  credentials: TokenCredential | CertificateCredential,
  options?: ClientOptions
): ConfidentialLedgerClient {
  const confidentialLedger = GeneratedConfidentialLedger(
    ledgerBaseUrl,
    credentials as any,
    options
  );

  confidentialLedger.pipeline.addPolicy(getCertValidationPolicy(ledgerTlsCertificate, credentials));

  return confidentialLedger;
}

function getCertValidationPolicy(
  ledgerTlsCertificate: string,
  credential: TokenCredential | CertificateCredential
): PipelinePolicy {
  return {
    name: "ledgerTlsCertificatePolicy",
    sendRequest: (request, next) => {
      // Create default agent and options if they don't exist
      request.agent = request.agent ?? new Agent();
      request.agent.options = request.agent.options ?? {};

      // Add certificate for authentication if one was provided
      if (isCertificateCredential(credential)) {
        request.agent.options.cert = credential.cert;
        request.agent.options.key = credential.certKey;
      }

      // Add CA to trust Confidential Ledger self signed certificate
      request.agent.options.ca = ledgerTlsCertificate;
      return next(request);
    },
  };
}
