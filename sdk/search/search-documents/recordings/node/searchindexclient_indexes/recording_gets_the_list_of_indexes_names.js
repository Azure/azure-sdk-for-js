let nock = require('nock');

module.exports.hash = "1b4fe2da28d70a753bc1115dbce11860";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97375bcb6c91dff968f4d16556aef38f1e7def177f844f00b56af372bb2c2ef3ed265bacca7c1bf0ef7df44b463734d9bfb9c9fd9b9b7c7a739307034df0dd109ef8eee0fe5effdb555e9ff3b7bdaf1ad32793ccffbaceb392dec8da7c7b3ddc0a40f9c326abb39fce16d947bfe4fbbfe4ff01b8321fa2c7010000"], [
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
  'cb28642d-8e97-4384-b4d1-85c4953a1c36',
  'elapsed-time',
  '37',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 07 Jan 2022 23:45:27 GMT',
  'Content-Length',
  '295'
]);
