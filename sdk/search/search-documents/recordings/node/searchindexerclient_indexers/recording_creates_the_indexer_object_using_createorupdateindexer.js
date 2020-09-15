let nock = require('nock');

module.exports.hash = "21233cb53cca39b755574ccf0ac98cc8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-3%27)', {"name":"my-azure-indexer-3","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","targetIndexName":"hotel-live-test2","disabled":false})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexers/$entity","@odata.etag":"\"0x8D8495CF0B69B68\"","name":"my-azure-indexer-3","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","skillsetName":null,"targetIndexName":"hotel-live-test2","disabled":false,"schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D8495CF0B69B68"',
  'Location',
  'https://endpoint/indexers(\'my-azure-indexer-3\')?api-version=2020-06-30',
  'request-id',
  '8ba55652-4693-4d31-adc4-772f18fef125',
  'elapsed-time',
  '781',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:11:19 GMT',
  'Content-Length',
  '412' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-3%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d383fd87f74f9eed3cf9f4e1934f0f7edf8fa8d5325be4f4f5e27a3bfbc1baceb715d0f63dfa6e9637d3ba58b545b5a4264fdd5fe97955a7afb3c5aaccd3337901cda9bbd7d5ba9ee62f2c507cb6ddf087dbbbd4a6795b946593b7d262b92ecbd1476d565fe42dc3918f3f9a576d5e6e97c565be0d2aecd18bb3a2c926653efbe8d179460008d2749ecfd625351728abaca697dbbc6ecc27e7455ecebec856ab6279411f7eeffba38faa75bb5ab7cffa5fe4cb697dcd63fbbdf26b01f04bfe1f108a47f89c010000"], [ 'Cache-Control',
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
  'W/"0x8D8495CF0B69B68"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '37b905b4-6906-4d52-9550-4c409926b4be',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:11:19 GMT',
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
  'a53f3d1b-85e6-410a-8d9c-5c1bc9419a76',
  'elapsed-time',
  '51',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:11:19 GMT' ]);
