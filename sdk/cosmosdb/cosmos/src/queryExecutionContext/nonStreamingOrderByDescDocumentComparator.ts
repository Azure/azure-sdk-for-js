// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NonStreamingOrderByResult } from "./NonStreamingOrderByResult";
/** @hidden */
export class NonStreamingOrderByDescDocumentComparator {
  constructor() {}

  public compare(doc1: NonStreamingOrderByResult, doc2: NonStreamingOrderByResult): number {
    let firstOrder: any = doc1?.orderByItems.find((x) => x !== undefined);
    let secondOrder: any = doc2?.orderByItems.find((x) => x !== undefined);

    firstOrder = firstOrder ? firstOrder : { item: 0 };
    secondOrder = secondOrder ? secondOrder : { item: 0 };
    const order = firstOrder["item"] - secondOrder["item"];

    return order;
  }
}
