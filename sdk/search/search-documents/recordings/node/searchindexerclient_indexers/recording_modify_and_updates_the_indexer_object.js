let nock = require('nock');

module.exports.hash = "2ce2012feea3e7dc0f1f5473f726ef4d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d383fd87f74f9e7dfa74eff4c9bd67bfef47d46a992d72fa7a71bd9dfd605de7db0a687b97be9be5cdb42e566d512da9c953f7577a5ed5e9eb6cb12af3f44c5e4073eaee75b5aea7f90b0b149f6d37fc21836cde1665d9e4adb458aecb72f4519bd51779cb70e4e38fe6559b97db6571996f830a7bf4e2ac68b24999cf3e7a749e110082349de7b37549cd05ca2aabe9e536af1bf3c9799197b32fb2d5aa585ed087dffbfee8a36addaed6edb3fe17f9725a5ff3d87eaffc5a00fc92ff07705a7c889c010000"], [ 'Cache-Control',
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
  'W/"0x8D8495CF6D2EB3F"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '82e057ab-d690-4670-8790-7372a743953a',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:11:30 GMT',
  'Content-Length',
  '395' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-1%27)', {"name":"my-azure-indexer-1","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","skillsetName":null,"targetIndexName":"hotel-live-test2","schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"disabled":true,"@odata.etag":"\"0x8D8495CF6D2EB3F\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d383fd87f74f9e3d3878faecc1cef1effb11b55a668b9cbe5e5c6f673f58d7f9b602dadea5ef667933ad8b555b544b6af2d4fd959e5775fa3a5bacca3c3d9317d09cba7b5dadeb69fec202c567db0d7fc8209bb7455936792b2d96ebb21c7dd466f545de321cf9f8a379d5e6e576595ce6dba0c21ebd382b9a6c52e6b38f1eb5f53a2740d3793e5b97d45a80acb29ade6df3ba319f9c177939fb225bad8ae5057df8bdef8f3eaad6ed6add3eeb7f912fa7f5350fedf7caaf05c02ff97f00c6dfbd109b010000"], [ 'Cache-Control',
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
  'W/"0x8D8495CF78DF70A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '1d037414-d023-4158-85de-2b584cd77718',
  'elapsed-time',
  '51',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:11:30 GMT',
  'Content-Length',
  '395' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d383fd87f74f9e3d3878faecc1cef1effb11b55a668b9cbe5e5c6f673f58d7f9b602dadea5ef667933ad8b555b544b6af2d4fd959e5775fa3a5bacca3c3d9317d09cba7b5dadeb69fec202c567db0d7fc8209bb7455936792b2d96ebb21c7dd466f545de321cf9f8a379d5e6e576595ce6dba0c21ebd382b9a6c52e6b38f1eb5f53a2740d3793e5b97d45a80acb29ade6df3ba319f9c177939fb225bad8ae5057df8bdef8f3eaad6ed6add3eeb7f912fa7f5350fedf7caaf05c02ff97f00c6dfbd109b010000"], [ 'Cache-Control',
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
  'W/"0x8D8495CF78DF70A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '391fada3-5cc4-4885-93c4-ad80905bbef0',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:11:30 GMT',
  'Content-Length',
  '395' ]);
