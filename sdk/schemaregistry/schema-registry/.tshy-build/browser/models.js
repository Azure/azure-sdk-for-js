// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Schema formats supported at the time of this library release.
 */
export var KnownSchemaFormats;
(function (KnownSchemaFormats) {
    /** Avro */
    KnownSchemaFormats["Avro"] = "Avro";
    /** JSON */
    KnownSchemaFormats["Json"] = "Json";
    /** Schemas of the custom format will be treated as an opaque string */
    KnownSchemaFormats["Custom"] = "Custom";
})(KnownSchemaFormats || (KnownSchemaFormats = {}));
//# sourceMappingURL=models.js.map