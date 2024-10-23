// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  secretAttributesSerializer,
  SecretSetParameters,
  DeletionRecoveryLevel,
  SecretBundle,
  DeletedSecretBundle,
  SecretUpdateParameters,
  SecretItem,
  DeletedSecretItem,
  BackupSecretResult,
  SecretRestoreParameters,
  _PagedDeletedSecretItem,
  _PagedSecretItem,
  _SecretListResult,
} from "../models/models.js";
import { KeyVaultContext as Client } from "./index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import { serializeRecord } from "../helpers/serializerHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";
import {
  SetSecretOptionalParams,
  DeleteSecretOptionalParams,
  UpdateSecretOptionalParams,
  GetSecretOptionalParams,
  GetSecretsOptionalParams,
  GetSecretVersionsOptionalParams,
  GetDeletedSecretsOptionalParams,
  GetDeletedSecretOptionalParams,
  PurgeDeletedSecretOptionalParams,
  RecoverDeletedSecretOptionalParams,
  BackupSecretOptionalParams,
  RestoreSecretOptionalParams,
} from "../models/options.js";

export function _setSecretSend(
  context: Client,
  secretName: string,
  parameters: SecretSetParameters,
  options: SetSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/secrets/{secretName}", secretName)
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        value: parameters["value"],
        tags: !parameters.tags
          ? parameters.tags
          : (serializeRecord(parameters.tags as any) as any),
        contentType: parameters["contentType"],
        attributes: !parameters.secretAttributes
          ? parameters.secretAttributes
          : secretAttributesSerializer(parameters.secretAttributes),
      },
    });
}

export async function _setSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<SecretBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
    id: result.body["id"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
          enabled: result.body.attributes?.["enabled"],
          notBefore:
            result.body.attributes?.["nbf"] !== undefined
              ? new Date(result.body.attributes?.["nbf"])
              : undefined,
          expires:
            result.body.attributes?.["exp"] !== undefined
              ? new Date(result.body.attributes?.["exp"])
              : undefined,
          created:
            result.body.attributes?.["created"] !== undefined
              ? new Date(result.body.attributes?.["created"])
              : undefined,
          updated:
            result.body.attributes?.["updated"] !== undefined
              ? new Date(result.body.attributes?.["updated"])
              : undefined,
          recoverableDays: result.body.attributes?.["recoverableDays"],
          recoveryLevel: result.body.attributes?.[
            "recoveryLevel"
          ] as DeletionRecoveryLevel,
        },
    tags: result.body["tags"],
    kid: result.body["kid"],
    managed: result.body["managed"],
  };
}

/**
 * The SET operation adds a secret to the Azure Key Vault. If the named secret
 * already exists, Azure Key Vault creates a new version of that secret. This
 * operation requires the secrets/set permission.
 */
export async function setSecret(
  context: Client,
  secretName: string,
  parameters: SecretSetParameters,
  options: SetSecretOptionalParams = { requestOptions: {} },
): Promise<SecretBundle> {
  const result = await _setSecretSend(context, secretName, parameters, options);
  return _setSecretDeserialize(result);
}

export function _deleteSecretSend(
  context: Client,
  secretName: string,
  options: DeleteSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/secrets/{secretName}", secretName)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedSecretBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
    id: result.body["id"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
          enabled: result.body.attributes?.["enabled"],
          notBefore:
            result.body.attributes?.["nbf"] !== undefined
              ? new Date(result.body.attributes?.["nbf"])
              : undefined,
          expires:
            result.body.attributes?.["exp"] !== undefined
              ? new Date(result.body.attributes?.["exp"])
              : undefined,
          created:
            result.body.attributes?.["created"] !== undefined
              ? new Date(result.body.attributes?.["created"])
              : undefined,
          updated:
            result.body.attributes?.["updated"] !== undefined
              ? new Date(result.body.attributes?.["updated"])
              : undefined,
          recoverableDays: result.body.attributes?.["recoverableDays"],
          recoveryLevel: result.body.attributes?.[
            "recoveryLevel"
          ] as DeletionRecoveryLevel,
        },
    tags: result.body["tags"],
    kid: result.body["kid"],
    managed: result.body["managed"],
    recoveryId: result.body["recoveryId"],
    scheduledPurgeDate:
      result.body["scheduledPurgeDate"] !== undefined
        ? new Date(result.body["scheduledPurgeDate"])
        : undefined,
    deletedDate:
      result.body["deletedDate"] !== undefined
        ? new Date(result.body["deletedDate"])
        : undefined,
  };
}

/**
 * The DELETE operation applies to any secret stored in Azure Key Vault. DELETE
 * cannot be applied to an individual version of a secret. This operation requires
 * the secrets/delete permission.
 */
export async function deleteSecret(
  context: Client,
  secretName: string,
  options: DeleteSecretOptionalParams = { requestOptions: {} },
): Promise<DeletedSecretBundle> {
  const result = await _deleteSecretSend(context, secretName, options);
  return _deleteSecretDeserialize(result);
}

export function _updateSecretSend(
  context: Client,
  secretName: string,
  secretVersion: string,
  parameters: SecretUpdateParameters,
  options: UpdateSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/secrets/{secretName}/{secretVersion}", secretName, secretVersion)
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        contentType: parameters["contentType"],
        attributes: !parameters.secretAttributes
          ? parameters.secretAttributes
          : secretAttributesSerializer(parameters.secretAttributes),
        tags: !parameters.tags
          ? parameters.tags
          : (serializeRecord(parameters.tags as any) as any),
      },
    });
}

export async function _updateSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<SecretBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
    id: result.body["id"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
          enabled: result.body.attributes?.["enabled"],
          notBefore:
            result.body.attributes?.["nbf"] !== undefined
              ? new Date(result.body.attributes?.["nbf"])
              : undefined,
          expires:
            result.body.attributes?.["exp"] !== undefined
              ? new Date(result.body.attributes?.["exp"])
              : undefined,
          created:
            result.body.attributes?.["created"] !== undefined
              ? new Date(result.body.attributes?.["created"])
              : undefined,
          updated:
            result.body.attributes?.["updated"] !== undefined
              ? new Date(result.body.attributes?.["updated"])
              : undefined,
          recoverableDays: result.body.attributes?.["recoverableDays"],
          recoveryLevel: result.body.attributes?.[
            "recoveryLevel"
          ] as DeletionRecoveryLevel,
        },
    tags: result.body["tags"],
    kid: result.body["kid"],
    managed: result.body["managed"],
  };
}

/**
 * The UPDATE operation changes specified attributes of an existing stored secret.
 * Attributes that are not specified in the request are left unchanged. The value
 * of a secret itself cannot be changed. This operation requires the secrets/set
 * permission.
 */
export async function updateSecret(
  context: Client,
  secretName: string,
  secretVersion: string,
  parameters: SecretUpdateParameters,
  options: UpdateSecretOptionalParams = { requestOptions: {} },
): Promise<SecretBundle> {
  const result = await _updateSecretSend(
    context,
    secretName,
    secretVersion,
    parameters,
    options,
  );
  return _updateSecretDeserialize(result);
}

export function _getSecretSend(
  context: Client,
  secretName: string,
  secretVersion: string,
  options: GetSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/secrets/{secretName}/{secretVersion}", secretName, secretVersion)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<SecretBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
    id: result.body["id"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
          enabled: result.body.attributes?.["enabled"],
          notBefore:
            result.body.attributes?.["nbf"] !== undefined
              ? new Date(result.body.attributes?.["nbf"])
              : undefined,
          expires:
            result.body.attributes?.["exp"] !== undefined
              ? new Date(result.body.attributes?.["exp"])
              : undefined,
          created:
            result.body.attributes?.["created"] !== undefined
              ? new Date(result.body.attributes?.["created"])
              : undefined,
          updated:
            result.body.attributes?.["updated"] !== undefined
              ? new Date(result.body.attributes?.["updated"])
              : undefined,
          recoverableDays: result.body.attributes?.["recoverableDays"],
          recoveryLevel: result.body.attributes?.[
            "recoveryLevel"
          ] as DeletionRecoveryLevel,
        },
    tags: result.body["tags"],
    kid: result.body["kid"],
    managed: result.body["managed"],
  };
}

/**
 * The GET operation is applicable to any secret stored in Azure Key Vault. This
 * operation requires the secrets/get permission.
 */
export async function getSecret(
  context: Client,
  secretName: string,
  secretVersion: string,
  options: GetSecretOptionalParams = { requestOptions: {} },
): Promise<SecretBundle> {
  const result = await _getSecretSend(
    context,
    secretName,
    secretVersion,
    options,
  );
  return _getSecretDeserialize(result);
}

export function _getSecretsSend(
  context: Client,
  options: GetSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/secrets")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { maxresults: options?.maxresults },
    });
}

export async function _getSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedSecretItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        id: p["id"],
        attributes: !p.attributes
          ? undefined
          : {
              enabled: p.attributes?.["enabled"],
              notBefore:
                p.attributes?.["nbf"] !== undefined
                  ? new Date(p.attributes?.["nbf"])
                  : undefined,
              expires:
                p.attributes?.["exp"] !== undefined
                  ? new Date(p.attributes?.["exp"])
                  : undefined,
              created:
                p.attributes?.["created"] !== undefined
                  ? new Date(p.attributes?.["created"])
                  : undefined,
              updated:
                p.attributes?.["updated"] !== undefined
                  ? new Date(p.attributes?.["updated"])
                  : undefined,
              recoverableDays: p.attributes?.["recoverableDays"],
              recoveryLevel: p.attributes?.[
                "recoveryLevel"
              ] as DeletionRecoveryLevel,
            },
        tags: p["tags"],
        contentType: p["contentType"],
        managed: p["managed"],
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/**
 * The Get Secrets operation is applicable to the entire vault. However, only the
 * base secret identifier and its attributes are provided in the response.
 * Individual secret versions are not listed in the response. This operation
 * requires the secrets/list permission.
 */
export function getSecrets(
  context: Client,
  options: GetSecretsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecretItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getSecretsSend(context, options),
    _getSecretsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSecretVersionsSend(
  context: Client,
  secretName: string,
  options: GetSecretVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/secrets/{secretName}/versions", secretName)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { maxresults: options?.maxresults },
    });
}

export async function _getSecretVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecretListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        id: p["id"],
        attributes: !p.attributes
          ? undefined
          : {
              enabled: p.attributes?.["enabled"],
              notBefore:
                p.attributes?.["nbf"] !== undefined
                  ? new Date(p.attributes?.["nbf"])
                  : undefined,
              expires:
                p.attributes?.["exp"] !== undefined
                  ? new Date(p.attributes?.["exp"])
                  : undefined,
              created:
                p.attributes?.["created"] !== undefined
                  ? new Date(p.attributes?.["created"])
                  : undefined,
              updated:
                p.attributes?.["updated"] !== undefined
                  ? new Date(p.attributes?.["updated"])
                  : undefined,
              recoverableDays: p.attributes?.["recoverableDays"],
              recoveryLevel: p.attributes?.[
                "recoveryLevel"
              ] as DeletionRecoveryLevel,
            },
        tags: p["tags"],
        contentType: p["contentType"],
        managed: p["managed"],
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/**
 * The full secret identifier and attributes are provided in the response. No
 * values are returned for the secrets. This operations requires the secrets/list
 * permission.
 */
export function getSecretVersions(
  context: Client,
  secretName: string,
  options: GetSecretVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecretItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getSecretVersionsSend(context, secretName, options),
    _getSecretVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getDeletedSecretsSend(
  context: Client,
  options: GetDeletedSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/deletedsecrets")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { maxresults: options?.maxresults },
    });
}

export async function _getDeletedSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDeletedSecretItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        id: p["id"],
        attributes: !p.attributes
          ? undefined
          : {
              enabled: p.attributes?.["enabled"],
              notBefore:
                p.attributes?.["nbf"] !== undefined
                  ? new Date(p.attributes?.["nbf"])
                  : undefined,
              expires:
                p.attributes?.["exp"] !== undefined
                  ? new Date(p.attributes?.["exp"])
                  : undefined,
              created:
                p.attributes?.["created"] !== undefined
                  ? new Date(p.attributes?.["created"])
                  : undefined,
              updated:
                p.attributes?.["updated"] !== undefined
                  ? new Date(p.attributes?.["updated"])
                  : undefined,
              recoverableDays: p.attributes?.["recoverableDays"],
              recoveryLevel: p.attributes?.[
                "recoveryLevel"
              ] as DeletionRecoveryLevel,
            },
        tags: p["tags"],
        contentType: p["contentType"],
        managed: p["managed"],
        recoveryId: p["recoveryId"],
        scheduledPurgeDate:
          p["scheduledPurgeDate"] !== undefined
            ? new Date(p["scheduledPurgeDate"])
            : undefined,
        deletedDate:
          p["deletedDate"] !== undefined
            ? new Date(p["deletedDate"])
            : undefined,
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/**
 * The Get Deleted Secrets operation returns the secrets that have been deleted
 * for a vault enabled for soft-delete. This operation requires the secrets/list
 * permission.
 */
export function getDeletedSecrets(
  context: Client,
  options: GetDeletedSecretsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedSecretItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getDeletedSecretsSend(context, options),
    _getDeletedSecretsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getDeletedSecretSend(
  context: Client,
  secretName: string,
  options: GetDeletedSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/deletedsecrets/{secretName}", secretName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeletedSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedSecretBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
    id: result.body["id"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
          enabled: result.body.attributes?.["enabled"],
          notBefore:
            result.body.attributes?.["nbf"] !== undefined
              ? new Date(result.body.attributes?.["nbf"])
              : undefined,
          expires:
            result.body.attributes?.["exp"] !== undefined
              ? new Date(result.body.attributes?.["exp"])
              : undefined,
          created:
            result.body.attributes?.["created"] !== undefined
              ? new Date(result.body.attributes?.["created"])
              : undefined,
          updated:
            result.body.attributes?.["updated"] !== undefined
              ? new Date(result.body.attributes?.["updated"])
              : undefined,
          recoverableDays: result.body.attributes?.["recoverableDays"],
          recoveryLevel: result.body.attributes?.[
            "recoveryLevel"
          ] as DeletionRecoveryLevel,
        },
    tags: result.body["tags"],
    kid: result.body["kid"],
    managed: result.body["managed"],
    recoveryId: result.body["recoveryId"],
    scheduledPurgeDate:
      result.body["scheduledPurgeDate"] !== undefined
        ? new Date(result.body["scheduledPurgeDate"])
        : undefined,
    deletedDate:
      result.body["deletedDate"] !== undefined
        ? new Date(result.body["deletedDate"])
        : undefined,
  };
}

/**
 * The Get Deleted Secret operation returns the specified deleted secret along
 * with its attributes. This operation requires the secrets/get permission.
 */
export async function getDeletedSecret(
  context: Client,
  secretName: string,
  options: GetDeletedSecretOptionalParams = { requestOptions: {} },
): Promise<DeletedSecretBundle> {
  const result = await _getDeletedSecretSend(context, secretName, options);
  return _getDeletedSecretDeserialize(result);
}

export function _purgeDeletedSecretSend(
  context: Client,
  secretName: string,
  options: PurgeDeletedSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/deletedsecrets/{secretName}", secretName)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _purgeDeletedSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/**
 * The purge deleted secret operation removes the secret permanently, without the
 * possibility of recovery. This operation can only be enabled on a soft-delete
 * enabled vault. This operation requires the secrets/purge permission.
 */
export async function purgeDeletedSecret(
  context: Client,
  secretName: string,
  options: PurgeDeletedSecretOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _purgeDeletedSecretSend(context, secretName, options);
  return _purgeDeletedSecretDeserialize(result);
}

export function _recoverDeletedSecretSend(
  context: Client,
  secretName: string,
  options: RecoverDeletedSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/deletedsecrets/{secretName}/recover", secretName)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _recoverDeletedSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<SecretBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
    id: result.body["id"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
          enabled: result.body.attributes?.["enabled"],
          notBefore:
            result.body.attributes?.["nbf"] !== undefined
              ? new Date(result.body.attributes?.["nbf"])
              : undefined,
          expires:
            result.body.attributes?.["exp"] !== undefined
              ? new Date(result.body.attributes?.["exp"])
              : undefined,
          created:
            result.body.attributes?.["created"] !== undefined
              ? new Date(result.body.attributes?.["created"])
              : undefined,
          updated:
            result.body.attributes?.["updated"] !== undefined
              ? new Date(result.body.attributes?.["updated"])
              : undefined,
          recoverableDays: result.body.attributes?.["recoverableDays"],
          recoveryLevel: result.body.attributes?.[
            "recoveryLevel"
          ] as DeletionRecoveryLevel,
        },
    tags: result.body["tags"],
    kid: result.body["kid"],
    managed: result.body["managed"],
  };
}

/**
 * Recovers the deleted secret in the specified vault. This operation can only be
 * performed on a soft-delete enabled vault. This operation requires the
 * secrets/recover permission.
 */
export async function recoverDeletedSecret(
  context: Client,
  secretName: string,
  options: RecoverDeletedSecretOptionalParams = { requestOptions: {} },
): Promise<SecretBundle> {
  const result = await _recoverDeletedSecretSend(context, secretName, options);
  return _recoverDeletedSecretDeserialize(result);
}

export function _backupSecretSend(
  context: Client,
  secretName: string,
  options: BackupSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/secrets/{secretName}/backup", secretName)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _backupSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupSecretResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value:
      typeof result.body["value"] === "string"
        ? stringToUint8Array(result.body["value"], "base64url")
        : result.body["value"],
  };
}

/**
 * Requests that a backup of the specified secret be downloaded to the client. All
 * versions of the secret will be downloaded. This operation requires the
 * secrets/backup permission.
 */
export async function backupSecret(
  context: Client,
  secretName: string,
  options: BackupSecretOptionalParams = { requestOptions: {} },
): Promise<BackupSecretResult> {
  const result = await _backupSecretSend(context, secretName, options);
  return _backupSecretDeserialize(result);
}

export function _restoreSecretSend(
  context: Client,
  parameters: SecretRestoreParameters,
  options: RestoreSecretOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/secrets/restore")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        value: uint8ArrayToString(
          parameters["secretBundleBackup"],
          "base64url",
        ),
      },
    });
}

export async function _restoreSecretDeserialize(
  result: PathUncheckedResponse,
): Promise<SecretBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"],
    id: result.body["id"],
    contentType: result.body["contentType"],
    attributes: !result.body.attributes
      ? undefined
      : {
          enabled: result.body.attributes?.["enabled"],
          notBefore:
            result.body.attributes?.["nbf"] !== undefined
              ? new Date(result.body.attributes?.["nbf"])
              : undefined,
          expires:
            result.body.attributes?.["exp"] !== undefined
              ? new Date(result.body.attributes?.["exp"])
              : undefined,
          created:
            result.body.attributes?.["created"] !== undefined
              ? new Date(result.body.attributes?.["created"])
              : undefined,
          updated:
            result.body.attributes?.["updated"] !== undefined
              ? new Date(result.body.attributes?.["updated"])
              : undefined,
          recoverableDays: result.body.attributes?.["recoverableDays"],
          recoveryLevel: result.body.attributes?.[
            "recoveryLevel"
          ] as DeletionRecoveryLevel,
        },
    tags: result.body["tags"],
    kid: result.body["kid"],
    managed: result.body["managed"],
  };
}

/**
 * Restores a backed up secret, and all its versions, to a vault. This operation
 * requires the secrets/restore permission.
 */
export async function restoreSecret(
  context: Client,
  parameters: SecretRestoreParameters,
  options: RestoreSecretOptionalParams = { requestOptions: {} },
): Promise<SecretBundle> {
  const result = await _restoreSecretSend(context, parameters, options);
  return _restoreSecretDeserialize(result);
}
