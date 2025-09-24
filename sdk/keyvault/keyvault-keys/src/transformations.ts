// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DeletedKeyBundle,
  DeletedKeyItem,
  KeyRotationPolicy as GeneratedPolicy,
  KeyAttributes,
  KeyBundle,
  KeyItem,
  LifetimeActions,
} from "./models/models.js";
import { parseKeyVaultKeyIdentifier } from "./identifier.js";
import type {
  DeletedKey,
  KeyProperties,
  KeyRotationPolicy,
  KeyRotationPolicyAction,
  KeyRotationPolicyProperties,
  KeyVaultKey,
} from "./keysModels.js";
import type { PagedAsyncIterableIterator, PageSettings } from "./static-helpers/pagingHelpers.js";
import type { OperationOptions } from "@azure-rest/core-client";

/**
 * @internal
 * Shapes the exposed {@link KeyVaultKey} based on either a received key bundle or deleted key bundle.
 */
export function getKeyFromKeyBundle(
  bundle: KeyBundle | DeletedKeyBundle,
): KeyVaultKey | DeletedKey {
  const keyBundle = bundle as KeyBundle;
  const deletedKeyBundle = bundle as DeletedKeyBundle;

  const parsedId = parseKeyVaultKeyIdentifier(keyBundle.key!.kid!);

  const attributes: KeyAttributes = keyBundle.attributes || {};

  const resultObject: KeyVaultKey | DeletedKey = {
    key: keyBundle.key,
    id: keyBundle.key ? keyBundle.key.kid : undefined,
    name: parsedId.name,
    keyOperations: keyBundle.key ? keyBundle.key.keyOps : undefined,
    keyType: keyBundle.key ? keyBundle.key.kty : undefined,
    properties: {
      tags: keyBundle.tags,

      enabled: attributes.enabled,
      notBefore: attributes.notBefore,
      expiresOn: attributes.expires,
      createdOn: attributes.created,
      updatedOn: attributes.updated,
      recoverableDays: attributes.recoverableDays,
      recoveryLevel: attributes.recoveryLevel,
      exportable: attributes.exportable,
      releasePolicy: keyBundle.releasePolicy,
      hsmPlatform: attributes.hsmPlatform,

      vaultUrl: parsedId.vaultUrl,
      version: parsedId.version,
      name: parsedId.name,
      managed: keyBundle.managed,

      id: keyBundle.key ? keyBundle.key.kid : undefined,
    },
  };

  if (deletedKeyBundle.recoveryId) {
    (resultObject as any).properties.recoveryId = deletedKeyBundle.recoveryId;
    (resultObject as any).properties.scheduledPurgeDate = deletedKeyBundle.scheduledPurgeDate;
    (resultObject as any).properties.deletedOn = deletedKeyBundle.deletedDate;
  }

  if (attributes.attestation) {
    resultObject.properties.attestation = attributes.attestation;
  }

  return resultObject;
}

/**
 * @internal
 * Shapes the exposed {@link DeletedKey} based on a received KeyItem.
 */
export function getDeletedKeyFromDeletedKeyItem(keyItem: DeletedKeyItem): DeletedKey {
  const commonProperties = getKeyPropertiesFromKeyItem(keyItem);

  return {
    key: {
      kid: keyItem.kid,
    },
    id: keyItem.kid,
    name: commonProperties.name,
    properties: {
      ...commonProperties,
      recoveryId: keyItem.recoveryId,
      scheduledPurgeDate: keyItem.scheduledPurgeDate,
      deletedOn: keyItem.deletedDate,
    },
  };
}

/**
 * @internal
 * Shapes the exposed {@link KeyProperties} based on a received KeyItem.
 */
export function getKeyPropertiesFromKeyItem(keyItem: KeyItem): KeyProperties {
  const parsedId = parseKeyVaultKeyIdentifier(keyItem.kid!);
  const attributes = keyItem.attributes || {};

  const resultObject: KeyProperties = {
    createdOn: attributes.created,
    enabled: attributes?.enabled,
    expiresOn: attributes?.expires,
    id: keyItem.kid,
    managed: keyItem.managed,
    name: parsedId.name,
    notBefore: attributes?.notBefore,
    recoverableDays: attributes?.recoverableDays,
    recoveryLevel: attributes?.recoveryLevel,
    hsmPlatform: attributes?.hsmPlatform,
    tags: keyItem.tags,
    updatedOn: attributes.updated,
    vaultUrl: parsedId.vaultUrl,
    version: parsedId.version,
  };

  return resultObject;
}

const actionTypeCaseInsensitiveMapping: Record<string, KeyRotationPolicyAction> = {
  rotate: "Rotate",
  notify: "Notify",
};

function getNormalizedActionType(caseInsensitiveActionType: string): KeyRotationPolicyAction {
  const result = actionTypeCaseInsensitiveMapping[caseInsensitiveActionType.toLowerCase()];
  if (result) {
    return result;
  }

  throw new Error(`Unrecognized action type: ${caseInsensitiveActionType}`);
}

/**
 * @internal
 */
export const keyRotationTransformations = {
  propertiesToGenerated: function (
    parameters: KeyRotationPolicyProperties,
  ): Partial<GeneratedPolicy> {
    const policy: GeneratedPolicy = {
      attributes: {
        expiryTime: parameters.expiresIn,
      },
      lifetimeActions: parameters.lifetimeActions?.map((action) => {
        const generatedAction: LifetimeActions = {
          action: { type: action.action },
          trigger: {},
        };

        if (action.timeAfterCreate) {
          generatedAction.trigger!.timeAfterCreate = action.timeAfterCreate;
        }

        if (action.timeBeforeExpiry) {
          generatedAction.trigger!.timeBeforeExpiry = action.timeBeforeExpiry;
        }

        return generatedAction;
      }),
    };
    return policy;
  },
  generatedToPublic(generated: GeneratedPolicy): KeyRotationPolicy {
    const policy: KeyRotationPolicy = {
      id: generated.id,
      createdOn: generated.attributes?.created,
      updatedOn: generated.attributes?.updated,
      expiresIn: generated.attributes?.expiryTime,
      lifetimeActions: generated.lifetimeActions?.map((action) => {
        return {
          action: getNormalizedActionType(action.action!.type!),
          timeAfterCreate: action.trigger?.timeAfterCreate,
          timeBeforeExpiry: action.trigger?.timeBeforeExpiry,
        };
      }),
    };
    return policy;
  },
};

/**
 * A helper supporting compatibility between modular and legacy paged async iterables.
 *
 * Provides the following compatibility:
 * 1. Maps the values of the paged async iterable using the provided mapper function.
 * 2. Supports `maxPageSize` operation on the paged async iterable.
 *
 * TODO: move this to keyvault-common once everything is merged
 */
export function mapPagedAsyncIterable<
  TGenerated,
  TPublic,
  TOptions extends OperationOptions & { maxresults?: number },
>(
  options: TOptions,
  operation: (options: TOptions) => PagedAsyncIterableIterator<TGenerated>,
  mapper: (x: TGenerated) => TPublic,
): PagedAsyncIterableIterator<TPublic> {
  let iter: ReturnType<typeof operation> | undefined = undefined;
  return {
    async next() {
      iter ??= operation({ ...options, maxresults: undefined });
      const result = await iter.next();

      return {
        ...result,
        value: result.value && mapper(result.value),
      };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    async *byPage<TSettings extends PageSettings & { maxPageSize?: number }>(settings?: TSettings) {
      // Pass the maxPageSize value to the underlying page operation
      const iteratorByPage = operation({ ...options, maxresults: settings?.maxPageSize }).byPage(
        settings,
      );
      for await (const page of iteratorByPage) {
        yield page.map(mapper);
      }
    },
  };
}
