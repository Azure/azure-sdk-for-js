let nock = require('nock');

module.exports.hash = "0b07a3169231140ac7e2b96b5790014e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3837ba7077bcfeedffff498fef7fb7e44ad96d922a7af17d7dbd90fd675bead80b677e9bb59de4ceb62d516d5929a3c757fa5e7559dbece16ab324fcfe40534a7ee5e57eb7a9abfb040f1d976c31f6edfa736cddba22c9bbc9516cb75598e3e6ab3fa226f198e7cfcd1bc6af372bb2c2ef36d50618f5e9c154d3629f3d9478fce33024090a6f37cb62ea9b940596535bddce675633e392ff272f645b65a15cb0bfaf07bdf1f7d54addbd5ba7dd6ff225f4eeb6b1edbef955f0b805ff2ff00837c3bab9c010000"], [ 'Cache-Control',
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
  'W/"0x8D83E82F556A56A"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '1f68269f-39ff-430c-a9eb-cde5807d1b00',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:45:49 GMT',
  'Content-Length',
  '396' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-1%27)', {"name":"my-azure-indexer-1","description":"Description for Sample Indexer","dataSourceName":"my-data-source-5","skillsetName":null,"targetIndexName":"hotel-live-test2","schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"disabled":true,"@odata.etag":"\"0x8D83E82F556A56A\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3837ba7077bcf1e1cefdd3bd879f6fb7e44ad96d922a7af17d7dbd90fd675bead80b677e9bb59de4ceb62d516d5929a3c757fa5e7559dbece16ab324fcfe40534a7ee5e57eb7a9abfb040f1d976c31f6edfa736cddba22c9bbc9516cb75598e3e6ab3fa226f198e7cfcd1bc6af372bb2c2ef36d50618f5e9c154d3629f3d9478fda7a9d13a0e93c9fad4b6a2d4056594defb679dd984fce8bbc9c7d91ad56c5f2823efcdef7471f55eb76b56e9ff5bfc897d3fa9a87f67be5d702e097fc3f784a48d79b010000"], [ 'Cache-Control',
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
  'W/"0x8D83E82F7A2380F"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '15fa5791-c0e0-40f6-a9ba-f87bd159a260',
  'elapsed-time',
  '63',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:45:49 GMT',
  'Content-Length',
  '396' ]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d3837ba7077bcf1e1cefdd3bd879f6fb7e44ad96d922a7af17d7dbd90fd675bead80b677e9bb59de4ceb62d516d5929a3c757fa5e7559dbece16ab324fcfe40534a7ee5e57eb7a9abfb040f1d976c31f6edfa736cddba22c9bbc9516cb75598e3e6ab3fa226f198e7cfcd1bc6af372bb2c2ef36d50618f5e9c154d3629f3d9478fda7a9d13a0e93c9fad4b6a2d4056594defb679dd984fce8bbc9c7d91ad56c5f2823efcdef7471f55eb76b56e9ff5bfc897d3fa9a87f67be5d702e097fc3f784a48d79b010000"], [ 'Cache-Control',
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
  'W/"0x8D83E82F7A2380F"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'd29d1725-f4d4-4059-84a2-a554ef7205be',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:45:49 GMT',
  'Content-Length',
  '396' ]);
