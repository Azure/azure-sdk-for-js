// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable sort-imports */

import { TsAccess, TsClass, TsFunction, TsInterface, TsScope } from "../../codeGenerator";
import { NameFormatter } from "../nameFormatter";

export class MaterialClassPartitioner {
  // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
  static generateConstructorCode(scope: TsScope, classIsPartition: boolean): void {
    scope.line(`this.isPartition = ${classIsPartition}`);
  }

  static addMembers(
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    obverseClass: TsClass,
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    _obverseInterface: TsInterface,
    typeName: string,
    classIsPartition: boolean,
    _classIsBase: boolean
  ): void {
    obverseClass.field({ name: "isPartition", type: "boolean", access: TsAccess.Public });

    const setPartitionInfoMethod: TsFunction = obverseClass.method({
      name: "setPartitionInfo",
      returnType: "void"
    });
    setPartitionInfoMethod.summary(`Set partition information.`);
    setPartitionInfoMethod.parameter({
      name: "partitionJsonText",
      type: "string",
      description: "A string containing the partition JSON text"
    });
    if (classIsPartition) {
      setPartitionInfoMethod.body.line(`this.partitionJsonText = partitionJsonText;`);
    } else {
      setPartitionInfoMethod.body.line(
        `throw new Error(\`attempt to set partition info on non-partition type ${NameFormatter.formatNameAsInterface(
          typeName
        )}\`);`
      );
    }

    if (classIsPartition) {
      obverseClass.field({
        name: "partitionJsonText",
        type: "string | undefined",
        access: TsAccess.Private
      });

      const getJsonLdTextMethod: TsFunction = obverseClass.method({
        name: "getJsonLdText",
        returnType: "string"
      });
      getJsonLdTextMethod.summary(
        `Gets a JSON string that holds the portion of the DTDL model that defines this ${typeName}.`
      );
      getJsonLdTextMethod.body.line(`return this.partitionJsonText || '';`);

      const getJsonLdMethod: TsFunction = obverseClass.method({
        name: "getJsonLd",
        returnType: "any"
      });
      getJsonLdMethod.summary(
        `Gets a JsonElement that holds the portion of the DTDL model that defines this ${typeName}.`
      );
      getJsonLdMethod.body.line(`return JSON.parse(this.partitionJsonText || '')`);
    }
  }
}
