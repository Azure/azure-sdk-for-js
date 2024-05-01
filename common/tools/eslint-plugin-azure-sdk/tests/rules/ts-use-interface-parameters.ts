// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-use-interface-parameters.
 * @author Arpan Laha
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-use-interface-parameters";

//------------------------------------------------------------------------------
// Example class & interface
//------------------------------------------------------------------------------

const example = `class A {
  message: string
}

interface B {
  message: string
}

interface B2 {
  message: B
}

interface B3 {
  message: A
}

interface B4 {
  message: A[]
}

interface B5 {
  message: Array<A>
}
`;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json",
  },
});

ruleTester.run("ts-use-interface-parameters", rule, {
  valid: [
    // single parameter
    {
      // function declaration
      code: `${example}function func3(b: B): void { console.log(b); }`,
      filename: "src/test.ts",
    },
    {
      // class method
      code: `${example}class C { method1(b: B): void { console.log(b); } }`,
      filename: "src/test.ts",
    },
    // multiple parameters
    {
      // function declaration
      code: `${example}function func6(b1: B, b2: B): void { console.log(b); }`,
      filename: "src/test.ts",
    },
    {
      // class method
      code: `${example}class C { method2(b1: B, b2: B): void { console.log(b); } }`,
      filename: "src/test.ts",
    },
    // overloads
    {
      // class methods
      code: `${example}class C { overloadMethod(a: A): void { console.log(a); }; overloadMethod(b: B): void { console.log(b); }; }`,
      filename: "src/test.ts",
    },
    {
      // function declaration
      code: `${example}function overloadDeclaration(a: A): void { console.log(a); }; function overloadDeclaration(b: B): void { console.log(b); }`,
      filename: "src/test.ts",
    },
    // nested objects
    {
      // class methods
      code: `${example}class C { nestedMethod(b: B2): void { console.log(b); }; }`,
      filename: "src/test.ts",
    },
    {
      // function declaration
      code: `${example}function nestedDeclaration(b: B2): void { console.log(b); }`,
      filename: "src/test.ts",
    },
    // optional parameters
    {
      // class methods
      code: `${example}class C { nestedMethod(b: B, a?: A): void { console.log(b); a && console.log(a); }; }`,
      filename: "src/test.ts",
    },
    {
      // function declaration
      code: `${example}function nestedDeclaration(b: B, a?: A): void { console.log(b); a && console.log(a); }`,
      filename: "src/test.ts",
    },
    // array parameters []
    {
      // class method
      code: `${example}class C { arrayMethod(b: B[]): void { console.log(b); }; }`,
      filename: "src/test.ts",
    },
    {
      // function declaration
      code: `${example}function arrayDeclaration(b: B[]): void { console.log(b); }`,
      filename: "src/test.ts",
    },
    // array parameters Array<>
    {
      // class method
      code: `${example}class C { array2Method(b: Array<B>): void { console.log(b); }; }`,
      filename: "src/test.ts",
    },
    {
      // function declaration
      code: `${example}function array2Declaration(b: Array<B>): void { console.log(b); }`,
      filename: "src/test.ts",
    },
    // private method
    {
      code: `${example}class { private pMethod(a: A): void { console.log(a); } }`,
      filename: "src/test.ts",
    },
    // not in src
    {
      // function declaration
      code: `${example}function func3(a: A): void { console.log(a); }`,
      filename: "tests/test.ts",
    },
    {
      // class method
      code: `${example}class C { method1(b: A): void { console.log(a); } }`,
      filename: "tests/test.ts",
    },
  ],
  invalid: [
    // single parameter
    {
      // function declaration
      code: `${example}function func9(a: A): void { console.log(a); }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type A of parameter a of function func9 is a class or contains a class as a member",
        },
      ],
    },
    {
      // class method
      code: `${example}class { method3(a: A): void { console.log(a); } }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type A of parameter a of function method3 is a class or contains a class as a member",
        },
      ],
    },
    // one interface, one class
    {
      // function declaration
      code: `${example}function func12(a: A, b: B): void { console.log(a, b); }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type A of parameter a of function func12 is a class or contains a class as a member",
        },
      ],
    },
    {
      // class method
      code: `${example}class { method4(a: A, b: B): void { console.log(a, b); } }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type A of parameter a of function method4 is a class or contains a class as a member",
        },
      ],
    },
    // multiple classes
    {
      // function declaration
      code: `${example}function func15(a1: A, a2: A): void { console.log(a1, a2); }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type A of parameter a1 of function func15 is a class or contains a class as a member",
        },
        {
          message:
            "type A of parameter a2 of function func15 is a class or contains a class as a member",
        },
      ],
    },
    {
      // class method
      code: `${example}class { method3(a1: A, a2: A): void { console.log(a1, a2); } }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type A of parameter a1 of function method3 is a class or contains a class as a member",
        },
        {
          message:
            "type A of parameter a2 of function method3 is a class or contains a class as a member",
        },
      ],
    },
    // bad overloads
    {
      // class methods
      code: `${example}class C { overloadMethodBad(a: A): void { console.log(a); } overloadMethodBad(a1: A, a2: A): void { console.log(a1, a2); }; }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type A of parameter a of function overloadMethodBad is a class or contains a class as a member",
        },
        {
          message:
            "type A of parameter a1 of function overloadMethodBad is a class or contains a class as a member",
        },
        {
          message:
            "type A of parameter a2 of function overloadMethodBad is a class or contains a class as a member",
        },
      ],
    },
    {
      // function declaration
      code: `${example}function overloadDeclarationBad(a: A): void { console.log(a); } function overloadDeclarationBad(a1: A, a2: A): void { console.log(a1, a2); }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type A of parameter a of function overloadDeclarationBad is a class or contains a class as a member",
        },
        {
          message:
            "type A of parameter a1 of function overloadDeclarationBad is a class or contains a class as a member",
        },
        {
          message:
            "type A of parameter a2 of function overloadDeclarationBad is a class or contains a class as a member",
        },
      ],
    },
    // nested objects
    {
      // class methods
      code: `${example}class C { nestedMethodBad(b: B3): void { console.log(b); }; }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type B3 of parameter b of function nestedMethodBad is a class or contains a class as a member",
        },
      ],
    },
    {
      // function declaration
      code: `${example}function nestedDeclarationBad(b: B3): void { console.log(b); }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type B3 of parameter b of function nestedDeclarationBad is a class or contains a class as a member",
        },
      ],
    },
    {
      // Anonymous function export
      code: `${example} export default function(b: B3) : void { console.log(b); }`,
      filename: "src/tests.ts",
      errors: [
        {
          message:
            "type B3 of parameter b of function <anonymous> is a class or contains a class as a member",
        },
      ],
    },
    // array parameters []
    {
      // class method
      code: `${example}class C { arrayMethodBad(a: A[]): void { console.log(a); }; }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type A of parameter a of function arrayMethodBad is a class or contains a class as a member",
        },
      ],
    },
    {
      // function declaration
      code: `${example}function arrayDeclarationBad(a: A[]): void { console.log(a); }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type A of parameter a of function arrayDeclarationBad is a class or contains a class as a member",
        },
      ],
    },
    // nested array parameters []
    {
      // class method
      code: `${example}class C { nestedArrayMethodBad(a: B4): void { console.log(a); }; }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type B4 of parameter a of function nestedArrayMethodBad is a class or contains a class as a member",
        },
      ],
    },
    {
      // function declaration
      code: `${example}function nestedArrayDeclarationBad(a: B4): void { console.log(a); }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type B4 of parameter a of function nestedArrayDeclarationBad is a class or contains a class as a member",
        },
      ],
    },
    // array parameters Array<>
    {
      // class method
      code: `${example}class C { array2MethodBad(a: Array<A>): void { console.log(a); }; }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type A of parameter a of function array2MethodBad is a class or contains a class as a member",
        },
      ],
    },
    {
      // function declaration
      code: `${example}function array2DeclarationBad(a: Array<A>): void { console.log(a); }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type A of parameter a of function array2DeclarationBad is a class or contains a class as a member",
        },
      ],
    },
    // nested array parameters Array<>
    {
      // class method
      code: `${example}class C { nestedArray2MethodBad(a: B5): void { console.log(a); }; }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type B5 of parameter a of function nestedArray2MethodBad is a class or contains a class as a member",
        },
      ],
    },
    {
      // function declaration
      code: `${example}function nestedArray2DeclarationBad(a: B5): void { console.log(a); }`,
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type B5 of parameter a of function nestedArray2DeclarationBad is a class or contains a class as a member",
        },
      ],
    },
  ],
});
