// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationArguments, OperationSpec } from "@azure/core-client";
import { isNode } from "@azure/core-util";
import { StorageClient } from "./generated/src";

/**
 * @internal
 */
export class StorageContextClient extends StorageClient {
  async sendOperationRequest<T>(
    operationArguments: OperationArguments,
    operationSpec: OperationSpec,
  ): Promise<T> {
    const operationSpecToSend = { ...operationSpec };

    if (
      !isNode &&
      !operationSpec.requestBody &&
      operationSpec.headerParameters?.some(
        (param) => param.mapper.serializedName === "Content-Length",
      )
    ) {
      operationSpecToSend.mediaType = "text";
      operationSpecToSend.requestBody = {
        parameterPath: "body",
        mapper: {
          serializedName: "body",
          isConstant: true,
          defaultValue: "",
          type: {
            name: "String",
          },
        },
      };
    }

    if (
      operationSpecToSend.path === "/{filesystem}" ||
      operationSpecToSend.path === "/{filesystem}/{path}"
    ) {
      operationSpecToSend.path = "";
    }
    return super.sendOperationRequest(operationArguments, operationSpecToSend);
  }
}
