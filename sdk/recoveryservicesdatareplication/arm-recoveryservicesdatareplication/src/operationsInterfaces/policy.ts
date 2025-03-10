/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  PolicyModel,
  PolicyListOptionalParams,
  PolicyGetOptionalParams,
  PolicyGetResponse,
  PolicyCreateOptionalParams,
  PolicyCreateResponse,
  PolicyDeleteOptionalParams,
  PolicyDeleteResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Policy. */
export interface Policy {
  /**
   * Gets the list of policies in the given vault.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The vault name.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    vaultName: string,
    options?: PolicyListOptionalParams
  ): PagedAsyncIterableIterator<PolicyModel>;
  /**
   * Gets the details of the policy.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The vault name.
   * @param policyName The policy name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vaultName: string,
    policyName: string,
    options?: PolicyGetOptionalParams
  ): Promise<PolicyGetResponse>;
  /**
   * Creates the policy.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The vault name.
   * @param policyName The policy name.
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    vaultName: string,
    policyName: string,
    options?: PolicyCreateOptionalParams
  ): Promise<
    SimplePollerLike<OperationState<PolicyCreateResponse>, PolicyCreateResponse>
  >;
  /**
   * Creates the policy.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The vault name.
   * @param policyName The policy name.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    vaultName: string,
    policyName: string,
    options?: PolicyCreateOptionalParams
  ): Promise<PolicyCreateResponse>;
  /**
   * Removes the policy.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The vault name.
   * @param policyName The policy name.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    vaultName: string,
    policyName: string,
    options?: PolicyDeleteOptionalParams
  ): Promise<
    SimplePollerLike<OperationState<PolicyDeleteResponse>, PolicyDeleteResponse>
  >;
  /**
   * Removes the policy.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The vault name.
   * @param policyName The policy name.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    vaultName: string,
    policyName: string,
    options?: PolicyDeleteOptionalParams
  ): Promise<PolicyDeleteResponse>;
}
