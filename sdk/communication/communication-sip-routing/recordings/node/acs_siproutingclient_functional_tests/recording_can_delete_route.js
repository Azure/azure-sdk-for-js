let nock = require('nock');

module.exports.hash = "0484735c3b27f162210c7db06923c428";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://acs-int-tests.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[]})
  .query(true)
  .reply(200, {"trunks":{"my-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '/IYafAg4TkGD1x6CTqLtuQ.0',
  'X-Processing-Time',
  '1210ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0kIolYQAAAACVFTRCUNMeQ4DBiteC6qsjUFJHMDFFREdFMDYxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 25 Aug 2021 00:10:57 GMT'
]);

nock('https://acs-int-tests.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"my-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'abo4Apmxu0ez/IXyybSKlg.0',
  'X-Processing-Time',
  '65ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0kYolYQAAAAB9QIxeHFU1SYULLuA8mTkqUFJHMDFFREdFMDYxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 25 Aug 2021 00:10:57 GMT'
]);
