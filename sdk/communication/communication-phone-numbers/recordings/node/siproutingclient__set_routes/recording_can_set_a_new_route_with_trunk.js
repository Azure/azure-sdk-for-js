let nock = require('nock');

module.exports.hash = "4ab054f56fb57ad6c959f2580204ab83";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"111.fqdn.com":{"sipSignalingPort":5678}}})
  .query(true)
  .reply(200, {"trunks":{"11.fqdn.com":{"sipSignalingPort":1239},"22.fqdn.com":{"sipSignalingPort":2348},"33.fqdn.com":{"sipSignalingPort":3457},"111.fqdn.com":{"sipSignalingPort":5678}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^.*$","trunks":[]},{"description":"ALTERED mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"desc","name":"myThirdRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'lEk4TTS0mkSmv4wC3YdZZA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '1229ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0C6MDYwAAAACTyQ8QL9n2RbbStwL1IuMoUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:38:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["111.fqdn.com"]}]})
  .query(true)
  .reply(200, {"trunks":{"11.fqdn.com":{"sipSignalingPort":1239},"22.fqdn.com":{"sipSignalingPort":2348},"33.fqdn.com":{"sipSignalingPort":3457},"111.fqdn.com":{"sipSignalingPort":5678}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["111.fqdn.com"]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '5oGHLMB/1kePwT1rTQqQcw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '379ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DaMDYwAAAACGkALAakQeSojG5W59LwKrUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:38:53 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"11.fqdn.com":{"sipSignalingPort":1239},"22.fqdn.com":{"sipSignalingPort":2348},"33.fqdn.com":{"sipSignalingPort":3457},"111.fqdn.com":{"sipSignalingPort":5678}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["111.fqdn.com"]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '5XmmADt7M0KYjvkyMT29hg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '265ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0DaMDYwAAAAAgAus7D0pdT6hu1ON4kT8GUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:38:54 GMT'
]);
