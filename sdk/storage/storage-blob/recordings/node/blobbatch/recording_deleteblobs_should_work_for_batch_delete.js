let nock = require('nock');

module.exports.hash = "23e4af99478a6bded62febf1a909d476";

module.exports.testInfo = {"uniqueName":{"container":"container163164553243504643"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163164553243504643')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 14 Sep 2021 18:52:12 GMT',
  'ETag',
  '"0x8D977B0C371FE36"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f0480d-301e-008f-5899-a93dc7000000',
  'x-ms-client-request-id',
  '31dfb478-cefd-4b1e-8373-75e7c3ee2495',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163164553243504643/blob0', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 14 Sep 2021 18:52:12 GMT',
  'ETag',
  '"0x8D977B0C37C67B3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f04843-301e-008f-0899-a93dc7000000',
  'x-ms-client-request-id',
  '3ff322e5-d2cd-462e-8741-e04a2eec58b6',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-14T18:52:12.7295411Z',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163164553243504643/blob1', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 14 Sep 2021 18:52:12 GMT',
  'ETag',
  '"0x8D977B0C38431CA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f04863-301e-008f-2399-a93dc7000000',
  'x-ms-client-request-id',
  'd706f4c4-38e6-4035-8205-eec2fb05d84c',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-14T18:52:12.7805898Z',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163164553243504643/%C3%A5%20%C3%A4%20%C3%B6', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 14 Sep 2021 18:52:12 GMT',
  'ETag',
  '"0x8D977B0C38BFBDC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f04882-301e-008f-3f99-a93dc7000000',
  'x-ms-client-request-id',
  '6e4510e7-9532-4d43-ac56-48b60a8b0c1c',
  'x-ms-version',
  '2020-10-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-14T18:52:12.8316380Z',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "--batch_f4e7306c-04db-4452-bfc7-8cd3b59521b1\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: 0\r\n\r\nDELETE /container163164553243504643/blob0 HTTP/1.1\r\nAccept: application/xml\r\nx-ms-date: Tue, 14 Sep 2021 18:52:12 GMT\r\nAuthorization: SharedKey fakestorageaccount:pass123\r\n\r\n--batch_f4e7306c-04db-4452-bfc7-8cd3b59521b1\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: 1\r\n\r\nDELETE /container163164553243504643/blob1 HTTP/1.1\r\nAccept: application/xml\r\nx-ms-date: Tue, 14 Sep 2021 18:52:12 GMT\r\nAuthorization: SharedKey fakestorageaccount:pass123\r\n\r\n--batch_f4e7306c-04db-4452-bfc7-8cd3b59521b1\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: 2\r\n\r\nDELETE /container163164553243504643/%C3%A5%20%C3%A4%20%C3%B6 HTTP/1.1\r\nAccept: application/xml\r\nx-ms-date: Tue, 14 Sep 2021 18:52:12 GMT\r\nAuthorization: SharedKey fakestorageaccount:pass123\r\n\r\n--batch_f4e7306c-04db-4452-bfc7-8cd3b59521b1--\r\n")
  .query(true)
  .reply(202, "--batchresponse_ca5a9f6c-5883-443e-82b1-263d2e8791ec\r\nContent-Type: application/http\r\nContent-ID: 0\r\n\r\nHTTP/1.1 202 Accepted\r\nx-ms-delete-type-permanent: true\r\nx-ms-request-id: c3f048aa-301e-008f-6599-a93dc71e748d\r\nx-ms-version: 2020-10-02\r\nServer: Windows-Azure-Blob/1.0\r\n\r\n--batchresponse_ca5a9f6c-5883-443e-82b1-263d2e8791ec\r\nContent-Type: application/http\r\nContent-ID: 1\r\n\r\nHTTP/1.1 202 Accepted\r\nx-ms-delete-type-permanent: true\r\nx-ms-request-id: c3f048aa-301e-008f-6599-a93dc71e748f\r\nx-ms-version: 2020-10-02\r\nServer: Windows-Azure-Blob/1.0\r\n\r\n--batchresponse_ca5a9f6c-5883-443e-82b1-263d2e8791ec\r\nContent-Type: application/http\r\nContent-ID: 2\r\n\r\nHTTP/1.1 202 Accepted\r\nx-ms-delete-type-permanent: true\r\nx-ms-request-id: c3f048aa-301e-008f-6599-a93dc71e7490\r\nx-ms-version: 2020-10-02\r\nServer: Windows-Azure-Blob/1.0\r\n\r\n--batchresponse_ca5a9f6c-5883-443e-82b1-263d2e8791ec--", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_ca5a9f6c-5883-443e-82b1-263d2e8791ec',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f048aa-301e-008f-6599-a93dc7000000',
  'x-ms-version',
  '2020-10-02',
  'x-ms-client-request-id',
  '80a3676b-b389-490f-983a-ddb439313003',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container163164553243504643')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container163164553243504643\"><MaxResults>1</MaxResults><Blobs /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f048e4-301e-008f-1b99-a93dc7000000',
  'x-ms-client-request-id',
  '33125b4d-0efa-4943-876c-86d671166b47',
  'x-ms-version',
  '2020-10-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163164553243504643')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3f0491e-301e-008f-5299-a93dc7000000',
  'x-ms-client-request-id',
  'e2e1a0aa-fbfb-4876-a5fb-8dcdd11af66e',
  'x-ms-version',
  '2020-10-02',
  'Date',
  'Tue, 14 Sep 2021 18:52:12 GMT'
]);
