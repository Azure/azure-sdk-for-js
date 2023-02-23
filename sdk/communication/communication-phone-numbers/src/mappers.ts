// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SipTrunk as RestSipTrunk, TrunkPatch } from "./generated/src/siprouting/models";
import { SipTrunk } from "./models";

/**
 * @internal
 * Transforming SIP trunks REST model to SDK model
 */
export function transformFromRestModel(
  trunks: { [propertyName: string]: RestSipTrunk } | undefined
): SipTrunk[] {
  const result: SipTrunk[] = [];

  if (trunks) {
    Object.keys(trunks).forEach((fqdn: string) => {
      result.push({ fqdn: fqdn, ...trunks[fqdn] } as SipTrunk);
    });
  }

  return result;
}

/**
 * @internal
 * Transforming SIP trunks SDK model to REST model
 */
export function transformIntoRestModel(trunks: SipTrunk[]): {
  [propertyName: string]: TrunkPatch;
} {
  const result: { [propertyName: string]: TrunkPatch } = {};

  trunks.forEach((trunk: SipTrunk) => {
    result[trunk.fqdn] = {
      sipSignalingPort: trunk.sipSignalingPort,
      enabled: trunk.enabled,
    } as TrunkPatch;
  });

  return result;
}
