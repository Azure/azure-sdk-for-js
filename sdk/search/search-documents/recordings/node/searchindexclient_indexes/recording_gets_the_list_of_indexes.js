let nock = require('nock');

module.exports.hash = "29cf1d2b57f14fb8bece8e651e4b3b90";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97371f8d3ebaccca75fed1a3ef59c8d4e482c0febe1fedbc3b787a70eff460eff8f4646fff74ffe4f7fd88da2fb30535ff685eb579b95d1697f9363abe47dfccf2f36c5db6afa7555d2c2f5ed6d5795152d3e5ba2c471f9d1779396bb81f8550cce89df67a85df4f678bf1eb16afd167827836c1cbe759d9e478bb6cf33af8a8cea97d7e299fb5f59a3e6aaaba95bfb5cd7936a5d1f89fbccdaf4d6b26c1f1322baf7f90d7064de9bbfb69d6f9bbb95e56cbebc517d90a23fafe2f19d941655779532df265de34cff3cbbca4e178437c5aad810c01e06e02ccfc210a821b47287f7b03940f787c0af1676580b3bc99d6c5aa2daa258dc31b5b74fa04297f688adbc6b1691b6f70fac90f61746d5694100b6f6427d56255e6efdee013c2aac7c8242fde1b275559e653d0670b2f0b59eed0f7829b8c4746ecd3453e794fb2488b9f25aaf8749917b359befc6e5e5ccc5b1a8a0e15e33b5bb6f7f6e823e943d0525cfce1e947c1f8f4b34d03d44f7eb646481f05ca8a3f1e7d449f355f328bd307faeafae282d45c5ed327686240eb9f6df5365f169dbf9ff1f8f513a24d1d7c902fa7f53577f27b6174da4db128caac2e5afac42a64a5f68f7f514cebaaa9cedbf1f10fd6753e7ecd831e3ff962effe6bf71e516bd7809bc82fbfe4977cff97fc3f461b021839060000"], [ 'Cache-Control',
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
  'd9e9f04d-4fef-464a-929c-85c742b3dc34',
  'elapsed-time',
  '34',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:43:49 GMT',
  'Content-Length',
  '661' ]);
