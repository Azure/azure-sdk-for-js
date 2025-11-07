// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { tracingClient } from "./generated/src/tracing.js";
import type { OptOutResponseItem } from "./generated/src/index.js";
import type { SmsApiClient } from "./generated/src/smsApiClient.js";
import { generateOptOutRequest } from "./utils/smsUtils.js";
import { extractOperationOptions } from "./extractOperationOptions.js";
import type { OperationOptions } from "@azure/core-client";

/**
 * The result of Opt Out Check request.
 */
export interface OptOutCheckResult {
  /**
   * The recipient's phone number in E.164 format.
   */
  to: string;
  /**
   * Indicates if the recipient's phone number in opted out from receiving messages or not.
   */
  isOptedOut: boolean;
  /**
   * HTTP Status code.
   */
  httpStatusCode: number;
  /**
   * Optional error message in case of 4xx/5xx/repeatable errors.
   */
  errorMessage?: string;
}

/**
 * The result of Opt Out Add request.
 */
export interface OptOutAddResult {
  /**
   * The recipient's phone number in E.164 format.
   */
  to: string;
  /**
   * HTTP Status code.
   */
  httpStatusCode: number;
  /**
   * Optional error message in case of 4xx/5xx/repeatable errors.
   */
  errorMessage?: string;
}

/**
 * The result of Opt Out Remove request.
 */
export interface OptOutRemoveResult {
  /**
   * The recipient's phone number in E.164 format.
   */
  to: string;
  /**
   * HTTP Status code.
   */
  httpStatusCode: number;
  /**
   * Optional error message in case of 4xx/5xx/repeatable errors.
   */
  errorMessage?: string;
}

/**
 * Client options used to configure OptOuts Client API Check requests.
 */
export interface CheckOptions extends OperationOptions {}

/**
 * Client options used to configure OptOuts Client API Add requests.
 */
export interface AddOptions extends OperationOptions {}

/**
 * Client options used to configure OptOuts Client API Remove requests.
 */
export interface RemoveOptions extends OperationOptions {}

/**
 * A sub-client for managing opt-out operations.
 */
export interface OptOutsClient {
  /**
   * Adds phone numbers to the optouts list.
   *
   * @param from - The sender's phone number
   * @param to - The recipient's phone numbers
   * @param options - Additional request options
   */
  add(from: string, to: string[], options?: AddOptions): Promise<OptOutAddResult[]>;
  /**
   * Checks if phone numbers are in the optouts list.
   *
   * @param from - The sender's phone number
   * @param to - The recipient's phone numbers
   * @param options - Additional request options
   */
  check(from: string, to: string[], options?: CheckOptions): Promise<OptOutCheckResult[]>;
  /**
   * Removes phone numbers from the optouts list.
   *
   * @param from - The sender's phone number
   * @param to - The recipient's phone numbers
   * @param options - Additional request options
   */
  remove(from: string, to: string[], options?: RemoveOptions): Promise<OptOutRemoveResult[]>;
}

/**
 * Implementation of the OptOutsClient sub-client.
 */
export class OptOutsClientImpl implements OptOutsClient {
  private readonly api: SmsApiClient;

  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  constructor(api: SmsApiClient) {
    this.api = api;
  }

  /**
   * Removes phone numbers from the optouts list.
   *
   * @param from - The sender's phone number
   * @param to - The recipient's phone numbers
   * @param options - Additional request options
   */
  public async remove(
    from: string,
    to: string[],
    options: RemoveOptions = {},
  ): Promise<OptOutRemoveResult[]> {
    const { operationOptions } = extractOperationOptions(options);
    return tracingClient.withSpan("OptOuts-Remove", operationOptions, async (updatedOptions: OperationOptions) => {
      const response = await this.api.optOuts.remove(
        generateOptOutRequest(from, to),
        updatedOptions,
      );

      return response.value.map((optOutResponseItem: OptOutResponseItem) => {
        return {
          to: optOutResponseItem.to,
          httpStatusCode: optOutResponseItem.httpStatusCode,
          errorMessage: optOutResponseItem.errorMessage ?? "",
        };
      });
    });
  }

  /**
   * Adds phone numbers to the optouts list.
   *
   * @param from - The sender's phone number
   * @param to - The recipient's phone numbers
   * @param options - Additional request options
   */
  public async add(
    from: string,
    to: string[],
    options: AddOptions = {},
  ): Promise<OptOutAddResult[]> {
    const { operationOptions } = extractOperationOptions(options);
    return tracingClient.withSpan("OptOuts-Add", operationOptions, async (updatedOptions: OperationOptions) => {
      const response = await this.api.optOuts.add(generateOptOutRequest(from, to), updatedOptions);

      return response.value.map((optOutResponseItem: OptOutResponseItem) => {
        return {
          to: optOutResponseItem.to,
          httpStatusCode: optOutResponseItem.httpStatusCode,
          errorMessage: optOutResponseItem.errorMessage ?? "",
        };
      });
    });
  }

  /**
   * Checks if phone numbers are in the optouts list.
   *
   * @param from - The sender's phone number
   * @param to - The recipient's phone numbers
   * @param options - Additional request options
   */
  public async check(
    from: string,
    to: string[],
    options: CheckOptions = {},
  ): Promise<OptOutCheckResult[]> {
    const { operationOptions } = extractOperationOptions(options);
    return tracingClient.withSpan("OptOuts-Check", operationOptions, async (updatedOptions: OperationOptions) => {
      const response = await this.api.optOuts.check(
        generateOptOutRequest(from, to),
        updatedOptions,
      );

      return response.value.map((optOutResponseItem: OptOutResponseItem) => {
        return {
          to: optOutResponseItem.to,
          isOptedOut: optOutResponseItem.isOptedOut ?? false,
          httpStatusCode: optOutResponseItem.httpStatusCode,
          errorMessage: optOutResponseItem.errorMessage ?? "",
        };
      });
    });
  }
}
