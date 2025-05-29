// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { hmac } from "./hmac.js";
import { ResourceType, Constants } from "../common/index.js";
export async function generateHeaders(masterKey, method, resourceType = ResourceType.none, resourceId = "", date = new Date()) {
    if (masterKey.startsWith("type=sas&")) {
        return {
            [Constants.HttpHeaders.Authorization]: encodeURIComponent(masterKey),
            [Constants.HttpHeaders.XDate]: date.toUTCString(),
        };
    }
    const sig = await signature(masterKey, method, resourceType, resourceId, date);
    return {
        [Constants.HttpHeaders.Authorization]: sig,
        [Constants.HttpHeaders.XDate]: date.toUTCString(),
    };
}
async function signature(masterKey, method, resourceType, resourceId = "", date = new Date()) {
    const type = "master";
    const version = "1.0";
    const text = method.toLowerCase() +
        "\n" +
        resourceType.toLowerCase() +
        "\n" +
        resourceId +
        "\n" +
        date.toUTCString().toLowerCase() +
        "\n" +
        "" +
        "\n";
    const signed = await hmac(masterKey, text);
    return encodeURIComponent("type=" + type + "&ver=" + version + "&sig=" + signed);
}
//# sourceMappingURL=headers.js.map