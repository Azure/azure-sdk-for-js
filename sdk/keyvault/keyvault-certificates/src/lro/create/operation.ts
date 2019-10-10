import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { CertificateOperation } from "../../core/models";
import {
  CertificatePolicy,
  CertificatesClientInterface,
  CreateCertificateOptions
} from "../../certificatesModels";

/**
 * @interface
 * An interface representing the properties of a create certificate's poll operation
 */
export interface CreateCertificatePollOperationProperties {
  name: string;
  certificatePolicy: CertificatePolicy;
  createCertificateOptions: CreateCertificateOptions;
  client: CertificatesClientInterface;
  initialResponse?: CertificateOperation;
  previousResponse?: CertificateOperation;
}

/**
 * @interface
 * An interface representing a create certificate's poll operation
 */
export interface CreateCertificatePollOperation
  extends PollOperation<CreateCertificatePollOperationProperties, CertificateOperation> {}

/**
 * @summary Reaches to the service and updates the create certificate's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: CreateCertificatePollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (properties: CreateCertificatePollOperationProperties) => void;
  } = {}
): Promise<CreateCertificatePollOperation> {
  const {
    name,
    certificatePolicy,
    createCertificateOptions,
    client,
    initialResponse,
    previousResponse
  } = this.properties;
  const requestOptions = this.properties.createCertificateOptions.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  let response: CertificateOperation;
  const doFinalResponse = previousResponse && previousResponse.status !== "inProgress";

  if (!initialResponse) {
    await client.createCertificate(name, certificatePolicy, createCertificateOptions);
    response = await client.getCertificateOperation(name, requestOptions);
    this.properties.initialResponse = response;
  } else if (doFinalResponse) {
    response = await client.getCertificateOperation(name, requestOptions);
    this.state.completed = true;
    this.state.result = response;
  } else {
    response = await client.getCertificateOperation(name, requestOptions);
  }

  const properties: CreateCertificatePollOperationProperties = {
    ...this.properties,
    previousResponse: response
  };

  // Progress only after the poller has started and before the poller is done
  if (!(!initialResponse || doFinalResponse) && options.fireProgress) {
    options.fireProgress(properties);
  }

  return makeCreateCertificatePollOperation(this.state, properties);
}

/**
 * @summary Reaches to the service and cancels the certificate's operation, also updating the certificate's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(
  this: CreateCertificatePollOperation,
  options: { abortSignal?: AbortSignal } = {}
): Promise<CreateCertificatePollOperation> {
  const requestOptions = this.properties.createCertificateOptions.requestOptions || {};
  const name = this.properties.name;
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }
  const client = this.properties.client;
  await client.cancelCertificateOperation(name, requestOptions);
  const response = await client.getCertificateOperation(name, requestOptions);

  return makeCreateCertificatePollOperation(
    {
      ...this.state,
      cancelled: true
    },
    {
      ...this.properties,
      previousResponse: response
    }
  );
}

/**
 * @summary Serializes the create certificate's poll operation
 */
function toString(this: CreateCertificatePollOperation): string {
  return JSON.stringify({
    state: {
      ...this.state
    },
    properties: this.properties
  });
}

/**
 * @summary Builds a create certificate's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 * @param [properties] The properties of a previous create certificate's poll operation, in case the new one is intended to follow up where the previous one was left.
 */
export function makeCreateCertificatePollOperation(
  state: PollOperationState<CertificateOperation>,
  properties: CreateCertificatePollOperationProperties
): CreateCertificatePollOperation {
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
