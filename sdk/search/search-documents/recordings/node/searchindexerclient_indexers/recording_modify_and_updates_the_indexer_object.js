let nock = require('nock');

module.exports.hash = "0b07a3169231140ac7e2b96b5790014e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d383839d87c7a70f9fde7bf0e9c9c9effb11b55a668b9cbe5e5c6f673f58d7f9b602dadea5ef667933ad8b555b544b6af2d4fd959e5775fa3a5bacca3c3d9317d09cba7b5dadeb69fec202c567db0d7fc8209bb7455936792b2d96ebb21c7dd466f545de321cf9f8a379d5e6e576595ce6dba0c21ebd382b9a6c52e6b38f1e9d670480204de7f96c5d527381b2ca6a7ab9cdebc67c725ee4e5ec8b6cb52a9617f4e1f7be3ffaa85ab7ab75fbacff45be9cd6d73cb6df2bbf1600bfe4ff01d877cdaa9c010000"], [ 'Cache-Control',
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
  'W/"0x8D8809AE9D376CC"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '779ebe88-e6a8-4d35-8899-8059ea195b59',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:23:32 GMT',
  'Content-Length',
  '395' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-1%27)', {"name":"my-azure-indexer-1","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","skillsetName":null,"targetIndexName":"hotel-live-test2","schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"disabled":true,"@odata.etag":"\"0x8D8809AE9D376CC\"","encryptionKey":null})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d383839d87c7a7c7c74f0feeedeeffbe1f51ab65b6c8e9ebc5f576f683759d6f2ba0ed5dfa6e9637d3ba58b545b5a4264fdd5fe97955a7afb3c5aaccd3337901cda9bbd7d5ba9ee62f2c507cb6ddf0870cb2795b946593b7d262b92ecbd1476d565fe42dc3918f3f9a576d5e6e97c565be0d2aecd18bb3a2c926653efbe8515baf7302349de7b37549ad05c82aabe9dd36af1bf3c9799197b32fb2d5aa585ed087dffbfee8a36addaed6edb3fe17f9725a5ff3d07eaffc5a00fc92ff07e7b5399d9b010000"], [ 'Cache-Control',
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
  'W/"0x8D8809AEAAD8314"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '0822a7a9-0b1a-4325-a16c-fc3b5117e221',
  'elapsed-time',
  '65',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:23:32 GMT',
  'Content-Length',
  '394' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d383839d87c7a7c7c74f0feeedeeffbe1f51ab65b6c8e9ebc5f576f683759d6f2ba0ed5dfa6e9637d3ba58b545b5a4264fdd5fe97955a7afb3c5aaccd3337901cda9bbd7d5ba9ee62f2c507cb6ddf0870cb2795b946593b7d262b92ecbd1476d565fe42dc3918f3f9a576d5e6e97c565be0d2aecd18bb3a2c926653efbe8515baf7302349de7b37549ad05c82aabe9dd36af1bf3c9799197b32fb2d5aa585ed087dffbfee8a36addaed6edb3fe17f9725a5ff3d07eaffc5a00fc92ff07e7b5399d9b010000"], [ 'Cache-Control',
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
  'W/"0x8D8809AEAAD8314"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '33064fff-d1da-4ffd-badc-63d33655285b',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:23:32 GMT',
  'Content-Length',
  '394' ]);
