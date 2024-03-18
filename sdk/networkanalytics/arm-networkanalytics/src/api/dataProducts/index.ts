// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  DataProduct,
  DataProductUpdate,
  AccountSas,
  AccountSasToken,
  KeyVaultInfo,
  RoleAssignmentCommonProperties,
  RoleAssignmentDetail,
  ListRoleAssignments,
  DataProductListResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  DataProductsAddUserRole200Response,
  DataProductsAddUserRoleDefaultResponse,
  DataProductsCreate200Response,
  DataProductsCreate201Response,
  DataProductsCreateDefaultResponse,
  DataProductsCreateLogicalResponse,
  DataProductsDeleteLogicalResponse,
  DataProductsDeleteOperation202Response,
  DataProductsDeleteOperation204Response,
  DataProductsDeleteOperationDefaultResponse,
  DataProductsGenerateStorageAccountSasToken200Response,
  DataProductsGenerateStorageAccountSasTokenDefaultResponse,
  DataProductsGet200Response,
  DataProductsGetDefaultResponse,
  DataProductsListByResourceGroup200Response,
  DataProductsListByResourceGroupDefaultResponse,
  DataProductsListBySubscription200Response,
  DataProductsListBySubscriptionDefaultResponse,
  DataProductsListRolesAssignments200Response,
  DataProductsListRolesAssignmentsDefaultResponse,
  DataProductsRemoveUserRole204Response,
  DataProductsRemoveUserRoleDefaultResponse,
  DataProductsRotateKey204Response,
  DataProductsRotateKeyDefaultResponse,
  DataProductsUpdate200Response,
  DataProductsUpdate202Response,
  DataProductsUpdateDefaultResponse,
  DataProductsUpdateLogicalResponse,
  isUnexpected,
  NetworkAnalyticsContext as Client,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  DataProductsCreateOptions,
  DataProductsGetOptions,
  DataProductsUpdateOptions,
  DataProductsDeleteOperationOptions,
  DataProductsGenerateStorageAccountSasTokenOptions,
  DataProductsRotateKeyOptions,
  DataProductsAddUserRoleOptions,
  DataProductsRemoveUserRoleOptions,
  DataProductsListRolesAssignmentsOptions,
  DataProductsListByResourceGroupOptions,
  DataProductsListBySubscriptionOptions,
} from "../../models/options.js";

export function _dataProductsCreateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  resource: DataProduct,
  options: DataProductsCreateOptions = { requestOptions: {} },
): StreamableMethod<
  | DataProductsCreate200Response
  | DataProductsCreate201Response
  | DataProductsCreateDefaultResponse
  | DataProductsCreateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}",
      subscriptionId,
      resourceGroupName,
      dataProductName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        location: resource["location"],
        tags: resource["tags"],
        properties: !resource.properties
          ? undefined
          : {
              publisher: resource.properties?.["publisher"],
              product: resource.properties?.["product"],
              majorVersion: resource.properties?.["majorVersion"],
              owners: resource.properties?.["owners"],
              redundancy: resource.properties?.["redundancy"],
              purviewAccount: resource.properties?.["purviewAccount"],
              purviewCollection: resource.properties?.["purviewCollection"],
              privateLinksEnabled: resource.properties?.["privateLinksEnabled"],
              publicNetworkAccess: resource.properties?.["publicNetworkAccess"],
              customerManagedKeyEncryptionEnabled:
                resource.properties?.["customerManagedKeyEncryptionEnabled"],
              customerEncryptionKey: !resource.properties?.customerEncryptionKey
                ? undefined
                : {
                    keyVaultUri:
                      resource.properties?.customerEncryptionKey?.[
                        "keyVaultUri"
                      ],
                    keyName:
                      resource.properties?.customerEncryptionKey?.["keyName"],
                    keyVersion:
                      resource.properties?.customerEncryptionKey?.[
                        "keyVersion"
                      ],
                  },
              networkacls: !resource.properties?.networkacls
                ? undefined
                : {
                    virtualNetworkRule: resource.properties?.networkacls?.[
                      "virtualNetworkRule"
                    ].map((p) => ({
                      id: p["id"],
                      action: p["action"],
                      state: p["state"],
                    })),
                    ipRules: resource.properties?.networkacls?.["ipRules"].map(
                      (p) => ({ value: p["value"], action: p["action"] }),
                    ),
                    allowedQueryIpRangeList:
                      resource.properties?.networkacls?.[
                        "allowedQueryIpRangeList"
                      ],
                    defaultAction:
                      resource.properties?.networkacls?.["defaultAction"],
                  },
              managedResourceGroupConfiguration: !resource.properties
                ?.managedResourceGroupConfiguration
                ? undefined
                : {
                    name: resource.properties
                      ?.managedResourceGroupConfiguration?.["name"],
                    location:
                      resource.properties?.managedResourceGroupConfiguration?.[
                        "location"
                      ],
                  },
              currentMinorVersion: resource.properties?.["currentMinorVersion"],
            },
        identity: !resource.identity
          ? undefined
          : {
              type: resource.identity?.["type"],
              userAssignedIdentities:
                resource.identity?.["userAssignedIdentities"],
            },
      },
    });
}

export async function _dataProductsCreateDeserialize(
  result:
    | DataProductsCreate200Response
    | DataProductsCreate201Response
    | DataProductsCreateDefaultResponse
    | DataProductsCreateLogicalResponse,
): Promise<DataProduct> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DataProductsCreateLogicalResponse;
  return {
    location: result.body["location"],
    tags: result.body["tags"],
    id: result.body["id"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          resourceGuid: result.body.properties?.["resourceGuid"],
          provisioningState: result.body.properties?.["provisioningState"],
          publisher: result.body.properties?.["publisher"],
          product: result.body.properties?.["product"],
          majorVersion: result.body.properties?.["majorVersion"],
          owners: result.body.properties?.["owners"],
          redundancy: result.body.properties?.["redundancy"],
          purviewAccount: result.body.properties?.["purviewAccount"],
          purviewCollection: result.body.properties?.["purviewCollection"],
          privateLinksEnabled: result.body.properties?.["privateLinksEnabled"],
          publicNetworkAccess: result.body.properties?.["publicNetworkAccess"],
          customerManagedKeyEncryptionEnabled:
            result.body.properties?.["customerManagedKeyEncryptionEnabled"],
          customerEncryptionKey: !result.body.properties?.customerEncryptionKey
            ? undefined
            : {
                keyVaultUri:
                  result.body.properties?.customerEncryptionKey?.[
                    "keyVaultUri"
                  ],
                keyName:
                  result.body.properties?.customerEncryptionKey?.["keyName"],
                keyVersion:
                  result.body.properties?.customerEncryptionKey?.["keyVersion"],
              },
          networkacls: !result.body.properties?.networkacls
            ? undefined
            : {
                virtualNetworkRule: result.body.properties?.networkacls?.[
                  "virtualNetworkRule"
                ].map((p) => ({
                  id: p["id"],
                  action: p["action"],
                  state: p["state"],
                })),
                ipRules: result.body.properties?.networkacls?.["ipRules"].map(
                  (p) => ({ value: p["value"], action: p["action"] }),
                ),
                allowedQueryIpRangeList:
                  result.body.properties?.networkacls?.[
                    "allowedQueryIpRangeList"
                  ],
                defaultAction:
                  result.body.properties?.networkacls?.["defaultAction"],
              },
          managedResourceGroupConfiguration: !result.body.properties
            ?.managedResourceGroupConfiguration
            ? undefined
            : {
                name: result.body.properties
                  ?.managedResourceGroupConfiguration?.["name"],
                location:
                  result.body.properties?.managedResourceGroupConfiguration?.[
                    "location"
                  ],
              },
          availableMinorVersions:
            result.body.properties?.["availableMinorVersions"],
          currentMinorVersion: result.body.properties?.["currentMinorVersion"],
          documentation: result.body.properties?.["documentation"],
          consumptionEndpoints: !result.body.properties?.consumptionEndpoints
            ? undefined
            : {
                ingestionUrl:
                  result.body.properties?.consumptionEndpoints?.[
                    "ingestionUrl"
                  ],
                ingestionResourceId:
                  result.body.properties?.consumptionEndpoints?.[
                    "ingestionResourceId"
                  ],
                fileAccessUrl:
                  result.body.properties?.consumptionEndpoints?.[
                    "fileAccessUrl"
                  ],
                fileAccessResourceId:
                  result.body.properties?.consumptionEndpoints?.[
                    "fileAccessResourceId"
                  ],
                queryUrl:
                  result.body.properties?.consumptionEndpoints?.["queryUrl"],
                queryResourceId:
                  result.body.properties?.consumptionEndpoints?.[
                    "queryResourceId"
                  ],
              },
          keyVaultUrl: result.body.properties?.["keyVaultUrl"],
        },
    identity: !result.body.identity
      ? undefined
      : {
          tenantId: result.body.identity?.["tenantId"],
          principalId: result.body.identity?.["principalId"],
          type: result.body.identity?.["type"],
          userAssignedIdentities:
            result.body.identity?.["userAssignedIdentities"],
        },
  };
}

/** Create data product resource. */
export function dataProductsCreate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  resource: DataProduct,
  options: DataProductsCreateOptions = { requestOptions: {} },
): PollerLike<OperationState<DataProduct>, DataProduct> {
  return getLongRunningPoller(context, _dataProductsCreateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _dataProductsCreateSend(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        resource,
        options,
      ),
  }) as PollerLike<OperationState<DataProduct>, DataProduct>;
}

export function _dataProductsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  options: DataProductsGetOptions = { requestOptions: {} },
): StreamableMethod<
  DataProductsGet200Response | DataProductsGetDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}",
      subscriptionId,
      resourceGroupName,
      dataProductName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataProductsGetDeserialize(
  result: DataProductsGet200Response | DataProductsGetDefaultResponse,
): Promise<DataProduct> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    location: result.body["location"],
    tags: result.body["tags"],
    id: result.body["id"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          resourceGuid: result.body.properties?.["resourceGuid"],
          provisioningState: result.body.properties?.["provisioningState"],
          publisher: result.body.properties?.["publisher"],
          product: result.body.properties?.["product"],
          majorVersion: result.body.properties?.["majorVersion"],
          owners: result.body.properties?.["owners"],
          redundancy: result.body.properties?.["redundancy"],
          purviewAccount: result.body.properties?.["purviewAccount"],
          purviewCollection: result.body.properties?.["purviewCollection"],
          privateLinksEnabled: result.body.properties?.["privateLinksEnabled"],
          publicNetworkAccess: result.body.properties?.["publicNetworkAccess"],
          customerManagedKeyEncryptionEnabled:
            result.body.properties?.["customerManagedKeyEncryptionEnabled"],
          customerEncryptionKey: !result.body.properties?.customerEncryptionKey
            ? undefined
            : {
                keyVaultUri:
                  result.body.properties?.customerEncryptionKey?.[
                    "keyVaultUri"
                  ],
                keyName:
                  result.body.properties?.customerEncryptionKey?.["keyName"],
                keyVersion:
                  result.body.properties?.customerEncryptionKey?.["keyVersion"],
              },
          networkacls: !result.body.properties?.networkacls
            ? undefined
            : {
                virtualNetworkRule: result.body.properties?.networkacls?.[
                  "virtualNetworkRule"
                ].map((p) => ({
                  id: p["id"],
                  action: p["action"],
                  state: p["state"],
                })),
                ipRules: result.body.properties?.networkacls?.["ipRules"].map(
                  (p) => ({ value: p["value"], action: p["action"] }),
                ),
                allowedQueryIpRangeList:
                  result.body.properties?.networkacls?.[
                    "allowedQueryIpRangeList"
                  ],
                defaultAction:
                  result.body.properties?.networkacls?.["defaultAction"],
              },
          managedResourceGroupConfiguration: !result.body.properties
            ?.managedResourceGroupConfiguration
            ? undefined
            : {
                name: result.body.properties
                  ?.managedResourceGroupConfiguration?.["name"],
                location:
                  result.body.properties?.managedResourceGroupConfiguration?.[
                    "location"
                  ],
              },
          availableMinorVersions:
            result.body.properties?.["availableMinorVersions"],
          currentMinorVersion: result.body.properties?.["currentMinorVersion"],
          documentation: result.body.properties?.["documentation"],
          consumptionEndpoints: !result.body.properties?.consumptionEndpoints
            ? undefined
            : {
                ingestionUrl:
                  result.body.properties?.consumptionEndpoints?.[
                    "ingestionUrl"
                  ],
                ingestionResourceId:
                  result.body.properties?.consumptionEndpoints?.[
                    "ingestionResourceId"
                  ],
                fileAccessUrl:
                  result.body.properties?.consumptionEndpoints?.[
                    "fileAccessUrl"
                  ],
                fileAccessResourceId:
                  result.body.properties?.consumptionEndpoints?.[
                    "fileAccessResourceId"
                  ],
                queryUrl:
                  result.body.properties?.consumptionEndpoints?.["queryUrl"],
                queryResourceId:
                  result.body.properties?.consumptionEndpoints?.[
                    "queryResourceId"
                  ],
              },
          keyVaultUrl: result.body.properties?.["keyVaultUrl"],
        },
    identity: !result.body.identity
      ? undefined
      : {
          tenantId: result.body.identity?.["tenantId"],
          principalId: result.body.identity?.["principalId"],
          type: result.body.identity?.["type"],
          userAssignedIdentities:
            result.body.identity?.["userAssignedIdentities"],
        },
  };
}

/** Retrieve data product resource. */
export async function dataProductsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  options: DataProductsGetOptions = { requestOptions: {} },
): Promise<DataProduct> {
  const result = await _dataProductsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    dataProductName,
    options,
  );
  return _dataProductsGetDeserialize(result);
}

export function _dataProductsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  properties: DataProductUpdate,
  options: DataProductsUpdateOptions = { requestOptions: {} },
): StreamableMethod<
  | DataProductsUpdate200Response
  | DataProductsUpdate202Response
  | DataProductsUpdateDefaultResponse
  | DataProductsUpdateLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}",
      subscriptionId,
      resourceGroupName,
      dataProductName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        identity: !properties.identity
          ? undefined
          : {
              type: properties.identity?.["type"],
              userAssignedIdentities:
                properties.identity?.["userAssignedIdentities"],
            },
        tags: properties["tags"],
        properties: !properties.properties
          ? undefined
          : {
              owners: properties.properties?.["owners"],
              purviewAccount: properties.properties?.["purviewAccount"],
              purviewCollection: properties.properties?.["purviewCollection"],
              privateLinksEnabled:
                properties.properties?.["privateLinksEnabled"],
              currentMinorVersion:
                properties.properties?.["currentMinorVersion"],
            },
      },
    });
}

export async function _dataProductsUpdateDeserialize(
  result:
    | DataProductsUpdate200Response
    | DataProductsUpdate202Response
    | DataProductsUpdateDefaultResponse
    | DataProductsUpdateLogicalResponse,
): Promise<DataProduct> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return result.body as any;
}

/** Update data product resource. */
export function dataProductsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  properties: DataProductUpdate,
  options: DataProductsUpdateOptions = { requestOptions: {} },
): PollerLike<OperationState<DataProduct>, DataProduct> {
  return getLongRunningPoller(context, _dataProductsUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _dataProductsUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        dataProductName,
        properties,
        options,
      ),
  }) as PollerLike<OperationState<DataProduct>, DataProduct>;
}

export function _dataProductsDeleteOperationSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  options: DataProductsDeleteOperationOptions = { requestOptions: {} },
): StreamableMethod<
  | DataProductsDeleteOperation202Response
  | DataProductsDeleteOperation204Response
  | DataProductsDeleteOperationDefaultResponse
  | DataProductsDeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}",
      subscriptionId,
      resourceGroupName,
      dataProductName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataProductsDeleteOperationDeserialize(
  result:
    | DataProductsDeleteOperation202Response
    | DataProductsDeleteOperation204Response
    | DataProductsDeleteOperationDefaultResponse
    | DataProductsDeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  result = result as DataProductsDeleteLogicalResponse;
  return;
}

/** Delete data product resource. */
export function dataProductsDeleteOperation(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  options: DataProductsDeleteOperationOptions = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _dataProductsDeleteOperationDeserialize,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _dataProductsDeleteOperationSend(
          context,
          subscriptionId,
          resourceGroupName,
          dataProductName,
          options,
        ),
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _dataProductsGenerateStorageAccountSasTokenSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  body: AccountSas,
  options: DataProductsGenerateStorageAccountSasTokenOptions = {
    requestOptions: {},
  },
): StreamableMethod<
  | DataProductsGenerateStorageAccountSasToken200Response
  | DataProductsGenerateStorageAccountSasTokenDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/generateStorageAccountSasToken",
      subscriptionId,
      resourceGroupName,
      dataProductName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        startTimeStamp: body["startTimeStamp"].toISOString(),
        expiryTimeStamp: body["expiryTimeStamp"].toISOString(),
        ipAddress: body["ipAddress"],
      },
    });
}

export async function _dataProductsGenerateStorageAccountSasTokenDeserialize(
  result:
    | DataProductsGenerateStorageAccountSasToken200Response
    | DataProductsGenerateStorageAccountSasTokenDefaultResponse,
): Promise<AccountSasToken> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    storageAccountSasToken: result.body["storageAccountSasToken"],
  };
}

/** Generate sas token for storage account. */
export async function dataProductsGenerateStorageAccountSasToken(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  body: AccountSas,
  options: DataProductsGenerateStorageAccountSasTokenOptions = {
    requestOptions: {},
  },
): Promise<AccountSasToken> {
  const result = await _dataProductsGenerateStorageAccountSasTokenSend(
    context,
    subscriptionId,
    resourceGroupName,
    dataProductName,
    body,
    options,
  );
  return _dataProductsGenerateStorageAccountSasTokenDeserialize(result);
}

export function _dataProductsRotateKeySend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  body: KeyVaultInfo,
  options: DataProductsRotateKeyOptions = { requestOptions: {} },
): StreamableMethod<
  DataProductsRotateKey204Response | DataProductsRotateKeyDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/rotateKey",
      subscriptionId,
      resourceGroupName,
      dataProductName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { keyVaultUrl: body["keyVaultUrl"] },
    });
}

export async function _dataProductsRotateKeyDeserialize(
  result:
    | DataProductsRotateKey204Response
    | DataProductsRotateKeyDefaultResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return;
}

/** Initiate key rotation on Data Product. */
export async function dataProductsRotateKey(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  body: KeyVaultInfo,
  options: DataProductsRotateKeyOptions = { requestOptions: {} },
): Promise<void> {
  const result = await _dataProductsRotateKeySend(
    context,
    subscriptionId,
    resourceGroupName,
    dataProductName,
    body,
    options,
  );
  return _dataProductsRotateKeyDeserialize(result);
}

export function _dataProductsAddUserRoleSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  body: RoleAssignmentCommonProperties,
  options: DataProductsAddUserRoleOptions = { requestOptions: {} },
): StreamableMethod<
  DataProductsAddUserRole200Response | DataProductsAddUserRoleDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/addUserRole",
      subscriptionId,
      resourceGroupName,
      dataProductName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        roleId: body["roleId"],
        principalId: body["principalId"],
        userName: body["userName"],
        dataTypeScope: body["dataTypeScope"],
        principalType: body["principalType"],
        role: body["role"],
      },
    });
}

export async function _dataProductsAddUserRoleDeserialize(
  result:
    | DataProductsAddUserRole200Response
    | DataProductsAddUserRoleDefaultResponse,
): Promise<RoleAssignmentDetail> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    roleId: result.body["roleId"],
    principalId: result.body["principalId"],
    userName: result.body["userName"],
    dataTypeScope: result.body["dataTypeScope"],
    principalType: result.body["principalType"],
    role: result.body["role"],
    roleAssignmentId: result.body["roleAssignmentId"],
  };
}

/** Assign role to the data product. */
export async function dataProductsAddUserRole(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  body: RoleAssignmentCommonProperties,
  options: DataProductsAddUserRoleOptions = { requestOptions: {} },
): Promise<RoleAssignmentDetail> {
  const result = await _dataProductsAddUserRoleSend(
    context,
    subscriptionId,
    resourceGroupName,
    dataProductName,
    body,
    options,
  );
  return _dataProductsAddUserRoleDeserialize(result);
}

export function _dataProductsRemoveUserRoleSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  body: RoleAssignmentDetail,
  options: DataProductsRemoveUserRoleOptions = { requestOptions: {} },
): StreamableMethod<
  | DataProductsRemoveUserRole204Response
  | DataProductsRemoveUserRoleDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/removeUserRole",
      subscriptionId,
      resourceGroupName,
      dataProductName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        roleId: body["roleId"],
        principalId: body["principalId"],
        userName: body["userName"],
        dataTypeScope: body["dataTypeScope"],
        principalType: body["principalType"],
        role: body["role"],
        roleAssignmentId: body["roleAssignmentId"],
      },
    });
}

export async function _dataProductsRemoveUserRoleDeserialize(
  result:
    | DataProductsRemoveUserRole204Response
    | DataProductsRemoveUserRoleDefaultResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return;
}

/** Remove role from the data product. */
export async function dataProductsRemoveUserRole(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  body: RoleAssignmentDetail,
  options: DataProductsRemoveUserRoleOptions = { requestOptions: {} },
): Promise<void> {
  const result = await _dataProductsRemoveUserRoleSend(
    context,
    subscriptionId,
    resourceGroupName,
    dataProductName,
    body,
    options,
  );
  return _dataProductsRemoveUserRoleDeserialize(result);
}

export function _dataProductsListRolesAssignmentsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  body: Record<string, any>,
  options: DataProductsListRolesAssignmentsOptions = { requestOptions: {} },
): StreamableMethod<
  | DataProductsListRolesAssignments200Response
  | DataProductsListRolesAssignmentsDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/listRolesAssignments",
      subscriptionId,
      resourceGroupName,
      dataProductName,
    )
    .post({ ...operationOptionsToRequestParameters(options), body: body });
}

export async function _dataProductsListRolesAssignmentsDeserialize(
  result:
    | DataProductsListRolesAssignments200Response
    | DataProductsListRolesAssignmentsDefaultResponse,
): Promise<ListRoleAssignments> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    count: result.body["count"],
    roleAssignmentResponse: result.body["roleAssignmentResponse"].map((p) => ({
      roleId: p["roleId"],
      principalId: p["principalId"],
      userName: p["userName"],
      dataTypeScope: p["dataTypeScope"],
      principalType: p["principalType"],
      role: p["role"],
      roleAssignmentId: p["roleAssignmentId"],
    })),
  };
}

/** List user roles associated with the data product. */
export async function dataProductsListRolesAssignments(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  dataProductName: string,
  body: Record<string, any>,
  options: DataProductsListRolesAssignmentsOptions = { requestOptions: {} },
): Promise<ListRoleAssignments> {
  const result = await _dataProductsListRolesAssignmentsSend(
    context,
    subscriptionId,
    resourceGroupName,
    dataProductName,
    body,
    options,
  );
  return _dataProductsListRolesAssignmentsDeserialize(result);
}

export function _dataProductsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: DataProductsListByResourceGroupOptions = { requestOptions: {} },
): StreamableMethod<
  | DataProductsListByResourceGroup200Response
  | DataProductsListByResourceGroupDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataProductsListByResourceGroupDeserialize(
  result:
    | DataProductsListByResourceGroup200Response
    | DataProductsListByResourceGroupDefaultResponse,
): Promise<DataProductListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      location: p["location"],
      tags: p["tags"],
      id: p["id"],
      type: p["type"],
      systemData: !p.systemData
        ? undefined
        : {
            createdBy: p.systemData?.["createdBy"],
            createdByType: p.systemData?.["createdByType"],
            createdAt:
              p.systemData?.["createdAt"] !== undefined
                ? new Date(p.systemData?.["createdAt"])
                : undefined,
            lastModifiedBy: p.systemData?.["lastModifiedBy"],
            lastModifiedByType: p.systemData?.["lastModifiedByType"],
            lastModifiedAt:
              p.systemData?.["lastModifiedAt"] !== undefined
                ? new Date(p.systemData?.["lastModifiedAt"])
                : undefined,
          },
      properties: !p.properties
        ? undefined
        : {
            resourceGuid: p.properties?.["resourceGuid"],
            provisioningState: p.properties?.["provisioningState"],
            publisher: p.properties?.["publisher"],
            product: p.properties?.["product"],
            majorVersion: p.properties?.["majorVersion"],
            owners: p.properties?.["owners"],
            redundancy: p.properties?.["redundancy"],
            purviewAccount: p.properties?.["purviewAccount"],
            purviewCollection: p.properties?.["purviewCollection"],
            privateLinksEnabled: p.properties?.["privateLinksEnabled"],
            publicNetworkAccess: p.properties?.["publicNetworkAccess"],
            customerManagedKeyEncryptionEnabled:
              p.properties?.["customerManagedKeyEncryptionEnabled"],
            customerEncryptionKey: !p.properties?.customerEncryptionKey
              ? undefined
              : {
                  keyVaultUri:
                    p.properties?.customerEncryptionKey?.["keyVaultUri"],
                  keyName: p.properties?.customerEncryptionKey?.["keyName"],
                  keyVersion:
                    p.properties?.customerEncryptionKey?.["keyVersion"],
                },
            networkacls: !p.properties?.networkacls
              ? undefined
              : {
                  virtualNetworkRule: p.properties?.networkacls?.[
                    "virtualNetworkRule"
                  ].map((p) => ({
                    id: p["id"],
                    action: p["action"],
                    state: p["state"],
                  })),
                  ipRules: p.properties?.networkacls?.["ipRules"].map((p) => ({
                    value: p["value"],
                    action: p["action"],
                  })),
                  allowedQueryIpRangeList:
                    p.properties?.networkacls?.["allowedQueryIpRangeList"],
                  defaultAction: p.properties?.networkacls?.["defaultAction"],
                },
            managedResourceGroupConfiguration: !p.properties
              ?.managedResourceGroupConfiguration
              ? undefined
              : {
                  name: p.properties?.managedResourceGroupConfiguration?.[
                    "name"
                  ],
                  location:
                    p.properties?.managedResourceGroupConfiguration?.[
                      "location"
                    ],
                },
            availableMinorVersions: p.properties?.["availableMinorVersions"],
            currentMinorVersion: p.properties?.["currentMinorVersion"],
            documentation: p.properties?.["documentation"],
            consumptionEndpoints: !p.properties?.consumptionEndpoints
              ? undefined
              : {
                  ingestionUrl:
                    p.properties?.consumptionEndpoints?.["ingestionUrl"],
                  ingestionResourceId:
                    p.properties?.consumptionEndpoints?.["ingestionResourceId"],
                  fileAccessUrl:
                    p.properties?.consumptionEndpoints?.["fileAccessUrl"],
                  fileAccessResourceId:
                    p.properties?.consumptionEndpoints?.[
                      "fileAccessResourceId"
                    ],
                  queryUrl: p.properties?.consumptionEndpoints?.["queryUrl"],
                  queryResourceId:
                    p.properties?.consumptionEndpoints?.["queryResourceId"],
                },
            keyVaultUrl: p.properties?.["keyVaultUrl"],
          },
      identity: !p.identity
        ? undefined
        : {
            tenantId: p.identity?.["tenantId"],
            principalId: p.identity?.["principalId"],
            type: p.identity?.["type"],
            userAssignedIdentities: p.identity?.["userAssignedIdentities"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List data products by resource group. */
export function dataProductsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: DataProductsListByResourceGroupOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<DataProduct> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _dataProductsListByResourceGroupSend(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    _dataProductsListByResourceGroupDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _dataProductsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: DataProductsListBySubscriptionOptions = { requestOptions: {} },
): StreamableMethod<
  | DataProductsListBySubscription200Response
  | DataProductsListBySubscriptionDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkAnalytics/dataProducts",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _dataProductsListBySubscriptionDeserialize(
  result:
    | DataProductsListBySubscription200Response
    | DataProductsListBySubscriptionDefaultResponse,
): Promise<DataProductListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      location: p["location"],
      tags: p["tags"],
      id: p["id"],
      type: p["type"],
      systemData: !p.systemData
        ? undefined
        : {
            createdBy: p.systemData?.["createdBy"],
            createdByType: p.systemData?.["createdByType"],
            createdAt:
              p.systemData?.["createdAt"] !== undefined
                ? new Date(p.systemData?.["createdAt"])
                : undefined,
            lastModifiedBy: p.systemData?.["lastModifiedBy"],
            lastModifiedByType: p.systemData?.["lastModifiedByType"],
            lastModifiedAt:
              p.systemData?.["lastModifiedAt"] !== undefined
                ? new Date(p.systemData?.["lastModifiedAt"])
                : undefined,
          },
      properties: !p.properties
        ? undefined
        : {
            resourceGuid: p.properties?.["resourceGuid"],
            provisioningState: p.properties?.["provisioningState"],
            publisher: p.properties?.["publisher"],
            product: p.properties?.["product"],
            majorVersion: p.properties?.["majorVersion"],
            owners: p.properties?.["owners"],
            redundancy: p.properties?.["redundancy"],
            purviewAccount: p.properties?.["purviewAccount"],
            purviewCollection: p.properties?.["purviewCollection"],
            privateLinksEnabled: p.properties?.["privateLinksEnabled"],
            publicNetworkAccess: p.properties?.["publicNetworkAccess"],
            customerManagedKeyEncryptionEnabled:
              p.properties?.["customerManagedKeyEncryptionEnabled"],
            customerEncryptionKey: !p.properties?.customerEncryptionKey
              ? undefined
              : {
                  keyVaultUri:
                    p.properties?.customerEncryptionKey?.["keyVaultUri"],
                  keyName: p.properties?.customerEncryptionKey?.["keyName"],
                  keyVersion:
                    p.properties?.customerEncryptionKey?.["keyVersion"],
                },
            networkacls: !p.properties?.networkacls
              ? undefined
              : {
                  virtualNetworkRule: p.properties?.networkacls?.[
                    "virtualNetworkRule"
                  ].map((p) => ({
                    id: p["id"],
                    action: p["action"],
                    state: p["state"],
                  })),
                  ipRules: p.properties?.networkacls?.["ipRules"].map((p) => ({
                    value: p["value"],
                    action: p["action"],
                  })),
                  allowedQueryIpRangeList:
                    p.properties?.networkacls?.["allowedQueryIpRangeList"],
                  defaultAction: p.properties?.networkacls?.["defaultAction"],
                },
            managedResourceGroupConfiguration: !p.properties
              ?.managedResourceGroupConfiguration
              ? undefined
              : {
                  name: p.properties?.managedResourceGroupConfiguration?.[
                    "name"
                  ],
                  location:
                    p.properties?.managedResourceGroupConfiguration?.[
                      "location"
                    ],
                },
            availableMinorVersions: p.properties?.["availableMinorVersions"],
            currentMinorVersion: p.properties?.["currentMinorVersion"],
            documentation: p.properties?.["documentation"],
            consumptionEndpoints: !p.properties?.consumptionEndpoints
              ? undefined
              : {
                  ingestionUrl:
                    p.properties?.consumptionEndpoints?.["ingestionUrl"],
                  ingestionResourceId:
                    p.properties?.consumptionEndpoints?.["ingestionResourceId"],
                  fileAccessUrl:
                    p.properties?.consumptionEndpoints?.["fileAccessUrl"],
                  fileAccessResourceId:
                    p.properties?.consumptionEndpoints?.[
                      "fileAccessResourceId"
                    ],
                  queryUrl: p.properties?.consumptionEndpoints?.["queryUrl"],
                  queryResourceId:
                    p.properties?.consumptionEndpoints?.["queryResourceId"],
                },
            keyVaultUrl: p.properties?.["keyVaultUrl"],
          },
      identity: !p.identity
        ? undefined
        : {
            tenantId: p.identity?.["tenantId"],
            principalId: p.identity?.["principalId"],
            type: p.identity?.["type"],
            userAssignedIdentities: p.identity?.["userAssignedIdentities"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List data products by subscription. */
export function dataProductsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: DataProductsListBySubscriptionOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<DataProduct> {
  return buildPagedAsyncIterator(
    context,
    () => _dataProductsListBySubscriptionSend(context, subscriptionId, options),
    _dataProductsListBySubscriptionDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
