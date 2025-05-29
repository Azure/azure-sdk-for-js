// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AccountSASPermissions } from "./AccountSASPermissions.js";
import { AccountSASResourceTypes } from "./AccountSASResourceTypes.js";
import { AccountSASServices } from "./AccountSASServices.js";
import { ipRangeToString } from "./SasIPRange.js";
import { SASQueryParameters } from "./SASQueryParameters.js";
import { SERVICE_VERSION } from "./utils/constants.js";
import { truncatedISO8061Date } from "./utils/utils.common.js";
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
export function generateAccountSASQueryParameters(accountSASSignatureValues, sharedKeyCredential) {
    return generateAccountSASQueryParametersInternal(accountSASSignatureValues, sharedKeyCredential)
        .sasQueryParameters;
}
export function generateAccountSASQueryParametersInternal(accountSASSignatureValues, sharedKeyCredential) {
    const version = accountSASSignatureValues.version
        ? accountSASSignatureValues.version
        : SERVICE_VERSION;
    const parsedPermissions = AccountSASPermissions.parse(accountSASSignatureValues.permissions.toString()).toString();
    const parsedServices = AccountSASServices.parse(accountSASSignatureValues.services).toString();
    const parsedResourceTypes = AccountSASResourceTypes.parse(accountSASSignatureValues.resourceTypes).toString();
    let stringToSign;
    if (version >= "2020-12-06") {
        stringToSign = [
            sharedKeyCredential.accountName,
            parsedPermissions,
            parsedServices,
            parsedResourceTypes,
            accountSASSignatureValues.startsOn
                ? truncatedISO8061Date(accountSASSignatureValues.startsOn, false)
                : "",
            truncatedISO8061Date(accountSASSignatureValues.expiresOn, false),
            accountSASSignatureValues.ipRange ? ipRangeToString(accountSASSignatureValues.ipRange) : "",
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
                ? truncatedISO8061Date(accountSASSignatureValues.startsOn, false)
                : "",
            truncatedISO8061Date(accountSASSignatureValues.expiresOn, false),
            accountSASSignatureValues.ipRange ? ipRangeToString(accountSASSignatureValues.ipRange) : "",
            accountSASSignatureValues.protocol ? accountSASSignatureValues.protocol : "",
            version,
            "", // Account SAS requires an additional newline character
        ].join("\n");
    }
    const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);
    return {
        sasQueryParameters: new SASQueryParameters(version, signature, parsedPermissions, parsedServices, parsedResourceTypes, accountSASSignatureValues.protocol, accountSASSignatureValues.startsOn, accountSASSignatureValues.expiresOn, accountSASSignatureValues.ipRange),
        stringToSign: stringToSign,
    };
}
//# sourceMappingURL=AccountSASSignatureValues.js.map