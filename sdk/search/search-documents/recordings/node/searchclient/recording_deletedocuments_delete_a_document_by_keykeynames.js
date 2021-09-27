let nock = require('nock');

module.exports.hash = "21eec44782711636ba84d7b56b88a00d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/indexes('hotel-live-test1')/docs/search.index', {"value":[{"@search.action":"delete","hotelId":"9"},{"@search.action":"delete","hotelId":"10"}]})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6ed5dfa357f97375b1fcfab362fb7cbe232dfc66bbb1fdfb9fbbb2df23603e81f3fa9ca329fb645b5dcfaa298d655539db7e3e31faceb7cfc5a60fee4decedeceefbff3e9ef7f6fe7f77f59e797457e353e03ec5779b32edb3b1f8d3ebaccca75fed1a3effde28fdee6d784e543faac69b376dd7cf4a8add7f9e8a3bcaeabfa8bbc69b20b6ab85c97a5697152cde893bd9d9d5f3232afefee7cadf7bfff4bfe1f3aa1a8a431010000"], [
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
  '4c771501-dd1b-428f-b2d5-48429c35aac7',
  'elapsed-time',
  '32',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:30:19 GMT',
  'Content-Length',
  '327'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('hotel-live-test1')/docs/$count`)
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f22fec7bff71f3cf87f006a950c2d04000000"], [
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
  'e557a08c-a7c5-4f1f-996f-715d93b86765',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:30:23 GMT',
  'Content-Length',
  '126'
]);
