// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { encodeUTF8 } from "../../utils/encode";
export class SasTokenPartitionKeyValueRange {
  public constructor(public partitionKeyValue: string) {
    this.partitionKeyValue = partitionKeyValue;
  }

  public static create(partitionKeyValue: string): SasTokenPartitionKeyValueRange {
    return this.create(partitionKeyValue);
  }
  public create(partitionKeyValue: string): SasTokenPartitionKeyValueRange {
    return new SasTokenPartitionKeyValueRange(partitionKeyValue);
  }

  public encode(): string {
    return encodeUTF8(this.partitionKeyValue).toString();
  }
}
