let nock = require('nock');

module.exports.hash = "c663aef399f880fb8285cec63ef94e83";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]})
  .query(true)
  .reply(200, {"trunks":{"11.fqdn.com":{"sipSignalingPort":1239},"22.fqdn.com":{"sipSignalingPort":2348},"33.fqdn.com":{"sipSignalingPort":3457}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '8Yp+bgBFGkGwAqB2ZYfs3g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '329ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0c7sPYwAAAADib8bjUGNVS6MCPLLxqT/gUFJHMDFFREdFMDkxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 31 Aug 2022 19:50:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^.*$","trunks":[]},{"description":"ALTERED mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"desc","name":"myThirdRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]})
  .query(true)
  .reply(200, {"trunks":{"11.fqdn.com":{"sipSignalingPort":1239},"22.fqdn.com":{"sipSignalingPort":2348},"33.fqdn.com":{"sipSignalingPort":3457}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^.*$","trunks":[]},{"description":"ALTERED mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"desc","name":"myThirdRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '2xQ10UfKJ0mHUoKc2LEPSQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '318ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0c7sPYwAAAACPLRTPSGEfT4uI8gbt4EnnUFJHMDFFREdFMDkxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 31 Aug 2022 19:50:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"11.fqdn.com":{"sipSignalingPort":1239},"22.fqdn.com":{"sipSignalingPort":2348},"33.fqdn.com":{"sipSignalingPort":3457}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^.*$","trunks":[]},{"description":"ALTERED mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"desc","name":"myThirdRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'tPC8iP4pJkOVd+XqRl0+kg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '274ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0dLsPYwAAAACVZyMdXUJMQJ23k2iA7PToUFJHMDFFREdFMDkxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 31 Aug 2022 19:50:12 GMT'
]);
