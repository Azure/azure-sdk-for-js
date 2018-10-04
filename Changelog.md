### 1.0.0 - 2018/10/04

- Moved to rollup for bundling
- Moved browser bundle from ./msRestAzureBundle.js to ./dist/msRestAzure.js (same bundle for nodejs and browser)

### 0.2.8 - 2017/04/02

- Updated ms-rest-js to 0.2.8
- Added CognitiveServicesCredentials

### 0.2.1 - 2017/10/25

- Updating the minimum version of dependency "ms-rest-js": "^0.2.3". This brings in the change (removal of "bodyAsStream" property) done to HttpOperationResponse class

### 0.2.0 - 2017/10/11

- Updating the minimum version of dependency "ms-rest-js": "^0.2.1". This also gets a strict dependency to "moment" version 2.18.1 as 2.19.0 has bugs.

### 0.1.0 - 2017/09/16

- Initial version of the isomorphic azure runtime along with type definitions that works in the browser as well as the node.js environment
  - Supports polling for long running operations
  - Provides definition of CloudError