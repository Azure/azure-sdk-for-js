// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SipTrunk } from "./models";
import { SipTrunk as RestSipTrunk } from "./generated/src/siprouting/models";

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
      const currentTrunk = trunks[fqdn];
      const port = currentTrunk.sipSignalingPort;
      const enabledFlag = currentTrunk.enabled;
      result.push({ fqdn: fqdn, sipSignalingPort: port, enabled: enabledFlag } as SipTrunk);
    });
  }

  return result;
}

/**
 * @internal
 * Transforming SIP trunks SDK model to REST model
 */
export function transformIntoRestModel(trunks: SipTrunk[]): {
  [propertyName: string]: RestSipTrunk;
} {
  const result: { [propertyName: string]: RestSipTrunk } = {};

  trunks.forEach((trunk: SipTrunk) => {
    result[trunk.fqdn] = { sipSignalingPort: trunk.sipSignalingPort, enabled: trunk.enabled } as RestSipTrunk;
  });

  return result;
}
