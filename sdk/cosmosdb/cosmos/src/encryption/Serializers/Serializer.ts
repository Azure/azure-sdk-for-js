// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface Serializer {
  serialize(value: any): Buffer;
  deserialize(bytes: Buffer): any;
}
