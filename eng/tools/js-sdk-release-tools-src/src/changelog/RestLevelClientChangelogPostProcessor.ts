import { Changelog, ChangelogItem } from "./changelogGenerator.js";
import {
  InlineDeclarationNameSetMessage,
  NodeContext,
} from "typescript-codegen-breaking-change-detector";

export class RestLevelClientChangelogPostProcessor {
  private changelog: Changelog;
  private message: InlineDeclarationNameSetMessage;
  constructor(changelog: Changelog, message: InlineDeclarationNameSetMessage) {
    this.changelog = changelog;
    this.message = message;
  }

  public run() {
    this.handleChangelogItems(this.changelog.addedOperationGroup);
    this.handleChangelogItems(this.changelog.removedOperationGroup);
    this.handleChangelogItems(this.changelog.addedOperation);
    this.handleChangelogItems(this.changelog.addedInterface);
    this.handleChangelogItems(this.changelog.addedClass);
    this.handleChangelogItems(this.changelog.addedTypeAlias);
    this.handleChangelogItems(this.changelog.interfaceAddOptionalParam);
    this.handleChangelogItems(this.changelog.interfaceParamTypeExtended);
    this.handleChangelogItems(this.changelog.typeAliasAddInherit);
    this.handleChangelogItems(this.changelog.typeAliasAddParam);
    this.handleChangelogItems(this.changelog.addedEnum);
    this.handleChangelogItems(this.changelog.addedEnumValue);
    this.handleChangelogItems(this.changelog.addedFunction);
    this.handleChangelogItems(this.changelog.removedOperation);
    this.handleChangelogItems(this.changelog.operationSignatureChange);
    this.handleChangelogItems(this.changelog.deletedClass);
    this.handleChangelogItems(this.changelog.classSignatureChange);
    this.handleChangelogItems(this.changelog.interfaceParamDelete);
    this.handleChangelogItems(this.changelog.interfaceParamAddRequired);
    this.handleChangelogItems(this.changelog.interfaceParamTypeChanged);
    this.handleChangelogItems(this.changelog.interfaceParamChangeRequired);
    this.handleChangelogItems(this.changelog.classParamDelete);
    this.handleChangelogItems(this.changelog.classParamChangeRequired);
    this.handleChangelogItems(this.changelog.typeAliasDeleteInherit);
    this.handleChangelogItems(this.changelog.typeAliasParamDelete);
    this.handleChangelogItems(this.changelog.typeAliasAddRequiredParam);
    this.handleChangelogItems(this.changelog.typeAliasParamChangeRequired);
    this.handleChangelogItems(this.changelog.removedEnum);
    this.handleChangelogItems(this.changelog.removedEnumValue);
    this.handleChangelogItems(this.changelog.removedFunction);
  }

  private getCurrentNodeContext(name: string | undefined): NodeContext | undefined {
    if (!name) return undefined;
    return this.message.current.get(name);
  }

  private getBaselineNodeContext(name: string | undefined): NodeContext | undefined {
    if (!name) return undefined;
    return this.message.baseline.get(name);
  }

  private findCompatibleNodeContext(
    inputContext: NodeContext,
    contextMapToFind: Map<string, NodeContext>,
  ): NodeContext | undefined {
    for (const [_, foundContext] of contextMapToFind) {
      const isCompatibleFromInputToFound = inputContext.node
        .getType()
        .isAssignableTo(foundContext.node.getType());
      const isCompatibleFromFoundToInput = foundContext.node
        .getType()
        .isAssignableTo(inputContext.node.getType());
      if (isCompatibleFromInputToFound && isCompatibleFromFoundToInput) return foundContext;
    }
    return undefined;
  }

  private tryIgnoreInlineTypeInChangelogItem(
    inputContext: NodeContext,
    nodeContextMapToFind: Map<string, NodeContext>,
    item: ChangelogItem,
  ) {
    if (!inputContext) return;
    const foundContext = this.findCompatibleNodeContext(inputContext, nodeContextMapToFind);
    if (foundContext) {
      inputContext.used = true;
      foundContext.used = true;
      item.toDelete = true;
    }
    return;
  }

  private handleChangelogItems(items: ChangelogItem[]) {
    items.forEach((item) => {
      if (!item.oldName && !item.newName) return;

      if (item.newName && item.oldName) {
        const currentContext = this.getCurrentNodeContext(item.newName);
        if (!currentContext) return;
        const baselineContext = this.getBaselineNodeContext(item.oldName);
        if (!baselineContext) return;
        const currentType = currentContext.node.getType();
        const baselineType = baselineContext.node.getType();
        if (currentType.isAssignableTo(baselineType)) {
          item.toDelete = true;
          currentContext.used = true;
          baselineContext.used = true;
        }
        return;
      }

      if (item.newName) {
        const inputContext = this.getCurrentNodeContext(item.newName);
        if (!inputContext) return;
        this.tryIgnoreInlineTypeInChangelogItem(inputContext, this.message.baseline, item);
        return;
      }

      // item.oldName exists
      const inputContext = this.getBaselineNodeContext(item.oldName);
      if (!inputContext) return;
      this.tryIgnoreInlineTypeInChangelogItem(inputContext, this.message.current, item);
      return;
    });
  }
}
