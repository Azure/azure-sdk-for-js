let nock = require('nock');

module.exports.hash = "82971037ce3412b0bc2ec94e8ea1debe";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://test-jannovak.int.communication.azure.net:443', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[{"name":"sameNameRoute","numberPattern":"^+[1-9][0-9]{3,23}$"},{"name":"sameNameRoute","numberPattern":"^+[1-9][0-9]{3,23}$"}]})
  .query(true)
  .reply(400, {"error":{"code":"UnprocessableConfiguration","message":"One or more request inputs are not valid.","innererror":{"code":"DuplicatedRoute","message":"There is a duplicated route."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'LmsF09ThpUGTBV3LFMTHlA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '24ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0QNX6YgAAAAB2AVy5ZA+CTrLPF+FK6+ETUFJHMDFFREdFMDkxOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Mon, 15 Aug 2022 23:22:40 GMT'
]);
