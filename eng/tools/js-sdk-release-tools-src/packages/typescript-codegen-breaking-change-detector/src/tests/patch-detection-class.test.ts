import { describe, expect, test } from 'vitest';

import { patchClass } from '../azure/patch/patch-detection';
import { createTestAstContext } from './utils';
import { DiffLocation, DiffReasons, AssignDirection } from '../azure/common/types';

describe('detect class', () => {
  describe('detect on class level', () => {
    test('remove class', async () => {
      const baselineApiView = `export class RemoveClass {}`;
      const currentApiView = ``;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('RemoveClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Class);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
      expect(diffPairs[0].target?.name).toBe('RemoveClass');
    });

    test('add class', async () => {
      const baselineApiView = ``;
      const currentApiView = `export class AddClass {}`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('AddClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Class);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Added);
      expect(diffPairs[0].source?.name).toBe('AddClass');
    });
  });

  describe('detect constructor', () => {
    test('add constructors', async () => {
      const baselineApiView = `
      export class AddClassConstructor {
      }`;
      const currentApiView = `
      class AddClassConstructor {
        constructor(p1: string, p2: string) {}
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('AddClassConstructor', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Added);
      expect(diffPairs[0].source?.name).toBe('constructor(p1: string, p2: string) {}');
    });

    test('remove constructors', async () => {
      const baselineApiView = `
      export class RemoveClassConstructor {
        constructor(remove: string) {}
        constructor(p1: string, p2: string) {}
      }`;
      const currentApiView = `
      export class RemoveClassConstructor {
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('RemoveClassConstructor', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(2);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
      expect(diffPairs[0].target?.name).toBe('constructor(remove: string) {}');
      expect(diffPairs[1].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[1].location).toBe(DiffLocation.Signature);
      expect(diffPairs[1].reasons).toBe(DiffReasons.Removed);
      expect(diffPairs[1].target?.name).toBe('constructor(p1: string, p2: string) {}');
    });

    test("change type of constructor's parameter", async () => {
      const baselineApiView = `
      export class TestClass {
        constructor(p1: string, p2: string);
      }`;
      const currentApiView = `
      export class TestClass {
        constructor(p2: string, p2: number);
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(2);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
      expect(diffPairs[0].target?.name).toBe('constructor(p1: string, p2: string);');
      expect(diffPairs[1].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[1].location).toBe(DiffLocation.Signature);
      expect(diffPairs[1].reasons).toBe(DiffReasons.Added);
      expect(diffPairs[1].source?.name).toBe('constructor(p2: string, p2: number);');
    });

    test("change name of constructor's parameter", async () => {
      const baselineApiView = `
      export class TestClass {
        constructor(p1: string, p2: string) {}
      }`;
      const currentApiView = `
      export class TestClass {
        constructor(p2: string, p3: string) {}
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(0);
    });

    test("change constructor's parameters list", async () => {
      const baselineApiView = `
      export class TestClass {
        constructor(p1: string, p2: string, p3: string) {}
      }`;
      const currentApiView = `
      export class TestClass {
        constructor(p2: string, p2: string) {}
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(2);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
      expect(diffPairs[0].target?.name).toBe('constructor(p1: string, p2: string, p3: string) {}');
      expect(diffPairs[1].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[1].location).toBe(DiffLocation.Signature);
      expect(diffPairs[1].reasons).toBe(DiffReasons.Added);
      expect(diffPairs[1].source?.name).toBe('constructor(p2: string, p2: string) {}');
    });
  });

  describe('detect classic properties', () => {
    test('add property', async () => {
      const baselineApiView = `
      export class TestClass {
        prop1: string;
      }`;
      const currentApiView = `
      export class TestClass {
        prop1: string;
        prop2: number;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Property);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Added);
      expect(diffPairs[0].source?.name).toBe('prop2');
    });

    test('remove property', async () => {
      const baselineApiView = `
      export class TestClass {
        prop1: string;
        prop2: number;
      }`;
      const currentApiView = `
      export class TestClass {
        prop2: number;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Property);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
      expect(diffPairs[0].target?.name).toBe('prop1');
    });

    test('change classic property type', async () => {
      const baselineApiView = `
      export class TestClass {
        prop1: string;
      }`;
      const currentApiView = `
      export class TestClass {
        prop1: number;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Property);
      expect(diffPairs[0].reasons).toBe(DiffReasons.TypeChanged);
      expect(diffPairs[0].target?.name).toBe('prop1');
    });

    test('change classic property name', async () => {
      const baselineApiView = `
      export class TestClass {
        prop1: string;
      }`;
      const currentApiView = `
      export class TestClass {
        prop2: string;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(2);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Property);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
      expect(diffPairs[0].target?.name).toBe('prop1');
      expect(diffPairs[1].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[1].location).toBe(DiffLocation.Property);
      expect(diffPairs[1].reasons).toBe(DiffReasons.Added);
      expect(diffPairs[1].source?.name).toBe('prop2');
    });

    test('change classic property required to optional (current to baseline)', async () => {
      const baselineApiView = `export class TestClass { prop?: string; }`;
      const currentApiView = `export class TestClass { prop: string; }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Property);
      expect(diffPairs[0].reasons).toBe(DiffReasons.RequiredToOptional);
      expect(diffPairs[0].target?.name).toBe('prop');
    });

    test('change classic property optional to required (current to baseline)', async () => {
      const baselineApiView = `export class TestClass { prop: string; }`;
      const currentApiView = `export class TestClass { prop?: string; }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Property);
      expect(diffPairs[0].reasons).toBe(DiffReasons.OptionalToRequired);
      expect(diffPairs[0].target?.name).toBe('prop');
    });
  });

  describe('detect member functions', () => {
    test('add member function', async () => {
      const baselineApiView = `
      export class TestClass {
      }`;
      const currentApiView = `
      export class TestClass {
        method(param1: string): void;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Added);
      expect(diffPairs[0].source?.name).toBe('method');
    });

    test('remove member function', async () => {
      const baselineApiView = `
      export class TestClass {
        method(param1: string): void;
      }`;
      const currentApiView = `
      export class TestClass {
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
      expect(diffPairs[0].target?.name).toBe('method');
    });

    test('change member function name', async () => {
      const baselineApiView = `
      export class TestClass {
        method1(param1: string): void;
      }`;
      const currentApiView = `
      export class TestClass {
        method2(param1: string): void;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(2);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
      expect(diffPairs[0].target?.name).toBe('method1');
      expect(diffPairs[1].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[1].location).toBe(DiffLocation.Signature);
      expect(diffPairs[1].reasons).toBe(DiffReasons.Added);
      expect(diffPairs[1].source?.name).toBe('method2');
    });

    test('change parameter type of member functions', async () => {
      const baselineApiView = `
      export class TestClass {
        method1(param1: string): void;
      }`;
      const currentApiView = `
      export class TestClass {
        method1(param1: number): void;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Parameter);
      expect(diffPairs[0].reasons).toBe(DiffReasons.TypeChanged);
      expect(diffPairs[0].target?.name).toBe('param1');
    });

    test('change parameter name of member functions', async () => {
      const baselineApiView = `
      export class TestClass {
        method1(param1: string): void;
      }`;
      const currentApiView = `
      export class TestClass {
        method1(paramRenamed: string): void;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(0);
    });

    test('change return node type of member functions', async () => {
      const baselineApiView = `
      export class TestClass {
        method1(param1: string): void;
      }`;
      const currentApiView = `
      export class TestClass {
        method1(param1: string): string;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature_ReturnType);
      expect(diffPairs[0].reasons).toBe(DiffReasons.TypeChanged);
      expect(diffPairs[0].target?.name).toBe('method1');
    });

    test('change parameter count of member functions', async () => {
      const baselineApiView = `
      export class TestClass {
        method1(param1: string, param2: string): void;
      }`;
      const currentApiView = `
      export class TestClass {
        method1(param1: string): void;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature_ParameterList);
      expect(diffPairs[0].reasons).toBe(DiffReasons.CountChanged);
      expect(diffPairs[0].target?.name).toBe('method1');
    });
  });

  describe('detect arrow functions', () => {
    test('add arrow functions', async () => {
      const baselineApiView = `
      export class TestClass {
      }`;
      const currentApiView = `
      export class TestClass {
        method: (param2: number) => void;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Added);
      expect(diffPairs[0].source?.name).toBe('method');
    });

    test('remove arrow functions', async () => {
      const baselineApiView = `
      export class TestClass {
        method: (param2: number) => void;
      }`;
      const currentApiView = `
      export class TestClass {
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
      expect(diffPairs[0].target?.name).toBe('method');
    });

    test('change arrow function name', async () => {
      const baselineApiView = `
      export class TestClass {
        method: (param: number) => void;
      }`;
      const currentApiView = `
      export class TestClass {
        method2: (param: number) => void;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(2);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature);
      expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
      expect(diffPairs[0].target?.name).toBe('method');
      expect(diffPairs[1].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[1].location).toBe(DiffLocation.Signature);
      expect(diffPairs[1].reasons).toBe(DiffReasons.Added);
      expect(diffPairs[1].source?.name).toBe('method2');
    });

    test('change return type of arrow functions', async () => {
      const baselineApiView = `
      export class TestClass {
        method: (param2: number) => void;
      }`;
      const currentApiView = `
      export class TestClass {
        method: (param2: number) => string;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature_ReturnType);
      expect(diffPairs[0].reasons).toBe(DiffReasons.TypeChanged);
      expect(diffPairs[0].target?.name).toBe('method');
    });

    test('change parameter type of arrow functions', async () => {
      const baselineApiView = `
      export class TestClass {
        method: (param: number) => void;
      }`;
      const currentApiView = `
      export class TestClass {
        method: (param: string) => void;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Parameter);
      expect(diffPairs[0].reasons).toBe(DiffReasons.TypeChanged);
      expect(diffPairs[0].target?.name).toBe('param');
    });

    test('change parameter name of arrow functions', async () => {
      const baselineApiView = `
      export class TestClass {
        method: (param: number) => void;
      }`;
      const currentApiView = `
      export class TestClass {
        method: (param2: number) => void;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(0);
    });

    test('change parameter count of arrow functions', async () => {
      const baselineApiView = `
      export class TestClass {
        method: (param2: number, param3: number) => void;
      }`;
      const currentApiView = `
      export class TestClass {
        method: (param2: number) => void;
      }`;

      const astContext = await createTestAstContext(baselineApiView, currentApiView);
      const diffPairs = patchClass('TestClass', astContext, AssignDirection.CurrentToBaseline);
      expect(diffPairs.length).toBe(1);
      expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
      expect(diffPairs[0].location).toBe(DiffLocation.Signature_ParameterList);
      expect(diffPairs[0].reasons).toBe(DiffReasons.CountChanged);
      expect(diffPairs[0].target?.name).toBe('method');
    });
  });
  // TODO: detect static member functions
  // TODO: detect static properties
  // TODO: remove non-public members/functions
});
