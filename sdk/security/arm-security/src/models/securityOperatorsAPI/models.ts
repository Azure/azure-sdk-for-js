// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProxyResource, Identity } from "../models.js";
import { systemDataDeserializer, identityDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Security operator under a given subscription and pricing */
export interface SecurityOperatorsAPISecurityOperator extends ProxyResource {
  /** Identity for the resource. */
  identity?: Identity;
}

export function securityOperatorsAPISecurityOperatorDeserializer(
  item: any,
): SecurityOperatorsAPISecurityOperator {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
  };
}

/** List of SecurityOperator response. */
export interface _SecurityOperatorsAPISecurityOperatorList {
  /** List of SecurityOperator configurations */
  value: SecurityOperatorsAPISecurityOperator[];
}

export function _securityOperatorsAPISecurityOperatorListDeserializer(
  item: any,
): _SecurityOperatorsAPISecurityOperatorList {
  return {
    value: securityOperatorsAPISecurityOperatorArrayDeserializer(item["value"]),
  };
}

export function securityOperatorsAPISecurityOperatorArrayDeserializer(
  result: Array<SecurityOperatorsAPISecurityOperator>,
): any[] {
  return result.map((item) => {
    return securityOperatorsAPISecurityOperatorDeserializer(item);
  });
}
