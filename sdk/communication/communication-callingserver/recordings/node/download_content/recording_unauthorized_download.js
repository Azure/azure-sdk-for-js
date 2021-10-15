let nock = require('nock');

module.exports.hash = "e7c5a3c4d603c821ad2bc3db15664eb9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/v1/objects/0-eus-d15-af5689148b0afa252a57a0121b744dcd/content/acsmetadata')
  .reply(401, "", [
  'Content-Length',
  '0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Tue, 12 Oct 2021 16:42:40 GMT'
]);
