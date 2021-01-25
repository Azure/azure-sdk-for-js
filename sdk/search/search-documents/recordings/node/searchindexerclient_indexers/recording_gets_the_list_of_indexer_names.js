let nock = require('nock');

module.exports.hash = "0581b4ca498dbae3521e8e70a0fc1146";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cdd6325be4773e1a7d749995ebfca347dffbc51fe11302bbb8dece7eb0aef36d6dbabdfbd12f190d7fbbf7d12ff9fe2ff97f00a86bf33d9e000000"], [ 'Cache-Control',
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
  'dd4075ff-f06a-45a7-9c2d-98e4f6885c83',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:22:38 GMT',
  'Content-Length',
  '233' ]);
