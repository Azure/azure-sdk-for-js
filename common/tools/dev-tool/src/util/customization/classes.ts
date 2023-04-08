import { ClassDeclaration, SourceFile, MethodDeclaration, Scope, PropertyDeclaration, CommentRange, JSDoc, OptionalKind, JSDocStructure, WriterFunction, ParameterDeclaration, ConstructorDeclaration, ConstructorDeclarationStructure, ConstructorDeclarationOverloadStructure } from "ts-morph";
import { isOverload } from "./helpers/overloads";

const AUGMENT_CLASS_TOKEN = "___";

export function augmentClass(originalClassDeclaration: ClassDeclaration | undefined, customClassDeclaration: ClassDeclaration, originalFile: SourceFile) {

  // If there is no original class declaration, we'll just copy the custom one
  if (!originalClassDeclaration) {
    const classComments = getComments(customClassDeclaration, originalClassDeclaration);
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
    const propertyComments = getComments(customProperty, originalProperty)

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
    const originalConstructor = originalClassDeclaration.getConstructors().find(c => !isOverload(c.getStructure()));
    augmentConstructor(customConstructor, originalConstructor, originalClassDeclaration);
  }
}

function augmentConstructor(customConstructor: ConstructorDeclaration, originalConstructor: ConstructorDeclaration | undefined, originalClassDeclaration: ClassDeclaration) {
  const constructorComments = getComments(customConstructor, originalConstructor);
  // Original class didn't have an overload, adding the custom one.
  addConstructorsToClass(customConstructor, originalClassDeclaration, constructorComments);
}


export function augmentMethod(originalMethod: MethodDeclaration | undefined, customMethod: MethodDeclaration, originalClass: ClassDeclaration) {
  const methodComments = getComments(customMethod, originalMethod);
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
  }
  else {
    // This is not using the original method so we'll replace it
    originalMethod.remove();
    addMethodToClass(customMethod, originalClass, methodComments);
  }

}


function isAugmentingConstructor(customConstructor: ConstructorDeclaration, originalConstructor?: ConstructorDeclaration): boolean {
  const customConstructorContent = customConstructor.getBody()?.getFullText();

  if (!originalConstructor) {
    // If there is no original constructor, we'll just copy the custom one
    return false;
  }

  if (customConstructorContent?.includes(`@azsdk-constructor`)) {
    return true;
  }

  return false;
}

// function checkConstructorAugmentation(originalConstructor: ConstructorDeclaration, customConstructor: ConstructorDeclaration) {
//   const parameters = originalConstructor.getParameters();
//   if (!parameters.length) {
//     return true;
//   }


// }

function getConstructorAugmentationParameters(customConstructor: ConstructorDeclaration, originalParameters?: ParameterDeclaration[]): Map<string, string> {
  const expectedAugmentationParams = new Map<string, string>();

  if (!originalParameters) {
    return expectedAugmentationParams;
  }

  for (const originalParameter of originalParameters) {
    expectedAugmentationParams.set(originalParameter.getName(), `${AUGMENT_CLASS_TOKEN}${originalParameter.getName()}`);
  }

  // const expectedAugmentationParams = originalParameters.map(p => `${AUGMENT_CLASS_TOKEN}${p.getName()}`)

  for (const [_, augmentedParameter] of expectedAugmentationParams) {
    if (!customConstructor.getBodyText()?.includes(augmentedParameter)) {
      throw new Error(`Custom constructor is missing parameter ${augmentedParameter}`);
    }
  }

  return expectedAugmentationParams
}

function isAugmentingMethod(customMethod: MethodDeclaration): boolean {
  const customMethodContent = customMethod.getBody()?.getFullText();

  if (customMethodContent?.includes(`this.${AUGMENT_CLASS_TOKEN}.${customMethod.getName()}`)) {
    return true;
  }

  return false;
}


export function convertToPrivateMethod(originalMethod: MethodDeclaration, originalClass: ClassDeclaration) {
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


function addConstructorsToClass(customConstructor: ConstructorDeclaration, originalClass: ClassDeclaration, comments: Comments = {}) {

  const originalConstructor = originalClass.getConstructors().find(c => !isOverload(c.getStructure()));
  if (isAugmentingConstructor(customConstructor, originalConstructor)) {
    const augmentingParams = getConstructorAugmentationParameters(customConstructor, originalConstructor?.getParameters());

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

    console.log(customConstructorParts)

    if(customConstructorParts.length > 2) {
      throw new Error(`Custom constructor can only have one ${constructorEndMarker} marker`)
    }

    if (customConstructorParts.length === 2) {
      const head = customConstructorParts[0];
      const tail = customConstructorParts[1];
      augmentedConstructorBody = `${head}\n${originalBody}\n${tail}`;
    } else {
      augmentedConstructorBody = `${customConstructorBody}\n${originalBody}`;
    }

    
    customConstructor.setBodyText(augmentedConstructorBody);
    originalConstructor?.remove();
    originalClass.addConstructor(customConstructor.getStructure() as ConstructorDeclarationStructure);
  }
}


export function addMethodToClass(customMethod: MethodDeclaration, classDeclaration: ClassDeclaration, { comments, jsdoc }: Comments = {}) {

  // We need to replace the augmentation call with the private method call
  if (isAugmentingMethod(customMethod) && !isOverload(customMethod.getStructure())) {
    const regex = new RegExp(`this\\.${AUGMENT_CLASS_TOKEN}.${customMethod.getName()}`, 'g');
    const modifiedMethodContent = customMethod.getBodyText()?.replace(regex, `this._${customMethod.getName()}`);
    modifiedMethodContent && customMethod.setBodyText(modifiedMethodContent);
  }

  const methodStructure = customMethod.getStructure();

  // custom is adding a new method this is a new method on the class, we'll add it to original
  if (!isOverload(methodStructure)) {
    classDeclaration.addMethod({
      ...methodStructure, docs: jsdoc?.map(jsDoc => jsDoc.getStructure()), leadingTrivia: writer => {
        comments?.forEach(comment => {
          writer.writeLine(comment.getText());
        });
      }
    });
  }
}


export function augmentClasses(
  originalClasses: Map<string, ClassDeclaration>,
  customClasses: ClassDeclaration[],
  originalFile: SourceFile
) {
  for (const customClass of customClasses) {
    const customClassName = customClass.getName();
    const originalClass = originalClasses.get(customClassName ?? "");
    augmentClass(originalClass, customClass, originalFile);
  }
}

interface Comments {
  comments?: CommentRange[];
  jsdoc?: JSDoc[];
}

interface WithCommentGetter {
  getLeadingCommentRanges(): CommentRange[];
  getJsDocs(): JSDoc[];
}

function getComments(customClass: WithCommentGetter, originalClass?: WithCommentGetter | undefined): Comments {
  const customClassComments = customClass.getLeadingCommentRanges();
  const customClassJSDocs = customClass.getJsDocs();

  if (!originalClass) {
    return {
      comments: customClassComments,
      jsdoc: customClassJSDocs,
    }
  }

  const originalClassComments = originalClass?.getLeadingCommentRanges();
  const originalClassJSDocs = originalClass?.getJsDocs();

  const comments: CommentRange[] = customClassComments ?? originalClassComments
  const jsdoc: JSDoc[] = customClassJSDocs ?? originalClassJSDocs;

  return {
    comments,
    jsdoc,
  }


}

function addPropertyToClass(property: PropertyDeclaration, classDeclaration: ClassDeclaration, { comments, jsdoc }: Comments = {}) {
  // Insert the class declaration, JSDocs, and leading comments into the target file
  classDeclaration.addProperty({
    ...property.getStructure(), docs: jsdoc?.map(jsDoc => jsDoc.getStructure()), leadingTrivia: writer => {
      comments?.forEach(comment => {
        writer.writeLine(comment.getText());
      });
    }
  });
}

function addClass(classDeclaration: ClassDeclaration, targetFile: SourceFile, { comments, jsdoc }: Comments = {}) {
  // Insert the class declaration, JSDocs, and leading comments into the target file
  targetFile.addStatements(writer => {
    // Write leading comments
    comments?.forEach(comment => {
      writer.writeLine(comment.getText());
    });

    // Write JSDocs
    jsdoc?.forEach(jsDoc => {
      writer.writeLine(jsDoc.getText());
    });

    // Write class declaration
    writer.write(classDeclaration.getText());
  });

  // Save the changes to the target file
  targetFile.saveSync();
}