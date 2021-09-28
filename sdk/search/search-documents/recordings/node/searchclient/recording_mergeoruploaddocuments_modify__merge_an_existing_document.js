let nock = require('nock');

module.exports.hash = "0518a75681e14778da303d0012a62fae";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test1%27)/docs(%276%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6ed5dfa357f97375b1fcfab362fb7cbe232dfc66bbb1fdfb9fbbb2df23603e81f9f55d366eb5bf449be6c8bf6faa3d147dcfc6c469d7d6afe7a912df28f1e2dd76539fa689637d3ba58b545b5a426afd7f5aa2e9a6279515ea7f9bb55be6ca89f71fa4535cbcbb45917d4633acf2ef3345ba6d534cf96db97457e3526c81ea067b5813ecddafca2aaafcddf6d76d17cf4e87bdf1f7db4caeab7d4cdd9725aae6739a1270d9a45858f8fcbb2ba729f9659d3beca97d56506f04f09a8f9a6a64f9617e6afb2a20ea985f93b9bcdeabca11ee5cfbaaa16f4c7f7beff4bfe1f2ee17fcb8b010000"], [
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
  'dab46f24-10e7-4c2d-a9a2-536635a4413e',
  'elapsed-time',
  '11',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:53:10 GMT',
  'Content-Length',
  '388'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/indexes(%27hotel-live-test1%27)/docs/search.index', {"value":[{"@search.action":"mergeOrUpload","@odata.context":"https://endpoint/indexes('hotel-live-test1')/$metadata#docs(*)/$entity","hotelId":"6","hotelName":null,"description":"Modified Description","descriptionFr":null,"category":null,"tags":[],"parkingIncluded":null,"smokingAllowed":null,"lastRenovationDate":null,"rating":null,"location":null,"address":null,"rooms":[]}]})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6ed5dfa357f97375b1fcfab362fb7cbe232dfc66bbb1fdfb9fbbb2df23603e81f3fa9ca329fb645b5dcfaa298d655539db7e3e31faceb7cfc5a60fee4decedeceefbff3e9ef7f6fe7f77f59e797457e353e03ec5779b32edb3b1f8d3ebaccca75fed1a3effde28fdee6d784e5a7f459d366edbaf9e8515baff3d147795d57f51779d36417d470b92e4bd3e2a49ad1277b3b3bbfe4fbbfe4ff01e1a629f6f1000000"], [
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
  '1c7e8a5d-b40f-492a-8b4a-2deaf988272a',
  'elapsed-time',
  '28',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:53:10 GMT',
  'Content-Length',
  '320'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test1%27)/docs(%276%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6ed5dfa357f97375b1fcfab362fb7cbe232dfc66bbb1fdfb9fbbb2df23603e81f9f55d366eb5bf449be6c8bf6faa3d147dcfc6c469d7d6afe7a912df28f1e2dd76539fa689637d3ba58b545b5a4265f54b3e2bcc867e953efe3a0d1b3dabc39cddafca2aaafcddf6d76d17cf4e87bdf1f7db4caeab7c5f2e26c392dd7b39cba9606cda2c2c7c765595db94fcbac695fe5cbea3203f8a704d47c53d327cb0bf357595187d4c2fc9dcd6675de508ff2675d550bfae37bdfff25ff0fb9a59ff667010000"], [
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
  'fc94df7f-3ec9-4930-9766-52542b958e47',
  'elapsed-time',
  '10',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:53:14 GMT',
  'Content-Length',
  '353'
]);
