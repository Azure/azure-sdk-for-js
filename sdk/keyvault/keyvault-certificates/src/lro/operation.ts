import { RequestOptionsBase } from "@azure/core-http";
import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { CertificateOperation, CertificatePolicy } from "../certificatesModels";

export interface CertificatePollOperationProperties<Client> {
  name: string;
  certificatePolicy: CertificatePolicy;
  client: Client;
  requestOptions?: RequestOptionsBase;
  initialResponse?: CertificateOperation;
  previousResponse?: CertificateOperation;
}

export interface CertificatePollOperation extends PollOperation<CertificatePollOperationProperties<Client>, CertificateOperation> {}

async function update(
  this: CertificatePollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (properties: CertificatePollOperationProperties<Client>) => void;
  } = {}
): Promise<CertificatePollOperation> {
  const { name, certificatePolicy, client, requestOptions, initialResponse, previousResponse } = this.properties;
  const abortSignal = options.abortSignal || (requestOptions && requestOptions.abortSignal);

  let response: CertificateOperation;
  const doFinalResponse = previousResponse && previousResponse.parsedBody.doFinalResponse;

  if (!initialResponse) {
    await client.createCertificate(name, certificatePolicy, { requestOptions });
    response = await client.getCertificateOperation(name, { requestOptions });
    this.properties.initialResponse = response;
  } else if (doFinalResponse) {
    response = await client.getCertificateOperation(name, { requestOptions });
    this.state.completed = true;
    this.state.result = response;
  } else {
    response = await client.getCertificateOperation(name, { requestOptions });
  }

  const properties: CertificatePollOperationProperties<Client> = {
    ...this.properties,
    previousResponse: response
  };

  // Progress only after the poller has started and before the poller is done
  if (!(!initialResponse || doFinalResponse) && options.fireProgress) {
    options.fireProgress(properties);
  }

  return makePollOperation({ ...this.state }, properties);
}

async function cancel(
  this: CertificatePollOperation,
  options: { abortSignal?: AbortSignal } = {}
): Promise<CertificatePollOperation> {
  const requestOptions = this.properties.requestOptions;
  const abortSignal = options.abortSignal || (requestOptions && requestOptions.abortSignal);
  const response = this.client.cancelCertificateOperation(this.properties.name);

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
  state: PollOperationState<Certificate>,
  properties: CertificatePollOperationProperties<Client>
): CertificatePollOperation {
  return {
    state,
    properties,
    update,
    cancel,
    toString
  };
}
