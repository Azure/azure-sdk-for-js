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
export interface SecurityOperator extends ProxyResource {
  /** Identity for the resource. */
  identity?: Identity;
}

export function securityOperatorDeserializer(item: any): SecurityOperator {
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
export interface _SecurityOperatorList {
  /** List of SecurityOperator configurations */
  value: SecurityOperator[];
}

export function _securityOperatorListDeserializer(item: any): _SecurityOperatorList {
  return {
    value: securityOperatorArrayDeserializer(item["value"]),
  };
}

export function securityOperatorArrayDeserializer(result: Array<SecurityOperator>): any[] {
  return result.map((item) => {
    return securityOperatorDeserializer(item);
  });
}
