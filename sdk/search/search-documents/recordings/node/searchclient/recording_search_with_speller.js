let nock = require('nock');

module.exports.hash = "8a47d95bfb92cebc341f624b7a9463d3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/indexes(%27hotel-live-test1%27)/docs/search.post.search', {"count":true,"search":"budjet","skip":0,"top":5})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cadd6cbf6a3473ba38f2eb3729d7ff4e87bdfff25ff0f36f0f25c1d000000"], [
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
  '062de04d-5347-4b3d-93a8-2e7d6c9d789a',
  'elapsed-time',
  '36',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 01 Jun 2021 18:20:40 GMT',
  'Content-Length',
  '149'
]);
