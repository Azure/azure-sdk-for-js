let nock = require('nock');

module.exports.hash = "66734a1da7e1c7e96a463d9764e21e9c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd57c34fae8322bd7f9478fbe67a153b30b02fdfb7eb4f3eee0e9c3a77bf71e3c3c7df0e4fea74f1efebe1f51fb65b6a0e61f2daeb7b31faceb7cdb41dbdea5afcfab7a9101b5a62a6bfa5bbf6ee893af96459bcfd2d76d46e88ed2e0cfb43a4f8f17795d4cb3f4b3a3f4abd7c7bfeff2bb59332f96176db51ca5f87d8c6fbe7b4c40f3e5b4be5eb545b5fcbdf2eb8f1e2dd765f94b461b0770b0777cf0f0e4a601ecd1d73f6703f8fe2ff97f0082a380bae1010000"], [
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
  'Vary',
  'Accept-Encoding',
  'request-id',
  'ce219624-d322-4753-97df-b16fc5a5b5d1',
  'elapsed-time',
  '19',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 07 Jan 2022 23:44:22 GMT',
  'Content-Length',
  '358'
]);
