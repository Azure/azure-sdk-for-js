// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { env } from ".";

export function mockMsalAuth(nock: typeof import("nock")) {
  if (env.AZURE_TENANT_ID) {
    nock("https://login.microsoftonline.com:443")
      .post(`"/${env.AZURE_TENANT_ID}/oauth2/v2.0/token"`)
      .reply(200, {
        token_type: "Bearer",
        expires_in: 86399,
        ext_expires_in: 86399,
        access_token: "access_token"
      });
  }
}
