// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Ensuring the plugin is properly structured
 * @author Arpan Laha
 */

import plugin from "../src";
import { describe, it } from "mocha";
import { assert } from "chai";

/**
 * A list of all currently supported rules
 */
const ruleList = [
  "github-source-headers",
  "ts-apiextractor-json-types",
  "ts-apisurface-standardized-verbs",
  "ts-apisurface-supportcancellation",
  "ts-config-include",
  "ts-doc-internal",
  "ts-error-handling",
  "ts-modules-only-named",
  "ts-naming-drop-noun",
  "ts-naming-options",
  "ts-naming-subclients",
  "ts-no-const-enums",
  "ts-no-window",
  "ts-package-json-author",
  "ts-package-json-bugs",
  "ts-package-json-engine-is-present",
  "ts-package-json-files-required",
  "ts-package-json-homepage",
  "ts-package-json-keywords",
  "ts-package-json-license",
  "ts-package-json-main-is-cjs",
  "ts-package-json-module",
  "ts-package-json-name",
  "ts-package-json-repo",
  "ts-package-json-required-scripts",
  "ts-package-json-sdktype",
  "ts-package-json-sideeffects",
  "ts-package-json-types",
  "ts-pagination-list",
  "ts-use-interface-parameters",
  "ts-use-promises",
  "ts-versioning-semver"
];

/**
 * Verifies that each inputted rule is properly structured
 * @param ruleName the name of the rule to test
 * @param rules the ESLint plugin rules object containing all rule information
 * @throws chai assert errors if the provided rule is not configured properly
 */
const testRule = (ruleName: string, rules: any): void => {
  describe(ruleName, (): void => {
    it(`${ruleName} should be a member of rules`, (): void => {
      assert.property(rules, ruleName, `${ruleName} is not a member of rules`);
    });
    const rule = rules[ruleName];
    describe("meta", (): void => {
      it(`meta should be a member of ${ruleName}`, (): void => {
        assert.property(rule, "meta", `meta is not a member of ${ruleName}`);
      });
      const meta = rule.meta;
      describe("docs", (): void => {
        it("docs should be a member of meta", (): void => {
          assert.property(meta, "docs", "docs is not a member of meta");
        });
        const docs = meta.docs;
        describe("description", (): void => {
          it("description should be a member of docs", (): void => {
            assert.property(docs, "description", "description is not a member of docs");
          });
          const description = docs.description;
          it("description should be a string", (): void => {
            assert.isString(description, "description is not a string");
          });
        });
        describe("category", (): void => {
          it("category should be a member of docs", (): void => {
            assert.property(docs, "category", "category is not a member of docs");
          });
          const category = docs.category;
          it("category should be a string", (): void => {
            assert.isString(category, "category is not a string");
          });
        });
        describe("recommended", (): void => {
          it("recommended should be a member of docs", (): void => {
            assert.property(docs, "recommended", "recommended is not a member of docs");
          });
          const recommended = docs.recommended;
          it("recommended should be a boolean", (): void => {
            assert.isBoolean(recommended, "recommended is not a boolean");
          });
        });
        describe("url", (): void => {
          it("url should be a member of docs", (): void => {
            assert.property(docs, "url", "url is not a member of docs");
          });
          const url = docs.url;
          it("url should be a string", (): void => {
            assert.isString(url, "url is not a string");
          });
        });
      });
      describe("schema", (): void => {
        it("schema should be a member of meta", (): void => {
          assert.property(meta, "schema", "schema is not a member of meta");
        });
        const schema = meta.schema;
        it("schema should be an array", (): void => {
          assert.isArray(schema, "schema is not an array");
        });
      });
    });
    describe("create", (): void => {
      it(`create should be a member of ${ruleName}`, (): void => {
        assert.property(rule, "create", `create is not a member of ${ruleName}`);
      });
      const create = rule.create;
      it("create should be a function", (): void => {
        assert.isFunction(create, "create is not a function");
      });
    });
  });
};

/**
 * Verifies the structure of the plugin
 * @throws chai assert errors if the plugin is not configured properly
 */
describe("plugin", (): void => {
  describe("rules", (): void => {
    it("rules should be a member of the plugin", (): void => {
      assert.property(plugin, "rules", "rules is not a member of the plugin");
    });
    it("the number of rules should match the expected value", (): void => {
      assert.equal(Object.keys(plugin.rules).length, ruleList.length);
    });
    const rules = plugin.rules;
    ruleList.forEach((rule: string): void => {
      testRule(rule, rules);
    });
  });
  describe("processors", (): void => {
    it("processors should a member of the plugin", (): void => {
      assert.property(plugin, "processors", "processors is not a member of the plugin");
    });
    const processors = plugin.processors;
    describe(".json", (): void => {
      it(".json should be a member of processors", (): void => {
        assert.property(processors, ".json", ".json is not a member of processors");
      });
      const JSONProcessor = processors[".json"];
      it("preprocess should be a member of .json", (): void => {
        assert.property(JSONProcessor, "preprocess", "preprocess is not a member of .json");
      });
      it("postprocess should be a member of .json", (): void => {
        assert.property(JSONProcessor, "postprocess", "postprocess is not a member of .json");
      });
    });
  });
  describe("configs", (): void => {
    it("configs should be a member of the plugin", (): void => {
      assert.property(plugin, "configs", "configs is not a member of the plugin");
    });
    const configs = plugin.configs;
    describe("recommended", (): void => {
      it("recommended should be a member of configs", (): void => {
        assert.property(configs, "recommended", "recommended is not a member of configs");
      });
      const recommended = configs.recommended;
      describe("plugins", (): void => {
        it("plugins should be a member of recommended", (): void => {
          assert.property(recommended, "plugins", "plugins is not a member of recommended");
        });
        const plugins = recommended.plugins;
        it("plugins should be an array", (): void => {
          assert.isArray(plugins, "plugins is not an array");
        });
        it("plugins should contain '@azure/azure-sdk'", (): void => {
          assert.include(
            plugins,
            "@azure/azure-sdk",
            "plugins does not contain '@azure/azure-sdk'"
          );
        });
      });
      describe("env", (): void => {
        it("env should be a member of recommended", (): void => {
          assert.property(recommended, "env", "env is not a member of recommended");
        });
        const env = recommended.env;
        it("env should be an object", (): void => {
          assert.isObject(env, "env is not an object");
        });
      });
      describe("parser", (): void => {
        it("parser should be a member of recommended", (): void => {
          assert.property(recommended, "parser", "parser is not a member of recommmended");
        });
        const parser = recommended.parser;
        it("parser should be set to '@typescript-eslint/parser'", (): void => {
          assert.strictEqual(
            parser,
            "@typescript-eslint/parser",
            "parser is not set to '@typescript-eslint/parser'"
          );
        });
      });
      describe("rules", (): void => {
        it("rules should be a member of recommended", (): void => {
          assert.property(recommended, "rules", "rules is not a member of recommended");
        });
        const rules = recommended.rules;
        it("rules should contain settings for every supported rule", (): void => {
          ruleList.forEach((rule: string): void => {
            assert.property(
              rules,
              `@azure/azure-sdk/${rule}`,
              `rules does not contain a setting for ${rule}`
            );
          });
        });
      });
      describe("settings", (): void => {
        it("settings should be a member of recommended", (): void => {
          assert.property(recommended, "settings", "settings is not a member of recommended");
        });
        const settings = recommended.settings;
        describe("main", (): void => {
          it("main should be a member of settings", (): void => {
            assert.property(settings, "main", "main is not a member of settings");
          });
          const main = settings.main;
          it("main should be set to 'src/index.ts'", (): void => {
            assert.strictEqual(main, "src/index.ts", "main is not set to 'src/index.ts'");
          });
        });
      });
    });
  });
});
