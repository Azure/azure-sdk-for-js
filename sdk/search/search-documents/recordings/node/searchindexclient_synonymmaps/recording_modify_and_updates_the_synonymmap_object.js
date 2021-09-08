let nock = require('nock');

module.exports.hash = "73942e858c58feac102dc8705bfc01ea";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7df8e9d3a79f1e7cfaf4def1838383dff7236ab5cc16397dbdb8dece7eb0aef36d076b7b97be3eafea4506c49aaaace96ffdbaa14fbe5a166d3e4b5fb719213b4a833fd3ea3c3d5ee47531cdd2cf8ed2af5e1fffbecbef66cdbc585eb4d57294e2f731bef9ee3101cd97d3fa7ad516d5f2f7caaf3f7ab45c97e52ff97f00098273dc1c010000"], [
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
  'W/"0x8D96DD686D3A788"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'a0f8f489-feea-412e-ba2c-d134930b7f7a',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Thu, 02 Sep 2021 05:57:24 GMT',
  'Content-Length',
  '335'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .put('/synonymmaps(%27my-azure-synonymmap-1%27)', {"name":"my-azure-synonymmap-1","format":"solr","synonyms":"United States, United States of America => USA\nWashington, Wash. => WA\nCalifornia, Clif. => CA","encryptionKey":null,"@odata.etag":"\"0x8D96DD686D3A788\""})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7df8e9d3a79f1e3c7cbafb70ffd383dff7236ab5cc16397dbdb8dece7eb0aef36d076b7b97be3eafea4506c49aaaace96ffdbaa14fbe5a166d3e4b5fb719213b4a833fd3ea3c3d5ee47531cdd2cf8ed2af5e1fffbecbef66cdbc585eb4d57294e2f731bef92e7d71929505f5b32cb2517a42bff21727c7d45bbe9cd6d7abb6a896bf577efdd1a3e5ba2c7fc9ff0393ae951735010000"], [
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
  'W/"0x8D96DD689D19468"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  'ff417f93-1df2-4e7b-9f74-acc65c14fe03',
  'elapsed-time',
  '22',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Thu, 02 Sep 2021 05:57:25 GMT',
  'Content-Length',
  '351'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c7df8e9d3a79f1e3c7cbafb70ffd383dff7236ab5cc16397dbdb8dece7eb0aef36d076b7b97be3eafea4506c49aaaace96ffdbaa14fbe5a166d3e4b5fb719213b4a833fd3ea3c3d5ee47531cdd2cf8ed2af5e1fffbecbef66cdbc585eb4d57294e2f731bef92e7d71929505f5b32cb2517a42bff21727c7d45bbe9cd6d7abb6a896bf577efdd1a3e5ba2c7fc9ff0393ae951735010000"], [
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
  'W/"0x8D96DD689D19468"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '63d5e562-4022-467c-bee8-4b2afbe4fb40',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Thu, 02 Sep 2021 05:57:25 GMT',
  'Content-Length',
  '351'
]);
