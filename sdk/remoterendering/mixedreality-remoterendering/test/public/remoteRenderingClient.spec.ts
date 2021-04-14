// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
//import { Context } from "mocha";
//import { Recorder } from "@azure/test-utils-recorder";

import {
    RemoteRenderingClient,
//    AssetConversionInputSettings,
//    AssetConversionOutputSettings,
//    AssetConversionSettings,
//    AssetConversionPollerLike,
//    AssetConversion,
//    KnownAssetConversionStatus
  } from "../../src";
  import { AzureKeyCredential, TokenCredential, GetTokenOptions } from "@azure/core-auth";
  import { AccessToken } from "@azure/core-http";

//import { AzureKeyCredential, MixedRealityStsClient } from "../src";
//import { createClient, createRecorder } from "./utils/recordedClient";

describe("RemoteRenderingClient", () => {
    const accountDomain = "mixedreality.azure.com";
    const accountId = "00000000-0000-0000-0000-000000000000";
    const accountKey = "00000000-0000-0000-0000-000000000000";
    const serviceEndpoint = "https://sts.mixedreality.azure.com";
    const keyCredential = new AzureKeyCredential(accountKey);

    it("can create", () => {
        const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, keyCredential);
    
        assert.isNotNull(client);
      });

    it("can create with AccessToken", () => {
        const maxTimestampMs = 8640000000000000;
        const accessToken: AccessToken = { expiresOnTimestamp: maxTimestampMs, token: `abcdefghijk` };
        const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, accessToken);
    
        assert.isNotNull(client);
      });
    
    it("can create with TokenCredential", () => {
        const tokenCredential: TokenCredential = { getToken: (_scopes: string | string[], _options?: GetTokenOptions) => { return Promise.resolve(null); } };
        const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, tokenCredential);
   
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

