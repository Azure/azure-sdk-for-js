let nock = require('nock');

module.exports.hash = "3c37478058c09df8e43da984e9ae009d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/indexes(%27hotel-live-test1%27)/docs/search.index', {"value":[{"@search.action":"upload","hotelId":"11","description":"New Hotel Description","lastRenovationDate":null},{"@search.action":"upload","hotelId":"12","description":"New Hotel II Description","lastRenovationDate":null}]})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1dbfcfaa3471fedee7e34faa869b376dd7cf4a8add7f9e8a3bcaeabfa8bbc69b20b6ab95c97a5697152cde893bd9ddd5f32b2efef7dadf7bfff4bfe1fabe085b98b000000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=none',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '72f620a2-cdd7-43ca-a8b8-df0ae46c2756',
  'elapsed-time',
  '50',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Thu, 02 Sep 2021 05:55:01 GMT',
  'Content-Length',
  '191'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test1%27)/docs/$count')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f22fec7bff71fdcddfb7f0097815d6605000000"], [
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
  '227fbaef-1a9d-4943-af4b-149a00445e9a',
  'elapsed-time',
  '4',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Thu, 02 Sep 2021 05:55:05 GMT',
  'Content-Length',
  '127'
]);
