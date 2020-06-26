import { AmqpError } from "rhea-promise";
import { MessagingError, translate as amqpCommonTranslate } from "@azure/amqp-common";

/**
 * Translates the AQMP error received at the protocol layer or a generic Error into a MessagingError
 * with Sevice Bus specific rules.
 *
 * @param {AmqpError} err The amqp error that was received.
 * @returns {MessagingError} MessagingError object.
 */
export function translateErrorForServiceBus(err: AmqpError | Error): MessagingError {
  const translatedError = amqpCommonTranslate(err);

  // https://github.com/Azure/azure-sdk-for-js/issues/9575
  if (translatedError.name === "QuotaExceededError") {
    // In ServiceBus this error basically means that we were idle and our connection was closed - it should be perfectly
    // okay to retry on idle connections.
    translatedError.retryable = true;
  }

  return translatedError;
}
