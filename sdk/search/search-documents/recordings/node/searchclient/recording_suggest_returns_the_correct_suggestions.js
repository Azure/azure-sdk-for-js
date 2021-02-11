let nock = require('nock');

module.exports.hash = "987214d3ddee1d4d691a224cfc8c7400";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/indexes(%27hotel-live-test1%27)/docs/search.post.suggest', {"search":"WiFi","suggesterName":"sg"})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef1479759b9ce3f7af4bd5ffcd1efd9e4593d9d8fdbfc5dfbd1a38f5e679779ba5ea56d95dedff9ddd3eafc3c6deb6c56b445b5ccca745eb579d98cd3f4599de7e9778b67c528bda8f3ac4dcb6a9aa151ba2478e9acba5ab6f4ff517abe2ecbf46dd14ee739fd759535f3bc4e7f613aabaff37a94eeeddf7d9036ebd5aaaadb513aa9aeca6279916665995fd3ab45bbcc9b269de6cb965eca96b37451d5f9f8a3d1478cc7d98c10deddf9e8977cff97fc3f4bd5b195d2000000"], [
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
  '1fdac2f5-997b-4f02-8b76-71119e59d4b9',
  'elapsed-time',
  '104',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:06:53 GMT',
  'Content-Length',
  '295'
]);
