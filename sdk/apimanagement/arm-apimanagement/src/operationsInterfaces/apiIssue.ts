/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  IssueContract,
  ApiIssueListByServiceOptionalParams,
  ApiIssueGetEntityTagOptionalParams,
  ApiIssueGetEntityTagResponse,
  ApiIssueGetOptionalParams,
  ApiIssueGetResponse,
  ApiIssueCreateOrUpdateOptionalParams,
  ApiIssueCreateOrUpdateResponse,
  IssueUpdateContract,
  ApiIssueUpdateOptionalParams,
  ApiIssueUpdateResponse,
  ApiIssueDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ApiIssue. */
export interface ApiIssue {
  /**
   * Lists all issues associated with the specified API.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  listByService(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiIssueListByServiceOptionalParams,
  ): PagedAsyncIterableIterator<IssueContract>;
  /**
   * Gets the entity state (Etag) version of the Issue for an API specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    options?: ApiIssueGetEntityTagOptionalParams,
  ): Promise<ApiIssueGetEntityTagResponse>;
  /**
   * Gets the details of the Issue for an API specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    options?: ApiIssueGetOptionalParams,
  ): Promise<ApiIssueGetResponse>;
  /**
   * Creates a new Issue for an API or updates an existing one.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    parameters: IssueContract,
    options?: ApiIssueCreateOrUpdateOptionalParams,
  ): Promise<ApiIssueCreateOrUpdateResponse>;
  /**
   * Updates an existing issue for an API.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param parameters Update parameters.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    ifMatch: string,
    parameters: IssueUpdateContract,
    options?: ApiIssueUpdateOptionalParams,
  ): Promise<ApiIssueUpdateResponse>;
  /**
   * Deletes the specified Issue from an API.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param issueId Issue identifier. Must be unique in the current API Management service instance.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    issueId: string,
    ifMatch: string,
    options?: ApiIssueDeleteOptionalParams,
  ): Promise<void>;
}
