// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { testType, type RecursivePartial, type IsEqual, type StrictCanAssign } from "type-plus";
import { mergePatchStrict, type JsonMergePatch } from "../../src/jsonMergePatch";

describe("jsonMergePatch", function () {
  describe("type", function () {
    type Foo = {
      a: number;
      b: number | null;
      c?: number;
      d?: number | null;
    };
    type ExpectJsonMergePatchFoo = {
      a?: number;
      b?: number | null;
      c?: number | null;
      d?: number | null;
    };
    type Bar = {
      a: Foo;
      b: Foo | null;
      c?: Foo;
      d?: Foo | null;
    };
    type ExpectJsonMergePatchBar = {
      a?: ExpectJsonMergePatchFoo;
      b?: ExpectJsonMergePatchFoo | null;
      c?: ExpectJsonMergePatchFoo | null;
      d?: ExpectJsonMergePatchFoo | null;
    };
    // should equal bar
    type Baz = {
      a: {
        a: number;
        b: number | null;
        c?: number;
        d?: number | null;
      };
      b: {
        a: number;
        b: number | null;
        c?: number;
        d?: number | null;
      } | null;
      c?: {
        a: number;
        b: number | null;
        c?: number;
        d?: number | null;
      };
      d?: {
        a: number;
        b: number | null;
        c?: number;
        d?: number | null;
      } | null;
    };

    type ExpectJsonMergePatchBaz = {
      a?: {
        a?: number;
        b?: number | null;
        c?: number | null;
        d?: number | null;
      };
      b?: {
        a?: number;
        b?: number | null;
        c?: number | null;
        d?: number | null;
      } | null;
      c?: {
        a?: number;
        b?: number | null;
        c?: number | null;
        d?: number | null;
      } | null;
      d?: {
        a?: number;
        b?: number | null;
        c?: number | null;
        d?: number | null;
      } | null;
    };

    interface Person {
      name: string;
      lastName: string;
      email: string;
      twitterHandle?: string;
      githubHandle?: string;
      awards: {
        trackAndField?: Medal;
        soccer?: Medal;
      };
    }

    type Medal = "gold" | "silver" | "bronze";

    interface ExpectJsonMergePatchPerson {
      name?: string;
      lastName?: string;
      email?: string;
      twitterHandle?: string | null;
      githubHandle?: string | null;
      awards?: {
        trackAndField?: "gold" | "silver" | "bronze" | null;
        soccer?: Medal | null;
      };
    }

    it("test types are declared correctly", function () {
      assert(testType.equal<Bar, Baz>(true));
      assert(testType.equal<ExpectJsonMergePatchBar, ExpectJsonMergePatchBaz>(true));
    });

    type BasicTest<Expect, Test> = IsEqual<Expect, JsonMergePatch<Test>>;
    type WithNullTest<Expect, Test> = IsEqual<Expect & null, JsonMergePatch<Test> & null>;
    type CanAssignTest<A, B> = StrictCanAssign<A, B>;
    it("parametric type has the correct behavior", function () {
      assert(testType.true<BasicTest<ExpectJsonMergePatchFoo, Foo>>(true));
      assert(testType.true<BasicTest<ExpectJsonMergePatchBar, Bar>>(true));
      assert(testType.true<BasicTest<ExpectJsonMergePatchBaz, Baz>>(true));
      assert(testType.true<BasicTest<ExpectJsonMergePatchPerson, Person>>(true));

      assert(testType.true<WithNullTest<ExpectJsonMergePatchFoo, Foo>>(true));
      assert(testType.true<WithNullTest<ExpectJsonMergePatchBar, Bar>>(true));
      assert(testType.true<WithNullTest<ExpectJsonMergePatchBaz, Baz>>(true));
      assert(testType.true<WithNullTest<ExpectJsonMergePatchPerson, Person>>(true));

      assert(testType.true<CanAssignTest<Foo, ExpectJsonMergePatchFoo>>(true));
      assert(testType.true<CanAssignTest<Bar, ExpectJsonMergePatchBar>>(true));
      assert(testType.true<CanAssignTest<Baz, ExpectJsonMergePatchBaz>>(true));
      assert(testType.true<CanAssignTest<Person, ExpectJsonMergePatchPerson>>(true));
    });

    it("parametric type has the correct behavior with type unions", function () {
      assert(
        testType.true<
          BasicTest<
            | ExpectJsonMergePatchFoo
            | ExpectJsonMergePatchBar
            | ExpectJsonMergePatchBaz
            | ExpectJsonMergePatchPerson
            | "foo",
            Foo | Bar | Baz | Person | "foo"
          >
        >(true)
      );

      assert(
        testType.true<
          WithNullTest<
            | ExpectJsonMergePatchFoo
            | ExpectJsonMergePatchBar
            | ExpectJsonMergePatchBaz
            | ExpectJsonMergePatchPerson
            | "foo",
            Foo | Bar | Baz | Person | "foo"
          >
        >(true)
      );

      assert(
        testType.true<
          CanAssignTest<
            Foo | Bar | Baz | Person | "foo",
            | ExpectJsonMergePatchFoo
            | ExpectJsonMergePatchBar
            | ExpectJsonMergePatchBaz
            | ExpectJsonMergePatchPerson
            | "foo"
          >
        >(true)
      );
    });

    it("Is identical to the input with arrays, tuples, functions, RegExp and Date", function () {
      type FooArray = Array<{ a: string; b?: string; c?: { a: string } }>;
      type FooTuple = [
        { a: string; b?: string; c?: { a: string } },
        { a: string; b?: string; c?: { a: string } }
      ];
      type FooFunction = () => void;

      assert(testType.equal<FooArray, JsonMergePatch<FooArray>>(true));
      assert(testType.equal<FooTuple, JsonMergePatch<FooTuple>>(true));
      assert(testType.equal<FooFunction, JsonMergePatch<FooFunction>>(true));
      assert(testType.equal<RegExp, JsonMergePatch<RegExp>>(true));
      assert(testType.equal<Date, JsonMergePatch<Date>>(true));
    });
  });

  describe("function", function () {
    describe("conforms to the RFC example", function () {
      it("1", function () {
        const original = {
          a: "b",
          c: {
            d: "e",
            f: "g",
          },
        };
        const patch = {
          a: "z",
          c: {
            f: null,
          },
        };
        const expect = {
          a: "z",
          c: {
            d: "e",
          },
        };
        assert.deepEqual(
          mergePatchStrict(original as RecursivePartial<typeof original>, patch),
          expect
        );
      });
      it("2", function () {
        const original = {
          title: "Goodbye!",
          author: {
            givenName: "John",
            familyName: "Doe",
          },
          tags: ["example", "sample"],
          content: "This will be unchanged",
        };
        const patch = {
          title: "Hello!",
          phoneNumber: "+01-123-456-7890",
          author: {
            familyName: null,
          },
          tags: ["example"],
        };
        const expect = {
          title: "Hello!",
          author: {
            givenName: "John",
          },
          tags: ["example"],
          content: "This will be unchanged",
          phoneNumber: "+01-123-456-7890",
        };
        assert.deepEqual(
          mergePatchStrict(original as RecursivePartial<typeof original>, patch),
          expect
        );
      });
    });
  });
});
