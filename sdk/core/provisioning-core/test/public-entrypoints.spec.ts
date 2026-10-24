// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import type {
  ExpressionBrand,
  ExpressionShape,
  ExpressionTag,
  ExpressionValue,
  InferParamType,
  ResourceState,
  ScalarOutputType,
} from "@azure/provisioning-core";
// @ts-expect-error IndexedProxyOf is an implementation detail.
import type { IndexedProxyOf } from "@azure/provisioning-core";

type PublicHelperTypes = [
  ExpressionBrand<unknown>,
  ExpressionShape<unknown>,
  ExpressionTag,
  ExpressionValue<unknown>,
  InferParamType<"string", undefined>,
  ResourceState,
  ScalarOutputType,
];

describe("public entrypoint", () => {
  it("exports helper types required by public declarations", () => {
    const publicHelperTypeCount: PublicHelperTypes["length"] = 7;
    expect(publicHelperTypeCount).toBe(7);
  });

  it("keeps unrelated helper types private", () => {
    const indexedProxy: IndexedProxyOf<never> | undefined = undefined;
    expect(indexedProxy).toBeUndefined();
  });
});
