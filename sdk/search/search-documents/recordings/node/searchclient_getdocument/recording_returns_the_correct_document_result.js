let nock = require('nock');

module.exports.hash = "b4281d67c19fb3073b17719d56f895d6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test1%27)/docs(%278%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147f3aacdcbb3d9478f3e3af868247fbdc816f9478f96ebb21c7d34cb9b695dacdaa25a52936f674dda548b3cadab6c962eaba2c9d36c394b8b265de6efdab4add2769ea797797d9daeaab298e669d36678799c3ec9da795d558b269dd3bb8baacecb745a51d36279d18ca96fafab6735757656a6d76996ced6e9a45e176d3acbd332a39ed76d9ee66d4a5db7f4c7659efebeeb9d9d7c279de2e7f97e8b1ff9436daedde32f41689c3ecf69105959d20ffa749215cb34bbcc8a7c892e9ab4ce2f1942d6e60bfa8c1b11b6055e009a53fae2a2aaaf0d85daeca2f9e8d1f7be3ffa6895d56f693067cb69b99ee5445269d02c2a7c7c5c96d595fbb4cc9af655beac2e19bfa704d47c53d327cb0bf357595187d4c2fc9dcd6675de508ff2275314ddff92ff07355dccd3cb010000"], [ 'Cache-Control',
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
  'ff585807-21bc-4a24-8683-3b1aec50ccff',
  'elapsed-time',
  '8',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 26 Aug 2020 01:07:34 GMT',
  'Content-Length',
  '411' ]);
