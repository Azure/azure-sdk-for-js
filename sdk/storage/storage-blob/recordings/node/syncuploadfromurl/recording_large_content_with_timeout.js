let nock = require('nock');

module.exports.hash = "95ba470dab19a37c12a7e1a771024848";

module.exports.testInfo = {"uniqueName":{"container":"container165899768304305418","blockblob":"blockblob165899768367404932","srcblob/%2+%2F":"srcblob/%2+%2F165899768367503477"},"newDate":{"expiry":"2022-07-28T08:41:23.782Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899768304305418')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:41:23 GMT',
  'ETag',
  '"0x8DA7074F3FE436D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbdd1e04-701e-0072-485d-a2e3f6000000',
  'x-ms-client-request-id',
  'd9a66d24-bd86-4d79-b304-de26cb53c8b6',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:41:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899768304305418/srcblob/%252%2B%252F165899768367503477', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:41:23 GMT',
  'ETag',
  '"0x8DA7074F4110401"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbdd1e3e-701e-0072-625d-a2e3f6000000',
  'x-ms-client-request-id',
  '03037ef9-6be3-4114-bd0e-6873af15a215',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:41:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899768304305418')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbdd1e4a-701e-0072-695d-a2e3f6000000',
  'x-ms-client-request-id',
  '9eecf833-df53-45eb-a664-5d98aa4d4cde',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:41:23 GMT'
]);
