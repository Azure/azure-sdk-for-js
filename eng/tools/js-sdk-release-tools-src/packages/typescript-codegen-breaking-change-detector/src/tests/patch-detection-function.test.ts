import { describe, expect, test } from 'vitest';

import { patchFunction } from '../azure/patch/patch-detection';
import { createTestAstContext } from './utils';
import { DiffLocation, DiffReasons, AssignDirection } from '../azure/common/types';
import { Project, SyntaxKind } from 'ts-morph';

describe('detect functions', () => {
  test('detect function overloads', async () => {
    const baselineApiView = `
    export interface A {a: string;}
    export interface B {b: string;}
    export interface C {c: string;}
    export interface D {d: string;}
    export function isUnexpected(response: A | B): response is A;
    export function isUnexpected(response: C | D): response is A;`;

    const currentApiView = `
    export interface A {a: string;}
    export interface B {b: string;}
    export interface C {c: string;}
    export interface D {d: string;}
    export function isUnexpected(response: A | B): response is A;
    export function isUnexpected(response: C | E): response is C;`;

    const astContext = await createTestAstContext(baselineApiView, currentApiView);
    let diffPairs = patchFunction('isUnexpected', astContext);

    expect(diffPairs.find((p) => p.assignDirection !== AssignDirection.CurrentToBaseline)).toBeUndefined();
    expect(diffPairs.length).toBe(2);

    expect(diffPairs[0].location).toBe(DiffLocation.Signature_Overload);
    expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);

    expect(diffPairs[1].location).toBe(DiffLocation.Signature_Overload);
    expect(diffPairs[1].reasons).toBe(DiffReasons.Added);
  });

  test('detect function', async () => {
    const baselineApiView = `
    export function funcBasic(a: string): string
    export function funcReturnType(a: string): string
    export function funcParameterCount(a: string, b: string): string
    export function funcParameterType(a: string): string
    export function funcRemove(a: string): string`;

    const currentApiView = `
    export function funcBasic(a: string): string
    export function funcReturnType(a: string): number
    export function funcParameterCount(a: string, b: string, c: string): string
    export function funcParameterType(a: number): string
    export function funcAdd(a: string): string`;

    const astContext = await createTestAstContext(baselineApiView, currentApiView);

    let diffPairs = patchFunction('funcBasic', astContext);
    expect(diffPairs.find((p) => p.assignDirection !== AssignDirection.CurrentToBaseline)).toBeUndefined();
    expect(diffPairs.length).toBe(0);

    diffPairs = patchFunction('funcReturnType', astContext);
    expect(diffPairs.find((p) => p.assignDirection !== AssignDirection.CurrentToBaseline)).toBeUndefined();
    expect(diffPairs.length).toBe(1);
    expect(diffPairs[0].reasons).toBe(DiffReasons.TypeChanged);
    expect(diffPairs[0].location).toBe(DiffLocation.Signature_ReturnType);
    expect(diffPairs[0].target?.name).toBe('funcReturnType');

    diffPairs = patchFunction('funcParameterCount', astContext);
    expect(diffPairs.find((p) => p.assignDirection !== AssignDirection.CurrentToBaseline)).toBeUndefined();
    expect(diffPairs.length).toBe(1);
    expect(diffPairs[0].reasons).toBe(DiffReasons.CountChanged);
    expect(diffPairs[0].location).toBe(DiffLocation.Signature_ParameterList);
    expect(diffPairs[0].target?.name).toBe('funcParameterCount');

    diffPairs = patchFunction('funcParameterType', astContext);
    expect(diffPairs.find((p) => p.assignDirection !== AssignDirection.CurrentToBaseline)).toBeUndefined();
    expect(diffPairs.length).toBe(1);
    expect(diffPairs[0].reasons).toBe(DiffReasons.TypeChanged);
    expect(diffPairs[0].location).toBe(DiffLocation.Parameter);
    expect(diffPairs[0].target?.name).toBe('a');

    diffPairs = patchFunction('funcRemove', astContext);
    expect(diffPairs.find((p) => p.assignDirection !== AssignDirection.CurrentToBaseline)).toBeUndefined();
    expect(diffPairs.length).toBe(1);
    expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
    expect(diffPairs[0].location).toBe(DiffLocation.Signature);
    expect(diffPairs[0].target?.name).toBe('funcRemove');

    diffPairs = patchFunction('funcAdd', astContext);
    expect(diffPairs.find((p) => p.assignDirection !== AssignDirection.CurrentToBaseline)).toBeUndefined();
    expect(diffPairs.length).toBe(1);
    expect(diffPairs[0].reasons).toBe(DiffReasons.Added);
    expect(diffPairs[0].location).toBe(DiffLocation.Signature);
    expect(diffPairs[0].source?.name).toBe('funcAdd');
  });
});
