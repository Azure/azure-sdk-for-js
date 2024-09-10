// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationArguments, OperationSpec } from "@azure/core-client";
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
      operationSpecToSend.path === "/{containerName}" ||
      operationSpecToSend.path === "/{containerName}/{blob}"
    ) {
      operationSpecToSend.path = "";
    }
    return super.sendOperationRequest(operationArguments, operationSpecToSend);
  }
}
