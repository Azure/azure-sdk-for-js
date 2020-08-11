let nock = require('nock');

module.exports.hash = "b703e8bf9e25d7c7573c45bcd1b181c5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fd387f9bbbc6eeefe6ef9b22ddaeb8f46062ab5b82090bfef473bef0e9e1edc7bfaf4e4c99383274ff6771ffebe1f51ab65b6c8e9ebc5f576f683759d6f2ba0ed5dfa6e9637d3ba58b545b5a4264fdd5fe97955a7afb3c5aaccd3337901cda9bbd7d5ba9ee62f2c507cb6ddf087dbf7a94df3b628cb266fa5c5725d96a38fdaacbec85b86231f7f34afdabcdc2e8bcb7cbbcd9b767b8fde9c154d3629f3d9478fce338240a0a6f37cb62ea9bd80596535bddde675633e392ff272f645b65a15cb0bfaf07bdf1f7d54addbd5ba7dd6ff225f4eeb6b1edcef955f0b805ff2ff00afaafab99a010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDCBB8BB419"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'bf234fa4-9496-4b6f-82c4-d3404744eeea',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:55:55 GMT',
  'Content-Length',
  '398' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-1%27)', {"name":"my-azure-indexer-1","description":"Description for Sample Indexer","dataSourceName":"my-data-source-5","skillsetName":null,"targetIndexName":"hotel-live-test-2","schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"disabled":true,"@odata.etag":"\"0x8D83DDCBB8BB419\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fd387f9bbbc6eeefe6ef9b22ddaeb8f46062ab5b82090bfef473bef0e9e1edc7bfaf4e4c9d3677b0f9fec1cffbe1f51ab65b6c8e9ebc5f576f683759d6f2ba0ed5dfa6e9637d3ba58b545b5a4264fdd5fe97955a7afb3c5aaccd3337901cda9bbd7d5ba9ee62f2c507cb6ddf087dbf7a94df3b628cb266fa5c5725d96a38fdaacbec85b86231f7f34afdabcdc2e8bcb7cbbcd9b767b8fde9c154d3629f3d9478fda7a9d13a4e93c9fad4b6a2e5056594d2fb779dd984fce8bbc9c7d91ad56c5f2823efcdef7471f55eb76b56e9ff5bfc897d3fa9ac7f67be5d702e097fc3f76a523c999010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDCBDF29B0A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '81f12461-4659-479b-bdde-a3231fe28aad',
  'elapsed-time',
  '44',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:55:55 GMT',
  'Content-Length',
  '397' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fd387f9bbbc6eeefe6ef9b22ddaeb8f46062ab5b82090bfef473bef0e9e1edc7bfaf4e4c9d3677b0f9fec1cffbe1f51ab65b6c8e9ebc5f576f683759d6f2ba0ed5dfa6e9637d3ba58b545b5a4264fdd5fe97955a7afb3c5aaccd3337901cda9bbd7d5ba9ee62f2c507cb6ddf087dbf7a94df3b628cb266fa5c5725d96a38fdaacbec85b86231f7f34afdabcdc2e8bcb7cbbcd9b767b8fde9c154d3629f3d9478fda7a9d13a4e93c9fad4b6a2e5056594d2fb779dd984fce8bbc9c7d91ad56c5f2823efcdef7471f55eb76b56e9ff5bfc897d3fa9ac7f67be5d702e097fc3f76a523c999010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDCBDF29B0A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '4eb368cc-c49c-47ce-9835-1ede665de2c3',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:55:55 GMT',
  'Content-Length',
  '397' ]);
