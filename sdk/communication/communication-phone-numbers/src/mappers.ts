// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SipTrunk } from "./models.js";
import type {
  SipTrunk as RestSipTrunk,
  TrunkUpdate as RestTrunkUpdate,
} from "./generated/src/siprouting/models/index.js";

/**
 * @internal
 * Transforming SIP trunks REST model to SDK model
 */
export function transformFromRestModel(
  trunks: { [propertyName: string]: RestSipTrunk } | undefined,
): SipTrunk[] {
  const result: SipTrunk[] = [];

  if (trunks) {
    Object.keys(trunks).forEach((fqdn: string) => {
      const port = trunks[fqdn].sipSignalingPort;
      const enabled = trunks[fqdn].enabled;
      const health = trunks[fqdn].health;
      const directTransfer = trunks[fqdn].directTransfer;
      const privacyHeader = trunks[fqdn].privacyHeader;
      const ipAddressVersion = trunks[fqdn].ipAddressVersion;
      result.push({
        fqdn: fqdn,
        sipSignalingPort: port,
        enabled: enabled,
        health: health,
        directTransfer: directTransfer,
        privacyHeader: privacyHeader,
        ipAddressVersion: ipAddressVersion,
      } as SipTrunk);
    });
  }

  return result;
}

/**
 * @internal
 * Transforming SIP trunks SDK model to REST model
 */
export function transformIntoRestModel(trunks: SipTrunk[]): {
  [propertyName: string]: RestTrunkUpdate;
} {
  const result: { [propertyName: string]: RestTrunkUpdate } = {};

  trunks.forEach((trunk: SipTrunk) => {
    result[trunk.fqdn] = {
      sipSignalingPort: trunk.sipSignalingPort,
      enabled: trunk.enabled,
      directTransfer: trunk.directTransfer,
      privacyHeader: trunk.privacyHeader,
      ipAddressVersion: trunk.ipAddressVersion,
    } as RestTrunkUpdate;
  });

  return result;
}
