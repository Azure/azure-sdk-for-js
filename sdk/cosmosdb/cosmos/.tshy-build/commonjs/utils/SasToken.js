"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthorizationSasToken = createAuthorizationSasToken;
exports.utcsecondsSinceEpoch = utcsecondsSinceEpoch;
const index_js_1 = require("../common/index.js");
const encode_js_1 = require("./encode.js");
const hmac_js_1 = require("./hmac.js");
/**
 * Experimental internal only
 * Generates the payload representing the permission configuration for the sas token.
 */
async function createAuthorizationSasToken(masterKey, sasTokenProperties) {
    let resourcePrefixPath = "";
    if (typeof sasTokenProperties.databaseName === "string" &&
        sasTokenProperties.databaseName !== "") {
        resourcePrefixPath += `/${index_js_1.Constants.Path.DatabasesPathSegment}/${sasTokenProperties.databaseName}`;
    }
    if (typeof sasTokenProperties.containerName === "string" &&
        sasTokenProperties.containerName !== "") {
        if (sasTokenProperties.databaseName === "") {
            throw new Error(`illegalArgumentException : ${sasTokenProperties.databaseName} \
                          is an invalid database name`);
        }
        resourcePrefixPath += `/${index_js_1.Constants.Path.CollectionsPathSegment}/${sasTokenProperties.containerName}`;
    }
    if (typeof sasTokenProperties.resourceName === "string" &&
        sasTokenProperties.resourceName !== "") {
        if (sasTokenProperties.containerName === "") {
            throw new Error(`illegalArgumentException : ${sasTokenProperties.containerName} \
                          is an invalid container name`);
        }
        switch (sasTokenProperties.resourceKind) {
            case "ITEM":
                resourcePrefixPath += `${index_js_1.Constants.Path.Root}${index_js_1.Constants.Path.DocumentsPathSegment}`;
                break;
            case "STORED_PROCEDURE":
                resourcePrefixPath += `${index_js_1.Constants.Path.Root}${index_js_1.Constants.Path.StoredProceduresPathSegment}`;
                break;
            case "USER_DEFINED_FUNCTION":
                resourcePrefixPath += `${index_js_1.Constants.Path.Root}${index_js_1.Constants.Path.UserDefinedFunctionsPathSegment}`;
                break;
            case "TRIGGER":
                resourcePrefixPath += `${index_js_1.Constants.Path.Root}${index_js_1.Constants.Path.TriggersPathSegment}`;
                break;
            default:
                throw new Error(`illegalArgumentException : ${sasTokenProperties.resourceKind} \
                          is an invalid resource kind`);
                break;
        }
        resourcePrefixPath += `${index_js_1.Constants.Path.Root}${sasTokenProperties.resourceName}${index_js_1.Constants.Path.Root}`;
    }
    sasTokenProperties.resourcePath = resourcePrefixPath.toString();
    let partitionRanges = "";
    if (sasTokenProperties.partitionKeyValueRanges !== undefined &&
        sasTokenProperties.partitionKeyValueRanges.length > 0) {
        if (typeof sasTokenProperties.resourceKind !== "string" &&
            sasTokenProperties.resourceKind !== "ITEM") {
            throw new Error(`illegalArgumentException : ${sasTokenProperties.resourceKind} \
                          is an invalid partition key value range`);
        }
        sasTokenProperties.partitionKeyValueRanges.forEach((range) => {
            partitionRanges += `${(0, encode_js_1.encodeUTF8)(range)},`;
        });
    }
    if (sasTokenProperties.controlPlaneReaderScope === 0) {
        sasTokenProperties.controlPlaneReaderScope += index_js_1.SasTokenPermissionKind.ContainerReadAny;
        sasTokenProperties.controlPlaneWriterScope += index_js_1.SasTokenPermissionKind.ContainerReadAny;
    }
    if (sasTokenProperties.dataPlaneReaderScope === 0 &&
        sasTokenProperties.dataPlaneWriterScope === 0) {
        sasTokenProperties.dataPlaneReaderScope = index_js_1.SasTokenPermissionKind.ContainerFullAccess;
        sasTokenProperties.dataPlaneWriterScope = index_js_1.SasTokenPermissionKind.ContainerFullAccess;
    }
    if (typeof sasTokenProperties.keyType !== "number" ||
        typeof sasTokenProperties.keyType === "undefined") {
        switch (sasTokenProperties.keyType) {
            case index_js_1.CosmosKeyType.PrimaryMaster:
                sasTokenProperties.keyType = 1;
                break;
            case index_js_1.CosmosKeyType.SecondaryMaster:
                sasTokenProperties.keyType = 2;
                break;
            case index_js_1.CosmosKeyType.PrimaryReadOnly:
                sasTokenProperties.keyType = 3;
                break;
            case index_js_1.CosmosKeyType.SecondaryReadOnly:
                sasTokenProperties.keyType = 4;
                break;
            default:
                throw new Error(`illegalArgumentException : ${sasTokenProperties.keyType} \
                          is an invalid key type`);
                break;
        }
    }
    const payload = sasTokenProperties.user +
        "\n" +
        sasTokenProperties.userTag +
        "\n" +
        sasTokenProperties.resourcePath +
        "\n" +
        partitionRanges +
        "\n" +
        utcsecondsSinceEpoch(sasTokenProperties.startTime).toString(16) +
        "\n" +
        utcsecondsSinceEpoch(sasTokenProperties.expiryTime).toString(16) +
        "\n" +
        sasTokenProperties.keyType +
        "\n" +
        sasTokenProperties.controlPlaneReaderScope.toString(16) +
        "\n" +
        sasTokenProperties.controlPlaneWriterScope.toString(16) +
        "\n" +
        sasTokenProperties.dataPlaneReaderScope.toString(16) +
        "\n" +
        sasTokenProperties.dataPlaneWriterScope.toString(16) +
        "\n";
    const signedPayload = await (0, hmac_js_1.hmac)(masterKey, Buffer.from(payload).toString("base64"));
    return "type=sas&ver=1.0&sig=" + signedPayload + ";" + Buffer.from(payload).toString("base64");
}
/**
 * @hidden
 */
// TODO: utcMilllisecondsSinceEpoch
function utcsecondsSinceEpoch(date) {
    return Math.round(date.getTime() / 1000);
}
//# sourceMappingURL=SasToken.js.map