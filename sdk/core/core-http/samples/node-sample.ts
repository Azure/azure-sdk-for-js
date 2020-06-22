// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

"use strict";

import * as coreHttp from "../src/coreHttp";

/* This is an example token credential that uses a token value directly. Ordinarily, clients should use a
 * TokenCredential provided by the user when the client is created. Users should use DefaultAzureCredential
 * from @azure/identity unless they have specific authentication needs.
 */
class TestTokenCredential implements coreHttp.TokenCredential {
  public token: string;
  public expiresOn: number;

  constructor(token: string, expiresOn?: Date) {
    this.token = token;
    this.expiresOn = expiresOn
      ? expiresOn.getTime()
      : Date.now() + 60 * 60 * 1000;
  }

  async getToken(
    _scopes: string | string[],
    _options?: coreHttp.GetTokenOptions
  ): Promise<coreHttp.AccessToken | null> {
    return {
      token: this.token,
      expiresOnTimestamp: this.expiresOn
    };
  }
}

const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"] || "subscriptionId";
// An easy way to get the token using Azure CLI (https://docs.microsoft.com/cli/azure/?view=azure-cli-latest)
// 1. `az login` using the above subscription
// 2. `az account set -s <subscription id>`
// 3. `az account get-access-token --resource=https://management.azure.com`
// 4. copy paste that token here. That token is valid for 1 hour
const token = process.env["ACCESS_TOKEN"] || "token";
const creds = new TestTokenCredential(token);
const clientOptions: coreHttp.ServiceClientOptions = {
  requestPolicyFactories: [
    coreHttp.logPolicy(),
    coreHttp.bearerTokenAuthenticationPolicy(
      creds,
      "https://management.azure.com"
    )
  ]
};

const client = new coreHttp.ServiceClient(creds, clientOptions);
const req: coreHttp.RequestPrepareOptions = {
  url: `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Storage/storageAccounts?api-version=2015-06-15`,
  method: "GET"
};

client.sendRequest(req).then(function(res: coreHttp.HttpOperationResponse) {
  console.log(res.bodyAsText!.substr(0, 1000));
});
