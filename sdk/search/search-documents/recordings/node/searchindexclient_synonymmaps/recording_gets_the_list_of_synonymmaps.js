let nock = require('nock');

module.exports.hash = "49f857afda2bb4335b3c26421cf52892";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd57c34fae8322bd7f9478fbe67a153b30b02fdfb7eb4f3eee0e9c1bdd383bd87c74f0ff6770eeefdbe1f51fb65b6a0e61f2daeb7b31faceb7cdb41dbdea5afcfab7a9101b5a62a6bfa5bbf6ee893af96459bcfd2d76d46e88ed2e0cfb43a4f8f17795d4cb3f4b3a3f4abd7c7bfeff2bb59332f96176db51ca5f87d8c6fbe7b4c40f3e5b4be5eb545b5fcbdf2eb8f1e2dd765f94b469b07f06cf7d9c1b39b06b0475fffbf7400a7f79f9d3e3cbe6900f7e8ebffb70ee0e4c9a70f776f1ac03e7dfd733680efff92ff071ed1e1cd63030000"], [ 'Cache-Control',
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
  '0e1a642f-86d9-4973-a95e-52dd2712b3fc',
  'elapsed-time',
  '40',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:43:16 GMT',
  'Content-Length',
  '386' ]);
