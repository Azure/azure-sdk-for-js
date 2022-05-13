let nock = require('nock');

module.exports.hash = "a2017c22c97d927a3bd3370b807b04f4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://someEndpoint', {"encodedQueryParams":true})
  .post('/emails:send', {"sender":"someSender@contoso.com","content":{"subject":"someSubject","body":{"plainText":"somePlainTextBody","html":"<html><h1>someHtmlBody</html>"}},"recipients":{"toRecipients":[{"email":"someRecipient@domain.com","displayName":"someRecipient"},{"email":"someRecipient@domain.com","displayName":"someRecipient"}],"ccRecipients":[{"email":"someRecipient@domain.com","displayName":"someRecipient"}],"bccRecipients":[{"email":"someRecipient@domain.com","displayName":"someRecipient"}]}})
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
  '09it8YgAAAABD01/8bCxPRY7MkLPF8aDpV1NURURHRTA4MTIAY2M5Mjc1OGQtMDVmNy00YWQ2LWFhNWUtMGZhOTcxOGQ4OTg1',
  'Date',
  'Wed, 11 May 2022 21:34:46 GMT',
  'Content-Length',
  '0'
]);
