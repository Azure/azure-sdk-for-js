let nock = require('nock');

module.exports.hash = "1c981641df9cafb60f6739dc67b16d5e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'RYHOfgCHfkC3wiE9vzirTg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '291ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0MqMDYwAAAABNaiyIHC9vT4ArWXzfl8pqUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:39:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"111.fqdn.com":{"sipSignalingPort":0}}})
  .query(true)
  .reply(422, {"error":{"code":"UnprocessableConfiguration","message":"One or more request inputs are not valid.","innererror":{"code":"InvalidTrunkSipSignalingPort","message":"Trunk with an invalid SIP signaling port."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  '0LRgjQNVSEGiHn8PasOjHA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '23ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0MqMDYwAAAAC4RfXbFEOqSpy8eWJfWoSEUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:39:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'kPiHJBTk2UiAPWGAo2dRSA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '243ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0MqMDYwAAAAAXMTC0ZCcWTZtmjJmbiuYoUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:39:30 GMT'
]);
