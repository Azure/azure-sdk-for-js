let nock = require('nock');

module.exports.hash = "a65e4119b09572bfeb3690a48d180edd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/v1/objects/0-sa-d4-a29f0c0212c0a2a634ab078245184de8/content/acsmetadata')
  .reply(302, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint-sa/v1/objects/0-sa-d4-a29f0c0212c0a2a634ab078245184de8/content/acsmetadata',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Tue, 12 Oct 2021 17:25:35 GMT'
]);

nock('https://endpoint-sa', {"encodedQueryParams":true})
  .get('/v1/objects/0-sa-d4-a29f0c0212c0a2a634ab078245184de8/content/acsmetadata')
  .reply(200, {"chunkDocumentId":"0-sa-d4-a29f0c0212c0a2a634ab078245184de8"}, [
  'Cache-Control',
  'no-cache, max-age=0, s-maxage=0, private',
  'Content-Length',
  '62',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-61/62',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'Date',
  'Tue, 12 Oct 2021 17:25:36 GMT'
]);
