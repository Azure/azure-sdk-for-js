// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { isPlaybackMode, Recorder, RecorderStartOptions, delay } from "@azure-tools/test-recorder";
import { FindReplaceSanitizer } from "@azure-tools/test-recorder/types/src/utils/utils";
import { Pipeline } from "@azure/core-rest-pipeline";
import { StorageClient } from "../../src/StorageClient";

export const testPollerProperties = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

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
  
const mockTenantId = "00000000-0000-0000-0000-000000000000";
const sasParams = ["se", "sig", "sip", "sp", "spr", "srt", "ss", "sr", "st", "sv"];
if (isBrowser()) {
  sasParams.push("_");
}
export const uriSanitizers: FindReplaceSanitizer[] = sasParams.map(getUriSanitizerForQueryParam);
export const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: {
    // Used in record and playback modes
    // 1. The key-value pairs will be used as the environment variables in playback mode
    // 2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
    DFS_ACCOUNT_NAME: `${mockAccountName}`,
    DFS_ACCOUNT_KEY: `${mockAccountKey}`,
    DFS_ACCOUNT_SAS: `${mockSas}`,
    DFS_STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    ENCRYPTION_SCOPE_1: "antjoscope1",
    ENCRYPTION_SCOPE_2: "antjoscope2",
    // Comment following line to skip user delegation key/SAS related cases in record and play
    // which depends on this environment variable
    // DFS_ACCOUNT_TOKEN: `${mockAccountKey}`,
    DFS_SOFT_DELETE_ACCOUNT_NAME: `${mockAccountName}`,
    DFS_SOFT_DELETE_ACCOUNT_KEY: `${mockAccountKey}`,
    DFS_SOFT_DELETE_ACCOUNT_SAS: `${mockSas}`,
    AZURE_CLIENT_ID: `${mockAccountKey}`,
    AZURE_TENANT_ID: `${mockTenantId}`,
    AZURE_CLIENT_SECRET: `${mockAccountKey}`,
  },
  sanitizerOptions: {
    uriSanitizers,
  },
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
  ],
};

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

export function isBrowser(): boolean {
  return typeof self !== "undefined";
}

export function getUniqueName(prefix: string): string {
  return `${prefix}${new Date().getTime()}${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, "00000")}`;
}

export function base64encode(content: string): string {
  return isBrowser() ? btoa(content) : Buffer.from(content).toString("base64");
}

export function base64decode(encodedString: string): string {
  return isBrowser() ? atob(encodedString) : Buffer.from(encodedString, "base64").toString();
}

type BlobMetadata = { [propertyName: string]: string };

/**
 * Validate if m1 is super set of m2.
 *
 * @param m1 - BlobMetadata
 * @param m2 - BlobMetadata
 */
export function isSuperSet(m1?: BlobMetadata, m2?: BlobMetadata): boolean {
  if (!m1 || !m2) {
    throw new RangeError("m1 or m2 is invalid");
  }

  for (const p in m2) {
    if (m1[p] !== m2[p]) {
      return false;
    }
  }

  return true;
}

/**
 * Sleep for seconds.
 *
 * @param seconds -
 */
export async function sleep(seconds: number): Promise<void> {
  await delay(seconds * 1000);
}
