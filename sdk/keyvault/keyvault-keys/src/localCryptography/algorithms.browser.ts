// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LocalAssertion, LocalSupportedAlgorithmsRecord } from "./models";

/**
 * This file contains the implementation of local supported algorithms for the browser.
 *
 * We currently don't support any cryptography operation in the browser.
 *
 */

/**
 * @internal
 * @hidden
 * The list of known assertions so far.
 * Assertions verify that the requirements to execute a local cryptography operation are met.
 */
export const assertions: Record<string, LocalAssertion> = {};

/**
 * A plain object containing all of the locally supported algorithms.
 */
export const localSupportedAlgorithms: LocalSupportedAlgorithmsRecord = {
  RSA1_5: undefined,
  "RSA-OAEP": undefined,
  PS256: undefined,
  RS256: undefined,
  PS384: undefined,
  RS384: undefined,
  PS512: undefined,
  RS512: undefined
};

/**
 * Checks whether a given algorithm name is supported or not.
 * @param algorithm - Name of the algorithm
 */
export function isLocallySupported(_algorithm: string): boolean {
  return false;
}
