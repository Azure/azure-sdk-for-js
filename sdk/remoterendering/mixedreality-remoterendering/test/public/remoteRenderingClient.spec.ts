// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { Recorder } from "@azure/test-utils-recorder";
import { RestError } from "@azure/core-rest-pipeline";

import {
  RemoteRenderingClient,
  AssetConversionInputSettings,
  AssetConversionOutputSettings,
  AssetConversionSettings,
  AssetConversionPollerLike,
  AssetConversion,
  KnownAssetConversionStatus,
  RenderingSessionPollerLike,
  RenderingSessionSettings,
  RenderingSession
} from "../../src";
import {
  AccessToken,
  AzureKeyCredential,
  TokenCredential,
  GetTokenOptions
} from "@azure/core-auth";
import { createClient, createRecorder, getEnv } from "../utils/recordedClient";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

describe("RemoteRenderingClient construction", () => {
  const accountDomain = "mixedreality.azure.com";
  const accountId = "00000000-0000-0000-0000-000000000000";
  const accountKey = "00000000-0000-0000-0000-000000000000";
  const serviceEndpoint = "https://sts.mixedreality.azure.com";
  const keyCredential = new AzureKeyCredential(accountKey);

  it("can create", () => {
    const client = new RemoteRenderingClient(
      serviceEndpoint,
      accountId,
      accountDomain,
      keyCredential
    );

    assert.isNotNull(client);
  });

  it("can create with AccessToken", () => {
    const maxTimestampMs = 8640000000000000;
    const accessToken: AccessToken = { expiresOnTimestamp: maxTimestampMs, token: `abcdefghijk` };
    const client = new RemoteRenderingClient(
      serviceEndpoint,
      accountId,
      accountDomain,
      accessToken
    );

    assert.isNotNull(client);
  });

  it("can create with TokenCredential", () => {
    const tokenCredential: TokenCredential = {
      getToken: (_scopes: string | string[], _options?: GetTokenOptions) => {
        return Promise.resolve(null);
      }
    };
    const client = new RemoteRenderingClient(
      serviceEndpoint,
      accountId,
      accountDomain,
      tokenCredential
    );

    assert.isNotNull(client);
  });

  it("can create with invalid arguments", () => {
    assert.throws(
      () => new RemoteRenderingClient(undefined!, accountId, accountDomain, keyCredential),
      "Argument cannot be null or empty: 'endpoint'."
    );

    assert.throws(
      () => new RemoteRenderingClient(serviceEndpoint, undefined!, accountDomain, keyCredential),
      "Argument cannot be null or empty: 'accountId'."
    );

    assert.throws(
      () => new RemoteRenderingClient(serviceEndpoint, accountId, undefined!, keyCredential),
      "Argument cannot be null or empty: 'accountDomain'."
    );

    assert.throws(
      () => new RemoteRenderingClient(null!, accountId, accountDomain, keyCredential),
      "Argument cannot be null or empty: 'endpoint'."
    );

    assert.throws(
      () => new RemoteRenderingClient(serviceEndpoint, null!, accountDomain, keyCredential),
      "Argument cannot be null or empty: 'accountId'."
    );

    assert.throws(
      () => new RemoteRenderingClient(serviceEndpoint, accountId, null!, keyCredential),
      "Argument cannot be null or empty: 'accountDomain'."
    );
  });
});

describe("RemoteRendering functional tests", () => {
  let client: RemoteRenderingClient;
  let recorder: Recorder;

  beforeEach(function(this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function() {
    // Stop the recording.
    await recorder.stop();
  });

  it("successful conversion", async () => {
    let storageContainerUrl: string =
      "https://" +
      getEnv("REMOTERENDERING_ARR_STORAGE_ACCOUNT_NAME") +
      ".blob.core.windows.net/" +
      getEnv("REMOTERENDERING_ARR_BLOB_CONTAINER_NAME");

    let inputSettings: AssetConversionInputSettings = {
      storageContainerUrl,
      storageContainerReadListSas: getEnv("REMOTERENDERING_ARR_SAS_TOKEN"),
      relativeInputAssetPath: "testBox.fbx",
      blobPrefix: "Input"
    };
    let outputSettings: AssetConversionOutputSettings = {
      storageContainerUrl,
      storageContainerWriteSas: getEnv("REMOTERENDERING_ARR_SAS_TOKEN"),
      blobPrefix: "Output"
    };
    let conversionSettings: AssetConversionSettings = { inputSettings, outputSettings };

    let conversionId: string = recorder.getUniqueName("conversionId");

    let conversionPoller: AssetConversionPollerLike = await client.beginConversion(
      conversionId,
      conversionSettings
    );
    assert.equal(conversionPoller.getOperationState().latestResponse.conversionId, conversionId);
    assert.equal(
      conversionPoller.getOperationState().latestResponse.settings.inputSettings
        .relativeInputAssetPath,
      inputSettings.relativeInputAssetPath
    );
    assert.notEqual(
      conversionPoller.getOperationState().latestResponse.status,
      KnownAssetConversionStatus.Failed
    );

    let conversion: AssetConversion = await client.getConversion(conversionId);
    assert.equal(conversion.conversionId, conversionId);
    assert.notEqual(conversion.status, "Failed");

    let conversion2: AssetConversion = await conversionPoller.pollUntilDone();
    assert.equal(conversion2.conversionId, conversionId);
    assert.equal(conversion2.status, "Succeeded");
    if (conversion2.status === "Succeeded") {
      assert.isTrue(conversion2.output.outputAssetUrl?.endsWith("Output/testBox.arrAsset"));
    }

    let foundConversion: boolean = false;
    for await (const c of client.listConversions()) {
      if (c.conversionId == conversionId) {
        foundConversion = true;
      }
    }
    assert.isTrue(foundConversion);
  });

  it("failed conversion no access", async () => {
    let storageContainerUrl =
      "https://" +
      getEnv("REMOTERENDERING_ARR_STORAGE_ACCOUNT_NAME") +
      ".blob.core.windows.net/" +
      getEnv("REMOTERENDERING_ARR_BLOB_CONTAINER_NAME");

    // Do not provide SAS tokens
    let inputSettings: AssetConversionInputSettings = {
      storageContainerUrl,
      relativeInputAssetPath: "testBox.fbx",
      blobPrefix: "Input"
    };
    let outputSettings: AssetConversionOutputSettings = {
      storageContainerUrl,
      blobPrefix: "Output"
    };
    let conversionSettings: AssetConversionSettings = { inputSettings, outputSettings };

    let conversionId = recorder.getUniqueName("conversionId");

    let didThrowExpected: Boolean = false;
    try {
      await client.beginConversion(conversionId, conversionSettings);
    } catch (e) {
      assert(e instanceof RestError);
      if (e instanceof RestError) {
        assert.isTrue(e.message.toLowerCase().includes("storage"));
        assert.isTrue(e.message.toLowerCase().includes("permission"));
      }
      didThrowExpected = true;
    }
    assert.isTrue(didThrowExpected);
  });

  it("failed conversion missing asset", async () => {
    let storageContainerUrl =
      "https://" +
      getEnv("REMOTERENDERING_ARR_STORAGE_ACCOUNT_NAME") +
      ".blob.core.windows.net/" +
      getEnv("REMOTERENDERING_ARR_BLOB_CONTAINER_NAME");

    let inputSettings: AssetConversionInputSettings = {
      storageContainerUrl,
      storageContainerReadListSas: getEnv("REMOTERENDERING_ARR_SAS_TOKEN"),
      relativeInputAssetPath: "boxWhichDoesNotExist.fbx",
      blobPrefix: "Input"
    };
    let outputSettings: AssetConversionOutputSettings = {
      storageContainerUrl,
      storageContainerWriteSas: getEnv("REMOTERENDERING_ARR_SAS_TOKEN"),
      blobPrefix: "Output"
    };
    let conversionSettings: AssetConversionSettings = { inputSettings, outputSettings };

    let conversionId = recorder.getUniqueName("conversionId");

    let conversionPoller: AssetConversionPollerLike = await client.beginConversion(
      conversionId,
      conversionSettings
    );
    let conversion: AssetConversion = await conversionPoller.pollUntilDone();
    assert.equal(conversion.status, "Failed");
    if (conversion.status == "Failed") {
      // Invalid input provided. Check logs in output container for details.
      assert.isTrue(conversion.error.message.toLowerCase().includes("invalid input"));
      assert.isTrue(conversion.error.message.toLowerCase().includes("logs"));
    }
  });

  it("successful session", async () => {
    const sessionSettings: RenderingSessionSettings = {
      maxLeaseTimeInMinutes: 4,
      size: "Standard"
    };
    let sessionId: string = recorder.getUniqueName("sessionId");

    let sessionPoller: RenderingSessionPollerLike = await client.beginSession(
      sessionId,
      sessionSettings
    );

    assert.equal(sessionPoller.getOperationState().latestResponse.sessionId, sessionId);
    assert.equal(
      sessionPoller.getOperationState().latestResponse.size,
      sessionSettings.size
    );
    assert.equal(
      sessionPoller.getOperationState().latestResponse.maxLeaseTimeInMinutes,
      sessionSettings.maxLeaseTimeInMinutes
    );
    assert.notEqual(
      sessionPoller.getOperationState().latestResponse.status,
      "Error"
    );

    let renderingSession = await client.getSession(sessionId);
    assert.equal(renderingSession.sessionId, sessionId);

    let newPoller = await client.beginSession({ resumeFrom: sessionPoller.toString() });
    assert.equal(newPoller.getOperationState().latestResponse.sessionId, sessionId);

    let updatedSession: RenderingSession = await client.updateSession(sessionId, { maxLeaseTimeInMinutes: 5 });
    assert.equal(updatedSession.maxLeaseTimeInMinutes, 5);

    let readyRenderingSession: RenderingSession = await sessionPoller.pollUntilDone();
    
    // beginSession does one interval of polling. If the session was ready within that time, then the poller
    // would carry the earlier maxLeastTimeInMinutes value.
    assert.isTrue((readyRenderingSession.maxLeaseTimeInMinutes == 4) || (readyRenderingSession.maxLeaseTimeInMinutes == 5));

    assert.equal(readyRenderingSession.status, "Ready");

    let foundSession: boolean = false;
    for await (const s of client.listSessions()) {
      if (s.sessionId == sessionId) {
        foundSession = true;
      }
    }
    assert.isTrue(foundSession);

    client.endSession(sessionId);
  });

  it("invalid session", async () => {
    const sessionSettings: RenderingSessionSettings = {
      maxLeaseTimeInMinutes: -4,
      size: "Standard"
    };
    let sessionId: string = recorder.getUniqueName("sessionId");
    
    let didThrowExpected: Boolean = false;
    try {
      await client.beginSession(
        sessionId,
        sessionSettings
      );  
    } catch (e) {
      assert(e instanceof RestError);
      if (e instanceof RestError) {
        // The maxLeaseTimeMinutes value cannot be negative
        assert.isTrue(e.message.toLowerCase().includes("lease"));
        assert.isTrue(e.message.toLowerCase().includes("negative"));
      }
      didThrowExpected = true;
    }
    assert.isTrue(didThrowExpected);
  });
});
