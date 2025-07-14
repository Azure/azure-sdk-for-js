// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationArguments, OperationSpec } from "@azure/core-client";
import { isNodeLike } from "@azure/core-util";
import { StorageClient } from "./generated/src/index.js";

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
      !isNodeLike &&
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
