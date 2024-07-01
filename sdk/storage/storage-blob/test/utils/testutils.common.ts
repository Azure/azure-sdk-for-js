// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { padStart } from "../../src/utils/utils.common";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import { isPlaybackMode, Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { StorageClient } from "../../src/StorageClient";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  FindReplaceSanitizer,
  RegexSanitizer,
} from "@azure-tools/test-recorder/types/src/utils/utils";

export const testPollerProperties = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

export function configureBlobStorageClient(recorder: Recorder, serviceClient: StorageClient): void {
  const options = recorder.configureClientOptions({});

  const pipeline: Pipeline = (serviceClient as any).storageClientContext.pipeline;
  for (const { policy } of options.additionalPolicies ?? []) {
    pipeline.addPolicy(policy, { afterPhase: "Sign", afterPolicies: ["injectorPolicy"] });
  }
}

function getUriSanitizerForQueryParam(paramName: string): RegexSanitizer {
  return {
    regex: true,
    target: `http.+?[^&]*&?(?<param>${paramName}=[^&]+&?)`,
    groupForReplace: "param",
    value: "",
  };
}

const mockAccountName = "fakestorageaccount";
// const mockMDAccountName = "md-fakestorageaccount";
// const mockAccountName1 = "fakestorageaccount1";
const mockAccountKey = "aaaaa";
const mockTenantId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
const mockSas =
  "?sv=2015-04-05&ss=bfqt&srt=sco&sp=rwdlacup&se=2023-01-31T18%3A51%3A40.0000000Z&sig=foobar";

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

    ACCOUNT_KEY: `${mockAccountKey}`,
    ACCOUNT_SAS: `${mockSas}`,
    STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    // Comment following line to skip user delegation key/SAS related cases in record and play
    // which depends on this environment variable
    // ACCOUNT_TOKEN: `${mockAccountKey}`,
    AZURE_CLIENT_ID: `${mockAccountKey}`,
    AZURE_TENANT_ID: `${mockTenantId}`,
    AZURE_CLIENT_SECRET: `${mockAccountKey}`,
    // MD_ACCOUNT_NAME: `${mockMDAccountName}`,
    // MD_ACCOUNT_KEY: `${mockAccountKey}`,
    // MD_ACCOUNT_SAS: `${mockSas}`,
    // MD_STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockMDAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    // ENCRYPTION_SCOPE_1: "antjoscope1",
    // ENCRYPTION_SCOPE_2: "antjoscope2",
    // IMMUTABLE_CONTAINER_NAME: "fakecontainername",
    // ORS_DEST_ACCOUNT_NAME: `${mockAccountName1}`,
    // ORS_DEST_ACCOUNT_KEY: `${mockAccountKey}`,
    // ORS_DEST_ACCOUNT_SAS: `${mockSas}`,
    // ORS_DEST_STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName1};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    ENCRYPTION_SCOPE_1: "test1",
    ENCRYPTION_SCOPE_2: "test2",
    SOFT_DELETE_ACCOUNT_NAME: `${mockAccountName}`,
    SOFT_DELETE_ACCOUNT_KEY: `${mockAccountKey}`,
    SOFT_DELETE_ACCOUNT_SAS: `${mockSas}`,
    SOFT_DELETE_STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    ACCOUNT_NAME: `${mockAccountName}`,
  },
  sanitizerOptions: {
    removeHeaderSanitizer: {
      headersForRemoval: ["x-ms-copy-source-authorization", "x-ms-copy-source"],
    },
    bodySanitizers: [
      {
        regex: true,
        target: "(.*)&sig=(?<sig_value>.*)",
        groupForReplace: "sig_value",
        value: mockAccountKey,
      },
      {
        regex: true,
        target: "Authorization: SharedKey (?<shared_key>[^\\\\]+)",
        groupForReplace: "shared_key",
        value: "fakestorageaccount:pass123",
      },
    ],
  },
  removeCentralSanitizers: [
    "AZSDK2011", // "x-ms-encryption-key-sha256" provided is a fake value from ./fakeTestSecrets.ts
  ],
};

export const recorderEnvSetupWithCopySource: RecorderStartOptions = {
  envSetupForPlayback: {
    // Used in record and playback modes
    // 1. The key-value pairs will be used as the environment variables in playback mode
    // 2. If the env variables are present in the recordings as plain strings, they will be replaced with the provided values in record mode

    ACCOUNT_KEY: `${mockAccountKey}`,
    ACCOUNT_SAS: `${mockSas}`,
    STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    // Comment following line to skip user delegation key/SAS related cases in record and play
    // which depends on this environment variable
    // ACCOUNT_TOKEN: `${mockAccountKey}`,
    AZURE_CLIENT_ID: `${mockAccountKey}`,
    AZURE_TENANT_ID: `${mockAccountKey}`,
    AZURE_CLIENT_SECRET: `${mockAccountKey}`,
    // MD_ACCOUNT_NAME: `${mockMDAccountName}`,
    // MD_ACCOUNT_KEY: `${mockAccountKey}`,
    // MD_ACCOUNT_SAS: `${mockSas}`,
    // MD_STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockMDAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    ENCRYPTION_SCOPE_1: "test1",
    ENCRYPTION_SCOPE_2: "test2",
    // IMMUTABLE_CONTAINER_NAME: "fakecontainername",
    // ORS_DEST_ACCOUNT_NAME: `${mockAccountName1}`,
    // ORS_DEST_ACCOUNT_KEY: `${mockAccountKey}`,
    // ORS_DEST_ACCOUNT_SAS: `${mockSas}`,
    // ORS_DEST_STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName1};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    SOFT_DELETE_ACCOUNT_NAME: `${mockAccountName}`,
    SOFT_DELETE_ACCOUNT_KEY: `${mockAccountKey}`,
    SOFT_DELETE_ACCOUNT_SAS: `${mockSas}`,
    SOFT_DELETE_STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
    ACCOUNT_NAME: `${mockAccountName}`,
  },
  sanitizerOptions: {
    bodySanitizers: [
      {
        regex: true,
        target: "(.*)&sig=(?<sig_value>.*)",
        groupForReplace: "sig_value",
        value: mockAccountKey,
      },
      {
        regex: true,
        target: "Authorization: SharedKey (?<shared_key>[^\\\\]+)",
        groupForReplace: "shared_key",
        value: "fakestorageaccount:pass123",
      },
    ],
  },
  removeCentralSanitizers: [
    "AZSDK2008", // need copy source that is not "sanitized", URL is however sanitized through other sanitizers
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
  return `${prefix}${new Date().getTime()}${padStart(
    Math.floor(Math.random() * 10000).toString(),
    5,
    "00000",
  )}`;
}

export function getRecorderUniqueVariable(recorder: Recorder, name: string): string {
  return recorder.variable(name, getUniqueName(name));
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
 * Generate a Uint8Array with specified byteLength and randome content.
 *
 * @param byteLength -
 */
export function generateRandomUint8Array(byteLength: number): Uint8Array {
  const uint8Arr = new Uint8Array(byteLength);
  for (let j = 0; j < byteLength; j++) {
    uint8Arr[j] = Math.floor(Math.random() * 256);
  }
  return uint8Arr;
}

export async function createAndStartRecorder(testContext?: Mocha.Test): Promise<Recorder> {
  const recorder = new Recorder(testContext);
  await recorder.start(recorderEnvSetup);
  // SAS token may contain sensitive information
  await recorder.addSanitizers({ uriSanitizers: uriSanitizers }, ["record", "playback"]);
  return recorder;
}
