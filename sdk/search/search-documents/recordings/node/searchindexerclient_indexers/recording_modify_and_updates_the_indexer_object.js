let nock = require('nock');

module.exports.hash = "0b07a3169231140ac7e2b96b5790014e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3834f77f79e9c9eee3d397eb87bfcfb7e44ad96d922a7af17d7dbd90fd675bead80b677e9bb59de4ceb62d516d5929a3c757fa5e7559dbece16ab324fcfe40534a7ee5e57eb7a9abfb040f1d976c31f32c8e66d51964dde4a8be5ba2c471fb5597d91b70c473efe685eb579b95d1697f936a8b0472fce8a269b94f9eca347e719012048d3793e5b97d45ca0acb29a5e6ef3ba319f9c177939fb225bad8ae5057df8bdef8f3eaad6ed6add3eeb7f912fa7f5358fedf7caaf05c02ff97f000f9a8fa59c010000"], [ 'Cache-Control',
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
  'W/"0x8D8612BEE2BA91A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '6f170932-3f2e-4e41-83cd-5da5afb04306',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:20:58 GMT',
  'Content-Length',
  '395' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-1%27)', {"name":"my-azure-indexer-1","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","skillsetName":null,"targetIndexName":"hotel-live-test2","schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"disabled":true,"@odata.etag":"\"0x8D8612BEE2BA91A\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3834f77f79e9c9e3ea5ffed1fffbe1f51ab65b6c8e9ebc5f576f683759d6f2ba0ed5dfa6e9637d3ba58b545b5a4264fdd5fe97955a7afb3c5aaccd3337901cda9bbd7d5ba9ee62f2c507cb6ddf0870cb2795b946593b7d262b92ecbd1476d565fe42dc3918f3f9a576d5e6e97c565be0d2aecd18bb3a2c926653efbe8515baf7302349de7b37549ad05c82aabe9dd36af1bf3c9799197b32fb2d5aa585ed087dffbfee8a36addaed6edb3fe17f9725a5ff3d07eaffc5a00fc92ff0765c739f99b010000"], [ 'Cache-Control',
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
  'W/"0x8D8612BEEDEED4A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'b877eb4d-85c8-439f-9c04-ee7fd9a4e5e6',
  'elapsed-time',
  '59',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:20:59 GMT',
  'Content-Length',
  '393' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3834f77f79e9c9e3ea5ffed1fffbe1f51ab65b6c8e9ebc5f576f683759d6f2ba0ed5dfa6e9637d3ba58b545b5a4264fdd5fe97955a7afb3c5aaccd3337901cda9bbd7d5ba9ee62f2c507cb6ddf0870cb2795b946593b7d262b92ecbd1476d565fe42dc3918f3f9a576d5e6e97c565be0d2aecd18bb3a2c926653efbe8515baf7302349de7b37549ad05c82aabe9dd36af1bf3c9799197b32fb2d5aa585ed087dffbfee8a36addaed6edb3fe17f9725a5ff3d07eaffc5a00fc92ff0765c739f99b010000"], [ 'Cache-Control',
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
  'W/"0x8D8612BEEDEED4A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'bb134a47-d5aa-43d5-a923-efa76d89792c',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:20:59 GMT',
  'Content-Length',
  '393' ]);
