let nock = require('nock');

module.exports.hash = "2b638efb699efc1d59733400a0ea0bfc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd57c34fae8322bd7f9478fbe67a153b30b02fdfb7eb4f3eee0e9c193d34f8ff7778eef7d7ab0b7fffb7e44ed97d9829a7fb4b8dece7eb0aef36d076d7b97be3eafea4506d49aaaace96ffdbaa14fbe5a166d3e4b5fb719a13b4a833fd3ea3c3d5ee47531cdd2cf8ed2af5e1fffbecbef66cdbc585eb4d57294e2f731bef9ee3101cd97d3fa7ad516d5f2f7caaf3f7ab45c97e52f196d1ec09307cf9eeddc34803dfafae76c00dfff25ff0f6bcc504ce1010000"], [
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
  'c78417ed-937d-4738-a69e-faa5c2f2aac7',
  'elapsed-time',
  '26',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:11:28 GMT',
  'Content-Length',
  '356'
]);
