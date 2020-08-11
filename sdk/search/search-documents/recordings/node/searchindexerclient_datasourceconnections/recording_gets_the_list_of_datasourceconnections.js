let nock = require('nock');

module.exports.hash = "34b91299ac351ae512f26f62ce6221d3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fcd354eb7a9a371f8d3ebaccca75fed1a3ef59e8d4ec8240ffbe1fedbc3b787a70efe9e9c983fddd27fb9f7efaecf7fd88da2fb30535ff6871bd8dd6db02687b97be99e5cdb42e566d512d3f7ab45c97e5e8a3f67a85c6d3aa5954cd6c428d9af5443e9406d33a9fe5cbb6c8cae6a347bf981a2e97f914105eb775b1243cd0ec97503b1a72562cf31aad148579d5e6f4dae8a35fb4ceeb6bdb14689dccb3e545fe346f05d8cbaa2ca6da421a3ccdcb1cdf0c34c997d3fa9a47f27be5fae12f196da4d0de93fdd3d37b1b28b447dffcbca6d0bd7bf79e3ddcdb40a17bf4cdcf6f0a3d39397978ba8142fbf4cdcf6b0aeddf3bddff749394dda76ffe7f4ea1efff92ff07362e18c909060000"], [ 'Cache-Control',
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
  '5db67d88-456b-406e-9cad-3db853c5b17a',
  'elapsed-time',
  '56',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:48:34 GMT',
  'Content-Length',
  '436' ]);
