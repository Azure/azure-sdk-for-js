// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { FullOperationResponse } from "@azure/core-client";

/**
 * @internal
 * Represents the internal ATOM XML serializer interface
 */
export interface AtomXmlSerializer {
  // eslint-disable-next-line @typescript-eslint/ban-types
  serialize(requestBodyInJson: object): Record<string, unknown>;

  deserialize(response: FullOperationResponse): Promise<FullOperationResponse>;
}
