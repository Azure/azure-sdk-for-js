// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { MapperTypeNames, createSerializer } from "@azure/core-client";
import { serializeRequestBody } from "$internal/serializationPolicy.js";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { stringifyXML } from "@azure/core-xml";

describe("serializationPolicy", function () {
  describe("serializeRequestBody()", () => {
    it("should serialize an XML Composite request body with namespace and prefix", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: { foo: "Foo", bar: "Bar" },
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              xmlNamespace: "https://microsoft.com",
              type: {
                name: MapperTypeNames.Composite,
                modelProperties: {
                  foo: {
                    serializedName: "foo",
                    xmlNamespace: "https://microsoft.com/foo",
                    xmlName: "Foo",
                    type: {
                      name: "String",
                    },
                  },
                  bar: {
                    xmlNamespacePrefix: "bar",
                    xmlNamespace: "https://microsoft.com/bar",
                    xmlName: "Bar",
                    serializedName: "bar",
                    type: {
                      name: "String",
                    },
                  },
                },
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com"><Foo xmlns="https://microsoft.com/foo">Foo</Foo><Bar xmlns:bar="https://microsoft.com/bar">Bar</Bar></bodyArg>`,
      );
    });

    it("should serialize an XML Array of composite elements, namespace and prefix", () => {
      const httpRequest = createPipelineRequest({ url: "https://example.com" });
      serializeRequestBody(
        httpRequest,
        {
          bodyArg: [
            { foo: "Foo1", bar: "Bar1" },
            { foo: "Foo2", bar: "Bar2" },
            { foo: "Foo3", bar: "Bar3" },
          ],
        },
        {
          httpMethod: "POST",
          requestBody: {
            parameterPath: "bodyArg",
            mapper: {
              required: true,
              serializedName: "bodyArg",
              xmlNamespace: "https://microsoft.com",
              xmlElementName: "testItem",
              type: {
                name: MapperTypeNames.Sequence,
                element: {
                  xmlNamespace: "https://microsoft.com/element",
                  type: {
                    name: "Composite",
                    modelProperties: {
                      foo: {
                        serializedName: "foo",
                        xmlNamespace: "https://microsoft.com/foo",
                        xmlName: "Foo",
                        type: {
                          name: "String",
                        },
                      },
                      bar: {
                        xmlNamespacePrefix: "bar",
                        xmlNamespace: "https://microsoft.com/bar",
                        xmlName: "Bar",
                        serializedName: "bar",
                        type: {
                          name: "String",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          responses: { 200: {} },
          serializer: createSerializer(undefined, true /** isXML */),
          isXML: true,
        },
        stringifyXML,
      );
      assert.strictEqual(
        httpRequest.body,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><bodyArg xmlns="https://microsoft.com"><testItem xmlns="https://microsoft.com/element"><Foo xmlns="https://microsoft.com/foo">Foo1</Foo><Bar xmlns:bar="https://microsoft.com/bar">Bar1</Bar></testItem><testItem xmlns="https://microsoft.com/element"><Foo xmlns="https://microsoft.com/foo">Foo2</Foo><Bar xmlns:bar="https://microsoft.com/bar">Bar2</Bar></testItem><testItem xmlns="https://microsoft.com/element"><Foo xmlns="https://microsoft.com/foo">Foo3</Foo><Bar xmlns:bar="https://microsoft.com/bar">Bar3</Bar></testItem></bodyArg>`,
      );
    });
  });
});
