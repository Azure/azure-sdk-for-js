import { describe, expect, test } from 'vitest';

import { patchTypeAlias } from '../azure/patch/patch-detection';
import { createTestAstContext } from './utils';
import { DiffLocation, DiffReasons, AssignDirection } from '../azure/common/types';

describe('detect type alias', () => {
  // TODO: detect other types
  test('detect union types', async () => {
    const baselineApiView = `
    export type typesChange = "basic" | "remove";
    export type typesRemove = "basic" | "remove";

    export type typesExpand = string | number;
    export type typesNarrow = string | number | boolean;`;

    const currentApiView = `export type typesChange = "basic" | "rEmove";
    export type typesAdd = "basic" | "rEmove";

    export type typesExpand = string | number | boolean;
    export type typesNarrow = string | number;`;

    const astContext = await createTestAstContext(baselineApiView, currentApiView);
    let diffPairs = patchTypeAlias('typesChange', astContext, AssignDirection.CurrentToBaseline);
    expect(diffPairs.length).toBe(1);
    expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
    expect(diffPairs[0].location).toBe(DiffLocation.TypeAlias);
    expect(diffPairs[0].reasons).toBe(DiffReasons.TypeChanged);
    expect(diffPairs[0].target?.name).toBe('typesChange');

    diffPairs = patchTypeAlias('typesRemove', astContext, AssignDirection.CurrentToBaseline);
    expect(diffPairs.length).toBe(1);
    expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
    expect(diffPairs[0].location).toBe(DiffLocation.TypeAlias);
    expect(diffPairs[0].reasons).toBe(DiffReasons.Removed);
    expect(diffPairs[0].target?.name).toBe('typesRemove');

    diffPairs = patchTypeAlias('typesAdd', astContext, AssignDirection.CurrentToBaseline);
    expect(diffPairs.length).toBe(1);
    expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
    expect(diffPairs[0].location).toBe(DiffLocation.TypeAlias);
    expect(diffPairs[0].reasons).toBe(DiffReasons.Added);
    expect(diffPairs[0].source?.name).toBe('typesAdd');

    diffPairs = patchTypeAlias('typesExpand', astContext, AssignDirection.CurrentToBaseline);
    expect(diffPairs.length).toBe(1);
    expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
    expect(diffPairs[0].location).toBe(DiffLocation.TypeAlias);
    expect(diffPairs[0].reasons).toBe(DiffReasons.TypeChanged);
    expect(diffPairs[0].source?.name).toBe('typesExpand');

    diffPairs = patchTypeAlias('typesNarrow', astContext, AssignDirection.CurrentToBaseline);
    expect(diffPairs.length).toBe(1);
    expect(diffPairs[0].assignDirection).toBe(AssignDirection.CurrentToBaseline);
    expect(diffPairs[0].location).toBe(DiffLocation.TypeAlias);
    expect(diffPairs[0].reasons).toBe(DiffReasons.TypeChanged);
    expect(diffPairs[0].source?.name).toBe('typesNarrow');
  });

  test('detect Record types', async () => {
    const baselineApiView = `export type typesRecord = { [propertyName: string]: string; };`;

    const currentApiView = `export type typesRecord = Record<string, string>;`;
    const astContext = await createTestAstContext(baselineApiView, currentApiView);
    let diffPairs = patchTypeAlias('typesRecord', astContext, AssignDirection.CurrentToBaseline);
    expect(diffPairs.length).toBe(0);
  });
});
