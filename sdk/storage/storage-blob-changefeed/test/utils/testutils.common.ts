// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import type { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import type { Readable } from "node:stream";
import type { FindReplaceSanitizer } from "@azure-tools/test-recorder";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { BlobChangeFeedClient } from "../../src/BlobChangeFeedClient.js";
import { isNodeLike } from "@azure/core-util";

export const testPollerProperties = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

export function configureBlobStorageClient(recorder: Recorder, client: BlobChangeFeedClient): void {
  const options = recorder.configureClientOptions({});

  const pipeline: Pipeline = (client as any).blobServiceClient.storageClientContext.pipeline;
  for (const { policy } of options.additionalPolicies ?? []) {
    pipeline.addPolicy(policy, { afterPhase: "Sign", afterPolicies: ["injectorPolicy"] });
  }
}

function getUriSanitizerForQueryParam(paramName: string): {
  regex: boolean;
  target: string;
  groupForReplace: string;
  value: string;
} {
  return {
    regex: true,
    target: `http.+?[^&]*&?(?<param>${paramName}=[^&]+&?)`,
    groupForReplace: "param",
    value: "",
  };
}

const mockAccountName = "fakestorageaccount";
const mockMDAccountName = "md-fakestorageaccount";
const mockAccountKey = "aaaaa";
const sasParams = ["se", "sig", "sip", "sp", "spr", "srt", "ss", "sr", "st", "sv"];
if (!isNodeLike) {
  sasParams.push("_");
}
export const uriSanitizers: FindReplaceSanitizer[] = sasParams.map(getUriSanitizerForQueryParam);
export const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: {
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
    MD_ACCOUNT_NAME: `${mockMDAccountName}`,
    MD_ACCOUNT_KEY: `${mockAccountKey}`,
    MD_ACCOUNT_SAS: `${mockAccountKey}`,
    MD_STORAGE_CONNECTION_STRING: `DefaultEndpointsProtocol=https;AccountName=${mockMDAccountName};AccountKey=${mockAccountKey};EndpointSuffix=core.windows.net`,
  },
  // SAS token may contain sensitive information
  sanitizerOptions: {
    uriSanitizers,
  },
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
 * @param seconds - duration to sleep in seconds
 */
export function sleep(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
/**
 * Read text content from a stream as string
 * @param stream - stream to read from
 * @returns a utf-8 string that is the whole content of the stream
 */
export function streamToString(stream: Readable): Promise<string> {
  const chunks: any[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
