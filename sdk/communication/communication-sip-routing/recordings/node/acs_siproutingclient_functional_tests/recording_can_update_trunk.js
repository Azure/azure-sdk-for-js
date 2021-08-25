let nock = require('nock');

module.exports.hash = "b361839711062292d01e192497c63071";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://acs-int-tests.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"my-sbc.foo.bar":{"sipSignalingPort":5678}}})
  .query(true)
  .reply(200, {"trunks":{"my-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[{"description":"myRoute's description","name":"myRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["my-sbc.foo.bar"]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'yxaebvmm7Eaei1dF8+6TVg.0',
  'X-Processing-Time',
  '2836ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0jYolYQAAAABAHMks89BvS7mZVKNttvZmUFJHMDFFREdFMDYxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 25 Aug 2021 00:10:55 GMT'
]);

nock('https://acs-int-tests.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"my-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[{"description":"myRoute's description","name":"myRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["my-sbc.foo.bar"]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'zSIkPDKuY0ib36z/Sh2PuA.0',
  'X-Processing-Time',
  '57ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0kIolYQAAAAB3V12bhWynRLHvOTmAzqc2UFJHMDFFREdFMDYxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 25 Aug 2021 00:10:55 GMT'
]);
