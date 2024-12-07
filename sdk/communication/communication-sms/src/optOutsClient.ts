// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { tracingClient } from "./generated/src/tracing.js";
import type { OptOutResponseItem } from "./generated/src/index.js";
import type { SmsApiClient } from "./generated/src/smsApiClient.js";
import { generateOptOutRequest } from "./utils/smsUtils.js";
import { extractOperationOptions } from "./extractOperationOptions.js";
import type { OperationOptions } from "@azure/core-client";

export interface OptOutCheckResult {
  to: string;
  isOptedOut: boolean;
  httpStatusCode: number;
  errorMessage?: string;
}

export interface OptOutAddResult {
  to: string;
  httpStatusCode: number;
  errorMessage?: string;
}

export interface OptOutRemoveResult {
  to: string;
  httpStatusCode: number;
  errorMessage?: string;
}

export interface CheckOptions extends OperationOptions {}

export interface AddOptions extends OperationOptions {}

export interface RemoveOptions extends OperationOptions {}

export class OptOutsClient {
  private readonly api: SmsApiClient;

  constructor(api: SmsApiClient) {
    this.api = api;
  }

  public async remove(
    from: string,
    to: string[],
    options: RemoveOptions = {},
  ): Promise<OptOutRemoveResult[]> {
    const { operationOptions } = extractOperationOptions(options);
    return tracingClient.withSpan("OptOuts-Remove", operationOptions, async (updatedOptions) => {
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

  public async add(
    from: string,
    to: string[],
    options: AddOptions = {},
  ): Promise<OptOutAddResult[]> {
    const { operationOptions } = extractOperationOptions(options);
    return tracingClient.withSpan("OptOuts-Add", operationOptions, async (updatedOptions) => {
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

  public async check(
    from: string,
    to: string[],
    options: CheckOptions = {},
  ): Promise<OptOutCheckResult[]> {
    const { operationOptions } = extractOperationOptions(options);
    return tracingClient.withSpan("OptOuts-Check", operationOptions, async (updatedOptions) => {
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
