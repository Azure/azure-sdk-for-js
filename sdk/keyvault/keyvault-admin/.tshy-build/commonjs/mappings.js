"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.mappings = void 0;
exports.mapPagedAsyncIterable = mapPagedAsyncIterable;
const tslib_1 = require("tslib");
exports.mappings = {
    roleAssignment: {
        generatedToPublic(roleAssignment) {
            const { id, name, type, properties } = roleAssignment;
            const { scope, roleDefinitionId, principalId } = properties || {};
            return {
                id: id,
                name: name,
                kind: type,
                properties: {
                    scope: scope,
                    roleDefinitionId: roleDefinitionId,
                    principalId: principalId,
                },
            };
        },
    },
    roleDefinition: {
        generatedToPublic(roleDefinition) {
            const { id, name, type } = roleDefinition;
            const { roleName, description, roleType, permissions, assignableScopes } = roleDefinition.properties || {};
            return {
                id: id,
                name: name,
                kind: type,
                roleName: roleName,
                description: description,
                roleType: roleType,
                permissions: permissions,
                assignableScopes: assignableScopes,
            };
        },
    },
    folderUriParts(folderUri) {
        const uriParts = folderUri.split("/");
        const folderName = uriParts.pop();
        const storageUri = uriParts.join("/");
        if (!folderName) {
            throw new Error("The provided folder URI is missing the folder name.");
        }
        return {
            folderName,
            folderUri: storageUri,
        };
    },
};
/**
 * A helper supporting compatibility between modular and legacy paged async iterables.
 *
 * Provides the following compatibility:
 * 1. Maps the values of the paged async iterable using the provided mapper function.
 * 2. Supports `maxPageSize` operation on the paged async iterable.
 *
 * TODO: move this to keyvault-common once everything is merged.
 */
function mapPagedAsyncIterable(options, operation, mapper) {
    let iter = undefined;
    return {
        async next() {
            iter !== null && iter !== void 0 ? iter : (iter = operation(Object.assign(Object.assign({}, options), { maxresults: undefined })));
            const result = await iter.next();
            return Object.assign(Object.assign({}, result), { value: result.value && mapper(result.value) });
        },
        [Symbol.asyncIterator]() {
            return this;
        },
        byPage(settings) {
            return tslib_1.__asyncGenerator(this, arguments, function* byPage_1() {
                var _a, e_1, _b, _c;
                // Pass the maxPageSize value to the underlying page operation
                const iteratorByPage = operation(Object.assign(Object.assign({}, options), { maxresults: settings === null || settings === void 0 ? void 0 : settings.maxPageSize })).byPage(settings);
                try {
                    for (var _d = true, iteratorByPage_1 = tslib_1.__asyncValues(iteratorByPage), iteratorByPage_1_1; iteratorByPage_1_1 = yield tslib_1.__await(iteratorByPage_1.next()), _a = iteratorByPage_1_1.done, !_a; _d = true) {
                        _c = iteratorByPage_1_1.value;
                        _d = false;
                        const page = _c;
                        yield yield tslib_1.__await(page.map(mapper));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = iteratorByPage_1.return)) yield tslib_1.__await(_b.call(iteratorByPage_1));
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        },
    };
}
//# sourceMappingURL=mappings.js.map