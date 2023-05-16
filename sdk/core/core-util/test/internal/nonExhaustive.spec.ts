// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NonExhaustive } from "../../src/nonExhaustiveUnion";
import { assert } from "chai";

describe("NonExhaustive", () => {
  it("should be able to assign a string value", () => {
    // Testing with strings
    type Animal = NonExhaustive<"cat" | "dog" | "bird">;

    const cat: Animal = "cat";
    assert.isDefined(cat);

    const dog: Animal = "dog";
    assert.isDefined(dog);

    const bird: Animal = "bird";
    assert.isDefined(bird);

    const elephant: Animal = "elephant";
    assert.isDefined(elephant);

    // @ts-expect-error We are trying invalid types on purpose to test the error thrown
    const num: Animal = 123;
    assert.isDefined(num);
  });

  it("should be able to assign a number value", () => {
    // Testing with numbers
    type LuckyNumber = NonExhaustive<7 | 13 | 21>;

    const seven: LuckyNumber = 7;
    assert.isDefined(seven);

    const thirteen: LuckyNumber = 13;
    assert.isDefined(thirteen);

    const twentyOne: LuckyNumber = 21;
    assert.isDefined(twentyOne);

    const fortyTwo: LuckyNumber = 42;
    assert.isDefined(fortyTwo);

    // @ts-expect-error We are trying invalid types on purpose to test the error thrown
    const notANumber: LuckyNumber = "not a number";
    assert.isDefined(notANumber);
  });
  it("should be able to assign a BigInt value", () => {
    // Testing with BigInt
    type BigNum = NonExhaustive<100n | 200n | 300n>;

    const hundred: BigNum = BigInt(100);
    assert.isDefined(hundred);

    const twoHundred: BigNum = BigInt(200);
    assert.isDefined(twoHundred);

    const threeHundred: BigNum = BigInt(300);
    assert.isDefined(threeHundred);

    const fourHundred: BigNum = BigInt(400);
    assert.isDefined(fourHundred);

    // @ts-expect-error We are trying invalid types on purpose to test the error thrown
    const notABigNum: BigNum = "not a BigInt";
    assert.isDefined(notABigNum);
  });

  it("should be able to assign a boolean value", () => {
    // Testing with symbols
    const sym1 = Symbol("sym1");
    const sym2 = Symbol("sym2");
    const sym3 = Symbol("sym3");

    type SomeSymbol = NonExhaustive<typeof sym1 | typeof sym2 | typeof sym3>;

    const symbol1: SomeSymbol = sym1;
    assert.isDefined(symbol1);

    const symbol2: SomeSymbol = sym2;
    assert.isDefined(symbol2);

    const symbol3: SomeSymbol = sym3;
    assert.isDefined(symbol3);

    const symbol4: SomeSymbol = Symbol("sym4");
    assert.isDefined(symbol4);

    // @ts-expect-error We are trying invalid types on purpose to test the error thrown
    const notASymbol: SomeSymbol = "not a symbol";
    assert.isDefined(notASymbol);
  });
  it("should be able to assign a symbol value", () => {
    // Testing with mixed types
    type Mixed = NonExhaustive<"cat" | 7>;

    const catMixed: Mixed = "cat";
    assert.isDefined(catMixed);

    const sevenMixed: Mixed = 7;
    assert.isDefined(sevenMixed);

    const dogMixed: Mixed = "dog";
    assert.isDefined(dogMixed);

    const eightMixed: Mixed = 8;
    assert.isDefined(eightMixed);

    // @ts-expect-error We are trying invalid types on purpose to test the error thrown
    const notAStringOrNumber1: Mixed = true;
    assert.isDefined(notAStringOrNumber1);

    // @ts-expect-error We are trying invalid types on purpose to test the error thrown
    const notAStringOrNumber2: Mixed = {};
    assert.isDefined(notAStringOrNumber2);
  });
});
