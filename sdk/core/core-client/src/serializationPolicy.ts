// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, SendRequest, PipelinePolicy } from "@azure/core-https";
import {
  OperationRequest,
  SerializerOptions,
  XmlOptions,
  XML_CHARKEY,
  RequiredSerializerOptions,
  OperationArguments,
  XML_ATTRKEY,
  OperationSpec
} from "./interfaces";
import { MapperTypeNames } from "./serializer";
import { getPathStringFromParameter } from "./interfaceHelpers";
import { getOperationArgumentValueFromParameter } from "./operationHelpers";

/**
 * The programmatic identifier of the serializationPolicy.
 */
export const serializationPolicyName = "serializationPolicy";

/**
 * Options to configure API response deserialization.
 */
export interface serializationPolicyOptions {
  /**
   * A function that is able to write XML. Required for XML support.
   */
  stringifyXML?: (obj: any, opts?: XmlOptions) => string;

  /**
   * Configures behavior of xml parser and builder.
   */
  serializerOptions?: SerializerOptions;
}

/**
 * This policy handles parsing out responses according to OperationSpecs on the request.
 */
export function serializationPolicy(options: serializationPolicyOptions = {}): PipelinePolicy {
  const stringifyXML = options.stringifyXML;

  return {
    name: serializationPolicyName,
    async sendRequest(request: OperationRequest, next: SendRequest): Promise<PipelineResponse> {
      const operationSpec = request.additionalInfo?.operationSpec;
      const operationArguments = request.additionalInfo?.operationArguments;
      if (operationSpec && operationArguments) {
        serializeRequestBody(request, operationArguments, operationSpec, stringifyXML);
      }
      return next(request);
    }
  };
}

/**
 * @internal @ignore
 */
export function serializeRequestBody(
  request: OperationRequest,
  operationArguments: OperationArguments,
  operationSpec: OperationSpec,
  stringifyXML: (obj: any, opts?: XmlOptions) => string = function() {
    throw new Error("XML serialization unsupported!");
  }
): void {
  const serializerOptions = operationArguments.options?.serializerOptions;
  const updatedOptions: RequiredSerializerOptions = {
    xml: {
      rootName: serializerOptions?.xml.rootName ?? "",
      includeRoot: serializerOptions?.xml.includeRoot ?? false,
      xmlCharKey: serializerOptions?.xml.xmlCharKey ?? XML_CHARKEY
    }
  };

  const xmlCharKey = updatedOptions.xml.xmlCharKey;
  if (operationSpec.requestBody && operationSpec.requestBody.mapper) {
    request.body = getOperationArgumentValueFromParameter(
      operationArguments,
      operationSpec.requestBody
    );

    const bodyMapper = operationSpec.requestBody.mapper;
    const {
      required,
      serializedName,
      xmlName,
      xmlElementName,
      xmlNamespace,
      xmlNamespacePrefix
    } = bodyMapper;
    const typeName = bodyMapper.type.name;

    try {
      if (request.body || required) {
        const requestBodyParameterPathString: string = getPathStringFromParameter(
          operationSpec.requestBody
        );
        request.body = operationSpec.serializer.serialize(
          bodyMapper,
          request.body,
          requestBodyParameterPathString,
          updatedOptions
        );

        const isStream = typeName === MapperTypeNames.Stream;

        if (operationSpec.isXML) {
          const xmlnsKey = xmlNamespacePrefix ? `xmlns:${xmlNamespacePrefix}` : "xmlns";
          const value = getXmlValueWithNamespace(
            xmlNamespace,
            xmlnsKey,
            typeName,
            request.body,
            updatedOptions
          );

          if (typeName === MapperTypeNames.Sequence) {
            request.body = stringifyXML(
              prepareXMLRootList(
                value,
                xmlElementName || xmlName || serializedName!,
                xmlnsKey,
                xmlNamespace
              ),
              { rootName: xmlName || serializedName, xmlCharKey }
            );
          } else if (!isStream) {
            request.body = stringifyXML(value, {
              rootName: xmlName || serializedName,
              xmlCharKey
            });
          }
        } else if (
          typeName === MapperTypeNames.String &&
          (operationSpec.contentType?.match("text/plain") || operationSpec.mediaType === "text")
        ) {
          // the String serializer has validated that request body is a string
          // so just send the string.
          return;
        } else if (!isStream) {
          request.body = JSON.stringify(request.body);
        }
      }
    } catch (error) {
      throw new Error(
        `Error "${error.message}" occurred in serializing the payload - ${JSON.stringify(
          serializedName,
          undefined,
          "  "
        )}.`
      );
    }
  } else if (operationSpec.formDataParameters && operationSpec.formDataParameters.length > 0) {
    request.formData = {};
    for (const formDataParameter of operationSpec.formDataParameters) {
      const formDataParameterValue = getOperationArgumentValueFromParameter(
        operationArguments,
        formDataParameter
      );
      if (formDataParameterValue !== undefined && formDataParameterValue !== null) {
        const formDataParameterPropertyName: string =
          formDataParameter.mapper.serializedName || getPathStringFromParameter(formDataParameter);
        request.formData[formDataParameterPropertyName] = operationSpec.serializer.serialize(
          formDataParameter.mapper,
          formDataParameterValue,
          getPathStringFromParameter(formDataParameter),
          updatedOptions
        );
      }
    }
  }
}

/**
 * Adds an xml namespace to the xml serialized object if needed, otherwise it just returns the value itself
 */
function getXmlValueWithNamespace(
  xmlNamespace: string | undefined,
  xmlnsKey: string,
  typeName: string,
  serializedValue: any,
  options: RequiredSerializerOptions
): any {
  // Composite and Sequence schemas already got their root namespace set during serialization
  // We just need to add xmlns to the other schema types
  if (xmlNamespace && !["Composite", "Sequence", "Dictionary"].includes(typeName)) {
    const result: any = {};
    result[options.xml.xmlCharKey] = serializedValue;
    result[XML_ATTRKEY] = { [xmlnsKey]: xmlNamespace };
    return result;
  }

  return serializedValue;
}

function prepareXMLRootList(
  obj: any,
  elementName: string,
  xmlNamespaceKey?: string,
  xmlNamespace?: string
): { [key: string]: any[] } {
  if (!Array.isArray(obj)) {
    obj = [obj];
  }
  if (!xmlNamespaceKey || !xmlNamespace) {
    return { [elementName]: obj };
  }

  const result = { [elementName]: obj };
  result[XML_ATTRKEY] = { [xmlNamespaceKey]: xmlNamespace };
  return result;
}
