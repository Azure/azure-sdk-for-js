// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants, CosmosKeyType, SasTokenPermissionKind } from "../common/index.js";
import { encodeUTF8 } from "./encode.js";
import { hmac } from "./hmac.js";
/**
 * Experimental internal only
 * Generates the payload representing the permission configuration for the sas token.
 */
export async function createAuthorizationSasToken(masterKey, sasTokenProperties) {
    let resourcePrefixPath = "";
    if (typeof sasTokenProperties.databaseName === "string" &&
        sasTokenProperties.databaseName !== "") {
        resourcePrefixPath += `/${Constants.Path.DatabasesPathSegment}/${sasTokenProperties.databaseName}`;
    }
    if (typeof sasTokenProperties.containerName === "string" &&
        sasTokenProperties.containerName !== "") {
        if (sasTokenProperties.databaseName === "") {
            throw new Error(`illegalArgumentException : ${sasTokenProperties.databaseName} \
                          is an invalid database name`);
        }
        resourcePrefixPath += `/${Constants.Path.CollectionsPathSegment}/${sasTokenProperties.containerName}`;
    }
    if (typeof sasTokenProperties.resourceName === "string" &&
        sasTokenProperties.resourceName !== "") {
        if (sasTokenProperties.containerName === "") {
            throw new Error(`illegalArgumentException : ${sasTokenProperties.containerName} \
                          is an invalid container name`);
        }
        switch (sasTokenProperties.resourceKind) {
            case "ITEM":
                resourcePrefixPath += `${Constants.Path.Root}${Constants.Path.DocumentsPathSegment}`;
                break;
            case "STORED_PROCEDURE":
                resourcePrefixPath += `${Constants.Path.Root}${Constants.Path.StoredProceduresPathSegment}`;
                break;
            case "USER_DEFINED_FUNCTION":
                resourcePrefixPath += `${Constants.Path.Root}${Constants.Path.UserDefinedFunctionsPathSegment}`;
                break;
            case "TRIGGER":
                resourcePrefixPath += `${Constants.Path.Root}${Constants.Path.TriggersPathSegment}`;
                break;
            default:
                throw new Error(`illegalArgumentException : ${sasTokenProperties.resourceKind} \
                          is an invalid resource kind`);
                break;
        }
        resourcePrefixPath += `${Constants.Path.Root}${sasTokenProperties.resourceName}${Constants.Path.Root}`;
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
            partitionRanges += `${encodeUTF8(range)},`;
        });
    }
    if (sasTokenProperties.controlPlaneReaderScope === 0) {
        sasTokenProperties.controlPlaneReaderScope += SasTokenPermissionKind.ContainerReadAny;
        sasTokenProperties.controlPlaneWriterScope += SasTokenPermissionKind.ContainerReadAny;
    }
    if (sasTokenProperties.dataPlaneReaderScope === 0 &&
        sasTokenProperties.dataPlaneWriterScope === 0) {
        sasTokenProperties.dataPlaneReaderScope = SasTokenPermissionKind.ContainerFullAccess;
        sasTokenProperties.dataPlaneWriterScope = SasTokenPermissionKind.ContainerFullAccess;
    }
    if (typeof sasTokenProperties.keyType !== "number" ||
        typeof sasTokenProperties.keyType === "undefined") {
        switch (sasTokenProperties.keyType) {
            case CosmosKeyType.PrimaryMaster:
                sasTokenProperties.keyType = 1;
                break;
            case CosmosKeyType.SecondaryMaster:
                sasTokenProperties.keyType = 2;
                break;
            case CosmosKeyType.PrimaryReadOnly:
                sasTokenProperties.keyType = 3;
                break;
            case CosmosKeyType.SecondaryReadOnly:
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
    const signedPayload = await hmac(masterKey, Buffer.from(payload).toString("base64"));
    return "type=sas&ver=1.0&sig=" + signedPayload + ";" + Buffer.from(payload).toString("base64");
}
/**
 * @hidden
 */
// TODO: utcMilllisecondsSinceEpoch
export function utcsecondsSinceEpoch(date) {
    return Math.round(date.getTime() / 1000);
}
//# sourceMappingURL=SasToken.js.map