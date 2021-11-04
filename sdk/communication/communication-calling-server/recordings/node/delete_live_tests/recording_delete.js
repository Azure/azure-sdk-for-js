let nock = require('nock');

module.exports.hash = "2edca15d57c1511a41d4cbd310f4422b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/v1/objects/0-wus-d6-fdf8ff0fdcd668bca8c52c0b1ee79b05')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Tue, 02 Nov 2021 17:43:52 GMT'
]);
