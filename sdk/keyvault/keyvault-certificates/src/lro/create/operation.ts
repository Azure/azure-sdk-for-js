import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { CertificateOperation } from "../../core/models";
import {
  Certificate,
  CertificatePolicy,
  CertificatesClientInterface,
  CreateCertificateOptions
} from "../../certificatesModels";

/**
 * @interface
 * An interface representing the state of a create certificate's poll operation
 */
export interface CreateCertificatePollOperationState extends PollOperationState<Certificate> {
  /**
   * @member {CreateCertificatePollOperationState} [name] The name of the certificate that will be created
   */
  name: string;
  /**
   * @member {CreateCertificatePollOperationState} [certificatePolicy] The policy of the certificate that will be created
   */
  certificatePolicy: CertificatePolicy;
  /**
   * @member {CreateCertificatePollOperationState} [createCertificateOptions] The optional parameters that will be used to create the certificate
   */
  createCertificateOptions: CreateCertificateOptions;
  /**
   * @member {CreateCertificatePollOperationState} [client] An instance of the CertificatesClient class
   */
  client: CertificatesClientInterface;
  /**
   * @member {CreateCertificatePollOperationState} [initialResponse] The initial response received the first time the service was reached by the operation's update function
   */
  initialResponse?: CertificateOperation;
  /**
   * @member {CreateCertificatePollOperationState} [previousResponse] The previous response received the last time the service was reached by the operation's update function
   */
  previousResponse?: CertificateOperation;
  /**
   * @member {CreateCertificatePollOperationState} [pendingCertificate] The pending certificate, for easy access.
   */
  pendingCertificate?: Certificate;
}

/**
 * @interface
 * An interface representing a create certificate's poll operation
 */
export interface CreateCertificatePollOperation
  extends PollOperation<CreateCertificatePollOperationState, Certificate> {}

/**
 * @summary Reaches to the service and updates the create certificate's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: CreateCertificatePollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: CreateCertificatePollOperationState) => void;
  } = {}
): Promise<CreateCertificatePollOperation> {
  const state = this.state;
  const { name, certificatePolicy, createCertificateOptions, client } = state;

  const requestOptions = state.createCertificateOptions.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  const doFinalResponse = state.previousResponse && state.previousResponse.status !== "inProgress";

  if (!state.initialResponse) {
    await client.beginCreateCertificate(name, certificatePolicy, createCertificateOptions);
    state.pendingCertificate = await client.getCertificateWithPolicy(name, requestOptions);
    state.previousResponse = await client.getCertificateOperation(name, requestOptions);
    state.initialResponse = state.previousResponse;
    state.started = true;
  } else if (doFinalResponse) {
    state.previousResponse = await client.getCertificateOperation(name, requestOptions);
    state.result = await client.getCertificateWithPolicy(name, requestOptions);
    state.completed = true;
    state.pendingCertificate = undefined;
  } else {
    state.pendingCertificate = await client.getCertificateWithPolicy(name, requestOptions);
    state.previousResponse = await client.getCertificateOperation(name, requestOptions);
  }

  // Progress only after the poller has started and before the poller is done
  if (state.initialResponse && !doFinalResponse && options.fireProgress) {
    options.fireProgress(state);
  }

  return makeCreateCertificatePollOperation(state);
}

/**
 * @summary Reaches to the service and cancels the certificate's operation, also updating the certificate's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(
  this: CreateCertificatePollOperation,
  options: { abortSignal?: AbortSignal } = {}
): Promise<CreateCertificatePollOperation> {
  const requestOptions = this.state.createCertificateOptions.requestOptions || {};
  const name = this.state.name;
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }
  const client = this.state.client;
  const response = await client.cancelCertificateOperation(name, requestOptions);

  return makeCreateCertificatePollOperation({
    ...this.state,
    cancelled: true,
    previousResponse: response
  });
}

/**
 * @summary Serializes the create certificate's poll operation
 */
function toString(this: CreateCertificatePollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create certificate's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeCreateCertificatePollOperation(
  state: CreateCertificatePollOperationState
): CreateCertificatePollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
