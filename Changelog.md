### 0.2.1 - 2017-10-10
- moment version 2.19.0 has lot of issues. Hence fixing the dependency strictly to 2.18.1.
### 0.2.0 - 2017-10-10
- Reverting the change made in #2.

### 0.1.0 - 2017-09-16
- Initial version of ms-rest-js
  - Provides support for basic credentials
  - Supports serialization and deserialization of basic and complex types
  - Supports sending requests in the node environment and also in the browser
  - Builds the request pipeline by adding predefined filters
  - Provides mechanism to add custom flters in the pipeline
  - Provides a bundled file named [msRestBundle.js](./msRestBundle.js) that can be used in the browser
  - Please take a look at the [samples](./samples) directory for node and browser samples
