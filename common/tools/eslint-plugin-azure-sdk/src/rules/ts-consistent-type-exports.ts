// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Wrapper around @typescript-eslint/consistent-type-exports that ignores
 * export * declarations (ExportAllDeclaration).
 */

import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import type { RuleModule } from "@typescript-eslint/utils/ts-eslint";

type OriginalOptions = [
  {
    fixMixedExportsWithInlineTypeSpecifier?: boolean;
  },
];

type OriginalMessageIds = "multipleExportsAreTypes" | "singleExportIsType" | "typeOverValue";

const originalRule = tseslintPlugin.rules["consistent-type-exports"] as unknown as RuleModule<
  OriginalMessageIds,
  OriginalOptions
>;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule: RuleModule<OriginalMessageIds, OriginalOptions> = {
  ...originalRule,
  meta: {
    ...originalRule.meta,
    docs: {
      ...originalRule.meta.docs,
      description: "Enforce consistent usage of type exports, ignoring export * declarations.",
    },
  },
  create(context) {
    const listeners = originalRule.create(context);
    // Remove the ExportAllDeclaration listener so that `export * from '...'`
    // is never flagged, even when all re-exported symbols are types.
    delete listeners.ExportAllDeclaration;
    return listeners;
  },
};

export default rule;
