// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SipTrunk, SipTrunkExpanded } from "./models";
import {
  SipTrunk as RestSipTrunk,
  TrunkExpanded as RestTrunkExpanded,
} from "./generated/src/siprouting/models";

/**
 * @internal
 * Mapping SIP trunks REST model to SDK model
 */
export const mapTrunks = (
  trunks: { [propertyName: string]: RestSipTrunk } | undefined
): SipTrunk[] => {
  const result: SipTrunk[] = [];

  if (trunks) {
    Object.keys(trunks).forEach((fqdn: string) => {
      const port = trunks[fqdn].sipSignalingPort;
      result.push({ fqdn: fqdn, sipSignalingPort: port } as SipTrunk);
    });
  }

  return result;
};

/**
 * @internal
 * Mapping SIP extended trunks REST model to SDK model
 */
export const mapExpandedTrunks = (
  trunks: { [propertyName: string]: RestTrunkExpanded } | undefined
): SipTrunkExpanded[] => {
  const result: SipTrunkExpanded[] = [];

  if (trunks) {
    Object.keys(trunks).forEach((fqdn: string) => {
      result.push({ fqdn: fqdn, ...trunks[fqdn] } as SipTrunkExpanded);
    });
  }
  return result;
};

/**
 * @internal
 * Mapping SIP trunks SDK model to REST model
 */
export const mapTrunksToRestModel = (
  trunks: SipTrunk[]
): { [propertyName: string]: RestSipTrunk } => {
  const result: { [propertyName: string]: RestSipTrunk } = {};

  trunks.forEach((trunk: SipTrunk) => {
    result[trunk.fqdn] = { sipSignalingPort: trunk.sipSignalingPort } as RestSipTrunk;
  });

  return result;
};
