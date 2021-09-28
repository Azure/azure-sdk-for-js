let nock = require('nock');

module.exports.hash = "99a7bb70cfb77d20156efa8fd4c12727";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/indexes(%27hotel-live-test1%27)/docs/search.post.suggest', {"search":"WiFi","suggesterName":"sg"})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6ed5dfa357f97375b1fcfab362fb7cbe232dfc66bbb1fdfb9fbbb2df23603e81f9f55d366eb5b773e1a7d749995ebfca347dfa35e159af6f93abbccd3f52a6dabf4feceef9e56e7e7695b67b3a22daa6556a60cbe19a7e9b33acfd3ef16cf8a517a51e7599b96d53443a37449f052426cd9d2ff47e9f9ba2cd3b7453b9de7f4d755d6ccf33afd85e9acbeceeb51bab77ff741daac57abaa6e47e9a4ba2a8be5459a95657e4daf16ed326f9a749a1345ea345bced24555e763c29ff1389b11c2bb3b1ffd92efff92ff07359414aa3e010000"], [
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
  '811a3003-919f-4d5a-8c13-d0a0a261637b',
  'elapsed-time',
  '37',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 23:51:19 GMT',
  'Content-Length',
  '368'
]);
