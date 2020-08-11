let nock = require('nock');

module.exports.hash = "a3df68ee48e8699423e1225aa92be086";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fd387f9bbbc6eeefe6ef9b22ddaeb8f46062ab5b82090bfef473bef0e9e1edc7bfaf4f4e0e9dec34f8f1f9cfcbe1f51ab65b6c8e9ebc5f576f683759d6f2ba0ed5dfa6e9637d3ba58b545b5a4264fdd5fe97955a7afb3c5aaccd3337901cda9bbd7d5ba9ee62f2c507cb6ddf087dbf7a94df3b628cb266fa5c5725d96a38fdaacbec85b86231f7f34afdabcdc2e8bcb7cbbcd9b767b8fde9c154d3629f3d9478fce338240a0a6f37cb62ea9bd80596535bddde675633e392ff272f645b65a15cb0bfaf07bdf1f7d54addbd5ba7dd6ff225f4eeb6b1edcef955f0b805ff2ff002568d6a39a010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDE8D296A7C"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'bbedaca2-a60b-4818-8b01-d544f891e04a',
  'elapsed-time',
  '10',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:08:56 GMT',
  'Content-Length',
  '398' ]);
