import { MessagingError } from "@azure/core-amqp";
import type { AmqpError } from "rhea-promise";
/**
 * Service Bus failure codes.
 */
export type ServiceBusErrorCode = 
/**
 * The exception was the result of a general error within the client library.
 */
"GeneralError"
/**
 * A Service Bus resource cannot be found by the Service Bus service.
 */
 | "MessagingEntityNotFound"
/**
 * The lock on the message is lost. Callers should attempt to receive and process the message again.
 */
 | "MessageLockLost"
/**
 * The requested message was not found.
 */
 | "MessageNotFound"
/**
 * A message is larger than the maximum size allowed for its transport.
 */
 | "MessageSizeExceeded"
/**
 * An entity with the same name exists under the same namespace.
 */
 | "MessagingEntityAlreadyExists"
/**
 * The Messaging Entity is disabled. Enable the entity again using Portal.
 */
 | "MessagingEntityDisabled"
/**
 * The quota applied to an Service Bus resource has been exceeded while interacting with the Azure Service Bus service.
 */
 | "QuotaExceeded"
/**
 * The Azure Service Bus service reports that it is busy in response to a client request to perform an operation.
 */
 | "ServiceBusy"
/**
 * An operation or other request timed out while interacting with the Azure Service Bus service.
 */
 | "ServiceTimeout"
/**
 * There was a general communications error encountered when interacting with the Azure Service Bus service.
 */
 | "ServiceCommunicationProblem"
/**
 * The requested session cannot be locked.
 */
 | "SessionCannotBeLocked"
/**
 * The lock on the session has expired. Callers should request the session again.
 */
 | "SessionLockLost"
/**
 * The user doesn't have access to the entity.
 */
 | "UnauthorizedAccess";
/**
 * Translation between the MessagingErrorCodes into a ServiceBusCode
 *
 * @internal
 */
export declare const wellKnownMessageCodesToServiceBusCodes: Map<string, ServiceBusErrorCode>;
/**
 * Errors that occur within Service Bus.
 */
export declare class ServiceBusError extends MessagingError {
    /**
     * The reason for the failure.
     *
     * - **GeneralError**: The exception was the result of a general error within the client library.
     * - **MessagingEntityNotFound**: A Service Bus resource cannot be found by the Service Bus service.
     * - **MessageLockLost**: The lock on the message is lost. Callers should attempt to receive and process the message again.
     * - **MessageNotFound**: The requested message was not found.
     * - **MessageSizeExceeded**: A message is larger than the maximum size allowed for its transport.
     * - **MessagingEntityAlreadyExists**: An entity with the same name exists under the same namespace.
     * - **MessagingEntityDisabled**: The Messaging Entity is disabled. Enable the entity again using Portal.
     * - **QuotaExceeded**: The quota applied to an Service Bus resource has been exceeded while interacting with the Azure Service Bus service.
     * - **ServiceBusy**: The Azure Service Bus service reports that it is busy in response to a client request to perform an operation.
     * - **ServiceTimeout**: An operation or other request timed out while interacting with the Azure Service Bus service.
     * - **ServiceCommunicationProblem**: There was a general communications error encountered when interacting with the Azure Service Bus service.
     * - **SessionCannotBeLocked**: The requested session cannot be locked.
     * - **SessionLockLost**: The lock on the session has expired. Callers should request the session again.
     * - **UnauthorizedAccess"**: The user doesn't have access to the entity.
     */
    code: ServiceBusErrorCode;
    /**
     * @param message - The error message that provides more information about the error.
     * @param code - The reason for the failure.
     */
    constructor(message: string, code: ServiceBusErrorCode);
    /**
     * @param messagingError - An error whose properties will be copied to the ServiceBusError.
     */
    constructor(messagingError: MessagingError);
    private static normalizeMessagingCode;
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
export declare function translateServiceBusError(err: AmqpError | Error): ServiceBusError | Error;
/**
 * Determines if an error is of type `ServiceBusError`
 *
 * @param err - An error to check to see if it's of type ServiceBusError
 */
export declare function isServiceBusError(err: unknown): err is ServiceBusError;
//# sourceMappingURL=serviceBusError.d.ts.map