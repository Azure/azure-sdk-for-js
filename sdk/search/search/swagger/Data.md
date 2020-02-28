# Azure Cognitive Search TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/search"
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated/data
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/search/data-plane/Microsoft.Azure.Search.Data/stable/2019-05-06/searchindex.json
add-credentials: true
use-extension:
  "@microsoft.azure/autorest.typescript": "5.0.1"
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Move to endpoint

```yaml
directive:
  - from: swagger-document
    where: $['x-ms-parameterized-host']
    transform: >
      $["hostTemplate"] = "{Endpoint}/indexes('{indexName}')";
      $.parameters = [{"$ref": "#/parameters/Endpoint"},{"$ref": "#/parameters/IndexNameParameter"}]
  - from: swagger-document
    where: $.parameters
    transform: >
      delete $.SearchServiceNameParameter;
      delete $.SearchDnsSuffixParameter;
      $.Endpoint = {};
      $.Endpoint.name = "Endpoint";
      $.Endpoint.in = "path";
      $.Endpoint.required = true;
      $.Endpoint.type = "string";
      $.Endpoint["x-ms-skip-url-encoding"] =  true;
      $.Endpoint["description"] = "Search API endpoint (protocol and hostname)";
      $.Endpoint["x-ms-parameter-location"] = "client";
      const indexName = $.IndexNameParameter;
      delete $.IndexNameParameter;
      $.IndexNameParameter = indexName;
```

### Give us a default handler

```yaml
directive:
  - from: swagger-document
    where: $.paths..responses
    transform: >
      if (!$["default"]) {
        $["default"] = {};
        $["default"].description = "Error Response";
        $["default"].schema = {"$ref": "#/definitions/SearchError"};
      }
  - from: swagger-document
    where: $.definitions
    transform: >
      $["SearchError"] = {};
      $["SearchError"].type = "object";
      $["SearchError"].required = ["code", "message"];
      $["SearchError"].properties = {};
      $["SearchError"].properties.code = { type: "string" };
      $["SearchError"].properties.message = { type: "string" };
```

### Mark properties as required

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchRequest
    transform: >
      $.required = ["search"]
  - from: swagger-document
    where: $.definitions.AutocompleteRequest
    transform: >
      $.required = ["search", "suggesterName"]
  - from: swagger-document
    where: $.definitions.SuggestRequest
    transform: >
      $.required = ["search", "suggesterName"]
```
