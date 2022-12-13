// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SipDomain, SipTrunk } from "./models";
import { SipTrunk as RestSipTrunk, SipDomain as RestSipDomain } from "./generated/src/siprouting/models";

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

/**
 * @internal
 * Transforming SIP domains REST model to SDK model
 */
 export function transformDomainsFromRestModel(
  domains: { [propertyName: string]: RestSipDomain } | undefined
): SipDomain[] {
  const result: SipDomain[] = [];

  if (domains) {
    Object.keys(domains).forEach((domain: string) => {
      const currentDomain = domains[domain];
      const enabledFlag = currentDomain.enabled;
      result.push({ domainUri: domain, enabled: enabledFlag } as SipDomain);
    });
  }

  return result;
}

/**
 * @internal
 * Transforming SIP domains SDK model to REST model
 */
 export function transformDomainsIntoRestModel(domains: SipDomain[]): {
  [propertyName: string]: RestSipDomain;
} {
  const result: { [propertyName: string]: RestSipDomain } = {};

  domains.forEach((domain: SipDomain) => {
    result[domain.domainUri] = { enabled: domain.enabled } as RestSipDomain;
  });

  return result;
}
