// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from ".";

export type NockType = typeof import("nock");
let nock: NockType;

/**
 *  msal auth requests where an access_token is returned are dynamic
 *  - client_request_id is generated everytime we make a new request which makes the requestBody dynamic
 *  - requestBody also has more properties such as the type/make of the OS which makes the requests different in different machines
 *
 *  This method provides the fake token during playback by not matching the request body at all
 */
export function mockMsalAuth(importNock: NockType, plugin: (() => void) | undefined) {
  nock = importNock;
  if (!plugin) {
    pluginForClientSecretCredentialTests();
  } else {
    pluginForIdentitySDK();
  }
}

/**
 * This method is enough for any test that uses ClientSecretCredential from identity to provide the fake access_token (as per the current msal configurations).
 *
 * If msal ever changes its behavior, this needs to change - for example path/url/reply have to be updated accordingly
 */
const pluginForClientSecretCredentialTests = () => {
  if (env.AZURE_TENANT_ID) {
    nock("https://login.microsoftonline.com:443")
      .persist()
      .post(`/${env.AZURE_TENANT_ID}/oauth2/v2.0/token`)
      .reply(200, {
        token_type: "Bearer",
        expires_in: 86399,
        ext_expires_in: 86399,
        access_token: "access_token"
      });
  }
};

/**
 * This method is required for testing the credentials in the identity SDK to provide the fake access_token (as per the current msal configurations).
 *
 * If msal ever changes its behavior, this needs to change - for example path/url/reply have to be updated accordingly
 */
export const pluginForIdentitySDK = () => {
  nock("https://login.microsoftonline.com:443")
    .persist()
    .post((uri: string) => uri.includes("/oauth2/v2.0/token")) // Path can either be "{tenant-id}/oauth2/v2.0/token" or "/organizations/oauth2/v2.0/token"
    .reply(200, {
      token_type: "Bearer",
      expires_in: 86399,
      ext_expires_in: 86399,
      access_token: "access_token",
      refresh_token: "refresh_token",
      id_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFMVE16YWtpaGlSbGFfOHoyQkVKVlhlV01xbyJ9.eyJ2ZXIiOiIyLjAiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkL3YyLjAiLCJzdWIiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFJa3pxRlZyU2FTYUZIeTc4MmJidGFRIiwiYXVkIjoiNmNiMDQwMTgtYTNmNS00NmE3LWI5OTUtOTQwYzc4ZjVhZWYzIiwiZXhwIjoxNTM2MzYxNDExLCJpYXQiOjE1MzYyNzQ3MTEsIm5iZiI6MTUzNjI3NDcxMSwibmFtZSI6IkFiZSBMaW5jb2xuIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiQWJlTGlAbWljcm9zb2Z0LmNvbSIsIm9pZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC02NmYzLTMzMzJlY2E3ZWE4MSIsInRpZCI6IjMzMzgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsIm5vbmNlIjoiMTIzNTIzIiwiYWlvIjoiRGYyVVZYTDFpeCFsTUNXTVNPSkJjRmF0emNHZnZGR2hqS3Y4cTVnMHg3MzJkUjVNQjVCaXN2R1FPN1lXQnlqZDhpUURMcSFlR2JJRGFreXA1bW5PcmNkcUhlWVNubHRlcFFtUnA2QUlaOGpZIn0=.1AFWW-Ck5nROwSlltm7GzZvDwUkqvhSQpm55TQsmVo9Y59cLhRXpvB8n-55HCr9Z6G_31_UbeUkoz612I2j_Sm9FFShSDDjoaLQr54CreGIJvjtmS3EkK9a7SJBbcpL1MpUtlfygow39tFjY7EVNW9plWUvRrTgVk7lYLprvfzw-CIqw3gHC-T7IK_m_xkr08INERBtaecwhTeN4chPC4W3jdmw_lIxzC48YoQ0dB1L9-ImX98Egypfrlbm0IBL5spFzL6JDZIRRJOu8vecJvj1mq-IUhGt0MacxX8jdxYLP-KUu2d9MbNKpCKJuZ7p8gwTL5B7NlUdh_dmSviPWrw",
      client_info: "eyJ1aWQiOiIxMjMtdGVzdC11aWQiLCJ1dGlkIjoiNDU2LXRlc3QtdXRpZCJ9"
    });
  // Above id_token and client_info are straight from the msal tests
  // Reference - https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/926f1c2ba0598575e23dfd8cdd8b79fa3a3d19ff/lib/msal-browser/test/utils/BrowserProtocolUtils.spec.ts#L73
};
