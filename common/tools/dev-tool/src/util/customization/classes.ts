// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import {
  ClassDeclaration,
  SourceFile,
  MethodDeclaration,
  Scope,
  PropertyDeclaration,
  JSDoc,
  ParameterDeclaration,
  ConstructorDeclaration,
  ConstructorDeclarationStructure,
} from "ts-morph";
import { isOverload } from "./helpers/overloads";

export const AUGMENT_CLASS_TOKEN = "___";

export function augmentClass(
  originalClassDeclaration: ClassDeclaration | undefined,
  customClassDeclaration: ClassDeclaration,
  originalFile: SourceFile,
) {
  // If there is no original class declaration, we'll just copy the custom one
  if (!originalClassDeclaration) {
    const classComments = getDocs(customClassDeclaration, originalClassDeclaration);
    addClass(customClassDeclaration, originalFile, classComments);
    return;
  }

  // Get custom properties
  const customProperties = customClassDeclaration.getProperties();
  for (const customProperty of customProperties) {
    const propertyName = customProperty.getName();

    // do not copy over to the output the AUGMENT_CLASS_TOKEN property
    // as it is just a token to determine if the class is augmented
    // and enable intelisense for the customization UX.
    if (propertyName === AUGMENT_CLASS_TOKEN) {
      continue;
    }

    const originalProperty = originalClassDeclaration.getProperty(propertyName);
    const propertyComments = getDocs(customProperty, originalProperty);

    // If the property already exists in the original declaration, we'll replace it
    originalProperty?.remove();
    addPropertyToClass(customProperty, originalClassDeclaration, propertyComments);
    // originalClassDeclaration.addProperty(customProperty.getStructure());
  }

  // Get custom methods
  const customMethods = customClassDeclaration.getMethods();
  for (const customMethod of customMethods) {
    const methodName = customMethod.getName();

    // If the method already exists in the original declaration, we'll replace it
    const originalMethod = originalClassDeclaration.getMethod(methodName);
    augmentMethod(originalMethod, customMethod, originalClassDeclaration);
  }

  // Get custom constructors
  const customConstructors = customClassDeclaration.getConstructors();
  for (const customConstructor of customConstructors) {
    augmentConstructor(customConstructor, originalClassDeclaration);
  }
}

export function augmentConstructor(
  customConstructor: ConstructorDeclaration,
  originalClassDeclaration: ClassDeclaration,
) {
  addConstructorsToClass(customConstructor, originalClassDeclaration);
}

export function augmentMethod(
  originalMethod: MethodDeclaration | undefined,
  customMethod: MethodDeclaration,
  originalClass: ClassDeclaration,
) {
  const methodComments = getDocs(customMethod, originalMethod);
  // custom is adding a new method this is a new method on the class, we'll add it to original
  if (!originalMethod) {
    addMethodToClass(customMethod, originalClass, methodComments);
    return;
  }

  // Original method with the same name exists so
  // we need to check if the custom method is using the original method
  // to determine if we need to augment or replace
  if (isAugmentingMethod(customMethod)) {
    convertToPrivateMethod(originalMethod, originalClass);
    addMethodToClass(customMethod, originalClass, methodComments);
  } else {
    // This is not using the original method so we'll replace it
    originalMethod.remove();
    addMethodToClass(customMethod, originalClass, methodComments);
  }
}

export function isAugmentingConstructor(
  customConstructor: ConstructorDeclaration,
  originalConstructor?: ConstructorDeclaration,
): boolean {
  if (!originalConstructor) {
    // If there is no original constructor, we'll just copy the custom one
    return false;
  }

  return Boolean(customConstructor.getBody()?.getFullText().includes(`@azsdk-constructor`));
}

export function getConstructorAugmentationParameters(
  customConstructor: ConstructorDeclaration,
  originalParameters?: ParameterDeclaration[],
): Map<string, string> {
  const expectedAugmentationParams = new Map<string, string>();

  if (!originalParameters) {
    return expectedAugmentationParams;
  }

  for (const originalParameter of originalParameters) {
    expectedAugmentationParams.set(
      originalParameter.getName(),
      `${AUGMENT_CLASS_TOKEN}${originalParameter.getName()}`,
    );
  }

  for (const augmentedParameter of expectedAugmentationParams.values()) {
    if (!customConstructor.getBodyText()?.includes(augmentedParameter)) {
      throw new Error(`Custom constructor is missing parameter ${augmentedParameter}`);
    }
  }

  return expectedAugmentationParams;
}

export function isAugmentingMethod(customMethod: MethodDeclaration): boolean {
  return Boolean(customMethod.getBody()?.getFullText()?.includes(`this.${AUGMENT_CLASS_TOKEN}`));
}

export function convertToPrivateMethod(
  originalMethod: MethodDeclaration,
  originalClass: ClassDeclaration,
) {
  const methodStructure = originalMethod.getStructure();
  const methodOverloads = originalMethod.getOverloads();
  if (isOverload(methodStructure)) {
    return;
  }

  methodStructure.scope = Scope.Private;
  methodStructure.name = `_${methodStructure.name}`;

  const newMethod = originalClass.addMethod(methodStructure);

  for (const overload of methodOverloads) {
    const overloadStructure = overload.getStructure();
    if (isOverload(overloadStructure)) {
      overloadStructure.scope = Scope.Private;
      newMethod.addOverload(overloadStructure);
    }
  }
  originalMethod.remove();
}

export function addConstructorsToClass(
  customConstructor: ConstructorDeclaration,
  originalClass: ClassDeclaration,
) {
  const originalConstructor = originalClass
    .getConstructors()
    .find((c) => !isOverload(c.getStructure()));
  if (isAugmentingConstructor(customConstructor, originalConstructor)) {
    const augmentingParams = getConstructorAugmentationParameters(
      customConstructor,
      originalConstructor?.getParameters(),
    );

    // Rename the parameters in the original constructor
    const originalParameters = originalConstructor?.getParameters() ?? [];

    for (const originalParameter of originalParameters) {
      const augmentedParamName = augmentingParams.get(originalParameter.getName());
      if (augmentedParamName) {
        originalParameter.rename(augmentedParamName);
      }
    }

    const constructorEndMarker = "@azsdk-constructor-end";
    const originalBody = originalConstructor?.getBodyText();
    const customConstructorBody = customConstructor.getBodyText() ?? "";
    let augmentedConstructorBody = customConstructorBody;
    const customConstructorParts = customConstructorBody.split(constructorEndMarker);

    if (customConstructorParts.length > 2) {
      throw new Error(`Custom constructor can only have one ${constructorEndMarker} marker`);
    }

    if (customConstructorParts.length === 2) {
      const [head, tail] = customConstructorParts;
      augmentedConstructorBody = `${head}\n${originalBody}\n${tail}`;
    } else {
      augmentedConstructorBody = `${customConstructorBody}\n${originalBody}`;
    }

    customConstructor.setBodyText(augmentedConstructorBody);
    originalConstructor?.remove();
    originalClass.addConstructor(
      customConstructor.getStructure() as ConstructorDeclarationStructure,
    );
  } else {
    originalConstructor?.remove();
    originalClass.addConstructor(
      customConstructor.getStructure() as ConstructorDeclarationStructure,
    );
  }
}

export function addMethodToClass(
  customMethod: MethodDeclaration,
  classDeclaration: ClassDeclaration,
  jsdoc: JSDoc[],
) {
  // We need to replace the augmentation call with the private method call
  if (isAugmentingMethod(customMethod) && !isOverload(customMethod.getStructure())) {
    const regex = new RegExp(`this\\.${AUGMENT_CLASS_TOKEN}\\.`, "g");
    const modifiedMethodContent = customMethod.getBodyText()?.replace(regex, `this._`);
    if (modifiedMethodContent) {
      customMethod.setBodyText(modifiedMethodContent);
    }
  }

  const methodStructure = customMethod.getStructure();

  // custom is adding a new method this is a new method on the class, we'll add it to original
  if (!isOverload(methodStructure)) {
    classDeclaration.addMethod({
      ...methodStructure,
      docs: jsdoc.map((jsDoc) => jsDoc.getStructure()),
    });
  }
}

export function augmentClasses(
  originalClasses: Map<string, ClassDeclaration>,
  customClasses: ClassDeclaration[],
  originalFile: SourceFile,
) {
  for (const customClass of customClasses) {
    const customClassName = customClass.getName();
    const originalClass = originalClasses.get(customClassName ?? "");
    augmentClass(originalClass, customClass, originalFile);
  }
}

interface WithCommentGetter {
  getJsDocs(): JSDoc[];
}

export function getDocs(
  customClass: WithCommentGetter,
  originalClass?: WithCommentGetter,
): JSDoc[] {
  return [customClass.getJsDocs(), originalClass?.getJsDocs()].find((docs) => docs?.length) ?? [];
}

export function addPropertyToClass(
  property: PropertyDeclaration,
  classDeclaration: ClassDeclaration,
  jsdoc: JSDoc[],
) {
  // Insert the class declaration and JSDocs into the target file
  classDeclaration.addProperty({
    ...property.getStructure(),
    docs: jsdoc.map((jsDoc) => jsDoc.getStructure()),
  });
}

export function addClass(
  classDeclaration: ClassDeclaration,
  targetFile: SourceFile,
  jsdoc: JSDoc[],
) {
  // Insert the class declaration and JSDocs into the target file
  targetFile.addStatements((writer) => {
    // Write JSDocs
    jsdoc.forEach((jsDoc) => {
      writer.writeLine(jsDoc.getText());
    });

    // Write class declaration
    writer.write(classDeclaration.getText());
  });

  // Save the changes to the target file
  targetFile.saveSync();
}
