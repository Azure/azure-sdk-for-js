import { InterfaceDeclaration, SourceFile } from "ts-morph";
import { getAnnotation } from "./helpers/annotations";

export function augmentInterfaces(originalInterfaces: Map<string, InterfaceDeclaration>, customInterfaces: InterfaceDeclaration[], originalFile: SourceFile) {
    for (const customInterface of customInterfaces) {
      const originalInterface = originalInterfaces.get(customInterface.getName() ?? "");
      augmentInterface(customInterface, originalInterface, originalFile)
    }
  }
  
  export function augmentInterface(customInterface: InterfaceDeclaration, originalInterface: InterfaceDeclaration | undefined, originalFile: SourceFile) {
    // If there is no interface with the same name in the original file, we'll add it
    if (!originalInterface) {
      originalFile.addInterface(customInterface.getStructure());
      return;
    }
  
    // Remove any properties marked with // @azsdk-remove 
    removeProperties(customInterface, originalInterface);
  
    // Merge the properties from the custom interface into the original interface
    mergeProperties(customInterface, originalInterface);
  }
  
  export function mergeProperties(customInterface: InterfaceDeclaration, originalInterface: InterfaceDeclaration) {
    const customProperties = customInterface.getProperties();
    for (const customProperty of customProperties) {
      const propertyName = customProperty.getName();
      const originalProperty = originalInterface.getProperty(propertyName);
  
      // If the property already exists in the original interface, we'll remove it
      if (originalProperty) {
        originalProperty.remove();
      }
  
      // Add the custom property
      if(getAnnotation(customProperty) !== "Remove") {
        originalInterface.addProperty(customProperty.getStructure());
      }
    }
  }
  
  export function removeProperties(customInterface: InterfaceDeclaration, originalInterface: InterfaceDeclaration) {
    const customProperties = customInterface.getProperties();
    for (const customProperty of customProperties) {
      const propertyName = customProperty.getName();
  
      // Check if the property has a `// @azsdk-remove` comment
      if (getAnnotation(customProperty) === "Remove") {
        originalInterface.getProperty(propertyName)?.remove();
      }
    }
  }