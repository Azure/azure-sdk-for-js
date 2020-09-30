// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
import { DEFAULT_API_VERSION } from "./constants";
import { sha256Hmac } from "./cryptoHelpers";
import { dateToServiceTimeString } from "./util";

export interface GenerateSharedAccessSignatureOptions {
  /**
   * The API Version to include in the signature. If not provided, the default
   * API version will be used.
   */
  apiVersion?: string;
}

/**
 * Generate a shared access signature, which allows a client to send events to an Event Grid Topic or Domain for a limited period of time. This
 * function may only be called when the EventGridPublisherClient was constructed with a KeyCredential instance.
 *
 * @param endpointUrl The endpoint for the topic or domain you wish to generate a shared access signature for.
 * @param credential The credential to use when generating the shared access signatrue.
 * @param expiresOn The time at which the shared access signature is no longer valid.
 * @param options Options to control how the signature is generated.
 */
export async function generateSharedAccessSignature(
  endpointUrl: string,
  credential: KeyCredential,
  expiresOnUtc: Date,
  options?: GenerateSharedAccessSignatureOptions
): Promise<string> {
  const expiresOnString = dateToServiceTimeString(expiresOnUtc);
  const unsignedSas = `r=${encodeURIComponent(
    `${endpointUrl}?apiVersion=${options?.apiVersion || DEFAULT_API_VERSION}`
  )}&e=${encodeURIComponent(expiresOnString)}`;
  return sha256Hmac(credential.key, unsignedSas).then(
    (digest) => `${unsignedSas}&s=${encodeURIComponent(digest)}`
  );
}
