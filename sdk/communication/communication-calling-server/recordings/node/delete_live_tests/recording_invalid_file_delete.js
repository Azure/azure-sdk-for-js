let nock = require('nock');

module.exports.hash = "0d9469b3f72006adfc5ffce15953963a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/v1/objects/0-wus-d4-ca4017a32f8514aa9f054f0917270000')
  .reply(404, "", [
  'Content-Length',
  '0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Tue, 02 Nov 2021 17:46:09 GMT'
]);
