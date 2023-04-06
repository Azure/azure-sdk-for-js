let nock = require('nock');

module.exports.hash = "d4085b3906dc5276302fcc2013eae351";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"44.fqdn.com":{"sipSignalingPort":4567}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '+Ap/SZAcgkiiHLooyKNXUg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-05-01-preview, 2022-09-01-preview',
  'X-Processing-Time',
  '258ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0BKMDYwAAAACuNqFzimetTKXn46w9yi1jUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 22 Aug 2022 15:38:44 GMT'
]);
