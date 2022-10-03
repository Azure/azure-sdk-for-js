// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DeletedKeyBundle,
  DeletedKeyItem,
  KeyRotationPolicy as GeneratedPolicy,
  KeyAttributes,
  KeyBundle,
  KeyItem,
  LifetimeActions,
} from "./generated/models";
import { parseKeyVaultKeyIdentifier } from "./identifier";
import {
  DeletedKey,
  KeyProperties,
  KeyRotationPolicy,
  KeyRotationPolicyProperties,
  KeyVaultKey,
} from "./keysModels";

/**
 * @internal
 * Shapes the exposed {@link KeyVaultKey} based on either a received key bundle or deleted key bundle.
 */
export function getKeyFromKeyBundle(
  bundle: KeyBundle | DeletedKeyBundle
): KeyVaultKey | DeletedKey {
  const keyBundle = bundle as KeyBundle;
  const deletedKeyBundle = bundle as DeletedKeyBundle;

  const parsedId = parseKeyVaultKeyIdentifier(keyBundle.key!.kid!);

  const attributes: KeyAttributes = keyBundle.attributes || {};
  delete keyBundle.attributes;

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
    tags: keyItem.tags,
    updatedOn: attributes.updated,
    vaultUrl: parsedId.vaultUrl,
    version: parsedId.version,
  };

  return resultObject;
}

/**
 * @internal
 */
export const keyRotationTransformations = {
  propertiesToGenerated: function (
    parameters: KeyRotationPolicyProperties
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
          action: action.action!.type!,
          timeAfterCreate: action.trigger?.timeAfterCreate,
          timeBeforeExpiry: action.trigger?.timeBeforeExpiry,
        };
      }),
    };
    return policy;
  },
};
