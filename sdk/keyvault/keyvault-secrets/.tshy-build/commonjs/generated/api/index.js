"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSecret = exports.deleteSecret = exports.updateSecret = exports.getSecret = exports.getSecrets = exports.getSecretVersions = exports.getDeletedSecrets = exports.getDeletedSecret = exports.purgeDeletedSecret = exports.recoverDeletedSecret = exports.backupSecret = exports.restoreSecret = exports.createKeyVault = void 0;
var keyVaultContext_js_1 = require("./keyVaultContext.js");
Object.defineProperty(exports, "createKeyVault", { enumerable: true, get: function () { return keyVaultContext_js_1.createKeyVault; } });
var operations_js_1 = require("./operations.js");
Object.defineProperty(exports, "restoreSecret", { enumerable: true, get: function () { return operations_js_1.restoreSecret; } });
Object.defineProperty(exports, "backupSecret", { enumerable: true, get: function () { return operations_js_1.backupSecret; } });
Object.defineProperty(exports, "recoverDeletedSecret", { enumerable: true, get: function () { return operations_js_1.recoverDeletedSecret; } });
Object.defineProperty(exports, "purgeDeletedSecret", { enumerable: true, get: function () { return operations_js_1.purgeDeletedSecret; } });
Object.defineProperty(exports, "getDeletedSecret", { enumerable: true, get: function () { return operations_js_1.getDeletedSecret; } });
Object.defineProperty(exports, "getDeletedSecrets", { enumerable: true, get: function () { return operations_js_1.getDeletedSecrets; } });
Object.defineProperty(exports, "getSecretVersions", { enumerable: true, get: function () { return operations_js_1.getSecretVersions; } });
Object.defineProperty(exports, "getSecrets", { enumerable: true, get: function () { return operations_js_1.getSecrets; } });
Object.defineProperty(exports, "getSecret", { enumerable: true, get: function () { return operations_js_1.getSecret; } });
Object.defineProperty(exports, "updateSecret", { enumerable: true, get: function () { return operations_js_1.updateSecret; } });
Object.defineProperty(exports, "deleteSecret", { enumerable: true, get: function () { return operations_js_1.deleteSecret; } });
Object.defineProperty(exports, "setSecret", { enumerable: true, get: function () { return operations_js_1.setSecret; } });
//# sourceMappingURL=index.js.map