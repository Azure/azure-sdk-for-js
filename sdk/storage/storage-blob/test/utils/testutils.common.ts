// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { padStart } from "../../src/utils/utils.common";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";
import { isPlaybackMode, env, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";

export const testPollerProperties = {
  intervalInMs: isPlaybackMode() ? 0 : undefined
};

const mockAccountName = "fakestorageaccount";
const mockMDAccountName = "md-fakestorageaccount";
const mockAccountName1 = "fakestorageaccount1";
const mockAccountKey = "aaaaa";
export const recorderEnvSetup: RecorderEnvironmentSetup = {
  replaceableVariables: {
    // Used in record and playback modes
    // 1. The key-value pairs will be used as the environment variables in playback mode
    // 2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode
    ACCOUNT_NAME: `${mockAccountName}`,
    ACCOUNT_KEY: `${mockAccountKey}`,
    ACCOUNT_SAS: `${mockAccountKey}`,
    STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    // Comment following line to skip user delegation key/SAS related cases in record and play
    // which depends on this environment variable
    ACCOUNT_TOKEN: `${mockAccountKey}`,
    AZURE_CLIENT_ID: `${mockAccountKey}`,
    AZURE_TENANT_ID: `${mockAccountKey}`,
    AZURE_CLIENT_SECRET: `${mockAccountKey}`,
    MD_ACCOUNT_NAME: `${mockMDAccountName}`,
    MD_ACCOUNT_KEY: `${mockAccountKey}`,
    MD_ACCOUNT_SAS: `${mockAccountKey}`,
    MD_STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockMDAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    ENCRYPTION_SCOPE_1: "antjoscope1",
    ENCRYPTION_SCOPE_2: "antjoscope2",
    IMMUTABLE_CONTAINER_NAME: "fakecontainername",
    ORS_DEST_ACCOUNT_NAME: `${mockAccountName1}`,
    ORS_DEST_ACCOUNT_KEY: `${mockAccountKey}`,
    ORS_DEST_ACCOUNT_SAS: `${mockAccountKey}`,
    ORS_DEST_STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName1};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    SOFT_DELETE_ACCOUNT_NAME: `${mockAccountName}`,
    SOFT_DELETE_ACCOUNT_KEY: `${mockAccountKey}`,
    SOFT_DELETE_ACCOUNT_SAS: `${mockAccountKey}`,
    SOFT_DELETE_STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`
  },
  customizationsOnRecordings: [
    // Used in record mode
    // Array of callback functions can be provided to customize the generated recordings in record mode
    // `sig` param of SAS Token is being filtered here
    (recording: string): string =>
      recording.replace(
        new RegExp(env.ACCOUNT_SAS.match("(.*)&sig=(.*)")[2], "g"),
        `${mockAccountKey}`
      ),
    (recording: string): string =>
      recording.replace(
        /Authorization: SharedKey [^\\]+/g,
        "Authorization: SharedKey fakestorageaccount:pass123"
      )
  ],
  // SAS token may contain sensitive information
  queryParametersToSkip: [
    // Used in record and playback modes
    "se",
    "sig",
    "sip",
    "sp",
    "spr",
    "srt",
    "ss",
    "sr",
    "st",
    "sv"
  ]
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
    _options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    return {
      token: this.token,
      expiresOnTimestamp: this.expiresOn.getTime()
    };
  }
}

export function isBrowser(): boolean {
  return typeof self !== "undefined";
}

export function getUniqueName(prefix: string): string {
  return `${prefix}${new Date().getTime()}${padStart(
    Math.floor(Math.random() * 10000).toString(),
    5,
    "00000"
  )}`;
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
export function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

/**
 * Generate a Uint8Array with specified byteLength and randome content.
 *
 * @param byteLength -
 */
export function genearteRandomUint8Array(byteLength: number): Uint8Array {
  const uint8Arr = new Uint8Array(byteLength);
  for (let j = 0; j < byteLength; j++) {
    uint8Arr[j] = Math.floor(Math.random() * 256);
  }
  return uint8Arr;
}
