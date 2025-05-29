// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export function serializeRecord(item, serializer) {
    return Object.keys(item).reduce((acc, key) => {
        if (isSupportedRecordType(item[key])) {
            acc[key] = item[key];
        }
        else if (serializer) {
            const value = item[key];
            if (value !== undefined) {
                acc[key] = serializer(value);
            }
        }
        else {
            console.warn(`Don't know how to serialize ${item[key]}`);
            acc[key] = item[key];
        }
        return acc;
    }, {});
}
function isSupportedRecordType(t) {
    return ["number", "string", "boolean", "null"].includes(typeof t) || t instanceof Date;
}
//# sourceMappingURL=serializerHelpers.js.map