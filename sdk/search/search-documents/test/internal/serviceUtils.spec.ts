// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { SearchField as GeneratedSearchField } from "../../src/generated/service/models/index";
import { KnownAnalyzerNames } from "../../src/index";
import { ComplexField, SearchField } from "../../src/serviceModels";
import { convertFieldsToGenerated, convertFieldsToPublic } from "../../src/serviceUtils";

describe("serviceUtils", function () {
  it("convert generated fields to public fields", function () {
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
        analyzer: KnownAnalyzerNames.ArMicrosoft,
        indexAnalyzer: KnownAnalyzerNames.ArLucene,
        normalizer: KnownAnalyzerNames.BgLucene,
        searchAnalyzer: KnownAnalyzerNames.CaLucene,
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
      analyzerName: KnownAnalyzerNames.ArMicrosoft,
      indexAnalyzerName: KnownAnalyzerNames.ArLucene,
      normalizerName: KnownAnalyzerNames.BgLucene,
      searchAnalyzerName: KnownAnalyzerNames.CaLucene,
      synonymMapNames: undefined,
    });
  });

  it("convert generated fields (complex) to public fields", function () {
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
            analyzer: KnownAnalyzerNames.ArMicrosoft,
            indexAnalyzer: KnownAnalyzerNames.ArLucene,
            normalizer: KnownAnalyzerNames.BgLucene,
            searchAnalyzer: KnownAnalyzerNames.CaLucene,
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
      analyzerName: KnownAnalyzerNames.ArMicrosoft,
      indexAnalyzerName: KnownAnalyzerNames.ArLucene,
      normalizerName: KnownAnalyzerNames.BgLucene,
      searchAnalyzerName: KnownAnalyzerNames.CaLucene,
      synonymMapNames: undefined,
    });
  });

  it("convert public fields to generated fields", function () {
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
        analyzerName: KnownAnalyzerNames.ArMicrosoft,
        indexAnalyzerName: KnownAnalyzerNames.ArLucene,
        normalizerName: KnownAnalyzerNames.BgLucene,
        searchAnalyzerName: KnownAnalyzerNames.CaLucene,
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
      analyzer: KnownAnalyzerNames.ArMicrosoft,
      indexAnalyzer: KnownAnalyzerNames.ArLucene,
      normalizer: KnownAnalyzerNames.BgLucene,
      searchAnalyzer: KnownAnalyzerNames.CaLucene,
      synonymMaps: undefined,
    });
  });

  it("convert public fields (complex) to generated fields", function () {
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
            analyzerName: KnownAnalyzerNames.ArMicrosoft,
            indexAnalyzerName: KnownAnalyzerNames.ArLucene,
            normalizerName: KnownAnalyzerNames.BgLucene,
            searchAnalyzerName: KnownAnalyzerNames.CaLucene,
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
      analyzer: KnownAnalyzerNames.ArMicrosoft,
      indexAnalyzer: KnownAnalyzerNames.ArLucene,
      normalizer: KnownAnalyzerNames.BgLucene,
      searchAnalyzer: KnownAnalyzerNames.CaLucene,
      synonymMaps: undefined,
    });
  });
});
