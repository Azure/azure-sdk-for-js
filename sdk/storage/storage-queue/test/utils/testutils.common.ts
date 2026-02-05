// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { StorageClient } from "../../src/StorageClient.js";
import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { isNodeLike } from "@azure/core-util";

type UriSanitizers = Required<RecorderStartOptions>["sanitizerOptions"]["uriSanitizers"];

export function configureStorageClient(recorder: Recorder, client: StorageClient): void {
  const options = recorder.configureClientOptions({});

  const pipeline: Pipeline = client["storageClientContext"].pipeline;
  for (const { policy } of options.additionalPolicies ?? []) {
    pipeline.addPolicy(policy, { afterPhase: "Sign", afterPolicies: ["injectorPolicy"] });
  }
}

function getUriSanitizerForQueryParam(paramName: string) {
  return {
    regex: true,
    target: `http.+\\?([^&=]+=[^&=]+&)*(?<param>${paramName}=[^&=]+&?)`,
    groupForReplace: "param",
    value: "",
  };
}

const mockAccountName = "fakestorageaccount";
const mockAccountKey = "aaaaa";
const mockSas =
  "?sv=2015-04-05&ss=bfqt&srt=sco&sp=rwdlacup&se=2023-01-31T18%3A51%3A40.0000000Z&sig=foobar";
const sasParams = [
  "se",
  "sig",
  "sip",
  "sp",
  "spr",
  "srt",
  "ss",
  "sr",
  "st",
  "sv",
  "skiod",
  "sktid",
  "skt",
  "ske",
  "sks",
  "skv",
];
if (!isNodeLike) {
  sasParams.push("_");
}

export const uriSanitizers: UriSanitizers = sasParams.map(getUriSanitizerForQueryParam);
export const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: {
    // Used in record and playback modes
    // 1. The key-value pairs will be used as the environment variables in playback mode
    // 2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
    ACCOUNT_NAME: `${mockAccountName}`,
    ACCOUNT_KEY: `${mockAccountKey}`,
    ACCOUNT_SAS: `${mockSas}`,
    STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    // Comment following line to skip user delegation key/SAS related cases in record and play
    // which depends on this environment variable
    ACCOUNT_TOKEN: `${mockAccountKey}`,
  },
  sanitizerOptions: {
    uriSanitizers,
  },
};

export function getUniqueName(prefix: string): string {
  return `${prefix}${new Date().getTime()}${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, "00000")}`;
}

export function base64encode(content: string): string {
  return !isNodeLike ? btoa(content) : Buffer.from(content).toString("base64");
}

export function base64decode(encodedString: string): string {
  return !isNodeLike ? atob(encodedString) : Buffer.from(encodedString, "base64").toString();
}

/**
 * A TokenCredential that always returns the given token. This class can be
 * used when the access token is already known or can be retrieved from an
 * outside source.
 */
export class SimpleTokenCredential implements TokenCredential {
  /**
   * The raw token string.  Can be changed when the token needs to be updated.
   */
  public token: string;

  /**
   * The Date at which the token expires.  Can be changed to update the expiration time.
   */
  public expiresOn: Date;

  /**
   * Creates an instance of TokenCredential.
   * @param token -
   */
  constructor(token: string, expiresOn?: Date) {
    this.token = token;
    this.expiresOn = expiresOn ? expiresOn : new Date(Date.now() + 60 * 60 * 1000);
  }

  /**
   * Retrieves the token stored in this RawTokenCredential.
   *
   * @param _scopes - Ignored since token is already known.
   * @param _options - Ignored since token is already known.
   * @returns The access token details.
   */
  async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions,
  ): Promise<AccessToken | null> {
    return {
      token: this.token,
      expiresOnTimestamp: this.expiresOn.getTime(),
    };
  }
}
