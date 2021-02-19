// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelMetadata = void 0;
function getId(input) {
  const idElement = input["@id"];
  return idElement;
}
function getExtends(input) {
  const extendElement = input.extends;
  return extendElement;
}
function getComponentSchemas(input) {
  const componentSchemas = [];
  if (input.contents) {
    const contents = input.contents;
    contents.forEach((element) => {
      if (
        element["@type"] &&
        typeof element["@type"] === "string" &&
        element["@type"] === "Component"
      ) {
        if (element.schema && typeof element.schema === "string") {
          componentSchemas.push(element.schema);
        }
      }
    });
  }
  return componentSchemas;
}
function getModelMetadata(input) {
  const idElement = getId(input);
  const extendsElement = getExtends(input);
  const componentSchemas = getComponentSchemas(input);
  return {
    id: idElement,
    extends: extendsElement,
    componentSchemas: componentSchemas
  };
}
exports.getModelMetadata = getModelMetadata;
//# sourceMappingURL=modelMetadata.js.map
