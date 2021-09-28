let nock = require('nock');

module.exports.hash = "43c428a01562e53c2476efe4f0658d78";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/indexes(%27hotel-live-test1%27)/docs/search.post.autocomplete', {"search":"sec","suggesterName":"sg"})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6ed5dfa357f97375b1fcfab362fb7cbe232dfc66bbb1fdfb9fbbb2df23603e81f3fa9ca329fb645b5dcfaa298d655539db7e3e31faceb7cfc5a60fee4decedeceefbff3e9ef7f6fe7f77f59e797457e353e5eb7d5b45aaccabccdcfda7c71e7a3d1479759b9ce3f7af4bd5ffc91e2dae4d33a6fe99b5fb4ceebeb97e5ba79137cf14bbeff4bfe1f8786f24ae2000000"], [
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
  'a5befc95-03a2-4e8c-8c4b-d7c13b3514f2',
  'elapsed-time',
  '10',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:50:10 GMT',
  'Content-Length',
  '302'
]);
