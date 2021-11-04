let nock = require('nock');

module.exports.hash = "44aeeb9e1bce10c53420368854607266";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/v1/objects/0-wus-d6-fdf8ff0fdcd668bca8c52c0b1ee79b05')
  .reply(401, "", [
  'Content-Length',
  '0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Tue, 02 Nov 2021 17:46:09 GMT'
]);
