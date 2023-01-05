let nock = require('nock');

module.exports.hash = "495ead69944cd34f25a84e7e336a213e";

module.exports.testInfo = {"uniqueName":{"container":"container165899712300102036","blockblob":"blockblob165899712310609229","srcblob/%2+%2F":"srcblob/%2+%2F165899712310605985"},"newDate":{"expiry":"2022-07-28T08:32:03.211Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712300102036')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:03 GMT',
  'ETag',
  '"0x8DA7073A5DE8B41"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907667-201e-0032-155c-a2e4ce000000',
  'x-ms-client-request-id',
  '61191490-fd2b-407a-8b94-409947409a87',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712300102036/srcblob/%252%2B%252F165899712310605985', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:03 GMT',
  'ETag',
  '"0x8DA7073A5F0DF32"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907696-201e-0032-3d5c-a2e4ce000000',
  'x-ms-client-request-id',
  '35cfe443-e847-4bd6-a0df-70d6fa58a86d',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:32:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899712300102036')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569076b7-201e-0032-5a5c-a2e4ce000000',
  'x-ms-client-request-id',
  '043c38c7-69de-4a57-8598-c6234c0a70e5',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:03 GMT'
]);
