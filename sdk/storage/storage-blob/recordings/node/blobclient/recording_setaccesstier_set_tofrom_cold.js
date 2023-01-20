let nock = require('nock');

module.exports.hash = "444b0f755156e112847b6f19cd8256ec";

module.exports.testInfo = {"uniqueName":{"container":"container166787496297405236","blob":"blob166787496324901722"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496297405236')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:03 GMT',
  'ETag',
  '"0x8DAC131FAE80069"',
  'x-ms-request-id',
  '04001b97-201e-0000-401a-f3e568000000',
  'x-ms-client-request-id',
  '32e4563f-a8e5-4b82-ad52-f65a4230a2e3',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496297405236/blob166787496324901722', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:03 GMT',
  'ETag',
  '"0x8DAC131FB1706EB"',
  'x-ms-request-id',
  '04001b99-201e-0000-411a-f3e568000000',
  'x-ms-client-request-id',
  '654a61ce-cba4-48d0-a504-c34a98eaeef1',
  'x-ms-version',
  '2021-12-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Nov 2022 02:36:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496297405236/blob166787496324901722')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '04001b9a-201e-0000-421a-f3e568000000',
  'x-ms-client-request-id',
  'd05942bd-72c8-445a-996b-833b7a6b66b7',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container166787496297405236/blob166787496324901722')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAC131FB1706EB"',
  'x-ms-request-id',
  '04001ba4-201e-0000-4c1a-f3e568000000',
  'x-ms-client-request-id',
  '9d4a6b07-9283-4b51-810f-d5bb481e21c8',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Nov 2022 02:36:03 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cold',
  'x-ms-access-tier-change-time',
  'Tue, 08 Nov 2022 02:36:03 GMT',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Nov 2022 02:36:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496297405236/blob166787496324901722')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '04001ba9-201e-0000-511a-f3e568000000',
  'x-ms-client-request-id',
  '75b521d7-38eb-4bf6-8e6b-d313ceb2db47',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container166787496297405236/blob166787496324901722')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAC131FB1706EB"',
  'x-ms-request-id',
  '04001baa-201e-0000-521a-f3e568000000',
  'x-ms-client-request-id',
  '1d90dd96-05bd-451a-85b0-9647ba772e86',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Nov 2022 02:36:03 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-change-time',
  'Tue, 08 Nov 2022 02:36:04 GMT',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Nov 2022 02:36:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496297405236/blob166787496324901722')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '04001bab-201e-0000-531a-f3e568000000',
  'x-ms-client-request-id',
  '6bade1cb-e711-44f9-bb97-c6dba41197fe',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container166787496297405236/blob166787496324901722')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAC131FB1706EB"',
  'x-ms-request-id',
  '04001bac-201e-0000-541a-f3e568000000',
  'x-ms-client-request-id',
  'db23753f-2980-481a-8175-b693dd70dc59',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Nov 2022 02:36:03 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cold',
  'x-ms-access-tier-change-time',
  'Tue, 08 Nov 2022 02:36:05 GMT',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Nov 2022 02:36:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496297405236/blob166787496324901722')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '04001bae-201e-0000-561a-f3e568000000',
  'x-ms-client-request-id',
  'cacf74c7-8364-4597-acdc-0500aaaeae8c',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container166787496297405236/blob166787496324901722')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAC131FB1706EB"',
  'x-ms-request-id',
  '04001baf-201e-0000-571a-f3e568000000',
  'x-ms-client-request-id',
  '402de2a2-2fe1-40ab-bf8c-ca85d6d3ea51',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Nov 2022 02:36:03 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-change-time',
  'Tue, 08 Nov 2022 02:36:05 GMT',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Nov 2022 02:36:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container166787496297405236')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '04001bb1-201e-0000-581a-f3e568000000',
  'x-ms-client-request-id',
  'ace24dd1-75a4-4229-b001-ced97f699c9b',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:06 GMT'
]);
