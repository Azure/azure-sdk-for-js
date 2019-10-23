let nock = require('nock');

module.exports.testInfo = {"container":"container157135007048206827"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157135007048206827')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 17 Oct 2019 22:07:50 GMT',
  'ETag',
  '"0x8D7534E7381C173"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1943d166-601e-004d-4137-8537e1000000',
  'x-ms-client-request-id',
  '8b06612a-fe80-4f12-a7b3-9607efa670af',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 17 Oct 2019 22:07:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157135007048206827/blob0', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 17 Oct 2019 22:07:50 GMT',
  'ETag',
  '"0x8D7534E738C6A42"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a3819e60-101e-00d1-6d37-859a87000000',
  'x-ms-client-request-id',
  '5a7b13e5-3f20-4200-89c2-ca7f54bffac5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 17 Oct 2019 22:07:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157135007048206827/blob1', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 17 Oct 2019 22:07:50 GMT',
  'ETag',
  '"0x8D7534E73945AF6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a00d2322-f01e-00bb-0e37-8542af000000',
  'x-ms-client-request-id',
  '4431d38b-b95d-4fb7-878b-3e3b16f14610',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 17 Oct 2019 22:07:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157135007048206827/%C3%A5%20%C3%A4%20%C3%B6', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 17 Oct 2019 22:07:50 GMT',
  'ETag',
  '"0x8D7534E739BAF45"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '402aa0fe-501e-0024-6c37-850ead000000',
  'x-ms-client-request-id',
  'ac95c072-ab0a-4476-b2dd-e8728943dc8e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 17 Oct 2019 22:07:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .post('/', "--batch_1e324473-c7ec-4c6c-9b47-645a57a99ba5\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: 0\r\n\r\nDELETE /container157135007048206827/blob0 HTTP/1.1\r\nx-ms-date: Thu, 17 Oct 2019 22:07:50 GMT\r\nAuthorization: SharedKey fakestorageaccount:v8AC45Bjze7bUSVWdhO78h1WQlH+2kBFbG2v6XnAs60=\r\n\r\n--batch_1e324473-c7ec-4c6c-9b47-645a57a99ba5\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: 1\r\n\r\nDELETE /container157135007048206827/blob1 HTTP/1.1\r\nx-ms-date: Thu, 17 Oct 2019 22:07:50 GMT\r\nAuthorization: SharedKey fakestorageaccount:S2wYSshnb3mAelCdFIGUeIbuRt6p5C4GSeo6JYOudWQ=\r\n\r\n--batch_1e324473-c7ec-4c6c-9b47-645a57a99ba5\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: 2\r\n\r\nDELETE /container157135007048206827/%C3%A5%20%C3%A4%20%C3%B6 HTTP/1.1\r\nx-ms-date: Thu, 17 Oct 2019 22:07:50 GMT\r\nAuthorization: SharedKey fakestorageaccount:HU7PymO65lVLsnHsyg2Z80PIkbbJdckkEBUCHWyyT/8=\r\n\r\n--batch_1e324473-c7ec-4c6c-9b47-645a57a99ba5--\r\n")
  .query(true)
  .reply(202, "--batchresponse_fbc39ce8-0efa-487a-8c73-135fff9a07fe\r\nContent-Type: application/http\r\nContent-ID: 0\r\n\r\nHTTP/1.1 202 Accepted\r\nx-ms-delete-type-permanent: true\r\nx-ms-request-id: 531d05e8-a01e-00a6-2d37-854f131e55e4\r\nx-ms-version: 2019-02-02\r\nServer: Windows-Azure-Blob/1.0\r\n\r\n--batchresponse_fbc39ce8-0efa-487a-8c73-135fff9a07fe\r\nContent-Type: application/http\r\nContent-ID: 1\r\n\r\nHTTP/1.1 202 Accepted\r\nx-ms-delete-type-permanent: true\r\nx-ms-request-id: 531d05e8-a01e-00a6-2d37-854f131e55e8\r\nx-ms-version: 2019-02-02\r\nServer: Windows-Azure-Blob/1.0\r\n\r\n--batchresponse_fbc39ce8-0efa-487a-8c73-135fff9a07fe\r\nContent-Type: application/http\r\nContent-ID: 2\r\n\r\nHTTP/1.1 202 Accepted\r\nx-ms-delete-type-permanent: true\r\nx-ms-request-id: 531d05e8-a01e-00a6-2d37-854f131e55e9\r\nx-ms-version: 2019-02-02\r\nServer: Windows-Azure-Blob/1.0\r\n\r\n--batchresponse_fbc39ce8-0efa-487a-8c73-135fff9a07fe--", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_fbc39ce8-0efa-487a-8c73-135fff9a07fe',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '531d05e8-a01e-00a6-2d37-854f13000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '3245c0f9-157c-4b13-af2c-e771f6d5b347',
  'Date',
  'Thu, 17 Oct 2019 22:07:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157135007048206827')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container157135007048206827\"><MaxResults>1</MaxResults><Blobs /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c01dcb5-001e-00cd-5537-85c8e7000000',
  'x-ms-client-request-id',
  'b1afbbc6-06c4-49e7-b4d0-6da22d25adba',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 17 Oct 2019 22:07:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157135007048206827')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed70cb70-e01e-001e-0d37-8514d5000000',
  'x-ms-client-request-id',
  '6792c2fb-f2dc-4c7a-a14f-835390c3ea58',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 17 Oct 2019 22:07:51 GMT',
  'Connection',
  'close' ]);

