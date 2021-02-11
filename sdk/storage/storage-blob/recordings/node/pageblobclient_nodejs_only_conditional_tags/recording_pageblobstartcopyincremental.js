let nock = require('nock');

module.exports.hash = "fa2bccdf62a907e1a9fc8172ded70e32";

module.exports.testInfo = {"uniqueName":{"container":"container159590891642000345","blob":"blob159590891796705901","destPageBlob":"destPageBlob159590894993101907"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159590891642000345')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 28 Jul 2020 04:01:57 GMT',
  'ETag',
  '"0x8D832AAF8C3EB91"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8beca98-601e-0072-6b93-644aef000000',
  'x-ms-client-request-id',
  '3c51dcea-025a-4a8e-80f3-2b9cb1e50ed5',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 28 Jul 2020 04:01:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159590891642000345/blob159590891796705901')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 28 Jul 2020 04:01:57 GMT',
  'ETag',
  '"0x8D832AAF92ABCCF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8becaef-601e-0072-3793-644aef000000',
  'x-ms-client-request-id',
  '9e455289-ad3e-4720-a154-42fdc4a81a43',
  'x-ms-version',
  '2019-12-12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-07-28T04:01:57.9081935Z',
  'Date',
  'Tue, 28 Jul 2020 04:01:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159590891642000345/blob159590891796705901')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 28 Jul 2020 04:01:57 GMT',
  'ETag',
  '"0x8D832AAF92ABCCF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8becb2b-601e-0072-6d93-644aef000000',
  'x-ms-client-request-id',
  '85bb9d86-1407-4f8c-a593-629f19cce32f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-07-28T04:01:58.3875298Z',
  'x-ms-snapshot',
  '2020-07-28T04:01:58.3865298Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 28 Jul 2020 04:01:57 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159590891642000345', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers/>")
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 28 Jul 2020 04:01:59 GMT',
  'ETag',
  '"0x8D832AAF9D9BFBE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8becb63-601e-0072-1c93-644aef000000',
  'x-ms-client-request-id',
  '826d08e7-d865-4b49-8582-dc3e54736a67',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 28 Jul 2020 04:01:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159590891642000345/destPageBlob159590894993101907')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 28 Jul 2020 04:02:29 GMT',
  'ETag',
  '"0x8D832AB0C35D9C0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8beddb4-601e-0072-5d93-644aef000000',
  'x-ms-client-request-id',
  '698a7aa9-322f-431d-954d-6ae8cfdf57ed',
  'x-ms-version',
  '2019-12-12',
  'x-ms-copy-id',
  'b730511a-1c6f-417a-bd29-c0e842c085b1',
  'x-ms-copy-status',
  'pending',
  'x-ms-version-id',
  '2020-07-28T04:02:29.8577344Z',
  'Date',
  'Tue, 28 Jul 2020 04:02:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159590891642000345/destPageBlob159590894993101907')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:b8bede12-601e-0072-3293-644aef000000\nTime:2020-07-28T04:02:30.5770722Z</Message></Error>", [
  'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8bede12-601e-0072-3293-644aef000000',
  'x-ms-client-request-id',
  '3fb64b79-b536-4376-8a8b-5c3ad7c55b03',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Tue, 28 Jul 2020 04:02:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159590891642000345/destPageBlob159590894993101907', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8bede4c-601e-0072-6193-644aef000000',
  'x-ms-version',
  '2019-12-12',
  'x-ms-client-request-id',
  '502c5819-9904-4c28-8728-88fa9b0ad040',
  'Date',
  'Tue, 28 Jul 2020 04:02:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159590891642000345/blob159590891796705901')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 28 Jul 2020 04:01:57 GMT',
  'ETag',
  '"0x8D832AAF92ABCCF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8bedebf-601e-0072-4293-644aef000000',
  'x-ms-client-request-id',
  '21d0b193-e891-4dd4-8544-0894799b89f8',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-07-28T04:02:31.7710811Z',
  'x-ms-snapshot',
  '2020-07-28T04:02:31.7700811Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 28 Jul 2020 04:02:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159590891642000345/destPageBlob159590894993101907')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ConditionNotMet</Code><Message>The condition specified using HTTP conditional header(s) is not met.\nRequestId:b8bedf42-601e-0072-2893-644aef000000\nTime:2020-07-28T04:02:32.5694878Z</Message></Error>", [
  'Content-Length',
  '252',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8bedf42-601e-0072-2893-644aef000000',
  'x-ms-client-request-id',
  '86a1045c-5f65-49f2-890e-2d3ff58be09d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-error-code',
  'ConditionNotMet',
  'Date',
  'Tue, 28 Jul 2020 04:02:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159590891642000345/destPageBlob159590894993101907')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 28 Jul 2020 04:02:33 GMT',
  'ETag',
  '"0x8D832AB0E3CDCDC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8bedfb8-601e-0072-0293-644aef000000',
  'x-ms-client-request-id',
  '84bc8e56-6f72-4363-a95d-5b894776105c',
  'x-ms-version',
  '2019-12-12',
  'x-ms-copy-id',
  'd88e542e-66fe-4567-a0f1-fb6ba24344e1',
  'x-ms-copy-status',
  'pending',
  'Date',
  'Tue, 28 Jul 2020 04:02:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159590891642000345')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8bee01a-601e-0072-4e93-644aef000000',
  'x-ms-client-request-id',
  'e64b16e7-2a9b-4cd8-a310-3d4afe62815e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 28 Jul 2020 04:02:33 GMT'
]);
