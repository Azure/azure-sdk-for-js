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

/**
 * Class that creates a poller that waits until a certificate finishes being created
 */
export class CreateCertificatePoller extends Poller<
  CreateCertificatePollOperationProperties,
  CertificateOperation
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof CreateCertificatePoller
   */
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

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof CreateCertificatePoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
