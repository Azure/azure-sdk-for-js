import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import { DeletedKey, KeyClientInterface } from "../../keysModels";

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
  requestOptions?: RequestOptionsBase;
  /**
   * @member {KeyClientInterface} [client] An instance of the key's client
   */
  client: KeyClientInterface;
  /**
   * @member {DeletedKey} [initialResponse] The initial response received the first time the service was reached by the operation's update function
   */
  initialResponse?: Error;
  /**
   * @member {DeletedKey} [previousResponse] The previous response received the last time the service was reached by the operation's update function
   */
  previousResponse?: Error;
}

/**
 * @interface
 * An interface representing a delete key's poll operation
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

  if (!state.initialResponse) {
    await client.deleteKey(name, requestOptions);
    state.started = true;
  }

  try {
    state.result = await client.getDeletedKey(name, { requestOptions });
    state.completed = true;
  } catch (error) {
    state.previousResponse = error;
  }

  if (!state.initialResponse) {
    state.initialResponse = state.previousResponse;
  }

  return makeDeleteKeyPollOperation(state);
}

/**
 * @summary Reaches to the service and cancels the key's operation, also updating the key's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(
  this: DeleteKeyPollOperation,
  _: { abortSignal?: AbortSignal } = {}
): Promise<DeleteKeyPollOperation> {
  throw new Error("Canceling the deletion of a key is not supported.");
}

/**
 * @summary Serializes the create key's poll operation
 */
function toString(this: DeleteKeyPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create key's poll operation
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
