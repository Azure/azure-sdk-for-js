// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

interface Contents {
  "@type": string;
  name: string;
  schema: string;
}

/**
 * @internal
 */
export interface DTDL {
  "@context": any[];
  "@id": string;
  extends: string | Array<any>;
  contents: Contents[];
}
