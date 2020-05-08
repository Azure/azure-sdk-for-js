// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/// <reference lib="es2015" />

export { RequestResponseLink, SendRequestOptions } from "./requestResponseLink";
export { retry, RetryOptions, RetryConfig, RetryOperationType, RetryMode } from "./retry";
export { DataTransformer, DefaultDataTransformer } from "./dataTransformer";
export { TokenType } from "./auth/token";
export { AccessToken, TokenCredential, isTokenCredential } from "@azure/core-auth";
export { SharedKeyCredential } from "./auth/sas";
export { IotSharedKeyCredential } from "./auth/iotSas";

export { ConnectionConfig, ConnectionConfigOptions } from "./connectionConfig/connectionConfig";
export { EventHubConnectionConfig } from "./connectionConfig/eventhubConnectionConfig";
export { IotHubConnectionConfig } from "./connectionConfig/iothubConnectionConfig";

export { CbsClient, CbsResponse } from "./cbs";
export { Constants } from "./util/constants";
export { MessageHeader } from "./messageHeader";
export { MessageProperties } from "./messageProperties";
export {
  ConnectionContextBase,
  ConnectionProperties,
  CreateConnectionContextBaseParameters
} from "./ConnectionContextBase";
export {
  Dictionary,
  Message as AmqpMessage,
  isAmqpError,
  MessageHeader as AmqpMessageHeader,
  MessageProperties as AmqpMessageProperties
} from "rhea-promise";
export {
  MessagingError,
  ErrorNameConditionMapper,
  ConditionStatusMapper,
  ConditionErrorNameMapper,
  translate,
  retryableErrors,
  isSystemError,
  SystemErrorConditionMapper,
  NetworkSystemError
} from "./errors";
export {
  delay,
  Timeout,
  EventHubConnectionStringModel,
  executePromisesSequentially,
  parseConnectionString,
  IotHubConnectionStringModel,
  StorageConnectionStringModel,
  defaultLock,
  Func,
  ParsedOutput,
  getNewAsyncLock,
  AsyncLockOptions,
  ServiceBusConnectionStringModel,
  isIotHubConnectionString,
  randomNumberFromInterval,
  AsyncLock,
  isNode,
  WebSocketOptions
} from "./util/utils";
export { getRetryAttemptTimeoutInMs } from "./retry";
export { logger } from "./log";
