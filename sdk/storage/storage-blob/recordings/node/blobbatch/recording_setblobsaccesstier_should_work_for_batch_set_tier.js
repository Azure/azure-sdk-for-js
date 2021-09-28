let nock = require('nock');

module.exports.hash = "80e55c6f7877b8f52a009693c776edca";

module.exports.testInfo = {"uniqueName":{"container":"container163164553304207685"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163164553304207685')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 14 Sep 2021 18:52:13 GMT',
  'ETag',
  '"0x8D977B0C3B0EB1E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f04954-301e-008f-0399-a93dc7000000',
  'x-ms-client-request-id',
  '3d2fce95-18b1-4713-9844-eb1e4a83ba70',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163164553304207685/blob0', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 14 Sep 2021 18:52:13 GMT',
  'ETag',
  '"0x8D977B0C3B90A39"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f04973-301e-008f-1f99-a93dc7000000',
  'x-ms-client-request-id',
  '2bd69e3b-f054-47f8-ae52-217d6cecce5c',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-14T18:52:13.1269177Z',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163164553304207685/blob1', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 14 Sep 2021 18:52:13 GMT',
  'ETag',
  '"0x8D977B0C3C0AD45"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f0498c-301e-008f-3599-a93dc7000000',
  'x-ms-client-request-id',
  '57a805cf-4602-4cc7-a2b8-e8e895ae41b7',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-14T18:52:13.1769669Z',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163164553304207685/%C3%A5%20%C3%A4%20%C3%B6', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 14 Sep 2021 18:52:13 GMT',
  'ETag',
  '"0x8D977B0C3C8EC9C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f0499e-301e-008f-4599-a93dc7000000',
  'x-ms-client-request-id',
  '794cd89b-bb40-4ae5-bc1d-a5546c1f416d',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-14T18:52:13.2310172Z',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "--batch_a489a1a2-4389-47dd-bfc8-584db3adb213\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: 0\r\n\r\nPUT /container163164553304207685/blob0?comp=tier HTTP/1.1\r\nAccept: application/xml\r\nx-ms-access-tier: Cool\r\nx-ms-date: Tue, 14 Sep 2021 18:52:13 GMT\r\nAuthorization\
>: SharedKey fakestorageaccount:pass123\r\n\r\n--batch_a489a1a2-4389-47dd-bfc8-584db3adb213\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: 1\r\n\r\nPUT /container163164553304207685/blob1?comp=tier HTTP/1.1\r\nAccept: application/xml\r\nx-ms-access-tier: Cool\r\nx-ms-date: Tue, 14 Sep 2021 18:52:13 GMT\r\nAuthorization: SharedKey fakestorageaccount:pass123\r\n\r\n--batch_a489a1a2-4389-47dd-bfc8-584db3adb213\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: 2\r\n\r\nPUT /container163164553304207685/%C3%A5%20%C3%A4%20%C3%B6?comp=tier HTTP/1.1\r\nAccept: application/xml\r\nx-ms-access-tier: Cool\r\nx-ms-date: Tue, 14 Sep 2021 18:52:13 GMT\r\nAuthorization: SharedKey fakestorageaccount:pass123\r\n\r\n--batch_a489a1a2-4389-47dd-bfc8-584db3adb213--\r\n")
  .query(true)
  .reply(202, "--batchresponse_1e3e1cd3-6550-468b-8640-7fc57c4e9542\r\nContent-Type: application/http\r\nContent-ID: 0\r\n\r\nHTTP/1.1 200 OK\r\nx-ms-request-id: c3f049b5-301e-008f-5b99-a93dc71e749b\r\nx-ms-version: 2020-10-02\r\nServer: Windows-Azure-Blob/1.0\r\n\r\n--batchresponse_1e3e1cd3-6550-468b-8640-7fc57c4e9542\r\nContent-Type: application/http\r\nContent-ID: 1\r\n\r\nHTTP/1.1 200 OK\r\nx-ms-request-id: c3f049b5-301e-008f-5b99-a93dc71e749d\r\nx-ms-version: 2020-10-02\r\nServer: Windows-Azure-Blob/1.0\r\n\r\n--batchresponse_1e3e1cd3-6550-468b-8640-7fc57c4e9542\r\nContent-Type: application/http\r\nContent-ID: 2\r\n\r\nHTTP/1.1 200 OK\r\nx-ms-request-id: c3f049b5-301e-008f-5b99-a93dc71e749e\r\nx-ms-version: 2020-10-02\r\nServer: Windows-Azure-Blob/1.0\r\n\r\n--batchresponse_1e3e1cd3-6550-468b-8640-7fc57c4e9542--", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_1e3e1cd3-6550-468b-8640-7fc57c4e9542',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f049b5-301e-008f-5b99-a93dc7000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  'e0e27cab-f284-4df4-b096-f6d60d69e2ca',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container163164553304207685/blob0')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 14 Sep 2021 18:52:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D977B0C3B90A39"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f049c3-301e-008f-6899-a93dc7000000',
  'x-ms-client-request-id',
  'de8514fd-dc61-48ff-8325-6ed56e7231d4',
  'x-ms-version',
  '2020-10-02',
  'x-ms-version-id',
  '2021-09-14T18:52:13.1269177Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Tue, 14 Sep 2021 18:52:13 GMT',
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
  'Tue, 14 Sep 2021 18:52:13 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container163164553304207685/blob1')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 14 Sep 2021 18:52:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D977B0C3C0AD45"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f049d0-301e-008f-7599-a93dc7000000',
  'x-ms-client-request-id',
  '39f1f1c9-217f-4395-aae1-5d5335338bfc',
  'x-ms-version',
  '2020-10-02',
  'x-ms-version-id',
  '2021-09-14T18:52:13.1769669Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Tue, 14 Sep 2021 18:52:13 GMT',
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
  'Tue, 14 Sep 2021 18:52:13 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container163164553304207685/%C3%A5%20%C3%A4%20%C3%B6')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 14 Sep 2021 18:52:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D977B0C3C8EC9C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f049e9-301e-008f-0b99-a93dc7000000',
  'x-ms-client-request-id',
  'ea351fc9-51d2-4954-9854-a493d0690a10',
  'x-ms-version',
  '2020-10-02',
  'x-ms-version-id',
  '2021-09-14T18:52:13.2310172Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Tue, 14 Sep 2021 18:52:13 GMT',
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
  'Tue, 14 Sep 2021 18:52:13 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-change-time,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163164553304207685')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f049f8-301e-008f-1a99-a93dc7000000',
  'x-ms-client-request-id',
  '73b868a3-2b6d-4250-ae69-f9d91d8c312a',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);
