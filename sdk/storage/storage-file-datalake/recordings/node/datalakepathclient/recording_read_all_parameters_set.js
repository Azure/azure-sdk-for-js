let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534383980203855","file":"file157534384094906661"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534383980203855')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:42 GMT',
  'ETag',
  '"0x8D777A0566BA84F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '708a2944-301e-0084-0389-a913b6000000',
  'x-ms-client-request-id',
  'a0bc7395-799f-4c11-8001-43da78771178',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:24:42 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534383980203855/file157534384094906661')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:24:43 GMT',
  'ETag',
  '"0x8D777A0571B50EA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29ea6a16-c01f-005d-4489-a9b59a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a5d8c13a-d17a-4ee2-9d38-932f23779b30',
  'Date',
  'Tue, 03 Dec 2019 03:24:42 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534383980203855/file157534384094906661', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '29ea6a17-c01f-005d-4589-a9b59a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8a91ad77-fbe9-4958-a1b5-68139458af72',
  'Date',
  'Tue, 03 Dec 2019 03:24:42 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534383980203855/file157534384094906661')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:24:44 GMT',
  'ETag',
  '"0x8D777A057737E48"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '29ea6a18-c01f-005d-4689-a9b59a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'ad2e9884-f1dd-492d-965b-5411bae5f85f',
  'Date',
  'Tue, 03 Dec 2019 03:24:43 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534383980203855/file157534384094906661')
  .reply(206, "H", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-0/11',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:44 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A057737E48"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5aba81e3-401e-0021-0c89-a928af000000',
  'x-ms-client-request-id',
  'ab630a55-16c5-462c-a4d9-d33b4f691258',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:24:43 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'x-ms-content-crc64',
  'MlSW/U5mnKQ=',
  'Date',
  'Tue, 03 Dec 2019 03:24:45 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534383980203855/file157534384094906661')
  .reply(206, "e", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  '4WcXl8UuFfdjOAtF6EHsMg==',
  'Content-Range',
  'bytes 1-1/11',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:44 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A057737E48"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5aba8297-401e-0021-2d89-a928af000000',
  'x-ms-client-request-id',
  '480d0129-73c7-48a3-b095-503dda7fba4b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:24:43 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:24:45 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534383980203855/file157534384094906661')
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>BothCrc64AndMd5RangeHeaderPresent</Code><Message>Both x-ms-range-get-content-crc64 header and x-ms-range-get-content-md5 header are present.\nRequestId:5aba8353-401e-0021-5789-a928af000000\nTime:2019-12-03T03:24:45.9370470Z</Message></Error>", [ 'Content-Length',
  '293',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5aba8353-401e-0021-5789-a928af000000',
  'x-ms-client-request-id',
  '4dfa4293-5db5-49f8-bea8-619153f3d4cd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'BothCrc64AndMd5RangeHeaderPresent',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:24:45 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534383980203855')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '708a3442-301e-0084-1e89-a913b6000000',
  'x-ms-client-request-id',
  'db8bf3a7-4cab-4155-9515-91127107bae6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:24:45 GMT' ]);
