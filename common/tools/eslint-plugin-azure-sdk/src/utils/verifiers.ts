// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Helper methods for rules pertaining to JSON object structure
 * @author Arpan Laha
 */

import { ArrayExpression, Literal, ObjectExpression, Property, SpreadElement } from "estree";
import { Rule } from "eslint";

interface StructureData {
  outer: string;
  inner?: string;
  expected?: unknown;
}

interface Verifiers {
  existsInFile: (node: ObjectExpression) => void;
  outerMatchesExpected: (node: Property) => void;
  isMemberOf: (node: Property) => void;
  innerMatchesExpected: (node: Property) => void;
  outerContainsExpected: (node: Property) => void;
}

/**
 * Removes directories from a path
 * @param pathOrFileName the input path or file name
 * @return the filename and extension
 */
export const stripPath = (pathOrFileName: string): string =>
  pathOrFileName.replace(/^.*[\\\/]/, "");

/**
 * Get the directory of a filename
 * @param pathOrFileName the input path or file name
 * @return the directory part of the path, with no trailing slash
 */
export const stripFileName = (pathOrFileName: string): string =>
  pathOrFileName.replace(/[\\\/][^\\\/]+$/, "");

/**
 * Converts an array to its literal string representation.
 * @param array the array in question.
 * @returns the array's string representation.
 */
export const arrayToString = (array: any[]): string => JSON.stringify(array).replace(/,/g, ", ");

/**
 * Returns structural verifiers given input
 * @param context provided ESLint context object
 * @param data matches StructureData interface, contains outer and optional inner and expected values
 * @return existsInFile, outerMatchesExpected, isMemberOf, innerMatchesExpected, and outerContainsExpected verifiers
 */
export const getVerifiers = (context: Rule.RuleContext, data: StructureData): Verifiers => ({
  /**
   * check to see if if the outer key exists at the outermost level
   * @param node the ObjectExpression node we check to see if it contains data.outer as a key
   * @throws an ESLint report if node does not contain data.outer as a key
   */
  existsInFile: (node: ObjectExpression): void => {
    const outer = data.outer;

    const properties = node.properties;

    if (
      properties.every((value: Property | SpreadElement): unknown => {
        if (value.type === "Property") {
          const key = value.key as Literal;
          return key.value !== outer;
        }
        return false;
      })
    ) {
      context.report({
        node: node,
        message: `${outer} does not exist at the outermost level`,
      });
    }
  },

  /**
   * check to see if the value of the outer key matches the expected value
   * @param node the Property node we want to check
   * @throws an ESlint report if node.value is not a literal or is not the expected value
   */
  outerMatchesExpected: (node: Property): void => {
    const outer = data.outer;
    const expected = data.expected;

    // check to see that node value is a Literal before casting
    if (node.value.type !== "Literal") {
      context.report({
        node: node.value,
        message: `${outer} is not set to a literal (string | boolean | null | number | RegExp)`,
      });
    }

    const nodeValue = node.value as Literal;

    // check node value against expected value
    if (nodeValue.value !== expected) {
      context.report({
        node: nodeValue,
        message: `${outer} is set to ${nodeValue.value} when it should be set to ${expected}`,
        fix: (fixer: Rule.RuleFixer): Rule.Fix =>
          fixer.replaceText(
            nodeValue,
            typeof expected === "string" ? `"${expected}"` : (expected as string)
          ),
      });
    }
  },

  /**
   * check that the inner key is a member of the outer key
   * @param node the Property node corresponding to the outer key
   * @throws an ESLint report if the inner key is not a member of the outer key's value
   */
  isMemberOf: (node: Property): void => {
    const outer = data.outer;
    const inner = data.inner;

    const value = node.value as ObjectExpression;
    const properties = value.properties;

    if (
      properties.every((value: Property | SpreadElement): unknown => {
        if (value.type === "Property") {
          const key = value.key as Literal;
          return key.value !== inner;
        }
        return false;
      })
    ) {
      context.report({
        node: value,
        message: `${inner} is not a member of ${outer}`,
      });
    }
  },

  /**
   * check the node corresponding to the inner value to see if it is set to the expected value
   * @param node the Property node corresponding to the inner key
   * @throws an ESLint report if the inner value is not a literal or does not match the expected value
   */
  innerMatchesExpected: (node: Property): void => {
    const outer = data.outer;
    const inner = data.inner;
    const expected = data.expected;

    // check to see that node value is a Literal before casting
    if (node.value.type !== "Literal") {
      context.report({
        node: node.value,
        message: `${outer}.${inner} is not set to a literal (string | boolean | null | number | RegExp)`,
      });
    }

    const nodeValue = node.value as Literal;

    // check node value against expected value
    if (nodeValue.value !== expected) {
      context.report({
        node: nodeValue,
        message: `${outer}.${inner} is set to ${nodeValue.value} when it should be set to ${expected}`,
        fix: (fixer: Rule.RuleFixer): Rule.Fix =>
          fixer.replaceText(
            nodeValue,
            typeof expected === "string" ? `"${expected}"` : (expected as string)
          ),
      });
    }
  },

  /**
   * check the node corresponding to the inner value to see if it contains the expected value
   * @param node the Property node corresponding to the outer key
   * @throws an ESLint repot of the node's value is not an array of literals or does not contain the expectec value(s)
   */
  outerContainsExpected: (node: Property): void => {
    const outer = data.outer;
    const expected = data.expected;

    if (node.value.type !== "ArrayExpression") {
      context.report({
        node: node.value,
        message: `${outer} is not set to an array`,
      });
    }

    const nodeValue = node.value as ArrayExpression;

    const nonLiteral = nodeValue.elements.find(
      (element: any): boolean => element.type !== "Literal"
    );

    if (nonLiteral !== undefined && nonLiteral !== null) {
      context.report({
        node: nonLiteral,
        message: `${outer} contains non-literal (string | boolean | null | number | RegExp) elements`,
      });
    }

    const candidateArray = nodeValue.elements as Literal[];
    const candidateValues = candidateArray.map((candidate: Literal): unknown => candidate.value);

    if (expected instanceof Array) {
      expected.forEach((value: unknown): void => {
        if (!candidateValues.includes(value)) {
          context.report({
            node: nodeValue,
            message: `${outer} does not contain ${value}`,
            fix: (fixer: Rule.RuleFixer): Rule.Fix => {
              candidateValues.push(value);
              return fixer.replaceText(nodeValue, arrayToString(candidateValues));
            },
          });
        }
      });
    } else {
      if (!candidateValues.includes(expected)) {
        context.report({
          node: nodeValue,
          message: `${outer} does not contain ${expected}`,
          fix: (fixer: Rule.RuleFixer): Rule.Fix => {
            candidateValues.push(expected);
            return fixer.replaceText(nodeValue, arrayToString(candidateValues));
          },
        });
      }
    }
  },
});
