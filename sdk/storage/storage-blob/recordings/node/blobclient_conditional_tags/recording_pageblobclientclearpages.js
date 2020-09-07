let nock = require('nock');

module.exports.hash = "8247e87181e1b9e8f7cd154b12eb1b94";

module.exports.testInfo = {"uniqueName":{"container":"container159549961134705028","blob":"blob159549961171904177","pageBlob":"pageBlob159549961230609274"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961134705028')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:10 GMT',
  'ETag',
  '"0x8D82EF1FADD3EEB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429a36-901e-002b-0dda-60cd6c000000',
  'x-ms-client-request-id',
  '24562995-daa1-4bc4-bb55-e22191ac9268',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961134705028/blob159549961171904177', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:10 GMT',
  'ETag',
  '"0x8D82EF1FB1628E4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429a5e-901e-002b-2dda-60cd6c000000',
  'x-ms-client-request-id',
  '017953d1-0a94-470f-bb8b-e0960e346abb',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:10.7454692Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961134705028/blob159549961171904177', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429a84-901e-002b-51da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '1bfd8b47-42a5-43ad-b329-117e7b81df2e',
  'Date',
  'Thu, 23 Jul 2020 10:20:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961134705028/pageBlob159549961230609274')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:11 GMT',
  'ETag',
  '"0x8D82EF1FB6F7CD8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429aa1-901e-002b-6bda-60cd6c000000',
  'x-ms-client-request-id',
  '69404b7b-2d08-4e46-9d53-54e2b0ab2a8f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-23T10:20:11.3308888Z',
  'Date',
  'Thu, 23 Jul 2020 10:20:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961134705028/pageBlob159549961230609274')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:10429ab1-901e-002b-77da-60cd6c000000\nTime:2020-07-23T10:20:11.6213665Z</Message></Error>", [
  'Content-Length',
  '253',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'ConditionNotMet',
  'x-ms-request-id',
  '10429ab1-901e-002b-77da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  'fa4e8aa7-4e79-4335-a599-08906943e701',
  'Date',
  'Thu, 23 Jul 2020 10:20:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159549961134705028/pageBlob159549961230609274')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Thu, 23 Jul 2020 10:20:11 GMT',
  'ETag',
  '"0x8D82EF1FBC7E628"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-sequence-number',
  '0',
  'x-ms-request-id',
  '10429ac2-901e-002b-05da-60cd6c000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '761d1ccb-40d4-4515-9956-f3ad51440700',
  'Date',
  'Thu, 23 Jul 2020 10:20:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159549961134705028')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10429ad6-901e-002b-17da-60cd6c000000',
  'x-ms-client-request-id',
  '11ab68ad-1623-4bbb-ada8-fc2b4ed4b0a9',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 23 Jul 2020 10:20:12 GMT'
]);
