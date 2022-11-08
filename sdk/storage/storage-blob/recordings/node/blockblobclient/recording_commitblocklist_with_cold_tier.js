let nock = require('nock');

module.exports.hash = "ad44a50d8a4af7baf80b1e57c1b97c90";

module.exports.testInfo = {"uniqueName":{"container":"container166787496814606506","blob":"blob166787496841807828"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496814606506')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:08 GMT',
  'ETag',
  '"0x8DAC131FDFD0CD1"',
  'x-ms-request-id',
  '04001bba-201e-0000-5f1a-f3e568000000',
  'x-ms-client-request-id',
  '491418ee-2b06-4e84-ab79-2f6f57ef0cd6',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496814606506/blob166787496841807828', "HelloWorld")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '04001bbc-201e-0000-601a-f3e568000000',
  'x-ms-client-request-id',
  'd8920cc4-86e9-4689-ae48-d7a96599cb95',
  'x-ms-version',
  '2021-12-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Nov 2022 02:36:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496814606506/blob166787496841807828', "HelloWorld")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '04001bbd-201e-0000-611a-f3e568000000',
  'x-ms-client-request-id',
  '80991367-1717-44c7-b576-2f0eb4171e7b',
  'x-ms-version',
  '2021-12-02',
  'x-ms-content-crc64',
  '8R2aIe9T07E=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Nov 2022 02:36:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166787496814606506/blob166787496841807828', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><BlockList><Latest>MQ==</Latest><Latest>Mg==</Latest></BlockList>")
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:09 GMT',
  'ETag',
  '"0x8DAC131FE8BB3AD"',
  'x-ms-request-id',
  '04001bbe-201e-0000-621a-f3e568000000',
  'x-ms-client-request-id',
  '88ea12d4-932b-4cd3-ae8f-15010aaa9bd6',
  'x-ms-version',
  '2021-12-02',
  'x-ms-content-crc64',
  'GFi/o1BSQtU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 08 Nov 2022 02:36:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container166787496814606506/blob166787496841807828')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:09 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAC131FE8BB3AD"',
  'x-ms-request-id',
  '04001bbf-201e-0000-631a-f3e568000000',
  'x-ms-client-request-id',
  '42dec777-63c3-416a-b330-2f0f5b167cbc',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Nov 2022 02:36:09 GMT',
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
  'Tue, 08 Nov 2022 02:36:09 GMT',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Nov 2022 02:36:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container166787496814606506/blob166787496841807828')
  .reply(200, "HelloWorldHelloWorld", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 08 Nov 2022 02:36:09 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DAC131FE8BB3AD"',
  'x-ms-request-id',
  '04001bc0-201e-0000-641a-f3e568000000',
  'x-ms-client-request-id',
  'f88ec338-b803-4e30-9c52-b4721788acd3',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 08 Nov 2022 02:36:09 GMT',
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
  'Tue, 08 Nov 2022 02:36:09 GMT',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 08 Nov 2022 02:36:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container166787496814606506')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '04001bc1-201e-0000-651a-f3e568000000',
  'x-ms-client-request-id',
  '06f4995a-0a55-492f-935f-cdfe765f34f7',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Tue, 08 Nov 2022 02:36:09 GMT'
]);
