// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthenticationResult } from "@azure/msal-node";
import { ConfidentialClientApplication, PublicClientApplication } from "@azure/msal-node";
import { PlaybackTenantId } from "../msalTestUtils.js";
import { Recorder, type VitestTestContext } from "@azure-tools/test-recorder";
import { vi } from "vitest";

export type MsalTestCleanup = () => Promise<void>;

export interface MsalTestSetupResponse {
  cleanup: MsalTestCleanup;
  recorder?: Recorder;
}

/**
 * Determines whether the given test is a Vitest Test.
 * @param test - The test to check.
 * @returns true if the given test is a Vitest Test.
 */
function isVitestTestContext(test: unknown): test is VitestTestContext {
  return (
    typeof test === "function" &&
    "task" in test &&
    typeof test.task === "object" &&
    test.task != null &&
    "name" in test.task
  );
}

export async function msalNodeTestSetup(
  testContext?: VitestTestContext,
  playbackClientId?: string,
): Promise<{
  cleanup: MsalTestCleanup;
  recorder: Recorder;
}>;

export async function msalNodeTestSetup(stubbedToken: AuthenticationResult): Promise<{
  cleanup: MsalTestCleanup;
}>;

export async function msalNodeTestSetup(
  testContextOrStubbedToken?: VitestTestContext | AuthenticationResult,
  playbackClientId = "azure_client_id",
): Promise<MsalTestSetupResponse> {
  const playbackValues = {
    correlationId: "client-request-id",
  };

  if (isVitestTestContext(testContextOrStubbedToken)) {
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
        AZURE_IDENTITY_TEST_TENANTID: PlaybackTenantId,
        AZURE_IDENTITY_TEST_USERNAME: "azure_username",
        AZURE_IDENTITY_TEST_PASSWORD: "azure_password",
        IDENTITY_SP_CLIENT_ID: "",
        IDENTITY_SP_TENANT_ID: "",
        IDENTITY_SP_CLIENT_SECRET: "",
        IDENTITY_SP_CERT_PEM: "",
        AZURE_CAE_MANAGEMENT_ENDPOINT: "https://management.azure.com/",
        AZURE_CLIENT_CERTIFICATE_PATH: "assets/fake-cert.pem",
        AZURE_IDENTITY_MULTI_TENANT_TENANT_ID: "99999999-9999-9999-9999-999999999999",
        AZURE_IDENTITY_MULTI_TENANT_CLIENT_ID: "azure_multi_tenant_client_id",
        AZURE_IDENTITY_MULTI_TENANT_CLIENT_SECRET: "azure_multi_tenant_client_secret",
        SKIP_SP_LIVE_TESTS: "true",
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
        uriSanitizers: [
          {
            regex: true,
            target: `client-request-id=[a-zA-Z0-9-]+`,
            value: `client-request-id=${playbackValues.correlationId}`,
          },
        ],
        bodySanitizers: [
          {
            regex: true,
            target: 'username=[^&"]+', // env sanitizers do not handle matching urlencoded params well (@ character is urlencoded)
            value: "username=azure_username",
          },
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
            value: `x-client-OS=Sanitized`,
          },
          {
            regex: true,
            target: `x-client-CPU=[a-zA-Z0-9]+`,
            value: `x-client-CPU=Sanitized`,
          },
          {
            regex: true,
            target: `x-client-VER=[a-zA-Z0-9.-]+`,
            value: `x-client-VER=identity-client-version`,
          },
          {
            regex: true,
            target: `client-request-id=[a-zA-Z0-9-]+`,
            value: `client-request-id=${playbackValues.correlationId}`,
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
      ["record", "playback"],
    );

    return {
      recorder,
      async cleanup() {
        await recorder.stop();
        vi.unstubAllEnvs();
        vi.restoreAllMocks();
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
      vi
        .spyOn(PublicClientApplication.prototype, method)
        .mockImplementation(async () => stubbedToken ?? null),
    );
    confidentialClientMethods.forEach((method) =>
      vi
        .spyOn(ConfidentialClientApplication.prototype, method)
        .mockImplementation(async () => stubbedToken ?? null),
    );

    return {
      async cleanup() {
        vi.restoreAllMocks();
      },
    };
  }
}
