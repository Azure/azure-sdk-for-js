"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownSchemaFormats = void 0;
/**
 * Schema formats supported at the time of this library release.
 */
var KnownSchemaFormats;
(function (KnownSchemaFormats) {
    /** Avro */
    KnownSchemaFormats["Avro"] = "Avro";
    /** JSON */
    KnownSchemaFormats["Json"] = "Json";
    /** Schemas of the custom format will be treated as an opaque string */
    KnownSchemaFormats["Custom"] = "Custom";
})(KnownSchemaFormats || (exports.KnownSchemaFormats = KnownSchemaFormats = {}));
//# sourceMappingURL=models.js.map