// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AppConfigurationClient } from "../src";
import { getTokenAuthenticationCredential, CredsAndEndpoint } from './testHelpers';

describe("Authentication", () => {
  let credsAndEndpoint: CredsAndEndpoint;

  before(function () {
    credsAndEndpoint = getTokenAuthenticationCredential() || this.skip();
  });

  it("token authentication works", async () => {
      const client = new AppConfigurationClient(credsAndEndpoint.credential, credsAndEndpoint.endpoint);

      // it doesn't matter if any data comes in so long as we were 
      // able to connect and call the service
      await client.addConfigurationSetting({
        key: `token-authentication-test-${Date.now()}`,
        value: "hello"
      });
    });
});
