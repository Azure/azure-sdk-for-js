let nock = require('nock');

module.exports.hash = "64c7ead96415eeaf2caea2f422e13ea4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/v1/objects/0-eus-d15-af5689148b0afa252a57a0121b744dcd/content/acsmetadata')
  .reply(200, {"chunkDocumentId":"0-eus-d15-af5689148b0afa252a57a0121b744dcd"}, [
  'Cache-Control',
  'no-cache, max-age=0, s-maxage=0, private',
  'Content-Length',
  '64',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-63/64',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Tue, 12 Oct 2021 00:00:36 GMT'
]);
