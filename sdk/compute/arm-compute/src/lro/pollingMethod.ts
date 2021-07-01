// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  OperationArguments,
  OperationSpec,
  OperationResponseMap
} from "@azure/core-client";
import { LROMode, LROResult, SendOperationFn } from "./models";

export function createPollingMethod<TResult>(
  sendOperationFn: SendOperationFn<TResult>,
  args: OperationArguments,
  spec: OperationSpec,
  mode?: LROMode
): (path?: string) => Promise<LROResult<TResult>> {
  /**
   * Polling calls will always return a status object i.e. {"status": "success"}
   * these intermediate responses are not described in the swagger so we need to
   * pass custom mappers at runtime.
   * This function replaces all the existing mappers to be able to deserialize a status object
   * @param responses Original set of responses defined in the operation
   */
  function getCompositeMappers(responses: {
    [responseCode: string]: OperationResponseMap;
  }): {
    [responseCode: string]: OperationResponseMap;
  } {
    return Object.keys(responses).reduce((acc, statusCode) => {
      return {
        ...acc,
        [statusCode]: {
          ...responses[statusCode],
          bodyMapper: {
            type: {
              name: "Composite",
              modelProperties: {
                status: {
                  serializedName: "status",
                  type: {
                    name: "String"
                  }
                }
              }
            }
          }
        }
      };
    }, {} as { [responseCode: string]: OperationResponseMap });
  }
  // Make sure we don't send any body to the get request
  const { requestBody, responses, ...restSpec } = spec;
  if (mode === "AzureAsync") {
    return async (path?: string) => {
      return sendOperationFn(args, {
        ...restSpec,
        responses: getCompositeMappers(responses),
        httpMethod: "GET",
        ...(path && { path })
      });
    };
  }
  return async (path?: string) => {
    return sendOperationFn(args, {
      ...restSpec,
      responses: responses,
      httpMethod: "GET",
      ...(path && { path })
    });
  };
}

export function createRetrieveAzureAsyncResource<TResult>(
  sendOperationFn: SendOperationFn<TResult>,
  args: OperationArguments,
  spec: OperationSpec
): (path?: string) => Promise<LROResult<TResult>> {
  const updatedArgs = { ...args };
  if (updatedArgs.options) {
    (updatedArgs.options as any).shouldDeserialize = true;
  }
  return createPollingMethod(sendOperationFn, updatedArgs, spec);
}
