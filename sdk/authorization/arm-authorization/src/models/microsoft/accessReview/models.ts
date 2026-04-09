// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProxyResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An attribute namespace resource. */
export interface AttributeNamespace extends ProxyResource {}

export function attributeNamespaceDeserializer(item: any): AttributeNamespace {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Request body for creating an attribute namespace. */
export interface AttributeNamespaceCreateRequest {
  /** The principal ID of the namespace owner. */
  namespaceOwnerPrincipalId: string;
}

export function attributeNamespaceCreateRequestSerializer(
  item: AttributeNamespaceCreateRequest,
): any {
  return { namespaceOwnerPrincipalId: item["namespaceOwnerPrincipalId"] };
}
