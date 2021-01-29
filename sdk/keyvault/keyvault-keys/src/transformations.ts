// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DeletedKeyBundle, KeyBundle } from "./generated/models";
import { parseKeyVaultKeyId } from "./identifier";
import { DeletedKey, KeyVaultKey, JsonWebKey, KeyOperation } from "./keysModels";

/**
 * @internal
 * Shapes the exposed {@link KeyVaultKey} based on either a received key bundle or deleted key bundle.
 */
export function getKeyFromKeyBundle(
  bundle: KeyBundle | DeletedKeyBundle
): KeyVaultKey | DeletedKey {
  const keyBundle = bundle as KeyBundle;
  const deletedKeyBundle = bundle as DeletedKeyBundle;

  const parsedId = parseKeyVaultKeyId(keyBundle.key!.kid!);

  const attributes: any = keyBundle.attributes || {};
  delete keyBundle.attributes;

  const resultObject: KeyVaultKey | DeletedKey = {
    key: keyBundle.key as JsonWebKey,
    id: keyBundle.key ? keyBundle.key.kid : undefined,
    name: parsedId.name,
    keyOperations: keyBundle.key ? (keyBundle.key.keyOps as KeyOperation[]) : undefined,
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

      vaultUrl: parsedId.vaultUrl,
      version: parsedId.version,
      name: parsedId.name,

      id: keyBundle.key ? keyBundle.key.kid : undefined
    }
  };

  if (deletedKeyBundle.recoveryId) {
    (resultObject as any).properties.recoveryId = deletedKeyBundle.recoveryId;
    (resultObject as any).properties.scheduledPurgeDate = deletedKeyBundle.scheduledPurgeDate;
    (resultObject as any).properties.deletedOn = deletedKeyBundle.deletedDate;
  }

  return resultObject;
}
