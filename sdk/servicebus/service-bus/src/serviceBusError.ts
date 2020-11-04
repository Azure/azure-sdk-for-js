import { isMessagingError, MessageErrorCodes, MessagingError, translate } from "@azure/core-amqp";
import { AmqpError } from "rhea-promise";

/**
 * Service Bus failure reasons.
 */
export type ServiceBusErrorReason =
  // note: This list is intended to mirror https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/servicebus/Azure.Messaging.ServiceBus/src/Primitives/ServiceBusFailureReason.cs
  /**
   * The exception was the result of a general error within the client library.
   */
  | "GeneralError"
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
  | "Unauthorized";

/**
 * Translation between the MessageErrorCodes into a ServiceBusReason
 *
 * @internal
 * @ignore
 */
export const wellKnownMessageCodesToServiceBusReasons: Map<
  MessageErrorCodes,
  ServiceBusErrorReason
> = new Map([
  ["MessagingEntityNotFoundError", "MessagingEntityNotFound"],
  ["MessageLockLostError", "MessageLockLost"],
  ["MessageNotFoundError", "MessageNotFound"],
  ["MessageTooLargeError", "MessageSizeExceeded"],
  ["MessagingEntityAlreadyExistsError", "MessagingEntityAlreadyExists"],
  ["MessagingEntityDisabledError", "MessagingEntityDisabled"],
  ["QuotaExceededError", "QuotaExceeded"],
  ["ServerBusyError", "ServiceBusy"],

  // not sure about these two.
  ["MessageWaitTimeout", "ServiceTimeout"],
  ["OperationTimeoutError", "ServiceTimeout"],
  ["ServiceCommunicationError", "ServiceCommunicationProblem"],
  ["SessionCannotBeLockedError", "SessionCannotBeLocked"],
  ["SessionLockLostError", "SessionLockLost"],
  ["UnauthorizedError", "Unauthorized"]
]);

/**
 * Errors that occur within Service Bus
 */
export class ServiceBusError extends MessagingError {
  /**
   * The reason for the failure.
   *
   * **GeneralError**: The exception was the result of a general error within the client library.
   * **MessagingEntityNotFound**: A Service Bus resource cannot be found by the Service Bus service.
   * **MessageLockLost**: The lock on the message is lost. Callers should attempt to receive and process the message again.
   * **MessageNotFound**: The requested message was not found.
   * **MessageSizeExceeded**: A message is larger than the maximum size allowed for its transport.
   * **MessagingEntityAlreadyExists**: An entity with the same name exists under the same namespace.
   * **MessagingEntityDisabled**: The Messaging Entity is disabled. Enable the entity again using Portal.
   * **QuotaExceeded**: The quota applied to an Service Bus resource has been exceeded while interacting with the Azure Service Bus service.
   * **ServiceBusy**: The Azure Service Bus service reports that it is busy in response to a client request to perform an operation.
   * **ServiceTimeout**: An operation or other request timed out while interacting with the Azure Service Bus service.
   * **ServiceCommunicationProblem**: There was a general communications error encountered when interacting with the Azure Service Bus service.
   * **SessionCannotBeLocked**: The requested session cannot be locked.
   * **SessionLockLost**: The lock on the session has expired. Callers should request the session again.
   * **Unauthorized"**: The user doesn't have access to the entity.
   */
  // NOTE: make sure this list and the list above are properly kept in sync.
  reason: ServiceBusErrorReason;

  /**
   * @param {string} message The error message that provides more information about the error.
   * @param messagingError An error whose properties will be copied to the MessagingError if the
   * property matches one found on the Node.js `SystemError`.
   */
  constructor(messagingError: MessagingError) {
    super(messagingError.message);

    for (const prop in messagingError) {
      (this as any)[prop] = (messagingError as any)[prop];
    }

    this.name = "ServiceBusError";
    this.reason = ServiceBusError.convertMessagingCodeToReason(this.code);
  }

  private static convertMessagingCodeToReason(oldCode?: string): ServiceBusErrorReason {
    const code = oldCode as MessageErrorCodes | undefined;

    if (code == null || !wellKnownMessageCodesToServiceBusReasons.has(code)) {
      return "GeneralError";
    }

    return wellKnownMessageCodesToServiceBusReasons.get(code)!;
  }
}

/**
 * Translates an error into either an Error or a ServiceBusError which provides a `reason` code that
 * can be used by clients to programatically react to errors.
 *
 * If you are calling `@azure/core-amqp/translate` you should swap to using this function instead since it provides
 * Service Bus specific handling of the error (falling back to default translate behavior otherwise).
 *
 * @internal
 * @ignore
 */
export function translateServiceBusError(err: AmqpError | Error): ServiceBusError | Error {
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
 * @param err An error to check to see if it's of type ServiceBusError
 */
export function isServiceBusError(
  err: Error | AmqpError | ServiceBusError
): err is ServiceBusError {
  return (err as Error | ServiceBusError).name === "ServiceBusError";
}
