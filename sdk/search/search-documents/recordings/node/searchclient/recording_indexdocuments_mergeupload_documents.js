let nock = require('nock');

module.exports.hash = "77854219b43bd06c7e99d63f45cf2f71";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/indexes('hotel-live-test1')/docs/search.index', {"value":[{"@search.action":"mergeOrUpload","hotelId":"8","description":"Modified Description"},{"@search.action":"mergeOrUpload","hotelId":"11","description":"New Hotel Description","lastRenovationDate":null}]})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6ed5dfa357f97375b1fcfab362fb7cbe232dfc66bbb1fdfb9fbbb2df23603e81f3fa9ca329fb645b5dcfaa298d655539db7e3e31faceb7cfc5a60fee4decedeceefbff3e9ef7f6fe7f77f59e797457e353e03ec5779b32edb3b1f8d3ebaccca75fed1a3effde28fdee6d784e5017dd6b459bb6e3e7ad4d6eb7cf4515ed755fd45de34d905355caecbd2b438a966f4c9decece2f1999d77777bfc6fbbbbfe4fbbfe4ff01493b8f9031010000"], [
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
  '16c2610b-c7e4-4241-b6c4-0724505de60c',
  'elapsed-time',
  '42',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:33:10 GMT',
  'Content-Length',
  '330'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test1')/docs('8')`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6ed5dfa357f97375b1fcfab362fb7cbe232dfc66bbb1fdfb9fbbb2df23603e81f9f55d366eb5bf449be6c8bf6faa3d147dcfc6c469d1d98bf5e648bfca347cb75598e3e9ae5cdb42e566d512da9c917d5ac382ff259fad4fb3868f4aca66667657a9d66e96c9d4eea75d1a6b33c2db3b4aed66d9ee66ddae4694b7f5ce6e9efbbded9c977d2297e9eefb7f8913fd4e64d9b0120fe5a556531cdc7e9f3bc499bac2ce9077d3ac98a659a5d66058d85fe6ed23abf6408599b2fe8336eb4a8ea022f8c09cd297d7151d5d7666c6d76d17cf4e87bdf1f7db4caeab7c5f2e26c392dd7b39c88210d9a45858f8fcbb2ba729f9659d3beca97d525e3f794809a6f6afa647961fe2a2bea905a98bfb3d9acce1bea51feacab6a417f7ceffbbfe4ff01ec3a66fdf9010000"], [
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
  'eff115d4-17d2-4f42-b9a8-17b1afdc2a05',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:33:13 GMT',
  'Content-Length',
  '453'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test1')/docs/$count`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f22fec7bff71fdcddfd7f002dd054ff05000000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'text/plain',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '7a76fa41-c8f6-48b5-813d-2c66ecc9efc0',
  'elapsed-time',
  '3',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:33:13 GMT',
  'Content-Length',
  '127'
]);
