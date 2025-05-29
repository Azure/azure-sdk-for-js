"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccountSASQueryParameters = generateAccountSASQueryParameters;
exports.generateAccountSASQueryParametersInternal = generateAccountSASQueryParametersInternal;
const AccountSASPermissions_js_1 = require("./AccountSASPermissions.js");
const AccountSASResourceTypes_js_1 = require("./AccountSASResourceTypes.js");
const AccountSASServices_js_1 = require("./AccountSASServices.js");
const SasIPRange_js_1 = require("./SasIPRange.js");
const SASQueryParameters_js_1 = require("./SASQueryParameters.js");
const constants_js_1 = require("./utils/constants.js");
const utils_common_js_1 = require("./utils/utils.common.js");
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Generates a {@link SASQueryParameters} object which contains all SAS query parameters needed to make an actual
 * REST request.
 *
 * @see https://learn.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 *
 * @param accountSASSignatureValues - SAS Signature values of the account
 * @param sharedKeyCredential - Shared key credential.
 */
function generateAccountSASQueryParameters(accountSASSignatureValues, sharedKeyCredential) {
    return generateAccountSASQueryParametersInternal(accountSASSignatureValues, sharedKeyCredential)
        .sasQueryParameters;
}
function generateAccountSASQueryParametersInternal(accountSASSignatureValues, sharedKeyCredential) {
    const version = accountSASSignatureValues.version
        ? accountSASSignatureValues.version
        : constants_js_1.SERVICE_VERSION;
    const parsedPermissions = AccountSASPermissions_js_1.AccountSASPermissions.parse(accountSASSignatureValues.permissions.toString()).toString();
    const parsedServices = AccountSASServices_js_1.AccountSASServices.parse(accountSASSignatureValues.services).toString();
    const parsedResourceTypes = AccountSASResourceTypes_js_1.AccountSASResourceTypes.parse(accountSASSignatureValues.resourceTypes).toString();
    let stringToSign;
    if (version >= "2020-12-06") {
        stringToSign = [
            sharedKeyCredential.accountName,
            parsedPermissions,
            parsedServices,
            parsedResourceTypes,
            accountSASSignatureValues.startsOn
                ? (0, utils_common_js_1.truncatedISO8061Date)(accountSASSignatureValues.startsOn, false)
                : "",
            (0, utils_common_js_1.truncatedISO8061Date)(accountSASSignatureValues.expiresOn, false),
            accountSASSignatureValues.ipRange ? (0, SasIPRange_js_1.ipRangeToString)(accountSASSignatureValues.ipRange) : "",
            accountSASSignatureValues.protocol ? accountSASSignatureValues.protocol : "",
            version,
            "", // Reserved for encryption scope
            "", // Account SAS requires an additional newline character
        ].join("\n");
    }
    else {
        stringToSign = [
            sharedKeyCredential.accountName,
            parsedPermissions,
            parsedServices,
            parsedResourceTypes,
            accountSASSignatureValues.startsOn
                ? (0, utils_common_js_1.truncatedISO8061Date)(accountSASSignatureValues.startsOn, false)
                : "",
            (0, utils_common_js_1.truncatedISO8061Date)(accountSASSignatureValues.expiresOn, false),
            accountSASSignatureValues.ipRange ? (0, SasIPRange_js_1.ipRangeToString)(accountSASSignatureValues.ipRange) : "",
            accountSASSignatureValues.protocol ? accountSASSignatureValues.protocol : "",
            version,
            "", // Account SAS requires an additional newline character
        ].join("\n");
    }
    const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);
    return {
        sasQueryParameters: new SASQueryParameters_js_1.SASQueryParameters(version, signature, parsedPermissions, parsedServices, parsedResourceTypes, accountSASSignatureValues.protocol, accountSASSignatureValues.startsOn, accountSASSignatureValues.expiresOn, accountSASSignatureValues.ipRange),
        stringToSign: stringToSign,
    };
}
//# sourceMappingURL=AccountSASSignatureValues.js.map