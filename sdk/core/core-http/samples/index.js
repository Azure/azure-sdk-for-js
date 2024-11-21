const { ServiceClient, logPolicy, bearerTokenAuthenticationPolicy } = require("@azure/core-http");

const subscriptionId = "<subscription id>";
const token = "<access token>";

class TestTokenCredential {
  constructor(token, expiresOn) {
    this.token = token;
    this.expiresOn = expiresOn ? expiresOn.getTime() : Date.now() + 60 * 60 * 1000;
  }
  async getToken(_scopes, _options) {
    return {
      token: this.token,
      expiresOnTimestamp: this.expiresOn
    }
  }
}

const creds = new TestTokenCredential(token);
const clientOptions = {
  requestPolicyFactories: [
    logPolicy(),
    bearerTokenAuthenticationPolicy(
      creds,
      "https://management.azure.com"
    )
  ]
};

const client = new ServiceClient(creds, clientOptions);
const req = {
  url: `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Storage/storageAccounts?api-version=2015-06-15`,
  method: "GET"
};
client.sendRequest(req).then((res) => { console.log(res.bodyAsText.substr(0, 1000)); }).catch((err) => { console.log(err); });
