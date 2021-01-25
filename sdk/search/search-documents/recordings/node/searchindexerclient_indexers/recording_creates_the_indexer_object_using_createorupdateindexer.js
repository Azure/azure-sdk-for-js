let nock = require('nock');

module.exports.hash = "e56d335bb335b59ac351e5cbbfe70eb0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-3%27)', {"name":"my-azure-indexer-3","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","targetIndexName":"hotel-live-test2","disabled":false})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexers/$entity","@odata.etag":"\"0x8D8809AE2BFE4D1\"","name":"my-azure-indexer-3","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","skillsetName":null,"targetIndexName":"hotel-live-test2","disabled":false,"schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8809AE2BFE4D1"',
  'Location',
  'https://endpoint/indexers(\'my-azure-indexer-3\')?api-version=2020-06-30',
  'request-id',
  '0d466916-3b0f-422f-ae35-5438b4458821',
  'elapsed-time',
  '726',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:23:18 GMT',
  'Content-Length',
  '412' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d383839d87c7a77b4f9e9dee3fddfd7d3fa256cb6c91d3d78bebedec07eb3adf5640dbf7e8bb59de4ceb62d516d5929a3c757fa5e7559dbece16ab324fcfe40534a7ee5e57eb7a9abfb040f1d976c31f6eef529be66d51964dde4a8be5ba2c471fb5597d91b70c473efe685eb579b95d1697f936a8b0472fce8a269b94f9eca347e719012048d3793e5b97d45ca0acb29a5e6ef3ba319f9c177939fb225bad8ae5057df8bdef8f3eaad6ed6add3eeb7f912fa7f5358fedf7caaf05c02ff97f00966488cf9c010000"], [ 'Cache-Control',
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
  'W/"0x8D8809AE2BFE4D1"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '1181ba4e-26bf-4390-8551-a27eb7ec816c',
  'elapsed-time',
  '9',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:23:18 GMT',
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
  '346e62a9-0ada-471a-8af0-f925a6a862a5',
  'elapsed-time',
  '45',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:23:18 GMT' ]);
