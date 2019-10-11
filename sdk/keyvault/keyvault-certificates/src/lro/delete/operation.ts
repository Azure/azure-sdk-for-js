import { RequestOptionsBase } from "@azure/core-http";
import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import {
  CertificatePolicy,
  CertificatesClientInterface,
  DeletedCertificate,
} from "../../certificatesModels";

/**
 * @interface
 * An interface representing the properties of a delete certificate's poll operation
 */
export interface DeleteCertificatePollOperationProperties {
  /**
   * @member {DeleteCertificatePollOperationProperties} [name] The name of the certificate that will be deleted
   */
  name: string;
  /**
   * @member {DeleteCertificatePollOperationProperties} [requestOptions] The optional parameters that will be used to delete the certificate
   */
  requestOptions: RequestOptionsBase;
  /**
   * @member {DeleteCertificatePollOperationProperties} [client] An instance of the CertificatesClient class
   */
  client: CertificatesClientInterface;
  /**
   * @member {DeleteCertificatePollOperationProperties} [initialResponse] The initial response received the first time the service was reached by the operation's update function
   */
  initialResponse?: DeletedCertificate;
  /**
   * @member {DeleteCertificatePollOperationProperties} [previousResponse] The previous response received the last time the service was reached by the operation's update function
   */
  previousResponse?: DeletedCertificate;
}

/**
 * @interface
 * An interface representing a delete certificate's poll operation
 */
export interface DeleteCertificatePollOperation
  extends PollOperation<DeleteCertificatePollOperationProperties, DeletedCertificate> {}

/**
 * @summary Reaches to the service and updates the delete certificate's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: DeleteCertificatePollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (properties: DeleteCertificatePollOperationProperties) => void;
  } = {}
): Promise<DeleteCertificatePollOperation> {
  const {
    name,
    requestOptions,
    client,
    initialResponse,
    previousResponse
  } = this.properties;
  const requestOptions = this.properties.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  let response: DeletedCertificate;
  let doFinalResponse = false;

  try {
    await client.getCertificateWithPolicy(name);
  } catch(e) {
    if (initialResponse && !["Certificate is currently being deleted."].includes(e.message)) {
      doFinalResponse = true;
    }
  }

  if (!initialResponse) {
    await client.deleteCertificate(name, requestOptions);
    response = await client.getDeletedCertificate(name, requestOptions);
    this.properties.initialResponse = response;
  } else if (doFinalResponse) {
    response = await client.getDeletedCertificate(name, requestOptions);
    this.state.completed = true;
    this.state.result = response;
  } else {
    response = await client.getDeletedCertificate(name, requestOptions);
  }

  const properties: DeleteCertificatePollOperationProperties = {
    ...this.properties,
    previousResponse: response
  };

  // Progress only after the poller has started and before the poller is done
  if (initialResponse && !doFinalResponse && options.fireProgress) {
    options.fireProgress(properties);
  }

  return makeDeleteCertificatePollOperation(this.state, properties);
}

/**
 * @summary Reaches to the service and cancels the certificate's operation, also updating the certificate's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(
  this: DeleteCertificatePollOperation,
  _: { abortSignal?: AbortSignal } = {}
): Promise<DeleteCertificatePollOperation> {
  throw new Error(`The certificate ${this.properties.name} is currently being deleted. This operation cannot be cancelled.`)
}

/**
 * @summary Serializes the delete certificate's poll operation
 */
function toString(this: DeleteCertificatePollOperation): string {
  return JSON.stringify({
    state: this.state,
    properties: this.properties
  });
}

/**
 * @summary Builds a delete certificate's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 * @param [properties] The properties of a previous delete certificate's poll operation, in case the new one is intended to follow up where the previous one was left.
 */
export function makeDeleteCertificatePollOperation(
  state: PollOperationState<DeletedCertificate>,
  properties: DeleteCertificatePollOperationProperties
): DeleteCertificatePollOperation {
  return {
    state: {
      ...state
    },
    properties: {
      ...properties
    },
    update,
    cancel,
    toString
  };
}
