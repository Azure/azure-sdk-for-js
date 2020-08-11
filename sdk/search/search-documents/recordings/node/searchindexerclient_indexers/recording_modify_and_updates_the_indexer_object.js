let nock = require('nock');

module.exports.hash = "b703e8bf9e25d7c7573c45bcd1b181c5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fd387f9bbbc6eeefe6ef9b22ddaeb8f46062ab5b82090bfef473bef0e9e1edc7bfaf4f4f8e0f8e983bddd4f7fdf8fa8d5325be4f4f5e27a3bfbc1baceb715d0f62e7d37cb9b695dacdaa25a5293a7eeaff4bcaad3d7d96255e6e999bc80e6d4ddeb6a5d4ff31716283edb6ef8c3edfbd4a6795b946593b7d262b92ecbd1476d565fe42dc3918f3f9a576d5e6e97c565bedde64dbbbd476fce8a269b94f9eca347e719412050d3793e5b97d45ec0acb29ade6ef3ba319f9c177939fb225bad8ae5057df8bdef8f3eaad6ed6add3eeb7f912fa7f5350feef7caaf05c02ff97f007f4a3d6c9a010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDEA8AD7216"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '65dd6ea8-2269-492f-a8cb-44ba891e2bea',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:09:43 GMT',
  'Content-Length',
  '398' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-1%27)', {"name":"my-azure-indexer-1","description":"Description for Sample Indexer","dataSourceName":"my-data-source-5","skillsetName":null,"targetIndexName":"hotel-live-test-2","schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"disabled":true,"@odata.etag":"\"0x8D83DDEA8AD7216\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fd387f9bbbc6eeefe6ef9b22ddaeb8f46062ab5b82090bfef473bef0e9e1edc7bfaf4f4f8c9cefd83834f777fdf8fa8d5325be4f4f5e27a3bfbc1baceb715d0f62e7d37cb9b695dacdaa25a5293a7eeaff4bcaad3d7d96255e6e999bc80e6d4ddeb6a5d4ff31716283edb6ef8c3edfbd4a6795b946593b7d262b92ecbd1476d565fe42dc3918f3f9a576d5e6e97c565bedde64dbbbd476fce8a269b94f9eca3476dbdce09d2749ecfd625351728abaca697dbbc6ecc27e7455ecebec856ab6279411f7eeffba38faa75bb5ab7cffa5fe4cb697dcd63fbbdf26b01f04bfe1f9df2c2e499010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDEAB058861"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '434e2192-4000-45dc-aabb-447569328fac',
  'elapsed-time',
  '42',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:09:43 GMT',
  'Content-Length',
  '397' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fd387f9bbbc6eeefe6ef9b22ddaeb8f46062ab5b82090bfef473bef0e9e1edc7bfaf4f4f8c9cefd83834f777fdf8fa8d5325be4f4f5e27a3bfbc1baceb715d0f62e7d37cb9b695dacdaa25a5293a7eeaff4bcaad3d7d96255e6e999bc80e6d4ddeb6a5d4ff31716283edb6ef8c3edfbd4a6795b946593b7d262b92ecbd1476d565fe42dc3918f3f9a576d5e6e97c565bedde64dbbbd476fce8a269b94f9eca3476dbdce09d2749ecfd625351728abaca697dbbc6ecc27e7455ecebec856ab6279411f7eeffba38faa75bb5ab7cffa5fe4cb697dcd63fbbdf26b01f04bfe1f9df2c2e499010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDEAB058861"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '7f369d6a-da5e-488b-9a0d-0fa73cfa77ff',
  'elapsed-time',
  '11',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:09:43 GMT',
  'Content-Length',
  '397' ]);
