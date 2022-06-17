let nock = require('nock');

module.exports.hash = "53fc1a011f85bbe58ac88b09e27e4480";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://someEndpoint', {"encodedQueryParams":true})
  .post('/emails:send', {"sender":"someSender@contoso.com","content":{"subject":"someSubject","body":{"plainText":"somePlainTextBody","html":"<html><h1>someHtmlBody</html>"}},"recipients":{"toRecipients":[{"email":"someRecipient@domain.com","displayName":"someRecipient"}]},"attachments":[{"name":"readme.txt","attachmentType":"txt","contentBytesBase64":"ZW1haWwgdGVzdCBhdHRhY2htZW50"}]})
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
  '0uCt8YgAAAAASawD2Dr2UTK0O31vD3KvJV1NURURHRTA4MTQAY2M5Mjc1OGQtMDVmNy00YWQ2LWFhNWUtMGZhOTcxOGQ4OTg1',
  'Date',
  'Wed, 11 May 2022 21:33:44 GMT',
  'Content-Length',
  '0'
]);
