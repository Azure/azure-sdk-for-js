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
 * An interface representing the properties of a create certificate's poll operation
 */
export interface CreateCertificatePollOperationProperties {
  /**
   * @member {CreateCertificatePollOperationProperties} [name] The name of the certificate that will be created
   */
  name: string;
  /**
   * @member {CreateCertificatePollOperationProperties} [certificatePolicy] The policy of the certificate that will be created
   */
  certificatePolicy: CertificatePolicy;
  /**
   * @member {CreateCertificatePollOperationProperties} [createCertificateOptions] The optional parameters that will be used to create the certificate
   */
  createCertificateOptions: CreateCertificateOptions;
  /**
   * @member {CreateCertificatePollOperationProperties} [client] An instance of the CertificatesClient class
   */
  client: CertificatesClientInterface;
  /**
   * @member {CreateCertificatePollOperationProperties} [initialResponse] The initial response received the first time the service was reached by the operation's update function
   */
  initialResponse?: CertificateOperation;
  /**
   * @member {CreateCertificatePollOperationProperties} [previousResponse] The previous response received the last time the service was reached by the operation's update function
   */
  previousResponse?: CertificateOperation;
  /**
   * @member {CreateCertificatePollOperationProperties} [pendingCertificate] The pending certificate, for easy access.
   */
  pendingCertificate?: Certificate;
}

/**
 * @interface
 * An interface representing a create certificate's poll operation
 */
export interface CreateCertificatePollOperation
  extends PollOperation<CreateCertificatePollOperationProperties, Certificate> {}

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
  let pendingCertificate: Certificate | undefined;
  const doFinalResponse = previousResponse && previousResponse.status !== "inProgress";

  if (!initialResponse) {
    await client.createCertificate(name, certificatePolicy, createCertificateOptions);
    pendingCertificate = await client.getCertificateWithPolicy(name, requestOptions);
    response = await client.getCertificateOperation(name, requestOptions);
    this.properties.initialResponse = response;
  } else if (doFinalResponse) {
    response = await client.getCertificateOperation(name, requestOptions);
    const finalCertificate = await client.getCertificateWithPolicy(name, requestOptions);
    this.state.completed = true;
    this.state.result = finalCertificate;
  } else {
    pendingCertificate = await client.getCertificateWithPolicy(name, requestOptions);
    response = await client.getCertificateOperation(name, requestOptions);
  }

  const properties: CreateCertificatePollOperationProperties = {
    ...this.properties,
    previousResponse: response,
    pendingCertificate
  };

  // Progress only after the poller has started and before the poller is done
  if (initialResponse && !doFinalResponse && options.fireProgress) {
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
  const response = await client.cancelCertificateOperation(name, requestOptions);

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
    state: this.state,
    properties: this.properties
  });
}

/**
 * @summary Builds a create certificate's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 * @param [properties] The properties of a previous create certificate's poll operation, in case the new one is intended to follow up where the previous one was left.
 */
export function makeCreateCertificatePollOperation(
  state: PollOperationState<Certificate>,
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
