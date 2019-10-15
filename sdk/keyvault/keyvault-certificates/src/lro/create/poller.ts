import { delay } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import {
  CreateCertificatePollOperationState,
  makeCreateCertificatePollOperation
} from "./operation";
import {
  Certificate,
  CertificatePolicy,
  CertificatesClientInterface,
  CreateCertificateOptions
} from "../../certificatesModels";
import { CertificateOperation } from "../../core/models";

export interface CreateCertificatePollerOptions {
  client: CertificatesClientInterface;
  name: string;
  certificatePolicy?: CertificatePolicy;
  createCertificateOptions?: CreateCertificateOptions;
  intervalInMs?: number;
  resumeFrom?: string;
  doNotCreate?: boolean;
}

/**
 * Class that creates a poller that waits until a certificate finishes being created
 */
export class CreateCertificatePoller extends Poller<
  CreateCertificatePollOperationState,
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
      intervalInMs = 1000,
      resumeFrom,
      doNotCreate
    } = options;

    let state: CreateCertificatePollOperationState | undefined;

    if (resumeFrom) {
      state = {
        ...JSON.parse(resumeFrom).state,
        ...state
      };
    }

    const operation = makeCreateCertificatePollOperation({
      ...state,
      name,
      certificatePolicy,
      createCertificateOptions,
      client,
      doNotCreate
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof CreateCertificatePoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }

  /**
   * Returns a pending certificate
   * @memberof CreateCertificatePoller
   */
  getPendingCertificate(): Certificate | undefined {
    return this.operation.state.pendingCertificate;
  }

  /**
   * Ensures the poller has a previousResponse, and returns it
   * @memberof CreateCertificatePoller
   */
  async getOperation(): Promise<CertificateOperation> {
    if (!this.getPreviousResponse()) {
      await this.poll();
    }
    return this.getPreviousResponse()!;
  }

  /**
   * Returns the initial response
   * @memberof CreateCertificatePoller
   */
  getInitialResponse(): CertificateOperation | undefined {
    return this.operation.state.initialResponse;
  }
  /**
   * Returns the previous response
   * @memberof CreateCertificatePoller
   */
  getPreviousResponse(): CertificateOperation | undefined {
    return this.operation.state.previousResponse;
  }
}
