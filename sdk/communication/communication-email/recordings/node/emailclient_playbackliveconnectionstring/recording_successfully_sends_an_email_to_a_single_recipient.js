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
  '0uCt8YgAAAADbUCWCtWnzR6JDsI+7udfJV1NURURHRTA4MTQAY2M5Mjc1OGQtMDVmNy00YWQ2LWFhNWUtMGZhOTcxOGQ4OTg1',
  'Date',
  'Wed, 11 May 2022 21:33:44 GMT',
  'Content-Length',
  '0'
]);
