// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncGenerator, __asyncValues, __await } from "tslib";
import { parseKeyVaultSecretIdentifier } from "./identifier.js";
/**
 * @internal
 * Shapes the exposed {@link KeyVaultKey} based on either a received secret bundle or deleted secret bundle.
 */
export function getSecretFromSecretBundle(bundle) {
    const secretBundle = bundle;
    const deletedSecretBundle = bundle;
    const parsedId = parseKeyVaultSecretIdentifier(secretBundle.id);
    const attributes = secretBundle.attributes;
    delete secretBundle.attributes;
    const resultObject = {
        value: secretBundle.value,
        name: parsedId.name,
        properties: {
            expiresOn: attributes === null || attributes === void 0 ? void 0 : attributes.expires,
            createdOn: attributes === null || attributes === void 0 ? void 0 : attributes.created,
            updatedOn: attributes === null || attributes === void 0 ? void 0 : attributes.updated,
            enabled: attributes === null || attributes === void 0 ? void 0 : attributes.enabled,
            notBefore: attributes === null || attributes === void 0 ? void 0 : attributes.notBefore,
            recoverableDays: attributes === null || attributes === void 0 ? void 0 : attributes.recoverableDays,
            recoveryLevel: attributes === null || attributes === void 0 ? void 0 : attributes.recoveryLevel,
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
        if (attributes.vaultUrl) {
            delete resultObject.properties.vaultUrl;
        }
        if (attributes.expires) {
            delete resultObject.properties.expires;
        }
        if (attributes.created) {
            delete resultObject.properties.created;
        }
        if (attributes.updated) {
            delete resultObject.properties.updated;
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
export function mapPagedAsyncIterable(operation, operationOptions, mapper) {
    let iter = undefined;
    return {
        async next() {
            iter !== null && iter !== void 0 ? iter : (iter = operation(Object.assign(Object.assign({}, operationOptions), { maxresults: undefined })));
            const result = await iter.next();
            return Object.assign(Object.assign({}, result), { value: result.value && mapper(result.value) });
        },
        [Symbol.asyncIterator]() {
            return this;
        },
        byPage(settings) {
            return __asyncGenerator(this, arguments, function* byPage_1() {
                var _a, e_1, _b, _c;
                // Pass the maxPageSize value to the underlying page operation
                const iteratorByPage = operation(Object.assign(Object.assign({}, operationOptions), { maxresults: settings === null || settings === void 0 ? void 0 : settings.maxPageSize })).byPage(settings);
                try {
                    for (var _d = true, iteratorByPage_1 = __asyncValues(iteratorByPage), iteratorByPage_1_1; iteratorByPage_1_1 = yield __await(iteratorByPage_1.next()), _a = iteratorByPage_1_1.done, !_a; _d = true) {
                        _c = iteratorByPage_1_1.value;
                        _d = false;
                        const page = _c;
                        yield yield __await(page.map(mapper));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = iteratorByPage_1.return)) yield __await(_b.call(iteratorByPage_1));
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        },
    };
}
//# sourceMappingURL=transformations.js.map