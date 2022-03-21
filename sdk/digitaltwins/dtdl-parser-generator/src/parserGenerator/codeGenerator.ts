// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */

import * as fs from "fs";
import { MaterialClassGenerator } from "./materialClassGenerator";
import { TsLibrary } from "../codeGenerator/tsLibrary";
import { TypeGenerator } from "./typeGenerator";
import { BaseKindEnumGenerator } from "./baseKindEnumGenerator";
import { MaterialClassDigest, MetamodelDigest } from "./metamodelDigest";
import { SupplementalTypeInfoGenerator } from "./supplementalTypeInfoGenerator";
import { ModelGenerator } from "./modelGenerator";
import { PartitionTypeCollectionGenerator } from "./partitionTypeCollectionGenerator";
import { HelpersGenerator } from "./helpersGenerator";
import { AggregateContextGenerator } from "./aggregateContextGenerator";
import { StandardElementsGenerator } from "./standardElementsGenerator";
import { ParsedObjectPropertyInfoGenerator } from "./parsedObjectPropertyInfoGenerator";
import { ModelParserGenerator } from "./modelParserGenerator";
import { ModelDictGenerator } from "./modelDictGenerator";
import { RootableTypeCollectionGenerator } from "./rootableTypeCollectionGenerator";
import { IdValidatorGenerator } from "./idValidatorGenerator";
import { MaterialTypeNameCollectionGenerator } from "./materialTypeNameCollectionGenerator";
import { ExtensionKindEnumGenerator } from "./extensionKindEnumGenerator";
import { SupplementalTypeCollectionGenerator } from "./supplementalTypeCollectionGenerator";
import { DescendantControl } from "./obverseGenerator/descendantControl";
import { NameFormatter } from "./nameFormatter";
import { DescendantControlFactory } from "./obverseGenerator/descendantControlFactory";
import { ExtensibleMaterialClass } from "./obverseGenerator/extensibleMaterialClass";
import { SupplementalPropertyInfoGenerator } from "./supplementalPropertyInfoGenerator";

export class CodeGenerator {
  public static execute(inputDigest: string, outputDirectory: string, _dtdlVersion: string): void {
    fs.readFile(inputDigest, (err: Error | null, rawMetamodelDigest: Buffer) => {
      if (err) throw err;
      const parsedMetamodelDigest = JSON.parse(rawMetamodelDigest.toString()) as MetamodelDigest;
      const baseClassName = parsedMetamodelDigest.baseClass;
      if (!baseClassName) throw new Error("Cannot find base class name");

      const materialClassesObject = parsedMetamodelDigest.materialClasses;
      const parserLib = new TsLibrary(outputDirectory);

      const typeGenerators: TypeGenerator[] = [];
      typeGenerators.push(
        new AggregateContextGenerator(
          parsedMetamodelDigest.contexts,
          parsedMetamodelDigest.dtdlVersionsAllowingLocalTerms,
          parsedMetamodelDigest.affiliateContextsImplicitDtdlVersions
        )
      );
      typeGenerators.push(new HelpersGenerator(baseClassName));
      typeGenerators.push(
        new StandardElementsGenerator(baseClassName, parsedMetamodelDigest.elements)
      );
      typeGenerators.push(new ParsedObjectPropertyInfoGenerator(parsedMetamodelDigest.baseClass));
      // partitionRestrictions is something approved for DTDL v3, and only one partition restriction restriction exists.
      typeGenerators.push(
        new ModelGenerator(
          baseClassName,
          parsedMetamodelDigest.partitionClasses,
          parsedMetamodelDigest.partitionRestrictions
        )
      );
      typeGenerators.push(new ModelParserGenerator(baseClassName));
      // This is a type definition specific to the Node.js structure of model parser
      typeGenerators.push(new ModelDictGenerator(baseClassName));
      typeGenerators.push(new SupplementalTypeInfoGenerator(baseClassName));
      typeGenerators.push(new SupplementalPropertyInfoGenerator());
      // This is ModelPartitionCollectionGenerator
      typeGenerators.push(
        new PartitionTypeCollectionGenerator(parsedMetamodelDigest.partitionClasses)
      );
      typeGenerators.push(
        new RootableTypeCollectionGenerator(parsedMetamodelDigest["rootableClasses"])
      );
      typeGenerators.push(
        new IdValidatorGenerator(
          parsedMetamodelDigest["identifierDefinition"],
          parsedMetamodelDigest["identifierReference"]
        )
      );
      typeGenerators.push(
        new MaterialTypeNameCollectionGenerator(
          Object.keys(parsedMetamodelDigest["materialClasses"]),
          Object.values(parsedMetamodelDigest["contexts"])
        )
      );
      typeGenerators.push(new BaseKindEnumGenerator(baseClassName, materialClassesObject));
      typeGenerators.push(new ExtensionKindEnumGenerator(parsedMetamodelDigest["extensionKinds"]));
      typeGenerators.push(
        new SupplementalTypeCollectionGenerator(
          parsedMetamodelDigest["supplementalTypes"],
          parsedMetamodelDigest["contexts"],
          parsedMetamodelDigest["extensibleMaterialClasses"],
          baseClassName
        )
      );

      typeGenerators.push(...this._generateMaterialClasses(parsedMetamodelDigest));

      typeGenerators.forEach((typeGen) => {
        typeGen.generateType(parserLib);
      });
      parserLib.generateFiles(true);

      return true;
    });
  }

  private static _generateMaterialClasses(metamodelDigest: MetamodelDigest): TypeGenerator[] {
    const baseKindEnum = NameFormatter.formatNameAsEnum(metamodelDigest.baseClass);
    const baseKindProperty = NameFormatter.formatNameAsEnumProperty(metamodelDigest.baseClass);

    const extensibleMaterialClasses: { [x: string]: ExtensibleMaterialClass[] } = {};
    for (const [key, value] of Object.entries(metamodelDigest.extensibleMaterialClasses)) {
      extensibleMaterialClasses[key] = [];
      for (const extensibleMaterialClassName of value) {
        // TODO: This type coercsion seems bad... maybe we should make the dictionary in metamodelDigest into a mapping?
        extensibleMaterialClasses[key].push(
          new ExtensibleMaterialClass(
            (key as unknown) as number,
            extensibleMaterialClassName,
            baseKindEnum
          )
        );
      }
    }

    const descendantControls: DescendantControl[] = [];
    const descendantControlFactory = new DescendantControlFactory(baseKindEnum, baseKindProperty);
    for (const descendantControlDigest of metamodelDigest.descendantControls) {
      const descendantControl = descendantControlFactory.create(descendantControlDigest);
      descendantControls.push(...descendantControl);
    }

    // creation of material classes as type generators which will be consumed later by the model parser.
    const typeGenerators: TypeGenerator[] = [];
    for (const [key, value] of Object.entries(metamodelDigest.materialClasses)) {
      typeGenerators.push(
        new MaterialClassGenerator({
          rawTypeName: key,
          rawBaseType: metamodelDigest.baseClass,
          materialClassDigest: value as MaterialClassDigest,
          contexts: metamodelDigest.contexts,
          identifierDefinitions: metamodelDigest.identifierDefinition,
          descendantControls: descendantControls,
          extensibleMaterialClasses: extensibleMaterialClasses
        })
      );
    }
    typeGenerators.push(
      new MaterialClassGenerator({
        rawTypeName: "Reference",
        rawBaseType: metamodelDigest.baseClass,
        materialClassDigest: CodeGenerator._createEmptyDigest(),
        contexts: metamodelDigest.contexts,
        identifierDefinitions: metamodelDigest.identifierDefinition,
        descendantControls: descendantControls,
        extensibleMaterialClasses: extensibleMaterialClasses
      })
    );

    return typeGenerators;
  }

  private static _createEmptyDigest(): MaterialClassDigest {
    const emptyDigest = {
      dtdlVersions: [],
      abstract: false,
      overt: false,
      partition: false,
      parentClass: "Entity",
      typeOptionalVersions: [],
      idRequiredVersions: [],
      typeIds: [],
      concreteSubclasses: {},
      elementalSubclasses: {},
      elements: {},
      extensibleMaterialSubclasses: {},
      standardElementIds: {},
      badTypeCauseFormat: {},
      badTypeActionFormat: {},
      properties: {},
      instance: { criteriaText: "" }
    };
    return emptyDigest;
  }
}
