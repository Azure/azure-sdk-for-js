// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
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

import { isPlaybackMode } from "@azure-tools/test-recorder";

/// No need to wait when polling in playback mode.
const pollerSettings = isPlaybackMode() ? { intervalInMs: 1 } : {};

describe("RemoteRenderingClient construction", () => {
  const accountDomain = "mixedreality.azure.com";
  const accountId = "00000000-0000-0000-0000-000000000000";
  const accountKey = "00000000-0000-0000-0000-000000000000";
  const serviceEndpoint = "https://remoterendering.mixedreality.azure.com";
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
    const client = new RemoteRenderingClient(serviceEndpoint, accountId, accessToken);

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
      "Argument 3 cannot be null or empty."
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
      "Argument 3 cannot be null or empty."
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

  it("can convert successfully", async () => {
    const storageContainerUrl: string =
      "https://" +
      getEnv("REMOTERENDERING_ARR_STORAGE_ACCOUNT_NAME") +
      ".blob.core.windows.net/" +
      getEnv("REMOTERENDERING_ARR_BLOB_CONTAINER_NAME");

    const inputSettings: AssetConversionInputSettings = {
      storageContainerUrl,
      storageContainerReadListSas: getEnv("REMOTERENDERING_ARR_SAS_TOKEN"),
      relativeInputAssetPath: "testBox.fbx",
      blobPrefix: "Input"
    };
    const outputSettings: AssetConversionOutputSettings = {
      storageContainerUrl,
      storageContainerWriteSas: getEnv("REMOTERENDERING_ARR_SAS_TOKEN"),
      blobPrefix: "Output"
    };
    const conversionSettings: AssetConversionSettings = { inputSettings, outputSettings };

    const conversionId: string = recorder.getUniqueName("conversionId");

    const conversionPoller: AssetConversionPollerLike = await client.beginConversion(
      conversionId,
      conversionSettings,
      pollerSettings
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

    const conversion: AssetConversion = await client.getConversion(conversionId);
    assert.equal(conversion.conversionId, conversionId);
    assert.notEqual(conversion.status, "Failed");

    const conversion2: AssetConversion = await conversionPoller.pollUntilDone();
    assert.equal(conversion2.conversionId, conversionId);
    assert.equal(conversion2.status, "Succeeded");
    if (conversion2.status === "Succeeded") {
      assert.isTrue(conversion2.output.outputAssetUrl?.endsWith("Output/testBox.arrAsset"));
    }

    let foundConversion: boolean = false;
    for await (const c of client.listConversions()) {
      if (c.conversionId === conversionId) {
        foundConversion = true;
      }
    }
    assert.isTrue(foundConversion);
  });

  it("throws correct exception on no access", async () => {
    const storageContainerUrl =
      "https://" +
      getEnv("REMOTERENDERING_ARR_STORAGE_ACCOUNT_NAME") +
      ".blob.core.windows.net/" +
      getEnv("REMOTERENDERING_ARR_BLOB_CONTAINER_NAME");

    // Do not provide SAS tokens
    const inputSettings: AssetConversionInputSettings = {
      storageContainerUrl,
      relativeInputAssetPath: "testBox.fbx",
      blobPrefix: "Input"
    };
    const outputSettings: AssetConversionOutputSettings = {
      storageContainerUrl,
      blobPrefix: "Output"
    };
    const conversionSettings: AssetConversionSettings = { inputSettings, outputSettings };

    const conversionId = recorder.getUniqueName("conversionId");

    let didThrowExpected: boolean = false;
    try {
      await client.beginConversion(conversionId, conversionSettings, pollerSettings);
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

  it("will fail in the correct way on missing asset", async () => {
    const storageContainerUrl =
      "https://" +
      getEnv("REMOTERENDERING_ARR_STORAGE_ACCOUNT_NAME") +
      ".blob.core.windows.net/" +
      getEnv("REMOTERENDERING_ARR_BLOB_CONTAINER_NAME");

    const inputSettings: AssetConversionInputSettings = {
      storageContainerUrl,
      storageContainerReadListSas: getEnv("REMOTERENDERING_ARR_SAS_TOKEN"),
      relativeInputAssetPath: "boxWhichDoesNotExist.fbx",
      blobPrefix: "Input"
    };
    const outputSettings: AssetConversionOutputSettings = {
      storageContainerUrl,
      storageContainerWriteSas: getEnv("REMOTERENDERING_ARR_SAS_TOKEN"),
      blobPrefix: "Output"
    };
    const conversionSettings: AssetConversionSettings = { inputSettings, outputSettings };

    const conversionId = recorder.getUniqueName("conversionId");

    const conversionPoller: AssetConversionPollerLike = await client.beginConversion(
      conversionId,
      conversionSettings,
      pollerSettings
    );

    const assetConversion: AssetConversion = await client.getConversion(conversionId);
    assert.equal(assetConversion.conversionId, conversionId);

    const newPoller = await client.beginConversion({ resumeFrom: conversionPoller.toString() });
    assert.equal(newPoller.getOperationState().latestResponse.conversionId, conversionId);

    const conversion: AssetConversion = await conversionPoller.pollUntilDone();
    assert.equal(conversion.status, "Failed");
    if (conversion.status === "Failed") {
      // Invalid input provided. Check logs in output container for details.
      assert.isTrue(conversion.error.message.toLowerCase().includes("invalid input"));
      assert.isTrue(conversion.error.message.toLowerCase().includes("logs"));
    }
  });

  it("can start a session", async () => {
    const sessionSettings: RenderingSessionSettings = {
      maxLeaseTimeInMinutes: 4,
      size: "Standard"
    };
    const sessionId: string = recorder.getUniqueName("sessionId");

    const sessionPoller: RenderingSessionPollerLike = await client.beginSession(
      sessionId,
      sessionSettings,
      pollerSettings
    );

    assert.equal(sessionPoller.getOperationState().latestResponse.sessionId, sessionId);
    assert.equal(sessionPoller.getOperationState().latestResponse.size, sessionSettings.size);
    assert.equal(
      sessionPoller.getOperationState().latestResponse.maxLeaseTimeInMinutes,
      sessionSettings.maxLeaseTimeInMinutes
    );
    assert.notEqual(sessionPoller.getOperationState().latestResponse.status, "Error");

    const renderingSession = await client.getSession(sessionId);
    assert.equal(renderingSession.sessionId, sessionId);

    const newPoller = await client.beginSession({ resumeFrom: sessionPoller.toString() });
    assert.equal(newPoller.getOperationState().latestResponse.sessionId, sessionId);

    const updatedSession: RenderingSession = await client.updateSession(sessionId, {
      maxLeaseTimeInMinutes: 5
    });
    assert.equal(updatedSession.maxLeaseTimeInMinutes, 5);

    const readyRenderingSession: RenderingSession = await sessionPoller.pollUntilDone();

    // beginSession does one interval of polling. If the session was ready within that time, then the poller
    // would carry the earlier maxLeastTimeInMinutes value.
    assert.isTrue(
      readyRenderingSession.maxLeaseTimeInMinutes === 4 ||
        readyRenderingSession.maxLeaseTimeInMinutes === 5
    );

    assert.equal(readyRenderingSession.status, "Ready");

    let foundSession: boolean = false;
    for await (const s of client.listSessions()) {
      if (s.sessionId === sessionId) {
        foundSession = true;
      }
    }
    assert.isTrue(foundSession);

    await client.endSession(sessionId);
  });

  it("throws the correct exception on invalid session properties", async () => {
    const sessionSettings: RenderingSessionSettings = {
      maxLeaseTimeInMinutes: -4,
      size: "Standard"
    };
    const sessionId: string = recorder.getUniqueName("sessionId");

    let didThrowExpected: boolean = false;
    try {
      await client.beginSession(sessionId, sessionSettings, pollerSettings);
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
