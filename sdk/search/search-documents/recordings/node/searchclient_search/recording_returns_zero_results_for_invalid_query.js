let nock = require('nock');

module.exports.hash = "9c4a3ea54412b8336606bdf51fc121ca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/indexes(%27hotel-live-test%27)/docs/search.post.search', {"count":true,"search":"garbxyz","skip":0,"top":5})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cadd6cbf6a3473ba38f2eb3729d7ff4e87bdfff25ff0f36f0f25c1d000000"], [ 'Cache-Control',
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
  'd234eb3c-f7f9-49ef-8fb9-b9eef0750d17',
  'elapsed-time',
  '13',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 10 Aug 2020 10:01:36 GMT',
  'Content-Length',
  '149' ]);
