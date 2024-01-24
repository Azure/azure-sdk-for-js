// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SipTrunk as RestSipTrunk,
  TrunkUpdate,
  SipDomain as RestSipDomain,
} from "./generated/src/siprouting/models";
import { SipTrunk, SipDomain } from "./models";

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
  [propertyName: string]: TrunkUpdate;
} {
  const result: { [propertyName: string]: TrunkUpdate } = {};

  trunks.forEach((trunk: SipTrunk) => {
    result[trunk.fqdn] = {
      sipSignalingPort: trunk.sipSignalingPort,
      enabled: trunk.enabled,
    } as TrunkUpdate;
  });

  return result;
}

/**
 * @internal
 * Transforming SIP domains REST model to SDK model
 */
export function transformDomainsFromRestModel(
  domains: { [propertyName: string]: RestSipDomain } | undefined,
): SipDomain[] {
  const result: SipDomain[] = [];

  if (domains) {
    Object.keys(domains).forEach((domain: string) => {
      const currentDomain = domains[domain];
      const enabledFlag = currentDomain.enabled;
      result.push({ domainName: domain, enabled: enabledFlag } as SipDomain);
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
    result[domain.domainName] = { enabled: domain.enabled } as RestSipDomain;
  });

  return result;
}
