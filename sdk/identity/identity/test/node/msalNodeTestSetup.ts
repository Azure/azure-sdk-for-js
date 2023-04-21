// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Sinon, { createSandbox } from "sinon";
import { MsalBaseUtilities } from "../../src/msal/utils";
import { Recorder } from "@azure-tools/test-recorder";
import {
  AuthenticationResult,
  ConfidentialClientApplication,
  PublicClientApplication,
} from "@azure/msal-node";
import { PlaybackTenantId } from "../msalTestUtils";
import { Test } from "mocha";

export type MsalTestCleanup = () => Promise<void>;

export interface MsalTestSetupResponse {
  cleanup: MsalTestCleanup;
  recorder?: Recorder;
  sandbox: Sinon.SinonSandbox;
}

export async function msalNodeTestSetup(
  testContext?: Test,
  playbackClientId?: string
): Promise<{
  cleanup: MsalTestCleanup;
  recorder: Recorder;
  sandbox: Sinon.SinonSandbox;
}>;

export async function msalNodeTestSetup(stubbedToken: AuthenticationResult): Promise<{
  cleanup: MsalTestCleanup;
  sandbox: Sinon.SinonSandbox;
}>;

export async function msalNodeTestSetup(
  testContextOrStubbedToken?: Test | AuthenticationResult,
  playbackClientId = "azure_client_id"
): Promise<MsalTestSetupResponse> {
  const playbackValues = {
    correlationId: "client-request-id",
  };

  const sandbox = createSandbox();

  const stub = sandbox.stub(MsalBaseUtilities.prototype, "generateUuid");
  stub.returns(playbackValues.correlationId);

  if (testContextOrStubbedToken instanceof Test || testContextOrStubbedToken === undefined) {
    const testContext = testContextOrStubbedToken;

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

    return {
      sandbox,
      recorder,
      async cleanup() {
        await recorder.stop();
        sandbox.restore();
      },
    };
  } else {
    const stubbedToken = testContextOrStubbedToken;

    const publicClientMethods: Array<keyof PublicClientApplication> = [
      "acquireTokenByCode",
      "acquireTokenByDeviceCode",
      "acquireTokenByRefreshToken",
      "acquireTokenByUsernamePassword",
      "acquireTokenInteractive",
      "acquireTokenSilent",
    ];
    const confidentialClientMethods: Array<keyof ConfidentialClientApplication> = [
      "acquireTokenByClientCredential",
      "acquireTokenByCode",
      "acquireTokenByRefreshToken",
      "acquireTokenByUsernamePassword",
      "acquireTokenOnBehalfOf",
      "acquireTokenSilent",
    ];

    publicClientMethods.forEach((method) =>
      sandbox.stub(PublicClientApplication.prototype, method).callsFake(async () => stubbedToken)
    );
    confidentialClientMethods.forEach((method) =>
      sandbox
        .stub(ConfidentialClientApplication.prototype, method)
        .callsFake(async () => stubbedToken)
    );

    return {
      sandbox,
      async cleanup() {
        sandbox.restore();
      },
    };
  }
}
