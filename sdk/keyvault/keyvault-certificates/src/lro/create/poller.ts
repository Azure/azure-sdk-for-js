import { delay } from "@azure/core-http";
import { Poller, PollOperationState } from "@azure/core-lro";
import {
  CreateCertificatePollOperation,
  CreateCertificatePollOperationProperties,
  makeCreateCertificatePollOperation
} from "./operation";
import {
  Certificate,
  CertificatePolicy,
  CertificatesClientInterface,
  CreateCertificateOptions
} from "../../certificatesModels";

export interface CreateCertificatePollerOptions {
  client: CertificatesClientInterface;
  name: string;
  certificatePolicy: CertificatePolicy;
  createCertificateOptions?: CreateCertificateOptions;
  manual?: boolean;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that creates a poller that waits until a certificate finishes being created
 */
export class CreateCertificatePoller extends Poller<
  CreateCertificatePollOperationProperties,
  Certificate
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof CreateCertificatePoller
   */
  public intervalInMs: number;

  constructor(options: CreateCertificatePollerOptions) {
    const {
      client,
      name,
      certificatePolicy,
      createCertificateOptions = {},
      manual = false,
      intervalInMs = 1000,
      resumeFrom
    } = options;

    let state: PollOperationState<Certificate> = {};
    let properties: CreateCertificatePollOperationProperties | undefined = undefined;

    if (resumeFrom) {
      const baseOperation: {
        state: PollOperationState<Certificate>;
        properties: CreateCertificatePollOperationProperties;
      } = JSON.parse(resumeFrom);
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
