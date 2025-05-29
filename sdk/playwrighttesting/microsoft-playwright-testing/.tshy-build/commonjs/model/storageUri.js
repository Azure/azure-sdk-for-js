"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessLevel = exports.StorageUri = void 0;
class StorageUri {
    constructor(uri, createdAt, expiresAt, accessLevel) {
        this.uri = uri;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.accessLevel = accessLevel;
    }
}
exports.StorageUri = StorageUri;
var AccessLevel;
(function (AccessLevel) {
    AccessLevel[AccessLevel["Read"] = 0] = "Read";
    AccessLevel[AccessLevel["Write"] = 1] = "Write";
    AccessLevel[AccessLevel["ReadWrite"] = 2] = "ReadWrite";
    AccessLevel[AccessLevel["ReadAddCreateWrite"] = 3] = "ReadAddCreateWrite";
})(AccessLevel || (exports.AccessLevel = AccessLevel = {}));
//# sourceMappingURL=storageUri.js.map