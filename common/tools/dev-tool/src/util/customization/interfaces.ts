// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { CallSignatureDeclaration, InterfaceDeclaration, SourceFile, Type } from "ts-morph";
import { getAnnotation } from "./helpers/annotations";

export function augmentInterfaces(
  originalInterfaces: Map<string, InterfaceDeclaration>,
  customInterfaces: InterfaceDeclaration[],
  originalFile: SourceFile
) {
  for (const customInterface of customInterfaces) {
    const originalInterface = originalInterfaces.get(customInterface.getName() ?? "");
    augmentInterface(customInterface, originalInterface, originalFile);
  }
}

export function augmentInterface(
  customInterface: InterfaceDeclaration,
  originalInterface: InterfaceDeclaration | undefined,
  originalFile: SourceFile
) {
  // If there is no interface with the same name in the original file, we'll add it
  if (!originalInterface) {
    originalFile.addInterface(customInterface.getStructure());
    return;
  }

  // Remove any properties marked with // @azsdk-remove
  removeProperties(customInterface, originalInterface);

  // Merge the properties from the custom interface into the original interface
  mergeProperties(customInterface, originalInterface);

  // Remove any call signatures marked with // @azsdk-remove
  removeCallSignatures(customInterface, originalInterface);

  // Merge the call signatures from the custom interface into the original interface
  mergeCallSignatures(customInterface, originalInterface);
}

export function mergeProperties(
  customInterface: InterfaceDeclaration,
  originalInterface: InterfaceDeclaration
) {
  const customProperties = customInterface.getProperties();
  for (const customProperty of customProperties) {
    if (getAnnotation(customProperty) === "Remove") {
      /* If the property has a `// @azsdk-remove` comment, we don't need to re-add it */
      continue;
    }
    const propertyName = customProperty.getName();
    const originalProperty = originalInterface.getProperty(propertyName);

    // If the property already exists in the original interface, we'll remove it
    if (originalProperty) {
      originalProperty.remove();
    }

    // Add the custom property
    if (getAnnotation(customProperty) !== "Remove") {
      originalInterface.addProperty(customProperty.getStructure());
    }
  }
}

export function removeProperties(
  customInterface: InterfaceDeclaration,
  originalInterface: InterfaceDeclaration
) {
  const customProperties = customInterface.getProperties();
  for (const customProperty of customProperties) {
    const propertyName = customProperty.getName();

    // Check if the property has a `// @azsdk-remove` comment
    if (getAnnotation(customProperty) === "Remove") {
      originalInterface.getProperty(propertyName)?.remove();
    }
  }
}

function findCallSignature(
  interfaceDeclaration: InterfaceDeclaration,
  callSignature: CallSignatureDeclaration
): CallSignatureDeclaration | undefined {
  function typeEquals(a: Type, b: Type) {
    // Need to handle cases where the type is imported
    const aStr = a?.getText()?.replace(/import\(".+"\)\./, "");
    const bStr = b?.getText()?.replace(/import\(".+"\)\./, "");
    return aStr && bStr && aStr === bStr;
  }
  return interfaceDeclaration.getCallSignature((signature) => {
    if (signature.getParameters().length !== callSignature.getParameters().length) {
      return false;
    }
    if (!typeEquals(signature.getReturnType(), callSignature.getReturnType())) {
      return false;
    }

    for (let i = 0; i < signature.getParameters().length; i++) {
      if (
        !typeEquals(
          signature.getParameters()[i].getType(),
          callSignature.getParameters()[i].getType()
        )
      ) {
        return false;
      }
    }
    return true;
  });
}

export function mergeCallSignatures(
  customInterface: InterfaceDeclaration,
  originalInterface: InterfaceDeclaration
) {
  const customCallSignatures = customInterface.getCallSignatures();
  for (const customCallSignature of customCallSignatures) {
    if (getAnnotation(customCallSignature) === "Remove") {
      /* If the call signature has a `// @azsdk-remove` comment, we don't need to re-add it */
      continue;
    }
    const originalCallSignature = findCallSignature(originalInterface, customCallSignature);
    if (originalCallSignature) {
      originalCallSignature.remove();
    }
    originalInterface.addCallSignature(customCallSignature.getStructure());
  }
}

export function removeCallSignatures(
  customInterface: InterfaceDeclaration,
  originalInterface: InterfaceDeclaration
) {
  const customCallSignatures = customInterface.getCallSignatures();
  for (const customCallSignature of customCallSignatures) {
    // Check if the signature has a `// @azsdk-remove` comment
    if (getAnnotation(customCallSignature) === "Remove") {
      findCallSignature(originalInterface, customCallSignature)?.remove();
    }
  }
}
