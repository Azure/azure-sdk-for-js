import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller, PollOperationState } from "@azure/core-lro";
import { makeOperation, CertificatePollOperation, CertificatePollOperationProperties } from "./operation";
import { Certificate } from "../certificatesModels";
 
export class CertificatePoller<Client> extends Poller<CertificatePollOperationProperties, Certificate> {
  public intervalInMs: number;

  constructor(
    client: Client,
    manual: boolean = false,
    intervalInMs: number = 1000,
    baseOperation: CertificatePollOperation = {},
    onProgress?: (properties: CertificatePollOperationProperties<Client>) => void
  ) {
    super(operation, manual);

    if (onProgress) {
      this.onProgress(onProgress);
    }
    this.intervalInMs = intervalInMs;
  }

  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
 
