let nock = require('nock');

module.exports.hash = "0b07a3169231140ac7e2b96b5790014e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d38327a79f1e1f9feede3bdd7bf2f4f7fd885a2db3454e5f2faeb7b31faceb7c5b016defd277b3bc99d6c5aa2daa253579eafe4acfab3a7d9d2d56659e9ec90b684eddbdaed6f5347f6181e2b3ed863f6490cddba22c9bbc9516cb75598e3e6ab3fa226f198e7cfcd1bc6af372bb2c2ef36d50618f5e9c154d3629f3d9478fce33024090a6f37cb62ea9b940596535bddce675633e392ff272f645b65a15cb0bfaf07bdf1f7d54addbd5ba7dd6ff225f4eeb6b1edbef955f0b805ff2ff001c0ea9a99c010000"], [
  'Cache-Control',
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
  'W/"0x8D8BE6AAE13E2BD"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '5570d2a6-3986-4732-a730-bb8b832933a9',
  'elapsed-time',
  '5',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:14:27 GMT',
  'Content-Length',
  '395'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/indexers(%27my-azure-indexer-1%27)', {"name":"my-azure-indexer-1","description":"Description for Sample Indexer","dataSourceName":"my-data-source-1","skillsetName":null,"targetIndexName":"hotel-live-test2","schedule":null,"parameters":null,"fieldMappings":[],"outputFieldMappings":[],"disabled":true,"@odata.etag":"\"0x8D8BE6AAE13E2BD\"","encryptionKey":null})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d38327a79f1e1f9f9edc3f7d7af2ecf7fd885a2db3454e5f2faeb7b31faceb7c5b016defd277b3bc99d6c5aa2daa253579eafe4acfab3a7d9d2d56659e9ec90b684eddbdaed6f5347f6181e2b3ed863f6490cddba22c9bbc9516cb75598e3e6ab3fa226f198e7cfcd1bc6af372bb2c2ef36d50618f5e9c154d3629f3d9478fda7a9d13a0e93c9fad4b6a2d4056594defb679dd984fce8bbc9c7d91ad56c5f2823efcdef7471f55eb76b56e9ff5bfc897d3fa9a87f67be5d702e097fc3f7320b9639b010000"], [
  'Cache-Control',
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
  'W/"0x8D8BE6AAEC5EDCF"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '79e78103-b2e9-48b8-925d-951600f8d0ac',
  'elapsed-time',
  '67',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:14:27 GMT',
  'Content-Length',
  '394'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27my-azure-indexer-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cddddf2d5fb6457bfdd1c800a6161704f5f7fd68e7ddc1d38327a79f1e1f9f9edc3f7d7af2ecf7fd885a2db3454e5f2faeb7b31faceb7c5b016defd277b3bc99d6c5aa2daa253579eafe4acfab3a7d9d2d56659e9ec90b684eddbdaed6f5347f6181e2b3ed863f6490cddba22c9bbc9516cb75598e3e6ab3fa226f198e7cfcd1bc6af372bb2c2ef36d50618f5e9c154d3629f3d9478fda7a9d13a0e93c9fad4b6a2d4056594defb679dd984fce8bbc9c7d91ad56c5f2823efcdef7471f55eb76b56e9ff5bfc897d3fa9a87f67be5d702e097fc3f7320b9639b010000"], [
  'Cache-Control',
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
  'W/"0x8D8BE6AAEC5EDCF"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'c60ad66c-b8c3-4d0b-af7c-06759bb02a8c',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:14:27 GMT',
  'Content-Length',
  '394'
]);
