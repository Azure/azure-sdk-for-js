// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NonStreamingOrderByResult } from "./nonStreamingOrderByResult";

/** @hidden */
const TYPEORDCOMPARATOR: {
  [type: string]: { ord: number; compFunc?: (a: any, b: any) => number };
} = Object.freeze({
  NoValue: {
    ord: 0,
  },
  undefined: {
    ord: 1,
  },
  boolean: {
    ord: 2,
    compFunc: (a: boolean, b: boolean) => {
      return a === b ? 0 : a > b ? 1 : -1;
    },
  },
  number: {
    ord: 4,
    compFunc: (a: number, b: number) => {
      return a === b ? 0 : a > b ? 1 : -1;
    },
  },
  string: {
    ord: 5,
    compFunc: (a: string, b: string) => {
      return a === b ? 0 : a > b ? 1 : -1;
    },
  },
});

/** @hidden */
export class OrderByComparator {
  constructor(public sortOrder: string[]) {}

  public compareItems(item1: NonStreamingOrderByResult, item2: NonStreamingOrderByResult): number {
    const orderByItemsRes1 = this.getOrderByItems(item1);
    const orderByItemsRes2 = this.getOrderByItems(item2);

    for (let i = 0; i < orderByItemsRes1.length; i++) {
      // compares the orderby items one by one
      const compRes = this.compareOrderByItem(orderByItemsRes1[i], orderByItemsRes2[i]);
      if (compRes !== 0) {
        if (this.sortOrder[i] === "Descending") {
          return compRes;
        } else if (this.sortOrder[i] === "Ascending") {
          return -compRes;
        }
      }
    }
  }

  private getOrderByItems(res: any): any {
    return res["orderByItems"];
  }

  private compareOrderByItem(orderByItem1: any, orderByItem2: any): number {
    const type1 = this.getType(orderByItem1);
    const type2 = this.getType(orderByItem2);
    return this.compareValue(orderByItem1["item"], type1, orderByItem2["item"], type2);
  }

  private getType(
    orderByItem: any,
  ):
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function"
    | "NoValue" {
    // TODO: any item?
    if (orderByItem === undefined || orderByItem.item === undefined) {
      return "NoValue";
    }
    const type = typeof orderByItem.item;
    if (TYPEORDCOMPARATOR[type] === undefined) {
      throw new Error(`unrecognizable type ${type}`);
    }
    return type;
  }

  private compareValue(item1: unknown, type1: string, item2: unknown, type2: string): number {
    if (type1 === "object" || type2 === "object") {
      throw new Error("Tried to compare an object type");
    }
    const type1Ord = TYPEORDCOMPARATOR[type1].ord;
    const type2Ord = TYPEORDCOMPARATOR[type2].ord;
    const typeCmp = type1Ord - type2Ord;

    if (typeCmp !== 0) {
      // if the types are different, use type ordinal
      return typeCmp;
    }

    // both are of the same type
    if (
      type1Ord === TYPEORDCOMPARATOR["undefined"].ord ||
      type1Ord === TYPEORDCOMPARATOR["NoValue"].ord
    ) {
      // if both types are undefined or Null they are equal
      return 0;
    }

    const compFunc = TYPEORDCOMPARATOR[type1].compFunc;
    if (typeof compFunc === "undefined") {
      throw new Error("Cannot find the comparison function");
    }
    // same type and type is defined compare the items
    return compFunc(item1, item2);
  }
}
