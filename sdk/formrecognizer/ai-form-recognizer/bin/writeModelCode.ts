// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EOL } from "os";
import { DocumentTypeDetails, DocumentModelDetails } from "../src";
import { DocumentFieldSchema } from "../src/generated";
import { DocumentField } from "../src/models";
import { defaultResultFields, getFeatures } from "./defaultFields";
import { camelCase, capitalize, uncapitalize, Field } from "./utils";

// NOTE: currently, this command is set up to generate sample files for the SDK itself. If we want to expose this
// functionality outside of samples, then we'll need to change the way the headers are generated for external use.

/**
 * The header to append to the top of every file.
 */
const sampleHeader = `
/**
 * @azsdk-util
 * @azsdk-skip-javascript
 */
`;

/**
 * Generate a header with the model information.
 */
function templateHeader(model: DocumentModelDetails, test: boolean): string {
  return `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
${!test ? sampleHeader : ""}
// Model:       ${model.modelId}
// Description: ${model.description}
// API Version: ${model.apiVersion}
// Created:     ${new Date().toDateString()}

`;
}

/**
 * Generate a TypeScript source file for a given model.
 *
 * @param model - the ModelInfo to generate code for
 * @returns a string of TypeScript source code
 */
export async function writeModelCode(model: DocumentModelDetails, test: boolean): Promise<string> {
  let contents = templateHeader(model, test);

  if (test) {
    contents += 'import * as fr from "../../../src";' + EOL + EOL;
  } else {
    contents += 'import * as fr from "@azure/ai-form-recognizer";' + EOL + EOL;
  }

  const modelNameSlug = [
    ...model.modelId
      .split("-", 2)
      // for lack of a flatMap
      .reduce((acc, cur) => [...acc, ...cur.split(".")], [] as string[]),
  ];

  const modelName = camelCase([...modelNameSlug, "Model"]);
  const documentTypeName = camelCase([...modelNameSlug, "Document"]);
  const resultName = camelCase([...modelNameSlug, "Result"]);

  const modelFeatures = getFeatures(model);

  const hasDocuments = modelFeatures.some((f) => f === "_documents");

  if (model.description) {
    contents += "/**" + EOL;
    contents +=
      model.description
        // Split the comment into lines.
        .split(/\r?\n/)
        // Add the asterisk to the beginning of each line to block-align the comment
        .map((l) => " * " + l)
        .join(EOL) + EOL;
    contents += " */" + EOL;
  }

  // Create the exported model object. We rely on a function named `modelInfo` to exist in the module scope, and we will
  // add it later.
  contents += `export const ${modelName} = fr.createModelFromSchema(modelInfo()) as fr.DocumentModel<${resultName}>;${
    EOL + EOL
  }`;

  // Write the main Result interface.
  for (const line of writeResultInterface(resultName, documentTypeName, modelFeatures)) {
    contents += line + EOL;
  }

  contents += EOL;

  // Now add a variant for each document type in the model, if there are any.
  if (hasDocuments) {
    const variants = extractModelVariants(model, modelNameSlug);

    const variantNames = Object.keys(variants);

    const documentType =
      variantNames.length > 1
        ? // In the case of multiple variants, a union
          variantNames.map((n) => `${EOL}  | ${n}`).join("")
        : variantNames.length === 1
          ? // For a single variant, just emit its name.
            ` ${variantNames[0]}`
          : // This should probably be unreachable, since there's no case where
            // `hasDocuments && variantNames.length === 0`, but we'll still emit "never" just in case.
            " never";

    // Finally, add the type alias for the type of a Document
    contents += `export type ${documentTypeName} =${documentType};${EOL + EOL}`;

    // Write the root interface for the variant.
    for (const info of Object.values(variants)) {
      for (const line of writeDocTypeInterface(info)) {
        contents += line + EOL;
      }

      contents += EOL;
    }

    // Write all the fields interfaces that the variant uses
    for (const info of Object.values(variants)) {
      for (const line of writeFieldsInterfaces(info)) {
        contents += line + EOL;
      }

      contents += EOL;
    }
  }

  // Finally, emit the modelInfo function that provides the raw schema.
  contents += "/**" + EOL;
  contents += " * The raw model schema." + EOL;
  contents += " */" + EOL;
  contents += "function modelInfo() {" + EOL;
  contents +=
    `  return ${JSON.stringify(model, null, 2)
      .split(/\r?\n/)
      .join(EOL + "  ")} as const;` + EOL;
  contents += "}" + EOL;

  return contents;
}

// Get the doc type variants of a model.
function extractModelVariants(
  model: DocumentModelDetails,
  _rootSlug: string[],
): Record<string, DocType> {
  const result: ReturnType<typeof extractModelVariants> = {};

  for (const [docType, info] of Object.entries(model.docTypes ?? {})) {
    const slug = docType.split(".");
    const docTypeName = camelCase(slug);
    result[docTypeName] = {
      ...info,
      name: docTypeName,
      originalDocType: docType,
      slug,
    };
  }

  return result;
}

// Write the interface for a given DocType.
function* writeDocTypeInterface(docType: DocType): Iterable<string> {
  if (docType.description) {
    yield "/**";
    yield* docType.description.split(/\r?\n/).map((l) => " * " + l);
    yield " */";
  }
  yield `export interface ${docType.name} {`;
  yield* indent(
    writeField({
      name: "docType",
      type: `"${docType.originalDocType}"`,
      docContents: `Document type: "${docType.originalDocType}".`,
    }),
  );

  yield* indent(
    writeField({
      name: "fields",
      type: docType.name + "Fields",
      docContents: "Document fields.",
    }),
  );

  yield* indent(
    flatMap(
      [
        {
          name: "boundingRegions",
          docContents: "Bounding regions covering the document.",
          type: "fr.BoundingRegion[]",
          optional: true,
        },
        {
          name: "spans",
          docContents:
            "Locations of the document's elements in the `content` text (reading-order-concatenated content).",
          type: "fr.DocumentSpan[]",
        },
        {
          name: "confidence",
          docContents: "The service's confidence that it has correctly extracted the document.",
          type: "number",
        },
      ],
      writeField,
    ),
  );

  yield "}";
}

/**
 * Write a field and its comment to an iterable of strings.
 */
function* writeField(field: Field): Iterable<string> {
  yield "/**";
  yield* field.docContents.split(/\r?\n/).map((line) => ` * ${line}`);
  yield " */";

  // If the field name has an illegal character, we need to quote it.
  const needsQuotes = !/^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(field.name);
  const printedFieldName = needsQuotes ? `"${field.name}"` : field.name;

  yield `${printedFieldName}${field.optional ? "?" : ""}: ${field.type};`;
}

/**
 * Recursively write the fields interfaces for a given document type.
 */
function* writeFieldsInterfaces(docType: DocType): Iterable<string> {
  const name = docType.name + "Fields";

  yield* writeInterfaceDeclaration(name, docType.description, docType.fieldSchema);

  // Recursively visit all child interfaces and write them.
  yield* (function* collectNestedInterfaces(
    fields: Record<string, DocumentFieldSchema>,
    namingContext: string,
  ): Iterable<string> {
    for (const [fieldName, schema] of Object.entries(fields)) {
      if (schema.type === "array" && schema.items?.type === "object") {
        // Generate element interface and recur if the nested type is an object

        const nextNamingContext = namingContext + fieldName + "Element";

        yield "";
        yield "";
        yield* writeInterfaceDeclaration(
          nextNamingContext,
          schema.description,
          schema.items?.properties ?? {},
        );

        yield* collectNestedInterfaces(schema.items?.properties ?? {}, nextNamingContext);
      } else if (schema.type === "object") {
        // Generate named interface and recur

        yield "";
        yield "";
        yield* writeInterfaceDeclaration(
          namingContext + fieldName,
          schema.description,
          schema.properties ?? {},
        );

        yield* collectNestedInterfaces(schema.properties ?? {}, namingContext + fieldName);
      }
    }
  })(docType.fieldSchema, docType.name);

  /**
   * Write a simple interface declaration.
   *
   * @param interfaceName - the symbolic name of the interface
   * @param description - the interface's documentation string.
   * @param fields - the fields of the interface (a map of names to schemas)
   */
  function* writeInterfaceDeclaration(
    interfaceName: string,
    description: string | undefined,
    fields: Record<string, DocumentFieldSchema>,
  ) {
    yield "/**";
    yield ` * Describes the fields of \`${interfaceName}\`.`;
    if (description) {
      yield " * ";
      yield* description.split(/\r?\n/).map((l) => " * " + l);
    }
    yield " */";
    const prefix = `export interface ${interfaceName} {`;
    const suffix = "}";

    const fieldEntries = Object.entries(fields);

    if (fieldEntries.length === 0) {
      yield prefix + suffix;
    } else {
      yield prefix;
      yield* indent(
        flatMap(
          fieldEntries.map(([fieldName, schema]) => ({
            // Uncapitalize the field name and remove all whitespace
            name: uncapitalize(fieldName).replace(/\s/g, ""),
            type: writeType(schema, fieldName, docType.slug),
            docContents: schema.description ?? `\`${docType.name}\` "${fieldName}" field`,
            optional: true as const,
          })),
          writeField,
        ),
      );
      yield suffix;
    }
  }
}

/**
 * Generate a type name for a field schema.
 *
 * @param schema - the schema of the type
 * @param name - the name to append to the field type, if necessary (only applies to objects and arrays)
 * @param slug - the current taxonomic naming context of the field name (used to name object types)
 * @returns a string representing the type name for the field
 */
function writeType(schema: DocumentFieldSchema, name: string, slug: string[]): string {
  const kind = schema.type as DocumentField["kind"];

  if (kind === "array") {
    return `fr.DocumentArrayField<${writeType(schema.items!, "Element", [...slug, name])}>`;
  } else if (kind === "object") {
    const propertiesName = slug.map(capitalize).join("") + name;
    return `fr.DocumentObjectField<${propertiesName}>`;
  } else {
    return {
      integer: "fr.DocumentIntegerField",
      string: "fr.DocumentStringField",
      countryRegion: "fr.DocumentCountryRegionField",
      currency: "fr.DocumentCurrencyField",
      time: "fr.DocumentTimeField",
      date: "fr.DocumentDateField",
      number: "fr.DocumentNumberField",
      boolean: "fr.DocumentBooleanField",
      phoneNumber: "fr.DocumentPhoneNumberField",
      selectionMark: "fr.DocumentSelectionMarkField",
      signature: "fr.DocumentSignatureField",
      address: "fr.DocumentAddressField",
    }[kind];
  }
}

/**
 * Generate an AnalyzeResult-level interface.
 *
 * @param name - the name of the interface.
 * @param documentInterfaceName - the name of the interface's document type.
 * @param features - the features supported by the model
 */
function* writeResultInterface(
  name: string,
  documentInterfaceName: string,
  features: string[],
): Iterable<string> {
  const hasDocuments = features.some((f) => f === "_documents");

  yield `export interface ${name} extends fr.AnalyzeResultCommon {`;
  yield* indent(
    flatMap(
      features.filter((f) => f !== "_documents"),
      (f) => writeField(defaultResultFields[f]),
    ),
  );
  if (hasDocuments) {
    yield* indent(
      writeField({
        name: "documents",
        type: documentInterfaceName + "[]",
        docContents: "Extracted documents.",
      }),
    );
  }
  yield "}";
}

/**
 * A helper function to indent an iterable.
 */
function* indent(contents: Iterable<string>, level: number = 2): Iterable<string> {
  const indentationString = " ".repeat(level);

  for (const line of contents) {
    yield indentationString + line;
  }
}

/**
 * A `flatMap` helper that works with generic iterables, not only arrays. If the result of `f` is iterable, its elements
 * will be produced instead of itself.
 *
 * @param it - the iterable to map over
 * @param f - the function to apply to each item in `it`
 */
function* flatMap<T1, T2>(it: Iterable<T1>, f: (v: T1) => T2 | Iterable<T2>): Iterable<T2> {
  for (const value of it) {
    const result = f(value);
    if (typeof result === "object" && result !== null && Symbol.iterator in result) {
      yield* result as Iterable<T2>;
    } else {
      yield result as T2;
    }
  }
}

/**
 * Helper interface for representing a DocType during generation, allowing for renaming and contextual, taxonomic naming.
 */
interface DocType extends DocumentTypeDetails {
  originalDocType: string;
  name: string;
  slug: string[];
}
