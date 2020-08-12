let nock = require('nock');

module.exports.hash = "9eb96af1fc6699bc5b248ffe995dc551";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-6%27)', {"name":"my-azure-indexer-6","description":"Description for Sample Indexer","dataSourceName":"my-data-source-5","targetIndexName":"hotel-live-test2","disabled":false})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexers/$entity","@odata.etag":"\"0x8D83DEC6097FC05\"","name":"my-azure-indexer-6","description":"Description for Sample Indexer","dataSourceName":"my-data-source-5","skillsetName":null,"targetIndexName":"hotel-live-test2","disabled":false,"schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D83DEC6097FC05"',
  'Location',
  'https://endpoint/indexers(\'my-azure-indexer-6\')?api-version=2020-06-30',
  'request-id',
  'ce109d4c-0c11-47ec-923f-c2d0e17a0368',
  'elapsed-time',
  '862',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:47:50 GMT',
  'Content-Length',
  '412' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-6%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3837b4f4f4f3edd79f8e0d9c9cefddff7236ab5cc16397dbdb8dece7eb0aef36d05b4fd297d37cb9b695dacdaa25a5293a7eeaff4bcaad3d7d96255e6e999bc80e6d4ddeb6a5d4ff31716283edb6ef8c3edfbd4a6795b946593b7d262b92ecbd1476d565fe42dc3918f3f9a576d5e6e97c565be0d2aecd18bb3a2c926653efbe8d179460008d2749ecfd625351728abaca697dbbc6ecc27e7455ecebec856ab6279411f7eeffba38faa75bb5ab7cffa5fe4cb697dcd63fbbdf26b01f04bfe1fe974e0f69c010000"], [ 'Cache-Control',
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
  'W/"0x8D83DEC6097FC05"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '3f3aaa9a-b03c-4d2f-8f9d-b1bf06704a59',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:47:51 GMT',
  'Content-Length',
  '397' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/indexers(%27my-azure-indexer-6%27)')
  .query(true)
  .reply(204, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'ba0651fb-81b0-449d-8dac-967847ac67aa',
  'elapsed-time',
  '41',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:47:51 GMT' ]);
