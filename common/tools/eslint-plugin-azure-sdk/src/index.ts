// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import processors from "./processors";
import rules from "./rules";
import { name, version } from "../package.json";

import azsdkConfigs from "./configs/index";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

const plugin: Omit<FlatConfig.Plugin, "configs"> = {
  meta: {
    name,
    version,
  },
  processors,
  rules,
};

// assign configs here so we can reference `plugin`
const configs = azsdkConfigs(plugin);

// helper to ensure azure sdk markdown rules are not overridden by custom rules
function config(customConfigs?: FlatConfig.ConfigArray) {
  const updated = customConfigs?.length
    ? customConfigs.map((rule) => {
        if (!rule.files) {
          return rule;
        }

        const containsMarkdownFiles = (patterns: (string | string[])[]) => {
          if (Array.isArray(patterns) && patterns.some((p) => p.includes("/*.md/"))) {
            return true;
          } else if (patterns.includes("/*.md/")) {
            return true;
          }

          return false;
        };
        // is the rule for *.md?
        if (containsMarkdownFiles(rule.files)) {
          return rule;
        }

        return {
          ...rule,
          ignores: [...(rule.ignores ?? []), "**/*.md/*.ts", "**/*.md/*.js", "**/*.md/*.json"],
        };
      })
    : [];

  return [
    ...configs.recommended,
    ...updated,
    {
      ignores: ["**/test/snippets.spec.ts", "**/test/stress"],
    },
  ];
}

export = {
  ...plugin,
  configs,
  config,
};
