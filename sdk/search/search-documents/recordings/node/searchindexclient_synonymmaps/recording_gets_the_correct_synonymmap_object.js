let nock = require('nock');

module.exports.hash = "6e1ed0bbc1e01b8472e3a2bb5b7f7e6f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7db8777fefe4fec37b274f3efdf4e4f7fd885a2db3454e5f2faeb7b31faceb7cdbc1dadea5afcfab7a9101b1a62a6bfa5bbf6ee893af96459bcfd2d76d46c88ed2e0cfb43a4f8f17795d4cb3f4b3a3f4abd7c7bfeff2bb59332f96176db51ca5f87d8c6fbe7b4c40f3e5b4be5eb545b5fcbdf2eb8f1e2dd765f94bfe1f804067571c010000"], [
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
  'W/"0x8D9252C593CB66C"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'e91e0ab8-b702-4e16-bbbf-0353bebc01e7',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 01 Jun 2021 18:37:50 GMT',
  'Content-Length',
  '334'
]);
