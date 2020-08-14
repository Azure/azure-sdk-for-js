let nock = require('nock');

module.exports.hash = "47ca6591896cb201293851b22be91068";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-6%27)', {"name":"my-azure-indexer-6","description":"Description for Sample Indexer","dataSourceName":"my-data-source-5","targetIndexName":"hotel-live-test2","disabled":false})
  .query(true)
  .reply(201, {"@odata.context":"https://endpoint/$metadata#indexers/$entity","@odata.etag":"\"0x8D83E82EE88FF41\"","name":"my-azure-indexer-6","description":"Description for Sample Indexer","dataSourceName":"my-data-source-5","skillsetName":null,"targetIndexName":"hotel-live-test2","disabled":false,"schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"encryptionKey":null}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D83E82EE88FF41"',
  'Location',
  'https://endpoint/indexers(\'my-azure-indexer-6\')?api-version=2020-06-30',
  'request-id',
  '48e3b239-abe6-49e6-80b6-e39d6f895af9',
  'elapsed-time',
  '902',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:45:34 GMT',
  'Content-Length',
  '412' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-6%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3837ba7077ba7a70707cf9eedeffebe1f51ab65b6c8e9ebc5f576f683759d6f2ba0ed4fe9bb59de4ceb62d516d5929a3c757fa5e7559dbece16ab324fcfe40534a7ee5e57eb7a9abfb040f1d976c31f6edfa736cddba22c9bbc9516cb75598e3e6ab3fa226f198e7cfcd1bc6af372bb2c2ef36d50618f5e9c154d3629f3d9478fce33024090a6f37cb62ea9b940596535bddce675633e392ff272f645b65a15cb0bfaf07bdf1f7d54addbd5ba7dd6ff225f4eeb6b1edbef955f0b805ff2ff00a15f03c09c010000"], [ 'Cache-Control',
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
  'W/"0x8D83E82EE88FF41"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '5d2937b1-3533-48f2-945c-9b8b8526047d',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:45:34 GMT',
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
  '7d7529da-feb0-4568-afc1-f9ce0ee81c18',
  'elapsed-time',
  '79',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:45:34 GMT' ]);
