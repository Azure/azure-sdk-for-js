// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getDateOrUndefined, getString, getStringOrUndefined, getTagsOrUndefined, isDefined, } from "../utils/utils.js";
import { parseXML, stringifyXML } from "@azure/core-xml";
import { RestError } from "@azure/core-rest-pipeline";
import { serializeToAtomXmlRequest } from "../utils/xmlUtils.js";
export const registrationDescriptionParser = {
    /**
     * @internal
     * Creates a registration type from the incoming entry.
     */
    async parseRegistrationEntry(bodyText) {
        const xml = await parseXML(bodyText, { includeRoot: true });
        delete xml.entry.content["$"];
        const keyName = Object.keys(xml.entry.content)[0];
        const content = xml.entry.content[keyName];
        const methodName = `create${keyName}`;
        const method = this[methodName];
        if (!methodName) {
            throw new RestError(`${keyName} is not a supported registration type`, { statusCode: 500 });
        }
        return method.call(this, content);
    },
    /**
     * @internal
     * Creates a list of registrations from an incoming ATOM XML Feed.
     */
    async parseRegistrationFeed(bodyText) {
        const xml = await parseXML(bodyText, { includeRoot: true });
        const results = [];
        if (!isDefined(xml.feed.entry)) {
            return results;
        }
        const entries = Array.isArray(xml.feed.entry) ? xml.feed.entry : [xml.feed.entry];
        for (const entry of entries) {
            delete entry.content["$"];
            const keyName = Object.keys(entry.content)[0];
            const methodName = `create${keyName}`;
            const content = entry.content[keyName];
            const method = this[methodName];
            if (!methodName) {
                throw new RestError(`${keyName} is not a supported registration type`, { statusCode: 500 });
            }
            results.push(method.call(this, content));
        }
        return results;
    },
    /**
     * @internal
     * Creates an ADM registration description from incoming XML property bag.
     */
    createAdmRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ admRegistrationId: getString(rawRegistrationDescription["AdmRegistrationId"], "admRegistrationId").trim() }, createRegistrationDescription(rawRegistrationDescription)), { kind: "Adm" });
    },
    /**
     * @internal
     * Creates an ADM template registration description from incoming XML property bag.
     */
    createAdmTemplateRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign(Object.assign({}, this.createAdmRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { kind: "AdmTemplate" });
    },
    /**
     * @internal
     * Creates an Apple registration description from incoming XML property bag.
     */
    createAppleRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ deviceToken: getString(rawRegistrationDescription["DeviceToken"], "deviceToken").trim() }, createRegistrationDescription(rawRegistrationDescription)), { kind: "Apple" });
    },
    /**
     * @internal
     * Creates an Apple template registration description from incoming XML property bag.
     */
    createAppleTemplateRegistrationDescription(rawRegistrationDescription) {
        var _a, _b;
        return Object.assign(Object.assign(Object.assign({ priority: (_a = getStringOrUndefined(rawRegistrationDescription["Priority"])) === null || _a === void 0 ? void 0 : _a.trim(), apnsHeaders: getHeadersOrUndefined((_b = rawRegistrationDescription["ApnsHeaders"]) === null || _b === void 0 ? void 0 : _b["ApnsHeader"]) }, this.createAppleRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { kind: "AppleTemplate" });
    },
    /**
     * @internal
     * Creates a Baidu registration description from incoming XML property bag.
     */
    createBaiduRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ baiduChannelId: getString(rawRegistrationDescription["BaiduChannelId"], "baiduChannelId").trim(), baiduUserId: getString(rawRegistrationDescription["BaiduUserId"], "baiduUserId").trim() }, createRegistrationDescription(rawRegistrationDescription)), { kind: "Baidu" });
    },
    /**
     * @internal
     * Creates a Baidu template registration description from incoming XML property bag.
     */
    createBaiduTemplateRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign(Object.assign({}, this.createBaiduRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { kind: "BaiduTemplate" });
    },
    /**
     * @internal
     * Creates a Browser registration description from incoming XML property bag.
     */
    createBrowserRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ endpoint: getString(rawRegistrationDescription["Endpoint"], "endpoint").trim(), p256dh: getString(rawRegistrationDescription["P256DH"], "p256dh").trim(), auth: getString(rawRegistrationDescription["Auth"], "auth").trim() }, createRegistrationDescription(rawRegistrationDescription)), { kind: "Browser" });
    },
    /**
     * @internal
     * Creates a Browser template registration description from incoming XML property bag.
     */
    createBrowserTemplateRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign(Object.assign({}, this.createBrowserRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { kind: "BrowserTemplate" });
    },
    /**
     * @internal
     * Creates an GCM registration description from incoming XML property bag.
     */
    createFcmV1RegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ fcmV1RegistrationId: getString(rawRegistrationDescription["FcmV1RegistrationId"], "fcmV1RegistrationId").trim() }, createRegistrationDescription(rawRegistrationDescription)), { kind: "FcmV1" });
    },
    /**
     * @internal
     * Creates an FCM template registration description from incoming XML property bag.
     */
    createFcmV1TemplateRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign(Object.assign({}, this.createFcmV1RegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { kind: "FcmV1Template" });
    },
    /**
     * @internal
     * Creates an GCM registration description from incoming XML property bag.
     */
    createGcmRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ gcmRegistrationId: getString(rawRegistrationDescription["GcmRegistrationId"], "gcmRegistrationId").trim() }, createRegistrationDescription(rawRegistrationDescription)), { kind: "Gcm" });
    },
    /**
     * @internal
     * Creates an FCM template registration description from incoming XML property bag.
     */
    createGcmTemplateRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign(Object.assign({}, this.createGcmRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { kind: "GcmTemplate" });
    },
    /**
     * @internal
     * Creates a Windows Phone registration description from incoming XML property bag.
     */
    createMpnsRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ channelUri: getString(rawRegistrationDescription["ChannelUri"], "channelUri").trim() }, createRegistrationDescription(rawRegistrationDescription)), { kind: "Mpns" });
    },
    /**
     * @internal
     * Creates a Windows Phone template registration description from incoming XML property bag.
     */
    createMpnsTemplateRegistrationDescription(rawRegistrationDescription) {
        var _a;
        return Object.assign(Object.assign(Object.assign({ mpnsHeaders: getHeadersOrUndefined((_a = rawRegistrationDescription["MpnsHeaders"]) === null || _a === void 0 ? void 0 : _a["MpnsHeader"]) }, this.createWindowsRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { kind: "MpnsTemplate" });
    },
    /**
     * @internal
     * Creates a Xiaomi registration description from incoming XML property bag.
     */
    createXiaomiRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ xiaomiRegistrationId: getString(rawRegistrationDescription["XiaomiRegistrationId"], "xiaomiRegistrationId").trim() }, createRegistrationDescription(rawRegistrationDescription)), { kind: "Xiaomi" });
    },
    /**
     * @internal
     * Creates a Xiaomi template registration description from incoming XML property bag.
     */
    createXiaomiTemplateRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign(Object.assign({}, this.createXiaomiRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { kind: "XiaomiTemplate" });
    },
    /**
     * @internal
     * Creates a Windows registration description from incoming XML property bag.
     */
    createWindowsRegistrationDescription(rawRegistrationDescription) {
        return Object.assign(Object.assign({ channelUri: getString(rawRegistrationDescription["ChannelUri"], "channelUri").trim() }, createRegistrationDescription(rawRegistrationDescription)), { kind: "Windows" });
    },
    /**
     * @internal
     * Creates a Windows template registration description from incoming XML property bag.
     */
    createWindowsTemplateRegistrationDescription(rawRegistrationDescription) {
        var _a;
        return Object.assign(Object.assign(Object.assign({ wnsHeaders: getHeadersOrUndefined((_a = rawRegistrationDescription["WnsHeaders"]) === null || _a === void 0 ? void 0 : _a["WnsHeader"]) }, this.createWindowsRegistrationDescription(rawRegistrationDescription)), createTemplateRegistrationDescription(rawRegistrationDescription)), { kind: "WindowsTemplate" });
    },
};
function getHeadersOrUndefined(value) {
    if (!isDefined(value)) {
        return undefined;
    }
    const headerObj = {};
    for (const { Header, Value } of value) {
        headerObj[Header] = Value;
    }
    return headerObj;
}
function createRegistrationDescription(rawRegistrationDescription) {
    var _a, _b, _c;
    let pushVariables;
    const unparsed = (_a = getStringOrUndefined(rawRegistrationDescription["PushVariables"])) === null || _a === void 0 ? void 0 : _a.trim();
    if (unparsed) {
        pushVariables = JSON.parse(unparsed);
    }
    return {
        registrationId: (_b = getStringOrUndefined(rawRegistrationDescription["RegistrationId"])) === null || _b === void 0 ? void 0 : _b.trim(),
        expirationTime: getDateOrUndefined(rawRegistrationDescription["ExpirationTime"]),
        etag: (_c = getStringOrUndefined(rawRegistrationDescription["ETag"])) === null || _c === void 0 ? void 0 : _c.trim(),
        tags: getTagsOrUndefined(rawRegistrationDescription["Tags"]),
        pushVariables: pushVariables,
    };
}
function createTemplateRegistrationDescription(rawRegistrationDescription) {
    var _a;
    return Object.assign({ bodyTemplate: getString(rawRegistrationDescription["BodyTemplate"], "bodyTemplate").trim(), templateName: (_a = getStringOrUndefined(rawRegistrationDescription["TemplateName"])) === null || _a === void 0 ? void 0 : _a.trim() }, createRegistrationDescription(rawRegistrationDescription));
}
/**
 * Represents a RegistrationDescription serializer.
 */
export const registrationDescriptionSerializer = {
    serializeRegistrationDescription(description) {
        const rootName = `${description.kind}RegistrationDescription`;
        const methodName = `serialize${rootName}`;
        const method = this[methodName].bind(this);
        if (!isDefined(method)) {
            throw new RestError(`Undefined platform ${description.kind}`, { statusCode: 400 });
        }
        const registration = method(description);
        const requestObject = serializeToAtomXmlRequest(rootName, registration);
        return stringifyXML(requestObject, { rootName: "entry" });
    },
    /**
     * @internal
     * Serializes an existing ADM registration description to an object for serialization.
     */
    serializeAdmRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { AdmRegistrationId: getString(description.admRegistrationId, "admRegistrationId").trim() });
    },
    /**
     * @internal
     * Serializes an existing ADM template registration description to an object for serialization.
     */
    serializeAdmTemplateRegistrationDescription(description) {
        return Object.assign(Object.assign({}, this.serializeAdmRegistrationDescription(description)), serializeTemplateRegistrationDescription(description));
    },
    /**
     * @internal
     * Serializes an existing Apple registration description to an object for serialization.
     */
    serializeAppleRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { DeviceToken: getString(description.deviceToken, "deviceToken").trim() });
    },
    /**
     * @internal
     * Serializes an existing Apple template registration description to an object for serialization.
     */
    serializeAppleTemplateRegistrationDescription(description) {
        var _a;
        let apnsHeaders;
        if (description.apnsHeaders) {
            apnsHeaders = {
                ApnsHeader: [],
            };
            for (const header of Object.keys(description.apnsHeaders)) {
                apnsHeaders["ApnsHeader"].push({
                    Header: header.trim(),
                    Value: description.apnsHeaders[header].trim(),
                });
            }
        }
        return Object.assign(Object.assign(Object.assign({}, this.serializeAppleRegistrationDescription(description)), serializeTemplateRegistrationDescription(description)), { Expiry: (_a = getStringOrUndefined(description.expiry)) === null || _a === void 0 ? void 0 : _a.trim(), ApnsHeaders: apnsHeaders });
    },
    /**
     * @internal
     * Serializes an existing Baidu registration description to an object for serialization.
     */
    serializeBaiduRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { BaiduChannelId: getString(description.baiduChannelId, "baiduChannelId").trim(), BaiduUserId: getString(description.baiduUserId, "baiduUserId").trim() });
    },
    /**
     * @internal
     * Serializes an existing Baidu template registration description to an object for serialization.
     */
    serializeBaiduTemplateRegistrationDescription(description) {
        return Object.assign(Object.assign({}, this.serializeBaiduRegistrationDescription(description)), serializeTemplateRegistrationDescription(description));
    },
    /**
     * @internal
     * Serializes an existing Browser registration description to an object for serialization.
     */
    serializeBrowserRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { Endpoint: description.endpoint, P256DH: description.p256dh, Auth: description.auth });
    },
    /**
     * @internal
     * Serializes an existing Browser template registration description to an object for serialization.
     */
    serializeBrowserTemplateRegistrationDescription(description) {
        return Object.assign(Object.assign({}, this.serializeBrowserRegistrationDescription(description)), serializeTemplateRegistrationDescription(description));
    },
    /**
     * @internal
     * Serializes an existing FCM V1 registration description to an object for serialization.
     */
    serializeFcmV1RegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { FcmV1RegistrationId: getString(description.fcmV1RegistrationId, "fcmRegistrationId").trim() });
    },
    /**
     * @internal
     * Serializes an existing FCM V1 template registration description to an object for serialization.
     */
    serializeFcmV1TemplateRegistrationDescription(description) {
        return Object.assign(Object.assign({}, this.serializeFcmV1RegistrationDescription(description)), serializeTemplateRegistrationDescription(description));
    },
    /**
     * @internal
     * Serializes an existing GCM registration description to an object for serialization.
     */
    serializeGcmRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { GcmRegistrationId: getString(description.gcmRegistrationId, "gcmRegistrationId").trim() });
    },
    /**
     * @internal
     * Serializes an existing GCM template registration description to an object for serialization.
     */
    serializeGcmTemplateRegistrationDescription(description) {
        return Object.assign(Object.assign({}, this.serializeGcmRegistrationDescription(description)), serializeTemplateRegistrationDescription(description));
    },
    /**
     * @internal
     * @deprecated Windows Phone is no longer supported.
     * Serializes an existing MPNS registration description to an object for serialization.
     */
    serializeMpnsRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { ChannelUri: description.channelUri });
    },
    /**
     * @internal
     * @deprecated Windows Phone is no longer supported.
     * Serializes an existing MPNS template registration description to an object for serialization.
     */
    serializeMpnsTemplateRegistrationDescription(description) {
        let mpnsHeaders;
        if (description.mpnsHeaders) {
            mpnsHeaders = {
                MpnsHeader: [],
            };
            for (const header of Object.keys(description.mpnsHeaders)) {
                mpnsHeaders["MpnsHeader"].push({
                    Header: header.trim(),
                    Value: description.mpnsHeaders[header].trim(),
                });
            }
        }
        return Object.assign(Object.assign(Object.assign({}, this.serializeMpnsRegistrationDescription(description)), serializeTemplateRegistrationDescription(description)), { MpnsHeaders: mpnsHeaders });
    },
    /**
     * @internal
     * Serializes an existing Xiaomi registration description to an object for serialization.
     */
    serializeXiaomiRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { XiaomiRegistrationId: getString(description.xiaomiRegistrationId, "xiaomiRegistrationId").trim() });
    },
    /**
     * @internal
     * Serializes an existing Xiaomi template registration description to an object for serialization.
     */
    serializeXiaomiTemplateRegistrationDescription(description) {
        return Object.assign(Object.assign({}, this.serializeXiaomiRegistrationDescription(description)), serializeTemplateRegistrationDescription(description));
    },
    /**
     * @internal
     * Serializes an existing Windows registration description to an object for serialization.
     */
    serializeWindowsRegistrationDescription(description) {
        return Object.assign(Object.assign({}, serializeRegistrationDescription(description)), { ChannelUri: description.channelUri });
    },
    /**
     * @internal
     * Serializes an existing Windows template registration description to an object for serialization.
     */
    serializeWindowsTemplateRegistrationDescription(description) {
        let wnsHeaders;
        if (description.wnsHeaders) {
            wnsHeaders = {
                WnsHeader: [],
            };
            for (const header of Object.keys(description.wnsHeaders)) {
                wnsHeaders["WnsHeader"].push({
                    Header: header.trim(),
                    Value: description.wnsHeaders[header].trim(),
                });
            }
        }
        return Object.assign(Object.assign(Object.assign({}, this.serializeWindowsRegistrationDescription(description)), serializeTemplateRegistrationDescription(description)), { WnsHeaders: wnsHeaders });
    },
};
function serializeRegistrationDescription(description) {
    let tags;
    if (description.tags) {
        tags = description.tags.join(",");
    }
    let pushVariables;
    if (description.pushVariables) {
        pushVariables = JSON.stringify(description.pushVariables);
    }
    return {
        RegistrationId: getStringOrUndefined(description.registrationId),
        Tags: tags,
        PushVariables: pushVariables,
    };
}
function serializeTemplateRegistrationDescription(description) {
    var _a;
    return {
        BodyTemplate: { __cdata: description.bodyTemplate },
        TemplateName: (_a = getStringOrUndefined(description.templateName)) === null || _a === void 0 ? void 0 : _a.trim(),
    };
}
//# sourceMappingURL=registrationSerializer.js.map