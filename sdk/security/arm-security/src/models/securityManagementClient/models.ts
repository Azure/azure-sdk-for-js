// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  jitNetworkAccessPolicyVirtualMachineArraySerializer,
  JitNetworkAccessPolicyVirtualMachine,
  jitNetworkAccessRequestArraySerializer,
  JitNetworkAccessRequest,
} from "../securitySolutionsAPI/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * JIT network access policy resource for create/update operations.
 * Omits server-side read-only fields: location, provisioningState.
 */
export interface JitNetworkAccessPolicyCreate {
  /** Kind of the resource */
  kind?: string;
  /** Properties of the JIT network access policy */
  properties: JitNetworkAccessPolicyPropertiesCreate;
}

export function jitNetworkAccessPolicyCreateSerializer(item: JitNetworkAccessPolicyCreate): any {
  return {
    kind: item["kind"],
    properties: jitNetworkAccessPolicyPropertiesCreateSerializer(item["properties"]),
  };
}

/**
 * JIT network access policy properties for create/update operations.
 * Omits server-side read-only field: provisioningState.
 */
export interface JitNetworkAccessPolicyPropertiesCreate {
  /** Configurations for Microsoft.Compute/virtualMachines resource type. */
  virtualMachines: JitNetworkAccessPolicyVirtualMachine[];
  requests?: JitNetworkAccessRequest[];
}

export function jitNetworkAccessPolicyPropertiesCreateSerializer(
  item: JitNetworkAccessPolicyPropertiesCreate,
): any {
  return {
    virtualMachines: jitNetworkAccessPolicyVirtualMachineArraySerializer(item["virtualMachines"]),
    requests: !item["requests"]
      ? item["requests"]
      : jitNetworkAccessRequestArraySerializer(item["requests"]),
  };
}
