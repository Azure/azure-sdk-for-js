let nock = require('nock');

module.exports.hash = "7832caa12c1e8dec47738caad2759950";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-6%27)', {"name":"my-azure-indexer-6","description":"Description for Sample Indexer","dataSourceName":"my-data-source-5","targetIndexName":"hotel-live-test-2","disabled":false})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexers/$entity","@odata.etag":"\"0x8D83DDCB5174A10\"","name":"my-azure-indexer-6","description":"Description for Sample Indexer","dataSourceName":"my-data-source-5","skillsetName":null,"targetIndexName":"hotel-live-test-2","disabled":false,"schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D83DDCB5174A10"',
  'Location',
  'https://endpoint/indexers(\'my-azure-indexer-6\')?api-version=2020-06-30',
  'request-id',
  'bdb1d9ea-b104-42b4-9733-000c11359bed',
  'elapsed-time',
  '906',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:55:41 GMT',
  'Content-Length',
  '410' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-6%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fd387f9bbbc6eeefe6ef9b22ddaeb8f46062ab5b82090bfef473bef0e9e1edc7bfaf4e4c9fddd07fbc7bb3bbfef47d46a992d72fa7a71bd9dfd605de7db0a68fb53fa6e9637d3ba58b545b5a4264fdd5fe97955a7afb3c5aaccd3337901cda9bbd7d5ba9ee62f2c507cb6ddf087dbf7a94df3b628cb266fa5c5725d96a38fdaacbec85b86231f7f34afdabcdc2e8bcb7cbbcd9b767b8fde9c154d3629f3d9478fce338240a0a6f37cb62ea9bd80596535bddde675633e392ff272f645b65a15cb0bfaf07bdf1f7d54addbd5ba7dd6ff225f4eeb6b1edcef955f0b805ff2ff003ec6ec989a010000"], [ 'Cache-Control',
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
  'W/"0x8D83DDCB5174A10"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '3d73a073-32ce-4af8-befc-c88ea1409e12',
  'elapsed-time',
  '5',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:55:41 GMT',
  'Content-Length',
  '398' ]);

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
  '6bf5bfd3-b158-4009-a984-695f85e0ac9e',
  'elapsed-time',
  '56',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:55:41 GMT' ]);
