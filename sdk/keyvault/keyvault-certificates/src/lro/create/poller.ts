import { delay } from "@azure/core-http";
import { Poller, PollOperationState } from "@azure/core-lro";
import {
  CreateCertificatePollOperation,
  CreateCertificatePollOperationProperties,
  makeCreateCertificatePollOperation
} from "./operation";
import { CertificateOperation } from "../../core/models";
import {
  CertificatePolicy,
  CertificatesClientInterface,
  CreateCertificateOptions
} from "../../certificatesModels";

export class CreateCertificatePoller extends Poller<
  CreateCertificatePollOperationProperties,
  CertificateOperation
> {
  public intervalInMs: number;

  constructor(
    client: CertificatesClientInterface,
    name: string,
    certificatePolicy: CertificatePolicy,
    createCertificateOptions: CreateCertificateOptions = {},
    manual: boolean = false,
    intervalInMs: number = 1000,
    baseOperation?: CreateCertificatePollOperation,
    onProgress?: (properties: CreateCertificatePollOperationProperties) => void
  ) {
    let state: PollOperationState<CertificateOperation> = {};
    let properties: CreateCertificatePollOperationProperties | undefined = undefined;

    if (baseOperation) {
      state = baseOperation.state;
      properties = baseOperation.properties;
    }

    const operation: CreateCertificatePollOperation = makeCreateCertificatePollOperation(state, {
      ...properties,
      name,
      certificatePolicy,
      createCertificateOptions,
      client
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
