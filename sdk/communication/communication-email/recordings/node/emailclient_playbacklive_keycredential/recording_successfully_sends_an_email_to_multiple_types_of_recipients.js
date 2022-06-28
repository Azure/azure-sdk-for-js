let nock = require('nock');

module.exports.hash = "82b3b017a7146dfd0112674b0fc5b2f1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://someEndpoint', {"encodedQueryParams":true})
  .post('/emails:send', {"sender":"someSender@contoso.com","content":{"subject":"someSubject","plainText":"somePlainTextBody","html":"<html><h1>someHtmlBody</html>"},"recipients":{"to":[{"email":"someRecipient@domain.com","displayName":"someRecipient"},{"email":"someRecipient@domain.com","displayName":"someRecipient"}],"cC":[{"email":"someRecipient@domain.com","displayName":"someRecipient"}],"bCC":[{"email":"someRecipient@domain.com","displayName":"someRecipient"}]}})
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
  '0vxGEYgAAAAAIFzlVhpfHRawFKE5VQNQTRE0yQUExMDkxMjA5MDA5AGNjOTI3NThkLTA1ZjctNGFkNi1hYTVlLTBmYTk3MThkODk4NQ==',
  'Date',
  'Tue, 17 May 2022 21:21:02 GMT',
  'Content-Length',
  '0'
]);
