// Copyright (c) Microsoft.
// Licensed under the MIT license.

interface Contents {
  "@type"?: string;
  name: string;
  schema: string;
}

export interface DTDL extends JSON {
  "@context": any[];
  "@id": string;
  extends: string | Array<any>;
  contents: Contents[];
}
