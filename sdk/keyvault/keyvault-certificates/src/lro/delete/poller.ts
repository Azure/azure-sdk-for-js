import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller, PollOperationState } from "@azure/core-lro";
import {
  DeleteCertificatePollOperation,
  DeleteCertificatePollOperationProperties,
  makeDeleteCertificatePollOperation
} from "./operation";
import { CertificatesClientInterface, DeletedCertificate } from "../../certificatesModels";

export interface DeleteCertificatePollerOptions {
  client: CertificatesClientInterface;
  name: string;
  requestOptions: RequestOptionsBase;
  manual?: boolean;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that creates a poller that waits until a certificate finishes being created
 */
export class DeleteCertificatePoller extends Poller<
  DeleteCertificatePollOperationProperties,
  DeletedCertificate
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof DeleteCertificatePoller
   */
  public intervalInMs: number;

  constructor(options: DeleteCertificatePollerOptions) {
    const {
      client,
      name,
      requestOptions,
      manual = false,
      intervalInMs = 1000,
      resumeFrom
    } = options;

    let state: PollOperationState<DeletedCertificate> = {};
    let properties: DeleteCertificatePollOperationProperties | undefined = undefined;

    if (resumeFrom) {
      const baseOperation: {
        state: PollOperationState<DeletedCertificate>;
        properties: DeleteCertificatePollOperationProperties;
      } = JSON.parse(resumeFrom);
      state = baseOperation.state;
      properties = baseOperation.properties;
    }

    const operation: DeleteCertificatePollOperation = makeDeleteCertificatePollOperation(state, {
      ...properties,
      name,
      requestOptions,
      client
    });

    super(operation, manual);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof DeleteCertificatePoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
