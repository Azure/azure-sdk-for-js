let nock = require('nock');

module.exports.hash = "df61c524e66abc05a67959db60063e2b";

module.exports.testInfo = {"uniqueName":{"container":"container159210827077205523","blob":"blob159210827078706620"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827077205523')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:50 GMT',
  'ETag',
  '"0x8D81019E6F34AF5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308c74-201e-003e-7f02-42dadf000000',
  'x-ms-client-request-id',
  '2163304c-fa1f-49ac-b3d0-8ca442aacbad',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827077205523/blob159210827078706620', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:50 GMT',
  'ETag',
  '"0x8D81019E6F62841"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308c7c-201e-003e-0502-42dadf000000',
  'x-ms-client-request-id',
  'e6dd7a9d-b125-4c96-a69c-b2a015305e3b',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-14T04:17:50.8043841Z',
  'Date',
  'Sun, 14 Jun 2020 04:17:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827077205523/blob159210827078706620', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308c7f-201e-003e-0802-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '7e1d7ad7-7b40-4393-b44e-03fad20aeed0',
  'Date',
  'Sun, 14 Jun 2020 04:17:49 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159210827077205523/blob159210827078706620')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 14 Jun 2020 04:17:50 GMT',
  'ETag',
  '"0x8D81019E6F62841"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308c81-201e-003e-0a02-42dadf000000',
  'x-ms-client-request-id',
  '048a27fb-154a-445c-ab50-4b4e6f8aa82e',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-06-14T04:17:50.9715012Z',
  'x-ms-snapshot',
  '2020-06-14T04:17:50.9705012Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container159210827077205523/blob159210827078706620')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308cc6-201e-003e-4c02-42dadf000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '22f68861-189f-4da0-899b-77c37b5ccc92',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159210827077205523')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c1308ccb-201e-003e-5102-42dadf000000',
  'x-ms-client-request-id',
  'c75e171f-321e-4510-9990-d366af8f7893',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Sun, 14 Jun 2020 04:17:50 GMT'
]);
