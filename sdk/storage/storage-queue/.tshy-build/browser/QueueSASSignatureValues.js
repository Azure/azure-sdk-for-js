// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { QueueSASPermissions } from "./QueueSASPermissions.js";
import { ipRangeToString } from "./SasIPRange.js";
import { SASQueryParameters } from "./SASQueryParameters.js";
import { SERVICE_VERSION } from "./utils/constants.js";
import { truncatedISO8061Date } from "./utils/utils.common.js";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startsOn and identifier.
 *
 * WARNING: When identifier is not provided, permissions and expiresOn are required.
 * You MUST assign value to identifier or expiresOn & permissions manually if you initial with
 * this constructor.
 *
 * @param queueSASSignatureValues -
 * @param sharedKeyCredential -
 */
export function generateQueueSASQueryParameters(queueSASSignatureValues, sharedKeyCredential) {
    return generateQueueSASQueryParametersInternal(queueSASSignatureValues, sharedKeyCredential)
        .sasQueryParameters;
}
export function generateQueueSASQueryParametersInternal(queueSASSignatureValues, sharedKeyCredential) {
    if (!queueSASSignatureValues.identifier &&
        !(queueSASSignatureValues.permissions && queueSASSignatureValues.expiresOn)) {
        throw new RangeError("Must provide 'permissions' and 'expiresOn' for Queue SAS generation when 'identifier' is not provided.");
    }
    const version = queueSASSignatureValues.version
        ? queueSASSignatureValues.version
        : SERVICE_VERSION;
    let verifiedPermissions;
    // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
    if (queueSASSignatureValues.permissions) {
        verifiedPermissions = QueueSASPermissions.parse(queueSASSignatureValues.permissions.toString()).toString();
    }
    // Signature is generated on the un-url-encoded values.
    const stringToSign = [
        verifiedPermissions ? verifiedPermissions : "",
        queueSASSignatureValues.startsOn
            ? truncatedISO8061Date(queueSASSignatureValues.startsOn, false)
            : "",
        queueSASSignatureValues.expiresOn
            ? truncatedISO8061Date(queueSASSignatureValues.expiresOn, false)
            : "",
        getCanonicalName(sharedKeyCredential.accountName, queueSASSignatureValues.queueName),
        queueSASSignatureValues.identifier,
        queueSASSignatureValues.ipRange ? ipRangeToString(queueSASSignatureValues.ipRange) : "",
        queueSASSignatureValues.protocol ? queueSASSignatureValues.protocol : "",
        version,
    ].join("\n");
    const signature = sharedKeyCredential.computeHMACSHA256(stringToSign);
    return {
        sasQueryParameters: new SASQueryParameters(version, signature, verifiedPermissions, undefined, undefined, queueSASSignatureValues.protocol, queueSASSignatureValues.startsOn, queueSASSignatureValues.expiresOn, queueSASSignatureValues.ipRange, queueSASSignatureValues.identifier),
        stringToSign: stringToSign,
    };
}
function getCanonicalName(accountName, queueName) {
    // Queue: "/queue/account/queueName"
    return `/queue/${accountName}/${queueName}`;
}
//# sourceMappingURL=QueueSASSignatureValues.js.map