let nock = require('nock');

module.exports.hash = "09b0bb3cdf93dd4de9c7a9b441a865a3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://acs-int-tests.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"my-sbc.foo.bar":{"sipSignalingPort":1234}},"routes":[{"description":"myRoute's description","name":"myRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["my-sbc.foo.bar"]}]})
  .query(true)
  .reply(200, {"trunks":{"my-sbc.foo.bar":{"sipSignalingPort":1234}},"routes":[{"description":"myRoute's description","name":"myRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["my-sbc.foo.bar"]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'eCCNT6lxuEegL0kUXt+d6Q.0',
  'X-Processing-Time',
  '3077ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0iYolYQAAAAAavWAfBT4YSo0R01c+g6fsUFJHMDFFREdFMDYxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 25 Aug 2021 00:10:52 GMT'
]);

nock('https://acs-int-tests.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"my-sbc.foo.bar":{"sipSignalingPort":1234}},"routes":[{"description":"myRoute's description","name":"myRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["my-sbc.foo.bar"]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'GGlxL5fWxUGIks08zK1KiQ.0',
  'X-Processing-Time',
  '64ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0jIolYQAAAACYmSrNjtqiS4DJGbxCgMdVUFJHMDFFREdFMDYxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 25 Aug 2021 00:10:52 GMT'
]);
