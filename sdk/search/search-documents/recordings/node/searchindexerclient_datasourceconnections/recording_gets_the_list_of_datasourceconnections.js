let nock = require('nock');

module.exports.hash = "6f194676a5a2f1c7a1496c74c15198a1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a371f8d3ebaccca75fed1a3ef59e8d4ec8240ffbe1fedbc3b787a70b0f3f0f8d9fdbdbddd87f79efcbe1f51fb65b6a0e61f2daeb7d17a5b006defd237b3bc99d6c5aa2daae5478f96ebb21c7dd45eafd0785a358baa994da851b39ec887d2605ae7b37cd91659d97cf4e81753c3e5329f02c2ebb62e9684079afd126a4743ce8a655ea395a230afda9c5e1b7df48bd6797d6d9b02ad9379b6bcc89fe6ad007b5995c5545b4883a77999e39b8126f9725a5ff3487eaf5c3ffc25a3cd147af2e9c3274f3750688fbef9ff3985beff4bfe1ffffe3494a3020000"], [ 'Cache-Control',
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
  'b9637160-6062-46cf-9984-bdade75fea67',
  'elapsed-time',
  '25',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:23:57 GMT',
  'Content-Length',
  '391' ]);
