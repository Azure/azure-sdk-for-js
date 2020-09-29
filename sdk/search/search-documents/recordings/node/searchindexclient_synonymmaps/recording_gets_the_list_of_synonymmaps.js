let nock = require('nock');

module.exports.hash = "2b638efb699efc1d59733400a0ea0bfc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd57c34fae8322bd7f9478fbe67a153b30b02fdfb7eb4f3eee0e9c1a77bfb0f0e769edd7f76f2f4e9effb11b55f660b6afed1e27a3bfbc1baceb71db4ed5dfafabcaa1719506baab2a6bff5eb863ef96a59b4f92c7ddd6684ee280dfe4cabf3f47891d7c5344b3f3b4abf7a7dfcfb2ebf9b35f36279d156cb518adfc7f8e6bbc704345f4eebeb555b54cbdf2bbffee8d1725d96bf64b479004fefefee9dde34803dfafae76c00dfff25ff0fe90dbeb7e1010000"], [ 'Cache-Control',
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
  '0217db9d-dece-4301-a156-845a5926a771',
  'elapsed-time',
  '16',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:10:54 GMT',
  'Content-Length',
  '356' ]);
