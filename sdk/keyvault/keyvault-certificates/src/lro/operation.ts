import { RequestOptionsBase } from "@azure/core-http";
import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { CertificateOperation } from "../core/models";
import { CertificatePolicy, CertificatesClientInterface } from "../certificatesModels";

export interface CertificatePollOperationProperties {
  name: string;
  certificatePolicy: CertificatePolicy;
  client: CertificatesClientInterface;
  requestOptions?: RequestOptionsBase;
  initialResponse?: CertificateOperation;
  previousResponse?: CertificateOperation;
}

export interface CertificatePollOperation
  extends PollOperation<CertificatePollOperationProperties, CertificateOperation> {}

async function update(
  this: CertificatePollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (properties: CertificatePollOperationProperties) => void;
  } = {}
): Promise<CertificatePollOperation> {
  const { name, certificatePolicy, client, initialResponse, previousResponse } = this.properties;
  const requestOptions = this.properties.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  let response: CertificateOperation;
  const doFinalResponse = previousResponse && previousResponse.status !== "pending";

  if (!initialResponse) {
    await client.createCertificate(name, certificatePolicy, requestOptions);
    response = await client.getCertificateOperation(name, requestOptions);
    this.properties.initialResponse = response;
  } else if (doFinalResponse) {
    response = await client.getCertificateOperation(name, requestOptions);
    this.state.completed = true;
    this.state.result = response;
  } else {
    response = await client.getCertificateOperation(name, requestOptions);
  }

  const properties: CertificatePollOperationProperties = {
    ...this.properties,
    previousResponse: response
  };

  // Progress only after the poller has started and before the poller is done
  if (!(!initialResponse || doFinalResponse) && options.fireProgress) {
    options.fireProgress(properties);
  }

  return makePollOperation(this.state, properties);
}

async function cancel(
  this: CertificatePollOperation,
  options: { abortSignal?: AbortSignal } = {}
): Promise<CertificatePollOperation> {
  const requestOptions = this.properties.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }
  const client = this.properties.client;
  await client.cancelCertificateOperation(this.properties.name, requestOptions);
  const response = await client.getCertificateOperation(name, requestOptions);

  return makePollOperation(
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

function toString(this: CertificatePollOperation): string {
  return JSON.stringify({
    state: {
      ...this.state
    },
    properties: this.properties
  });
}

export function makePollOperation(
  state: PollOperationState<CertificateOperation>,
  properties: CertificatePollOperationProperties
): CertificatePollOperation {
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
