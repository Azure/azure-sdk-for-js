// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface ResourceSerializer {
  serialize(resourceDataInJson: any): string;

  parse(atomResponseInJson: any): any;
}
