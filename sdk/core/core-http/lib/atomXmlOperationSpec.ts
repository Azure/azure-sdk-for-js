// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpOperationResponse } from "./httpOperationResponse";

/**
 * @ignore
 * Type representing the JSON representation of XML request data
 */
export interface XMLRequestInJSON {
  [key: string]: {
    $: { xmlns: string };
    [key: string]: any;
  };
}

/**
 * @ignore
 * Type representing the JSON representation of XML response data
 */
export interface XMLResponseInJSON {
  [key: string]: any;
}

export interface AtomXmlSerializer {
  serialize(requestBodyInJson: any): XMLRequestInJSON;

  deserialize(response: HttpOperationResponse): Promise<HttpOperationResponse>;
}

export interface AtomXmlOperationSpec {
  /**
   * The serializer to use in this operation.
   */
  serializer: AtomXmlSerializer;
}
