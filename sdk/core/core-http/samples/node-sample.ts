// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";

import * as coreHttp from "../src/coreHttp";
const clientOptions: coreHttp.ServiceClientOptions = {
  requestPolicyFactories: [coreHttp.logPolicy()]
};

/* This is an example token credential that uses a token value directly. Ordinarily, clients should use a
 * TokenCredential provided by the user when the client is created. Users should use DefaultAzureCredential
 * from @azure/identity unless they have specific authentication needs.
 */
class TestTokenCredential implements coreHttp.TokenCredential {
  public token : string;
  public expiresOn : number;

  constructor(token: string, expiresOn?: Date) {
    this.token = token;
    this.expiresOn = expiresOn ? expiresOn.getTime() : Date.now() + 60*60*1000;
  }

  async getToken(
    _scopes: string | string[],
    _options? : coreHttp.GetTokenOptions
  ) : Promise<coreHttp.AccessToken | null> { 
    return {
      token : this.token,
      expiresOnTimestamp : this.expiresOn
    }
  }
}

const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"] || "subscriptionId";
// An easy way to get the token
// 1. Go to this test drive link https://azure.github.io/projects/apis and authenticate by clicking on Authorize. Check the user impersoantion checkbox in the popup.
// 1.1 select a subscription of your choice
// 1.2 select the storage-2015-06-15 option from the first drop down list
// 1.3 expand the url to list storage accounts in a subscription
// 1.4 click on try it out button.
// 1.5 in the curl tab you will see the actual curl request that has the bearer token in it
// 1.6 copy paste that token here. That token is valid for 1 hour
const token = process.env["ACCESS_TOKEN"] || "token";
const creds = new TestTokenCredential(token);
const client = new coreHttp.ServiceClient(creds, clientOptions);
const req: coreHttp.RequestPrepareOptions = {
  url: `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Storage/storageAccounts?api-version=2015-06-15`,
  method: "GET"
};

client.sendRequest(req).then(function (res: coreHttp.HttpOperationResponse) {
  console.log(res.bodyAsText);
});
