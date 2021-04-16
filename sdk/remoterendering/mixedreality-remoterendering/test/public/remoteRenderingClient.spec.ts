// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import { Recorder } from "@azure/test-utils-recorder";

import {
  RemoteRenderingClient,
  AssetConversionInputSettings,
  AssetConversionOutputSettings,
  AssetConversionSettings,
  AssetConversionPollerLike,
  AssetConversion,
  KnownAssetConversionStatus
} from "../../src";
import { AzureKeyCredential, TokenCredential, GetTokenOptions } from "@azure/core-auth";
import { AccessToken } from "@azure/core-http";
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
    assert.notEqual(conversion.status, KnownAssetConversionStatus.Failed);

    let conversion2: AssetConversion = await conversionPoller.pollUntilDone();
    assert.equal(conversion2.conversionId, conversionId);
    assert.equal(conversion2.status, KnownAssetConversionStatus.Succeeded);
    assert.isDefined(conversion2.output);
    assert.isDefined(conversion2.output?.outputAssetUrl);
    assert.isTrue(conversion2.output?.outputAssetUrl?.endsWith("Output/testBox.arrAsset"));

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

    assert.throws(
      () => client.beginConversion(conversionId, conversionSettings),
      ""
    );
  });
});
