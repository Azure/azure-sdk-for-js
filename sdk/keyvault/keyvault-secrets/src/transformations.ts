// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DeletedSecretBundle, SecretBundle } from "./generated/models";
import { parseKeyVaultSecretIdentifier } from "./identifier";
import { DeletedSecret, KeyVaultSecret } from "./secretsModels";

/**
 * @internal
 * Shapes the exposed {@link KeyVaultKey} based on either a received secret bundle or deleted secret bundle.
 */
export function getSecretFromSecretBundle(
  bundle: SecretBundle | DeletedSecretBundle
): KeyVaultSecret {
  const secretBundle = bundle as SecretBundle;
  const deletedSecretBundle = bundle as DeletedSecretBundle;
  const parsedId = parseKeyVaultSecretIdentifier(secretBundle.id!);

  const attributes = secretBundle.attributes;
  delete secretBundle.attributes;

  const resultObject: KeyVaultSecret & DeletedSecret = {
    value: secretBundle.value,
    name: parsedId.name,
    properties: {
      expiresOn: attributes?.expires,
      createdOn: attributes?.created,
      updatedOn: attributes?.updated,
      enabled: attributes?.enabled,
      notBefore: attributes?.notBefore,
      recoverableDays: attributes?.recoverableDays,
      recoveryLevel: attributes?.recoveryLevel,

      id: secretBundle.id,
      contentType: secretBundle.contentType,
      tags: secretBundle.tags,
      managed: secretBundle.managed,

      vaultUrl: parsedId.vaultUrl,
      version: parsedId.version,
      name: parsedId.name,
      certificateKeyId: secretBundle.kid,
    },
  };

  if (deletedSecretBundle.recoveryId) {
    resultObject.properties.recoveryId = deletedSecretBundle.recoveryId;
    resultObject.properties.scheduledPurgeDate = deletedSecretBundle.scheduledPurgeDate;
    resultObject.properties.deletedOn = deletedSecretBundle.deletedDate;
    resultObject.recoveryId = deletedSecretBundle.recoveryId;
    resultObject.scheduledPurgeDate = deletedSecretBundle.scheduledPurgeDate;
    resultObject.deletedOn = deletedSecretBundle.deletedDate;
  }

  if (attributes) {
    if ((attributes as any).vaultUrl) {
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
  }

  return resultObject;
}
