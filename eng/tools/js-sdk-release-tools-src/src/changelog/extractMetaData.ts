import * as openapiToolsCommon from "@azure-tools/openapi-tools-common";
import { FunctionDeclaration, TypescriptParser } from "parse-ts-to-ast";
import {
  ClassDeclaration,
  EnumDeclaration,
  InterfaceDeclaration,
  TypeAliasDeclaration,
} from "parse-ts-to-ast";
import { changelogGenerator } from "./changelogGenerator.js";
import { logger } from "../utils/logger.js";
import { SDKType } from "../common/types.js";
import { createAstContext } from "typescript-codegen-breaking-change-detector";
import { mkdirp, remove } from "fs-extra";

export class TSExportedMetaData {
  public typeAlias = {};
  public operationInterface = {};
  public modelInterface = {};
  public enums = {};
  public classes = {};
  public functions = {};
}

const readMeReader = async (mdFilePath: string) => {
  const content = (await openapiToolsCommon.readFile(mdFilePath)).toString();
  const readMe = openapiToolsCommon.parseMarkdown(content);
  const tsExports = new Set<string>();
  for (const c of openapiToolsCommon.iterate(readMe.markDown)) {
    if (c.type === "code_block" && c.info !== null && c.info === "ts" && c.literal !== null) {
      tsExports.add(c.literal);
    }
  }
  return tsExports;
};

const extractMetaData = async (code: string, metaData: TSExportedMetaData) => {
  const tsParser = new TypescriptParser();
  const parsed = await tsParser.parseSource(code);
  parsed.declarations.forEach((declartion) => {
    if (declartion instanceof TypeAliasDeclaration) {
      metaData.typeAlias[declartion.name] = declartion;
    } else if (declartion instanceof EnumDeclaration) {
      metaData.enums[declartion.name] = declartion;
    } else if (declartion instanceof ClassDeclaration) {
      metaData.classes[declartion.name] = declartion;
      // for new typespec-typescript generated api view, it uses prop: () => {} instead of func(): type {}, so we can only tell by interface whether end with "Operations"
    } else if (declartion instanceof InterfaceDeclaration) {
      if (declartion.properties.length === 0 && declartion.methods.length > 0) {
        metaData.operationInterface[declartion.name] = declartion;
      } else if (declartion.name.endsWith("Operations")) {
        metaData.operationInterface[declartion.name] = declartion;
      } else {
        metaData.modelInterface[declartion.name] = declartion;
      }
    } else if (declartion instanceof FunctionDeclaration) {
      metaData.functions[declartion.name] = declartion;
    }
  });
};

export const readSourceAndExtractMetaData = async (mdFilePath: string) => {
  const metaData = new TSExportedMetaData();
  const tsExports = await readMeReader(mdFilePath);
  for (const t of tsExports) {
    await extractMetaData(t, metaData);
  }
  return metaData;
};

export const extractExportAndGenerateChangelog = async (
  mdFilePathOld: string,
  mdFilePathNew: string,
  oldSdkType: SDKType,
  newSdkType: SDKType,
) => {
  const metaDataOld = await readSourceAndExtractMetaData(mdFilePathOld);
  const metaDataNew = await readSourceAndExtractMetaData(mdFilePathNew);

  try {
    await mkdirp("./tmp-patch");
    const astContext = await createAstContext(
      { path: mdFilePathOld },
      { path: mdFilePathNew },
      "./tmp-patch",
    );
    const changeLog = changelogGenerator(
      metaDataOld,
      metaDataNew,
      oldSdkType,
      newSdkType,
      astContext,
    );
    logger.info("Generated changelog successfully:");
    logger.info(changeLog.displayChangeLog());
    return changeLog;
  } finally {
    await remove("./tmp-patch");
  }
};
