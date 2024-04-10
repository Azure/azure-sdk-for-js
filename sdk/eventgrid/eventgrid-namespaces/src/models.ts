// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

export interface PublishCloudEventOptions extends OperationOptions {
  /** binary mode */
  binaryMode?: boolean;

  /** content type */
  contentType?: string;
}
