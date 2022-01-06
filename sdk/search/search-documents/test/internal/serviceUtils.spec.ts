// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { convertFieldsToGenerated, convertFieldsToPublic } from "../../src/serviceUtils";
import { SearchField as GeneratedSearchField } from "../../src/generated/service/models/index";
import { KnownLexicalAnalyzerName } from "../../src/index";
import { ComplexField, SearchField } from "../../src/serviceModels";

describe("serviceUtils", () => {
  it("convert generated fields to public fields", () => {
    const publicFields: SearchField[] = convertFieldsToPublic([
      {
        name: "id",
        key: true,
        type: "Edm.String",
        searchable: true,
        sortable: true,
        filterable: true,
        facetable: true,
        retrievable: false,
        analyzer: KnownLexicalAnalyzerName.ArMicrosoft,
        indexAnalyzer: KnownLexicalAnalyzerName.ArLucene,
        normalizer: KnownLexicalAnalyzerName.BgLucene,
        searchAnalyzer: KnownLexicalAnalyzerName.CaLucene,
        synonymMaps: undefined,
      },
    ]);

    assert.include(publicFields[0], {
      name: "id",
      key: true,
      type: "Edm.String",
      searchable: true,
      sortable: true,
      filterable: true,
      facetable: true,
      hidden: true,
      analyzerName: KnownLexicalAnalyzerName.ArMicrosoft,
      indexAnalyzerName: KnownLexicalAnalyzerName.ArLucene,
      normalizerName: KnownLexicalAnalyzerName.BgLucene,
      searchAnalyzerName: KnownLexicalAnalyzerName.CaLucene,
      synonymMapNames: undefined,
    });
  });

  it("convert generated fields (complex) to public fields", () => {
    const publicFields: SearchField[] = convertFieldsToPublic([
      {
        name: "ComplexObj",
        type: "Edm.ComplexType",
        fields: [
          {
            name: "id",
            key: true,
            type: "Edm.String",
            searchable: true,
            sortable: true,
            filterable: true,
            facetable: true,
            retrievable: false,
            analyzer: KnownLexicalAnalyzerName.ArMicrosoft,
            indexAnalyzer: KnownLexicalAnalyzerName.ArLucene,
            normalizer: KnownLexicalAnalyzerName.BgLucene,
            searchAnalyzer: KnownLexicalAnalyzerName.CaLucene,
            synonymMaps: undefined,
          },
        ],
      },
    ]);

    assert.include(publicFields[0], {
      name: "ComplexObj",
      type: "Edm.ComplexType",
    });

    assert.include((publicFields[0] as ComplexField).fields![0], {
      name: "id",
      key: true,
      type: "Edm.String",
      searchable: true,
      sortable: true,
      filterable: true,
      facetable: true,
      hidden: true,
      analyzerName: KnownLexicalAnalyzerName.ArMicrosoft,
      indexAnalyzerName: KnownLexicalAnalyzerName.ArLucene,
      normalizerName: KnownLexicalAnalyzerName.BgLucene,
      searchAnalyzerName: KnownLexicalAnalyzerName.CaLucene,
      synonymMapNames: undefined,
    });
  });

  it("convert public fields to generated fields", () => {
    const generatedFields: GeneratedSearchField[] = convertFieldsToGenerated([
      {
        name: "id",
        key: true,
        type: "Edm.String",
        searchable: true,
        sortable: true,
        filterable: true,
        facetable: true,
        hidden: true,
        analyzerName: KnownLexicalAnalyzerName.ArMicrosoft,
        indexAnalyzerName: KnownLexicalAnalyzerName.ArLucene,
        normalizerName: KnownLexicalAnalyzerName.BgLucene,
        searchAnalyzerName: KnownLexicalAnalyzerName.CaLucene,
        synonymMapNames: undefined,
      },
    ]);

    assert.include(generatedFields[0], {
      name: "id",
      key: true,
      type: "Edm.String",
      searchable: true,
      sortable: true,
      filterable: true,
      facetable: true,
      retrievable: false,
      analyzer: KnownLexicalAnalyzerName.ArMicrosoft,
      indexAnalyzer: KnownLexicalAnalyzerName.ArLucene,
      normalizer: KnownLexicalAnalyzerName.BgLucene,
      searchAnalyzer: KnownLexicalAnalyzerName.CaLucene,
      synonymMaps: undefined,
    });
  });

  it("convert public fields (complex) to generated fields", () => {
    const generatedFields: GeneratedSearchField[] = convertFieldsToGenerated([
      {
        name: "ComplexObj",
        type: "Edm.ComplexType",
        fields: [
          {
            name: "id",
            key: true,
            type: "Edm.String",
            searchable: true,
            sortable: true,
            filterable: true,
            facetable: true,
            hidden: true,
            analyzerName: KnownLexicalAnalyzerName.ArMicrosoft,
            indexAnalyzerName: KnownLexicalAnalyzerName.ArLucene,
            normalizerName: KnownLexicalAnalyzerName.BgLucene,
            searchAnalyzerName: KnownLexicalAnalyzerName.CaLucene,
            synonymMapNames: undefined,
          },
        ],
      },
    ]);

    assert.include(generatedFields[0], {
      name: "ComplexObj",
      type: "Edm.ComplexType",
    });

    assert.include(generatedFields[0].fields![0], {
      name: "id",
      key: true,
      type: "Edm.String",
      searchable: true,
      sortable: true,
      filterable: true,
      facetable: true,
      retrievable: false,
      analyzer: KnownLexicalAnalyzerName.ArMicrosoft,
      indexAnalyzer: KnownLexicalAnalyzerName.ArLucene,
      normalizer: KnownLexicalAnalyzerName.BgLucene,
      searchAnalyzer: KnownLexicalAnalyzerName.CaLucene,
      synonymMaps: undefined,
    });
  });
});
