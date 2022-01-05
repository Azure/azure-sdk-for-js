// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require client methods to use standardized verb prefixes and suffixes where possible.
 * @author Arpan Laha
 */

import { ClassDeclaration, Identifier, MethodDefinition } from "estree";
import { getPublicMethods, getRuleMetaData } from "../utils";
import { Rule } from "eslint";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * A list of regexes corresponding to banned verb prefixes
 * Needs updating as definitions change
 */

const bannedPrefixes = [
  "make",
  "updateOrInsert",
  "insertOrUpdate",
  "push",
  "pop",
  "getAll",
  "erase",
  "fetch",
];

export = {
  meta: getRuleMetaData(
    "ts-apisurface-standardized-verbs",
    "require client methods to use standardized verb prefixes and suffixes where possible"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener =>
    ({
      // callback functions

      // call on Client classes
      "ClassDeclaration[id.name=/Client$/]": (node: ClassDeclaration): void => {
        getPublicMethods(node).forEach((method: MethodDefinition): void => {
          const key = method.key as Identifier;
          const methodName = key.name;

          // look for if any of the banned prefixes are used
          const usedPrefix = bannedPrefixes.find((bannedPrefix: string): boolean =>
            methodName.startsWith(bannedPrefix)
          );
          if (usedPrefix !== undefined) {
            context.report({
              node: method,
              message: `method ${methodName} uses the banned prefix ${usedPrefix}, use one of the approved prefixes instead`,
            });
          }
        });
      },
    } as Rule.RuleListener),
};
