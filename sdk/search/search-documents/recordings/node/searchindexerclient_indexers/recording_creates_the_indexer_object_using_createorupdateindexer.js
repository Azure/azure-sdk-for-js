let nock = require('nock');

module.exports.hash = "b9be21fc4840e99dbc3059887e2093e6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-3%27)', {"name":"my-azure-indexer-3","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","targetIndexName":"hotel-live-test2","disabled":false})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexers/$entity","@odata.etag":"\"0x8D86247C5CB5087\"","name":"my-azure-indexer-3","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","skillsetName":null,"targetIndexName":"hotel-live-test2","disabled":false,"schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D86247C5CB5087"',
  'Location',
  'https://endpoint/indexers(\'my-azure-indexer-3\')?api-version=2020-06-30',
  'request-id',
  '2e327b0d-7c74-443a-a7e8-144c2766e7d8',
  'elapsed-time',
  '895',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:12:47 GMT',
  'Content-Length',
  '412' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3834ff7f61f9cdc3f79727fe7e0c1effb11b55a668b9cbe5e5c6f673f58d7f9b602dabe47dfcdf2665a17abb6a896d4e4a9fb2b3dafeaf475b65895797a262fa03975f7ba5ad7d3fc85058acfb61bfe707b97da346f8bb26cf2565a2cd76539faa8cdea8bbc6538f2f147f3aacdcbedb2b8ccb741853d7a715634d9a4cc671f3d3acf0800419acef3d9baa4e6026595d5f4729bd78df9e4bcc8cbd917d96a552c2fe8c3ef7d7ff451b56e57ebf659ff8b7c39adaf796cbf577e2d007ec9ff033b1d0eb49c010000"], [ 'Cache-Control',
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
  'W/"0x8D86247C5CB5087"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '4b354744-f748-47a7-bea3-b1d533ece03b',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:12:47 GMT',
  'Content-Length',
  '397' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/indexers(%27my-azure-indexer-3%27)')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'a8f848c2-0f7f-4afd-8917-4084f31c8090',
  'elapsed-time',
  '60',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:12:47 GMT' ]);
