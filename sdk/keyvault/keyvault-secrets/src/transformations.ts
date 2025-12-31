// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PagedAsyncIterableIterator, PageSettings } from "./static-helpers/pagingHelpers.js";
import type { DeletedSecretBundle, SecretBundle } from "./models/models.js";
import { parseKeyVaultSecretIdentifier } from "./identifier.js";
import type { DeletedSecret, KeyVaultSecret } from "./secretsModels.js";
import type { OperationOptions } from "@azure-rest/core-client";

/**
 * @internal
 * Shapes the exposed {@link KeyVaultKey} based on either a received secret bundle or deleted secret bundle.
 */
export function getSecretFromSecretBundle(
  bundle: SecretBundle | DeletedSecretBundle,
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
  operation: (options: TOptions) => PagedAsyncIterableIterator<TGenerated>,
  operationOptions: TOptions,
  mapper: (x: TGenerated) => TPublic,
): PagedAsyncIterableIterator<TPublic> {
  let iter: ReturnType<typeof operation> | undefined = undefined;
  return {
    async next() {
      iter ??= operation({ ...operationOptions, maxresults: undefined });
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
      const iteratorByPage = operation({
        ...operationOptions,
        maxresults: settings?.maxPageSize,
      }).byPage(settings);
      for await (const page of iteratorByPage) {
        yield page.map(mapper);
      }
    },
  };
}
