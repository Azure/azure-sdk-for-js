let nock = require('nock');

module.exports.hash = "27790d14968b361b3a8be39c5750546f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3834ff7f61f3c79f0f4c1deeed3e3dff7236ab5cc16397dbdb8dece7eb0aef36d05b4bd4bdfcdf2665a17abb6a896d4e4a9fb2b3dafeaf475b65895797a262fa03975f7ba5ad7d3fc85058acfb61bfe9041366f8bb26cf2565a2cd76539faa8cdea8bbc6538f2f147f3aacdcbedb2b8ccb741853d7a715634d9a4cc671f3d3acf0800419acef3d9baa4e6026595d5f4729bd78df9e4bcc8cbd917d96a552c2fe8c3ef7d7ff451b56e57ebf659ff8b7c39adaf796cbf577e2d007ec9ff036fa0814e9c010000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D86247B7D721DA"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '3442215b-be1d-4b49-9efd-3640f132a9e4',
  'elapsed-time',
  '12',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:12:24 GMT',
  'Content-Length',
  '395' ]);
