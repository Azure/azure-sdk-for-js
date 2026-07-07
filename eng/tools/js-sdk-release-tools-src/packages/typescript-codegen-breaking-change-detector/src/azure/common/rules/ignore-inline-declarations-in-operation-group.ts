import {
  CreateOperationRule,
  InlineDeclarationNameSetMessage,
  NodeContext,
  ParseForESLintResult,
  RuleMessageKind,
} from '../types';
import { RuleListener, getParserServices } from '@typescript-eslint/utils/eslint-utils';
import {
  convertToMorphNode,
  findAllRenameAbleDeclarationsInNode,
  findDeclaration,
  getGlobalScope,
  isInterfaceDeclarationNode,
  isParseServiceWithTypeInfo,
} from '../../../utils/ast-utils';

import { ParserServicesWithTypeInformation } from '@typescript-eslint/typescript-estree';
import { RuleContext } from '@typescript-eslint/utils/ts-eslint';
import { Scope } from '@typescript-eslint/scope-manager';
import { createOperationRuleListener } from '../../utils/azure-rule-utils';
import { getSettings } from '../../../utils/common-utils';
import { ignoreInlineDeclarationsInOperationGroup } from '../../../common/models/rules/rule-ids';

function getInlineDeclarationNameSet(service: ParserServicesWithTypeInformation, scope: Scope) {
  const inlineDeclarationMap = new Map<string, NodeContext>();
  const routes = findDeclaration('Routes', scope, isInterfaceDeclarationNode);
  const moNode = convertToMorphNode(routes, service);
  const result = findAllRenameAbleDeclarationsInNode(moNode, scope, service);
  result.interfaces.forEach((i) => inlineDeclarationMap.set(i.getName(), { node: i, used: false }));
  result.typeAliases.forEach((t) => inlineDeclarationMap.set(t.getName(), { node: t, used: false }));
  result.enums.forEach((e) => inlineDeclarationMap.set(e.getName(), { node: e, used: false }));
  return inlineDeclarationMap;
}

const rule: CreateOperationRule = (baselineParsedResult: ParseForESLintResult | undefined) => {
  if (!baselineParsedResult)
    throw new Error(`ParseForESLintResult is required in ${ignoreInlineDeclarationsInOperationGroup} rule`);
  const baselineService = baselineParsedResult.services;
  if (!isParseServiceWithTypeInfo(baselineService)) {
    throw new Error(`Failed to get ParserServicesWithTypeInformation. It indicates the parser configuration is wrong.`);
  }
  const baselineGlobalScope = getGlobalScope(baselineParsedResult.scopeManager);
  const baselineInlineDeclarationNameSet = getInlineDeclarationNameSet(baselineService, baselineGlobalScope);

  return createOperationRuleListener(
    ignoreInlineDeclarationsInOperationGroup,
    (context: RuleContext<string, readonly unknown[]>): RuleListener => {
      const currentService = getParserServices(context);
      const currentGlobalScope = getGlobalScope(context.sourceCode.scopeManager);
      const currentInlineDeclarationMap = getInlineDeclarationNameSet(currentService, currentGlobalScope);
      const message: InlineDeclarationNameSetMessage = {
        id: ignoreInlineDeclarationsInOperationGroup,
        baseline: baselineInlineDeclarationNameSet,
        current: currentInlineDeclarationMap,
        kind: RuleMessageKind.InlineDeclarationNameSetMessage,
      };
      getSettings(context).reportInlineDeclarationNameSetMessage(message);
      return {};
    }
  );
};
export default rule;
