// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpOperationResponse } from "./httpOperationResponse";

export interface AtomXmlSerializer {
  serialize(requestBodyInJson: object): object;

  deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse>;
}

export interface AtomXmlOperationSpec {
  /**
   * The serializer to use in this operation.
   */
  serializer: AtomXmlSerializer;
}
