import { ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { Agent } from "./agent";
import GeneratedConfidentialLedger, {
  ConfidentialLedgerClient,
} from "./generated/src/confidentialLedger";

export default function ConfidentialLedger(
  ledgerBaseUrl: string,
  ledgerTlsCertificate: string,
  credentials: TokenCredential,
  options?: ClientOptions
): ConfidentialLedgerClient {
  const confidentialLedger = GeneratedConfidentialLedger(ledgerBaseUrl, credentials, options);
  confidentialLedger.pipeline.addPolicy({
    name: "ledgerTlsCertificatePolicy",
    sendRequest: (request, next) => {
      request.agent = new Agent({ ca: ledgerTlsCertificate });
      return next(request);
    },
  });

  return confidentialLedger;
}
