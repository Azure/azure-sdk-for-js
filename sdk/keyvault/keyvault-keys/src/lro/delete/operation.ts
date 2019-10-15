import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import {
  DeletedKey,
  KeyClientInterface,
} from "../../certificatesModels";

/**
 * @interface
 * An interface representing the state of a delete key's poll operation
 */
export interface DeleteKeyPollOperationState extends PollOperationState<DeletedKey> {
  /**
   * @member {string} [name] The name of the key that will be deleted
   */
  name: string;
  /**
   * @member {RequestOptionsBase} [requestOptions] The optional HTTP parameters that will be used to dele the key
   */
  requestOptions: RequestOptionsBase;
  /**
   * @member {CertificatesClientInterface} [client] An instance of the CertificatesClient class
   */
  client: CertificatesClientInterface;
  /**
   * @member {CertificateOperation} [initialResponse] The initial response received the first time the service was reached by the operation's update function
   */
  initialResponse?: CertificateOperation;
  /**
   * @member {CertificateOperation} [previousResponse] The previous response received the last time the service was reached by the operation's update function
   */
  previousResponse?: CertificateOperation;
}

/**
 * @interface
 * An interface representing a delete certificate's poll operation
 */
export interface DeleteKeyPollOperation
  extends PollOperation<DeleteKeyPollOperationState, DeletedKey> {}

/**
 * @summary Reaches to the service and updates the delete key's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: DeleteKeyPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: DeleteKeyPollOperationState) => void;
  } = {}
): Promise<DeleteKeyPollOperation> {
  const state = this.state;
  const { name, client } = state;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  const done = false;
  try {
    state.previousResponse = await client.getDeletedKey();
    doFinalResponse = true;
  } catch(_) {
  }

  if (!state.initialResponse) {
    await client.deleteKey(name, requestOptions);
    state.initialResponse = state.previousResponse;
    state.started = true;
  } else if (done) {
    state.result = state.previousResponse;
    state.completed = true;
  }

  // Progress only after the poller has started and before the poller is done
  if (state.initialResponse && !doFinalResponse && options.fireProgress) {
    options.fireProgress(state);
  }

  return makeDeleteKeyPollOperation(state);
}


/**
 * @summary Reaches to the service and cancels the certificate's operation, also updating the certificate's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(
  this: DeleteKeyPollOperation,
  options: { abortSignal?: AbortSignal } = {}
): Promise<DeleteKeyPollOperation> {
  const requestOptions = this.state.createCertificateOptions.requestOptions || {};
  const name = this.state.name;
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  const client = this.state.client;
  const response = await client.cancelCertificateOperation(name, requestOptions);

  return makeDeleteKeyPollOperation({
    ...this.state,
    cancelled: true,
    previousResponse: response
  });
}


/**
 * @summary Serializes the create certificate's poll operation
 */
function toString(this: DeleteKeyPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}


/**
 * @summary Builds a create certificate's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeDeleteKeyPollOperation(
  state: DeleteKeyPollOperationState
): DeleteKeyPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
