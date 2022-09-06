// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isMessagingError, MessagingError, translate } from "@azure/core-amqp";
import { AmqpError } from "rhea-promise";
import { isObjectWithProperties } from "@azure/core-util";

/**
 * Service Bus failure codes.
 */
export type ServiceBusErrorCode =
  // note: This list is intended to loosely follow https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/servicebus/Azure.Messaging.ServiceBus/src/Primitives/ServiceBusFailureReason.cs
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
  | "UnauthorizedAccess";

/**
 * Translation between the MessagingErrorCodes into a ServiceBusCode
 *
 * @internal
 */
export const wellKnownMessageCodesToServiceBusCodes: Map<string, ServiceBusErrorCode> = new Map([
  ["MessagingEntityNotFoundError", "MessagingEntityNotFound"],
  ["MessageLockLostError", "MessageLockLost"],
  ["MessageNotFoundError", "MessageNotFound"],
  ["MessageTooLargeError", "MessageSizeExceeded"],
  ["MessagingEntityAlreadyExistsError", "MessagingEntityAlreadyExists"],
  ["MessagingEntityDisabledError", "MessagingEntityDisabled"],
  ["QuotaExceededError", "QuotaExceeded"],
  ["ServerBusyError", "ServiceBusy"],

  ["OperationTimeoutError", "ServiceTimeout"],
  ["ServiceCommunicationError", "ServiceCommunicationProblem"],
  ["SessionCannotBeLockedError", "SessionCannotBeLocked"],
  ["SessionLockLostError", "SessionLockLost"],
  ["UnauthorizedError", "UnauthorizedAccess"],
]);

/**
 * Errors that occur within Service Bus.
 */
export class ServiceBusError extends MessagingError {
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
  // NOTE: make sure this list and the list above are properly kept in sync.
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
  constructor(messageOrError: string | MessagingError, code?: ServiceBusErrorCode) {
    const message = typeof messageOrError === "string" ? messageOrError : messageOrError.message;
    super(message);

    if (typeof messageOrError === "string") {
      this.code = code ?? "GeneralError";
    } else {
      for (const prop in messageOrError) {
        (this as any)[prop] = (messageOrError as any)[prop];
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

  private static normalizeMessagingCode(oldCode?: string): ServiceBusErrorCode {
    if (oldCode == null || !wellKnownMessageCodesToServiceBusCodes.has(oldCode)) {
      return "GeneralError";
    }

    return wellKnownMessageCodesToServiceBusCodes.get(oldCode)!;
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
 * @param err - An error to check to see if it's of type ServiceBusError
 */
export function isServiceBusError(err: unknown): err is ServiceBusError {
  return isObjectWithProperties(err, ["name"]) && err.name === "ServiceBusError";
}
