import { ClientOptions } from "@azure-rest/core-client";
import { TokenCredential, CertificateCredential, isCertificateCredential } from "@azure/core-auth";
import { PipelinePolicy } from "@azure/core-rest-pipeline";
import { Agent } from "./agent";
import GeneratedConfidentialLedger, {
  ConfidentialLedgerRestClient,
} from "./generated/src/confidentialLedger";

export default function ConfidentialLedger(
  ledgerBaseUrl: string,
  ledgerTlsCertificate: string,
  credentials: TokenCredential | CertificateCredential,
  options?: ClientOptions
): ConfidentialLedgerRestClient {
  const confidentialLedger = GeneratedConfidentialLedger(
    ledgerBaseUrl,
    credentials as any,
    options
  );

  confidentialLedger.pipeline.addPolicy(getCertValidationPolicy(ledgerTlsCertificate, credentials));

  return confidentialLedger;
}

interface AgentOptions {
  /** Custom certificate authority to trust Self-Signed certificate */
  ca: string;
  /** Client certificate for authentication */
  cert?: string;
  /** Client private key for certificate authentication */
  key?: string;
}

function getCertValidationPolicy(
  ledgerTlsCertificate: string,
  credential: TokenCredential | CertificateCredential
): PipelinePolicy {
  return {
    name: "ledgerTlsCertificatePolicy",
    sendRequest: (request, next) => {
      // Create default agent and options if they don't exist
      let agentOptions: AgentOptions = {
        // Add CA to trust Confidential Ledger self signed certificate
        ca: ledgerTlsCertificate,
      };

      // Add certificate for authentication if one was provided
      if (isCertificateCredential(credential)) {
        agentOptions = { ...agentOptions, cert: credential.cert, key: credential.certKey };
      }

      request.agent = new Agent(agentOptions);

      return next(request);
    },
  };
}
