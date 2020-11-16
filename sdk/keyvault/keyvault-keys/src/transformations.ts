// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DeletedKeyBundle, KeyBundle } from "./generated/models";
import { parseKeyVaultKeyId } from "./identifier";
import { DeletedKey, KeyVaultKey, JsonWebKey, KeyOperation } from "./keysModels";

/**
 * @internal
 * @ignore
 * Shapes the exposed {@link KeyVaultKey} based on either a received key bundle or deleted key bundle.
 */
export function getKeyFromKeyBundle(bundle: KeyBundle | DeletedKeyBundle): KeyVaultKey {
  const keyBundle = bundle as KeyBundle;
  const deletedKeyBundle = bundle as DeletedKeyBundle;

  const parsedId = parseKeyVaultKeyId(keyBundle.key!.kid!);

  const attributes: any = keyBundle.attributes || {};
  delete keyBundle.attributes;

  const resultObject: KeyVaultKey & DeletedKey = {
    key: keyBundle.key as JsonWebKey,
    id: keyBundle.key ? keyBundle.key.kid : undefined,
    name: parsedId.name,
    keyOperations: keyBundle.key ? (keyBundle.key.keyOps as KeyOperation[]) : undefined,
    keyType: keyBundle.key ? keyBundle.key.kty : undefined,
    properties: {
      expiresOn: attributes.expires,
      createdOn: attributes.created,
      updatedOn: attributes.updated,
      ...keyBundle,
      ...attributes,
      ...parsedId,
      id: keyBundle.key ? keyBundle.key.kid : undefined
    }
  };

  if (deletedKeyBundle.deletedDate) {
    resultObject.properties.deletedOn = deletedKeyBundle.deletedDate;
    delete (resultObject.properties as any).deletedDate;
  }

  if (attributes.vaultUrl) {
    delete (resultObject.properties as any).vaultUrl;
  }
  if (attributes.expires) {
    delete (resultObject.properties as any).expires;
  }
  if (attributes.created) {
    delete (resultObject.properties as any).created;
  }
  if (attributes.updated) {
    delete (resultObject.properties as any).updated;
  }

  return resultObject;
}
