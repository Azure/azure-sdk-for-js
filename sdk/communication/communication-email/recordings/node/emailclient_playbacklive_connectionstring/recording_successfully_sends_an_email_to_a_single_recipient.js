let nock = require('nock');

module.exports.hash = "0412c2041a9ff4fe721ad49f682a99cf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://someEndpoint', {"encodedQueryParams":true})
  .post('/emails:send', {"sender":"someSender@contoso.com","content":{"subject":"someSubject","body":{"plainText":"somePlainTextBody","html":"<html><h1>someHtmlBody</html>"}},"recipients":{"toRecipients":[{"email":"someRecipient@domain.com","displayName":"someRecipient"}]}})
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
  '09yt8YgAAAAADia2fa8U4TYtHcKqD4u69V1NURURHRTA4MTIAY2M5Mjc1OGQtMDVmNy00YWQ2LWFhNWUtMGZhOTcxOGQ4OTg1',
  'Date',
  'Wed, 11 May 2022 21:34:46 GMT',
  'Content-Length',
  '0'
]);
