// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface Serializer {
  serialize(value: any): Uint8Array<ArrayBuffer>;
  deserialize(bytes: Uint8Array<ArrayBuffer>): any;
}
