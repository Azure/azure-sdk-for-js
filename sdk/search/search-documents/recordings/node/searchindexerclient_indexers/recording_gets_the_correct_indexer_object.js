let nock = require('nock');

module.exports.hash = "a3df68ee48e8699423e1225aa92be086";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fd387f9bbbc6eeefe6ef9b22ddaeb8f46062ab5b82090bfef473bef0e9e1edc7bfaf4e478677fffc1a7bb0f7fdf8fa8d5325be4f4f5e27a3bfbc1baceb715d0f62e7d37cb9b695dacdaa25a5293a7eeaff4bcaad3d7d96255e6e999bc80e6d4ddeb6a5d4ff31716283edb6ef8c3edfbd4a6795b946593b7d262b92ecbd1476d565fe42dc3918f3f9a576d5e6e97c565bedde64dbbbd476fce8a269b94f9eca347e719412050d3793e5b97d45ec0acb29ade6ef3ba319f9c177939fb225bad8ae5057df8bdef8f3eaad6ed6add3eeb7f912fa7f5350feef7caaf05c02ff97f002f6ffec39a010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDCA0447619"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'b2151fa1-2d2d-45b8-9225-304aeab80352',
  'elapsed-time',
  '16',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:55:10 GMT',
  'Content-Length',
  '398' ]);
