import type { ConnectionContext } from "../connectionContext.js";
import type { ReceiveMode } from "../models.js";
import type { ServiceBusReceivedMessage } from "../serviceBusMessage.js";
/**
 * Error message to use when EntityPath in connection string does not match the
 * queue or topic name passed to the methods in the ServiceBusClient that create
 * senders and receivers.
 *
 * @internal
 */
export declare const entityPathMisMatchError = "The queue or topic name provided does not match the EntityPath in the connection string passed to the ServiceBusClient constructor.";
/**
 * Error message for when maxMessageCount provided is invalid.
 *
 * @internal
 */
export declare const InvalidMaxMessageCountError = "'maxMessageCount' must be a number greater than 0.";
/**
 * @internal
 * Logs and throws Error if the current AMQP connection is closed.
 * @param context - The ConnectionContext associated with the current AMQP connection.
 */
export declare function throwErrorIfConnectionClosed(context: ConnectionContext): void;
/**
 * @internal
 * Gets the error message when a sender is used when its already closed
 * @param entityPath - Value of the `entityPath` property on the client which denotes its name
 */
export declare function getSenderClosedErrorMsg(entityPath: string): string;
/**
 * @internal
 * Gets the error message when a receiver is used when its already closed
 * @param entityPath - Value of the `entityPath` property on the client which denotes its name
 * @param sessionId - If using session receiver, then the id of the session
 */
export declare function getReceiverClosedErrorMsg(entityPath: string, sessionId?: string): string;
/**
 * @internal
 * @param entityPath - Value of the `entityPath` property on the client which denotes its name
 * @param sessionId - If using session receiver, then the id of the session
 */
export declare function getAlreadyReceivingErrorMsg(entityPath: string, sessionId?: string): string;
/**
 * @internal
 * Logs and Throws TypeError if given parameter is undefined or null
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to check
 * @param parameterValue - Value of the parameter to check
 */
export declare function throwTypeErrorIfParameterMissing(connectionId: string, parameterName: string, parameterValue: unknown): void;
/**
 * @internal
 * Logs and Throws TypeError if given parameter is not an instance of expected type
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to type check
 * @param parameterValue - Value of the parameter to type check
 * @param constructor - Constructor function of the expected parameter type
 */
export declare function throwTypeErrorIfNotInstanceOfParameterType(connectionId: string, parameterName: string, parameterValue: unknown, constructor: Function): void;
/**
 * @internal
 * Logs and Throws TypeError if given parameter is not of expected type
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to type check
 * @param parameterValue - Value of the parameter to type check
 * @param expectedType - Expected type of the parameter
 */
export declare function throwTypeErrorIfParameterTypeMismatch(connectionId: string, parameterName: string, parameterValue: unknown, expectedType: string): void;
/**
 * @internal
 * Logs and Throws TypeError if given parameter is not of type `Long` or an array of type `Long`
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to type check
 * @param parameterValue - Value of the parameter to type check
 */
export declare function throwTypeErrorIfParameterNotLong(connectionId: string, parameterName: string, parameterValue: unknown): TypeError | undefined;
/**
 * @internal
 * Logs and Throws TypeError if given parameter is not an array of type `Long`
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to type check
 * @param parameterValue - Value of the parameter to type check
 */
export declare function throwTypeErrorIfParameterNotLongArray(connectionId: string, parameterName: string, parameterValue: any[]): TypeError | undefined;
/**
 * @internal
 * Logs and Throws TypeError if given parameter is an empty string
 * @param connectionId - Id of the underlying AMQP connection used for logging
 * @param parameterName - Name of the parameter to type check
 * @param parameterValue - Value of the parameter to type check
 */
export declare function throwTypeErrorIfParameterIsEmptyString(connectionId: string, parameterName: string, parameterValue: string): TypeError | undefined;
/**
 * @internal
 * The error message for operations on the receiver that are invalid for a message received in receiveAndDelete mode.
 */
export declare const InvalidOperationInReceiveAndDeleteMode = "The operation is not supported in 'receiveAndDelete' receive mode.";
/**
 * @internal
 * The error message for operations on the receiver that are invalid for a peeked message.
 */
export declare const InvalidOperationForPeekedMessage = "This operation is not supported for peeked messages. Only messages received using 'receiveMessages()', 'subscribe()' and 'getMessageIterator()' methods on the receiver in 'peekLock' receive mode can be settled.";
/**
 * @internal
 * The error message for when one attempts to settle an already settled message.
 */
export declare const MessageAlreadySettled = "The message has either been deleted or already settled";
/**
 * Throws error if the ServiceBusReceivedMessage cannot be settled.
 * @internal
 */
export declare function throwErrorIfInvalidOperationOnMessage(message: ServiceBusReceivedMessage, receiveMode: ReceiveMode, connectionId: string): void;
/**
 * Error message for when the ServiceBusMessage provided by the user has different values
 * for partitionKey and sessionId.
 * @internal
 */
export declare const PartitionKeySessionIdMismatchError = "The fields 'partitionKey' and 'sessionId' cannot have different values.";
/**
 * Throws error if the given object is not a valid ServiceBusMessage
 * @internal
 * @param msg - The object that needs to be validated as a ServiceBusMessage
 * @param errorMessageForWrongType - The error message to use when given object is not a ServiceBusMessage
 */
export declare function throwIfNotValidServiceBusMessage(msg: unknown, errorMessageForWrongType: string): void;
/** @internal */
export declare const errorInvalidMessageTypeSingleOrArray = "Provided value for 'messages' must be of type: ServiceBusMessage, AmqpAnnotatedMessage, ServiceBusMessageBatch or an array of type ServiceBusMessage or AmqpAnnotatedMessage.";
/** @internal */
export declare const errorInvalidMessageTypeSingle = "Provided value for 'message' must be of type: ServiceBusMessage or AmqpAnnotatedMessage.";
//# sourceMappingURL=errors.d.ts.map