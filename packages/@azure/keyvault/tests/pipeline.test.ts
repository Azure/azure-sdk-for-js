import * as assert from "assert";
import { getKeyvaultName } from "./utils/utils.common";
import { SecretsClient, Pipeline } from "../lib/secretsClient";
import { signingPolicy, exponentialRetryPolicy, deserializationPolicy, ServiceClientCredentials } from '@azure/ms-rest-js';

describe("Secret client pipeline", () => {
  let credential: ServiceClientCredentials;
  let keyVaultName: string;
  let keyVaultUrl: string;

  before(() => {
    credential = { signRequest: (request) => Promise.resolve(request) };
    keyVaultName = getKeyvaultName();
    keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;
  });

  it("can be created without specifying a pipeline or NewPipelineOptions", () => {
    const client = new SecretsClient(keyVaultUrl, credential);
    assert.ok((client as any).client._requestPolicyFactories!.length > 0, "The client should be created with a default set of request policy factories.");
  });

  it("can be created with NewPipelineOptions", () => {
    const client = new SecretsClient(keyVaultUrl, credential, {
      retryOptions: { retryCount: 10 },
      proxyOptions: { proxySettings: "HTTP://myproxy"}
    });
    assert.ok((client as any).client._requestPolicyFactories!.length > 0, "The client should be created from NewPipelineOptions with a set of request policy factories.");
  });

  it("can be created with a customized Pipeline", () => {
    const customPipeline: Pipeline = {
      requestPolicyFactories: [
        deserializationPolicy(),
        exponentialRetryPolicy(),
        signingPolicy(credential),
      ]
    };
    const client = new SecretsClient(keyVaultUrl, credential, customPipeline);
    assert.ok((client as any).client._requestPolicyFactories!.length === 3, "Expecting three request policy factories in this client's pipeline.");
  });

});