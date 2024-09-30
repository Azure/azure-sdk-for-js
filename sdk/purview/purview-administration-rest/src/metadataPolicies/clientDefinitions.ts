// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MetadataRolesListParameters,
  MetadataPolicyListAllParameters,
  MetadataPolicyUpdateParameters,
  MetadataPolicyGetParameters,
} from "./parameters";
import {
  MetadataRolesList200Response,
  MetadataRolesListDefaultResponse,
  MetadataPolicyListAll200Response,
  MetadataPolicyListAllDefaultResponse,
  MetadataPolicyUpdate200Response,
  MetadataPolicyUpdateDefaultResponse,
  MetadataPolicyGet200Response,
  MetadataPolicyGetDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface MetadataRolesList {
  /** Lists roles for Purview Account */
  get(
    options?: MetadataRolesListParameters,
  ): StreamableMethod<
    MetadataRolesList200Response | MetadataRolesListDefaultResponse
  >;
}

export interface MetadataPolicyListAll {
  /** List or Get metadata policies */
  get(
    options?: MetadataPolicyListAllParameters,
  ): StreamableMethod<
    MetadataPolicyListAll200Response | MetadataPolicyListAllDefaultResponse
  >;
}

export interface MetadataPolicyUpdate {
  /** Updates a metadata policy */
  put(
    options?: MetadataPolicyUpdateParameters,
  ): StreamableMethod<
    MetadataPolicyUpdate200Response | MetadataPolicyUpdateDefaultResponse
  >;
  /** Gets a metadata policy */
  get(
    options?: MetadataPolicyGetParameters,
  ): StreamableMethod<
    MetadataPolicyGet200Response | MetadataPolicyGetDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/metadataRoles' has methods for the following verbs: get */
  (path: "/metadataRoles"): MetadataRolesList;
  /** Resource for '/metadataPolicies' has methods for the following verbs: get */
  (path: "/metadataPolicies"): MetadataPolicyListAll;
  /** Resource for '/metadataPolicies/\{policyId\}' has methods for the following verbs: put, get */
  (
    path: "/metadataPolicies/{policyId}",
    policyId: string,
  ): MetadataPolicyUpdate;
}

export type PurviewMetadataPoliciesClient = Client & {
  path: Routes;
};
