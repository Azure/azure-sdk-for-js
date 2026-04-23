// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assert, describe, it } from "vitest";
import type { SearchField as GeneratedSearchField } from "../../src/models/azure/search/documents/indexes/index.js";
import { KnownAnalyzerNames } from "../../src/index.js";
import type { ComplexField, SearchField } from "../../src/serviceModels.js";
import { convertFieldsToGenerated, convertFieldsToPublic } from "../../src/serviceUtils.js";

describe("serviceUtils", () => {
  it("convert generated fields to public fields", () => {
    const publicFields: SearchField[] | undefined = convertFieldsToPublic([
      {
        name: "id",
        key: true,
        type: "Edm.String",
        searchable: true,
        sortable: true,
        filterable: true,
        facetable: true,
        retrievable: false,
        analyzerName: KnownAnalyzerNames.ArMicrosoft,
        indexAnalyzerName: KnownAnalyzerNames.ArLucene,
        normalizerName: KnownAnalyzerNames.BgLucene,
        searchAnalyzerName: KnownAnalyzerNames.CaLucene,
        synonymMapNames: undefined,
      },
    ]);

    assert.include(publicFields![0], {
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

  it("convert generated fields (complex) to public fields", () => {
    const publicFields: SearchField[] | undefined = convertFieldsToPublic([
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
            analyzerName: KnownAnalyzerNames.ArMicrosoft,
            indexAnalyzerName: KnownAnalyzerNames.ArLucene,
            normalizerName: KnownAnalyzerNames.BgLucene,
            searchAnalyzerName: KnownAnalyzerNames.CaLucene,
            synonymMapNames: undefined,
          },
        ],
      },
    ]);

    assert.include(publicFields![0], {
      name: "ComplexObj",
      type: "Edm.ComplexType",
    });

    assert.include((publicFields![0] as ComplexField).fields![0], {
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

  it("convert public fields to generated fields", () => {
    const generatedFields: GeneratedSearchField[] | undefined = convertFieldsToGenerated([
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

    assert.include(generatedFields?.[0], {
      name: "id",
      key: true,
      type: "Edm.String",
      searchable: true,
      sortable: true,
      filterable: true,
      facetable: true,
      retrievable: false,
      analyzerName: KnownAnalyzerNames.ArMicrosoft,
      indexAnalyzerName: KnownAnalyzerNames.ArLucene,
      normalizerName: KnownAnalyzerNames.BgLucene,
      searchAnalyzerName: KnownAnalyzerNames.CaLucene,
      synonymMapNames: undefined,
    });
  });

  it("convert public fields (complex) to generated fields", () => {
    const generatedFields: GeneratedSearchField[] | undefined = convertFieldsToGenerated([
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

    assert.include(generatedFields?.[0], {
      name: "ComplexObj",
      type: "Edm.ComplexType",
    });

    assert.include(generatedFields?.[0].fields![0], {
      name: "id",
      key: true,
      type: "Edm.String",
      searchable: true,
      sortable: true,
      filterable: true,
      facetable: true,
      retrievable: false,
      analyzerName: KnownAnalyzerNames.ArMicrosoft,
      indexAnalyzerName: KnownAnalyzerNames.ArLucene,
      normalizerName: KnownAnalyzerNames.BgLucene,
      searchAnalyzerName: KnownAnalyzerNames.CaLucene,
      synonymMapNames: undefined,
    });
  });
});
