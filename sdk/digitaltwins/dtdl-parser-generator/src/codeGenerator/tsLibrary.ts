// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CodeWriter,
  DependencyGraph,
  TsClass,
  TsClassParams,
  TsEnum,
  TsEnumParams,
  TsFunction,
  TsFunctionParams,
  TsInterface,
  TsInterfaceParams,
  TsMultiLine,
  TsTypeAlias,
  TsTypeAliasParams,
  pascalToCamel
} from "./internal";
import fs from "fs";

const FILE_EXTENSION = ".ts";
const DIR_SEP = "/";
const COPYRIGHT_TEXT =
  "// Copyright (c) Microsoft Corporation.\r\n// Licensed under the MIT license.";

type TsLibraryObject = TsFunction | TsClass | TsEnum | TsInterface | TsTypeAlias;

/**
 * Class that is responsible for writing generated code to files.
 */
export class TsLibrary {
  private _outputDirectory: string;
  private _tsDataStructures: TsLibraryObject[];
  private _libraryHeader?: TsMultiLine;
  private _dependencyGraph: DependencyGraph;

  constructor(outputDir: string) {
    this._outputDirectory = outputDir;

    this._tsDataStructures = [];
    this._dependencyGraph = new DependencyGraph();
  }

  libraryHeader(text: string): TsMultiLine {
    if (this._libraryHeader !== undefined) {
      throw new Error("Cannot overwrite existing library header");
    }
    const tsMultiLine = new TsMultiLine(text);
    this._libraryHeader = tsMultiLine;
    return tsMultiLine;
  }

  class(input: TsClassParams): TsClass {
    const tsClass = new TsClass(input);
    this._tsDataStructures.push(tsClass);
    this._dependencyGraph.addNode(tsClass.name);
    if (tsClass.inheritance !== undefined) {
      tsClass.inheritance.forEach((element) => {
        if (Array.isArray(element.name)) {
          element.name.forEach((elementName) => {
            this._dependencyGraph.addDirectedEdge(tsClass.name, elementName);
          });
        } else {
          this._dependencyGraph.addDirectedEdge(tsClass.name, element.name);
        }
      });
    }
    return tsClass;
  }

  function(input: TsFunctionParams): TsFunction {
    const tsFunction = new TsFunction(input);
    this._tsDataStructures.push(tsFunction);
    this._dependencyGraph.addNode(tsFunction.name);
    return tsFunction;
  }

  typeAlias(input: TsTypeAliasParams): TsTypeAlias {
    const tsTypeAlias = new TsTypeAlias(input);
    this._tsDataStructures.push(tsTypeAlias);
    this._dependencyGraph.addNode(tsTypeAlias.name);
    return tsTypeAlias;
  }

  enum(input: TsEnumParams): TsEnum {
    const tsEnum = new TsEnum(input);
    this._tsDataStructures.push(tsEnum);
    this._dependencyGraph.addNode(tsEnum.name);
    return tsEnum;
  }

  interface(input: TsInterfaceParams): TsInterface {
    const tsInterface = new TsInterface(input);
    this._tsDataStructures.push(tsInterface);
    this._dependencyGraph.addNode(tsInterface.name);
    return tsInterface;
  }

  sortedDependencies(): string[] {
    return this._dependencyGraph.topologicalSort();
  }

  generateInternalFile(): string {
    // generate internal.ts file
    const internalFilePath = this._outputDirectory + DIR_SEP + "internal" + FILE_EXTENSION;
    const codeWriter = new CodeWriter(internalFilePath);
    codeWriter.writeLine(COPYRIGHT_TEXT);
    codeWriter.break();
    this.sortedDependencies().forEach((typeName) => {
      const fileName = pascalToCamel(typeName);
      codeWriter.writeLine(`export * from './${fileName}';`);
    });

    return internalFilePath;
  }

  generateIndexForGenerated(): string {
    const indexFilePath = this._outputDirectory + DIR_SEP + "index.ts";
    const codeWriterIndex = new CodeWriter(indexFilePath);
    codeWriterIndex.writeLine(COPYRIGHT_TEXT);
    codeWriterIndex.break();
    codeWriterIndex.writeLine(`export * from './internal';`);
    return indexFilePath;
  }

  generateFiles(generateInternal?: boolean): string[] {
    const filePaths: string[] = [];
    if (!fs.existsSync(this._outputDirectory)) {
      fs.mkdirSync(this._outputDirectory);
    }
    if (generateInternal) {
      filePaths.push(this.generateInternalFile());
      filePaths.push(this.generateIndexForGenerated());
    }
    this._tsDataStructures.forEach((type) => {
      const typeName = type.name;
      const fileName = pascalToCamel(typeName) + FILE_EXTENSION;
      const filePath = this._outputDirectory + DIR_SEP + fileName;
      filePaths.push(filePath);
      const codeWriter = new CodeWriter(filePath);

      if (this._libraryHeader !== undefined) {
        this._libraryHeader.generateCode(codeWriter);
        codeWriter.break();
      } else {
        // TODO no-empty and no-unused-vars not needed once full parser generation works.
        // Expected putput of unit Tests have been chnaged to pass as well.
        codeWriter.writeLine(COPYRIGHT_TEXT);
        codeWriter.writeLine("/* eslint-disable valid-jsdoc */");
        codeWriter.writeLine("/* eslint-disable guard-for-in */");
        codeWriter.writeLine("/* eslint-disable no-empty */");
        codeWriter.writeLine("/* eslint-disable no-unused-vars */");
        codeWriter.writeLine("/* eslint-disable sort-imports */");
        codeWriter.break();
      }
      type.generateCode(codeWriter);
    });

    return filePaths;
  }
}
