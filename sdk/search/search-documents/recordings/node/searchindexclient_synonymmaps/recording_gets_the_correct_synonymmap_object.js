let nock = require('nock');

module.exports.hash = "6e1ed0bbc1e01b8472e3a2bb5b7f7e6f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3d38d87978fc60f7e1fdd3bd9d93dff7236ab5cc16397dbdb8dece7eb0aef36d076b7b97be3eafea4506c49aaaace96ffdbaa14fbe5a166d3e4b5fb719213b4a833fd3ea3c3d5ee47531cdd2cf8ed2af5e1fffbecbef66cdbc585eb4d57294e2f731bef9ee3101cd97d3fa7ad516d5f2f7caaf3f7ab45c97e52ff97f00a8c3ea221c010000"], [ 'Cache-Control',
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
  'W/"0x8D8809A7195E20C"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'a651dd98-de86-4cf7-9ad0-87498eaf9d66',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:20:13 GMT',
  'Content-Length',
  '334' ]);
