import { delay } from "@azure/core-http";
import { Poller, PollOperationState } from "@azure/core-lro";
import { CertificatePollOperation, CertificatePollOperationProperties, makePollOperation } from "./operation";
import { CertificateOperation } from "../core/models";
import { CertificatePolicy, CertificatesClientInterface } from "../certificatesModels";
 
export class CertificatePoller extends Poller<CertificatePollOperationProperties, CertificateOperation> {
  public intervalInMs: number;

  constructor(
    client: CertificatesClientInterface,
    name: string,
    certificatePolicy: CertificatePolicy,
    manual: boolean = false,
    intervalInMs: number = 1000,
    baseOperation?: CertificatePollOperation,
    onProgress?: (properties: CertificatePollOperationProperties) => void
  ) {
    let state: PollOperationState<CertificateOperation> = {};
    let properties: CertificatePollOperationProperties | undefined = undefined;

    if (baseOperation) {
      state = baseOperation.state;
      properties = baseOperation.properties;
    }
 
    const operation: CertificatePollOperation = makePollOperation(state, {
      ...properties,
      name,
      certificatePolicy,
      client,
    });
 
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
 
