// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import Sinon, { createSandbox } from "sinon";
import { MsalBaseUtilities } from "../src/msal/utils";
import { Recorder } from "@azure-tools/test-recorder";
import { isNode } from "@azure/core-util";

// Browser tests fail if dotenv.config is called in that environment.
if (isNode) {
  dotenv.config({ path: ".env" });
}

export type MsalTestCleanup = () => Promise<void>;

export interface MsalTestSetupResponse {
  cleanup: MsalTestCleanup;
  recorder: Recorder;
  sandbox: Sinon.SinonSandbox;
}

export const PlaybackTenantId = "12345678-1234-1234-1234-123456789012";

/**
 * OpenId configuration discovery endpoint response
 * @internal
 */
export const openIdConfigurationResponse: Record<string, string | string[] | boolean> = {
  token_endpoint: `https://login.microsoftonline.com/${PlaybackTenantId}/oauth2/v2.0/token`,
  token_endpoint_auth_methods_supported: [
    "client_secret_post",
    "private_key_jwt",
    "client_secret_basic",
  ],
  jwks_uri: `https://login.microsoftonline.com/${PlaybackTenantId}/discovery/v2.0/keys`,
  response_modes_supported: ["query", "fragment", "form_post"],
  subject_types_supported: ["pairwise"],
  id_token_signing_alg_values_supported: ["RS256"],
  response_types_supported: ["code", "id_token", "code id_token", "id_token token"],
  scopes_supported: ["openid", "profile", "email", "offline_access"],
  issuer: `https://login.microsoftonline.com/${PlaybackTenantId}/v2.0`,
  request_uri_parameter_supported: false,
  userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
  authorization_endpoint: `https://login.microsoftonline.com/${PlaybackTenantId}/oauth2/v2.0/authorize`,
  device_authorization_endpoint:
    "https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/oauth2/v2.0/devicecode",
  http_logout_supported: true,
  frontchannel_logout_supported: true,
  end_session_endpoint: `https://login.microsoftonline.com/${PlaybackTenantId}/oauth2/v2.0/logout`,
  claims_supported: [
    "sub",
    "iss",
    "cloud_instance_name",
    "cloud_instance_host_name",
    "cloud_graph_host_name",
    "msgraph_host",
    "aud",
    "exp",
    "iat",
    "auth_time",
    "acr",
    "nonce",
    "preferred_username",
    "name",
    "tid",
    "ver",
    "at_hash",
    "c_hash",
    "email",
  ],
  tenant_region_scope: "NA",
  cloud_instance_name: "microsoftonline.com",
  cloud_graph_host_name: "graph.windows.net",
  msgraph_host: "graph.microsoft.com",
  rbac_url: "https://pas.windows.net",
};

export async function msalNodeTestSetup(
  testContext?: Mocha.Test,
  playbackClientId = "azure_client_id"
): Promise<MsalTestSetupResponse> {
  const playbackValues = {
    correlationId: "client-request-id",
  };
  const recorder = new Recorder(testContext);
  recorder.setMatcher("CustomDefaultMatcher", {
    excludedHeaders: ["X-AnchorMailbox", "Content-Length", "User-Agent"],
  });

  await recorder.start({
    envSetupForPlayback: {
      AZURE_TENANT_ID: PlaybackTenantId,
      AZURE_CLIENT_ID: playbackClientId,
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_USERNAME: "azure_username",
      AZURE_PASSWORD: "azure_password",
      AZURE_IDENTITY_TEST_TENANTID: "",
      AZURE_IDENTITY_TEST_USERNAME: "",
      AZURE_IDENTITY_TEST_PASSWORD: "",
      IDENTITY_SP_CLIENT_ID: "",
      IDENTITY_SP_TENANT_ID: "",
      IDENTITY_SP_CLIENT_SECRET: "",
      IDENTITY_SP_CERT_PEM: "",
      AZURE_CAE_MANAGEMENT_ENDPOINT: "https://management.azure.com/",
      AZURE_CLIENT_CERTIFICATE_PATH: "assets/fake-cert.pem",
    },
    sanitizerOptions: {
      headerSanitizers: [
        {
          key: "User-Agent",
          value: "User-Agent",
        },
        {
          key: "Set-Cookie",
          regex: true,
          target: `(fpc|esctx)=(?<secret_cookie>[^;]+)`,
          value: "secret_cookie",
          groupForReplace: "secret_cookie",
        },
      ],
      generalSanitizers: [
        {
          regex: true,
          target: `enter the code [A-Z0-9]* to authenticate`,
          value: `enter the code USER_CODE to authenticate`,
        },
      ],
    },
  });

  // Playback sanitizers
  await recorder.addSanitizers(
    {
      bodySanitizers: [
        {
          regex: true,
          target: 'client_secret=[^&"]+',
          value: "client_secret=azure_client_secret",
        },
        {
          regex: true,
          target: `client_assertion=[a-zA-Z0-9-._]*`,
          value: "client_assertion=client_assertion",
        },
        {
          regex: true,
          target: 'device_code=[^&"]+',
          value: "device_code=DEVICE_CODE",
        },
        {
          regex: true,
          target: `x-client-OS=[a-zA-Z0-9]+`,
          value: `x-client-OS=x-client-OS`,
        },
        {
          regex: true,
          target: `x-client-CPU=[a-zA-Z0-9]+`,
          value: `x-client-CPU=x-client-CPU`,
        },
        {
          regex: true,
          target: `x-client-VER=[a-zA-Z0-9.-]+`,
          value: `x-client-VER=identity-client-version`,
        },
      ],
      bodyKeySanitizers: [
        {
          jsonPath: "$.device_code",
          value: "DEVICE_CODE",
        },
        {
          jsonPath: "$.bodyProvided.device_code",
          value: "DEVICE_CODE",
        },
        {
          jsonPath: "$.interval",
          value: "0",
        },
        {
          jsonPath: "$.client-request-id",
          value: playbackValues.correlationId,
        },
        {
          jsonPath: "$.access_token",
          value: "access_token",
        },
        {
          jsonPath: "$.bodyProvided.access_token",
          value: "access_token",
        },
        {
          jsonPath: "$.refresh_token",
          value: "refresh_token",
        },
        {
          jsonPath: "$.bodyProvided.refresh_token",
          value: "refresh_token",
        },
        {
          jsonPath: "$.id_token",
          value:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtpZCJ9.eyJhdWQiOiJhdWQiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyL3YyLjAiLCJpYXQiOjE2MTUzMzcxNjMsIm5iZiI6MTYxNTMzNzE2MywiZXhwIjoxNjE1MzQxMDYzLCJhaW8iOiJhaW8iLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9pZHAvIiwibmFtZSI6IkRhbmllbCBSb2Ryw61ndWV6Iiwib2lkIjoib2lkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGFucm9kcmlAbWljcm9zb2Z0LmNvbSIsInJoIjoicmguIiwic3ViIjoic3ViIiwidGlkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIiwidXRpIjoidXRpIiwidmVyIjoiMi4wIn0=.bm9faWRlYV93aGF0c190aGlz",
        },
        {
          jsonPath: "$.client_info",
          value:
            "eyJ1aWQiOiIxMjM0NTY3OC0xMjM0LTEyMzQtMTIzNC0xMjM0NTY3ODkwMTIiLCJ1dGlkIjoiMTIzNDU2NzgtMTIzNC0xMjM0LTEyMzQtMTIzNDU2Nzg5MDEyIn0K",
        },
      ],
    },
    ["record", "playback"]
  );

  const sandbox = createSandbox();

  const stub = sandbox.stub(MsalBaseUtilities.prototype, "generateUuid");
  stub.returns(playbackValues.correlationId);

  return {
    sandbox,
    recorder,
    async cleanup() {
      await recorder.stop();
      sandbox.restore();
    },
  };
}
