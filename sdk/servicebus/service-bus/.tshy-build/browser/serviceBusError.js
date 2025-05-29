// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isMessagingError, MessagingError, translate } from "@azure/core-amqp";
import { isObjectWithProperties } from "@azure/core-util";
/**
 * Translation between the MessagingErrorCodes into a ServiceBusCode
 *
 * @internal
 */
export const wellKnownMessageCodesToServiceBusCodes = new Map([
    ["MessagingEntityNotFoundError", "MessagingEntityNotFound"],
    ["MessageLockLostError", "MessageLockLost"],
    ["MessageNotFoundError", "MessageNotFound"],
    ["MessageTooLargeError", "MessageSizeExceeded"],
    ["MessagingEntityAlreadyExistsError", "MessagingEntityAlreadyExists"],
    ["MessagingEntityDisabledError", "MessagingEntityDisabled"],
    ["QuotaExceededError", "QuotaExceeded"],
    ["ServerBusyError", "ServiceBusy"],
    ["OperationTimeoutError", "ServiceTimeout"],
    ["ServiceUnavailableError", "ServiceTimeout"],
    ["ServiceCommunicationError", "ServiceCommunicationProblem"],
    ["SessionCannotBeLockedError", "SessionCannotBeLocked"],
    ["SessionLockLostError", "SessionLockLost"],
    ["UnauthorizedError", "UnauthorizedAccess"],
]);
/**
 * Errors that occur within Service Bus.
 */
export class ServiceBusError extends MessagingError {
    constructor(messageOrError, code) {
        const message = typeof messageOrError === "string" ? messageOrError : messageOrError.message;
        super(message);
        if (typeof messageOrError === "string") {
            this.code = code !== null && code !== void 0 ? code : "GeneralError";
        }
        else {
            for (const prop in messageOrError) {
                this[prop] = messageOrError[prop];
            }
            this.code = ServiceBusError.normalizeMessagingCode(messageOrError.code);
            // For GeneralErrors, prefix the error message with the MessagingError code to provide
            // more context to the user.
            if (this.code === "GeneralError" && messageOrError.code) {
                this.message = `${messageOrError.code}: ${this.message}`;
            }
        }
        this.name = "ServiceBusError";
    }
    static normalizeMessagingCode(oldCode) {
        if (oldCode == null || !wellKnownMessageCodesToServiceBusCodes.has(oldCode)) {
            return "GeneralError";
        }
        return wellKnownMessageCodesToServiceBusCodes.get(oldCode);
    }
}
/**
 * Translates an error into either an Error or a ServiceBusError which provides a `reason` code that
 * can be used by clients to programmatically react to errors.
 *
 * If you are calling `@azure/core-amqp/translate` you should swap to using this function instead since it provides
 * Service Bus specific handling of the error (falling back to default translate behavior otherwise).
 *
 * @internal
 */
export function translateServiceBusError(err) {
    if (isServiceBusError(err)) {
        return err;
    }
    const translatedError = translate(err);
    if (isMessagingError(translatedError)) {
        return new ServiceBusError(translatedError);
    }
    return translatedError;
}
/**
 * Determines if an error is of type `ServiceBusError`
 *
 * @param err - An error to check to see if it's of type ServiceBusError
 */
export function isServiceBusError(err) {
    return isObjectWithProperties(err, ["name"]) && err.name === "ServiceBusError";
}
//# sourceMappingURL=serviceBusError.js.map