let nock = require('nock');

module.exports.hash = "336a0dc4e3f3ee2dc69985f8531ee07f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://someEndpoint', {"encodedQueryParams":true})
  .post('/emails:send', {"sender":"someSender@contoso.com","content":{"subject":"someSubject","plainText":"somePlainTextBody","html":"<html><h1>someHtmlBody</html>"},"recipients":{"to":[{"email":"someRecipient@domain.com","displayName":"someRecipient"}]},"attachments":[{"name":"readme.txt","attachmentType":"txt","contentBytesBase64":"ZW1haWwgdGVzdCBhdHRhY2htZW50"}]})
  .query(true)
  .reply(202, "", [
  'Operation-Location',
  "someOperationLocation",
  'x-ms-request-id',
  "someRequestId",
  'Repeatability-Result',
  'accepted',
  'api-supported-versions',
  '2021-10-01-preview',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0vxGEYgAAAADN86zXXjp0Sa1WJkG/4qZiRE0yQUExMDkxMjA5MDA5AGNjOTI3NThkLTA1ZjctNGFkNi1hYTVlLTBmYTk3MThkODk4NQ==',
  'Date',
  'Tue, 17 May 2022 21:21:02 GMT',
  'Content-Length',
  '0'
]);
