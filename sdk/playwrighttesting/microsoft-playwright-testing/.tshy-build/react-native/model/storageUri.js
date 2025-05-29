// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export class StorageUri {
    constructor(uri, createdAt, expiresAt, accessLevel) {
        this.uri = uri;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.accessLevel = accessLevel;
    }
}
export var AccessLevel;
(function (AccessLevel) {
    AccessLevel[AccessLevel["Read"] = 0] = "Read";
    AccessLevel[AccessLevel["Write"] = 1] = "Write";
    AccessLevel[AccessLevel["ReadWrite"] = 2] = "ReadWrite";
    AccessLevel[AccessLevel["ReadAddCreateWrite"] = 3] = "ReadAddCreateWrite";
})(AccessLevel || (AccessLevel = {}));
//# sourceMappingURL=storageUri.js.map