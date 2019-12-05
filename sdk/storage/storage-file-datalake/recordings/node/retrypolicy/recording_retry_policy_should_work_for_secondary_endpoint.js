let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157534390223402564"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157534390223402564')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:44 GMT',
  'ETag',
  '"0x8D777A07BA23A6F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22f3e6f6-901e-0089-3c89-a9fcba000000',
  'x-ms-client-request-id',
  'e5e6cfe2-db68-4041-a50a-dac31fc964f8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:44 GMT' ]);

nock('https://fakestorageaccount-secondary.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157534390223402564')
  .query(true)
  .reply(400, {"error":{"code":"InvalidQueryParameterValue","message":"Value for one of the query parameters specified in the request URI is invalid.\nRequestId:dc0eb825-501f-001a-3089-a91f74000000\nTime:2019-12-03T03:25:46.1585939Z"}}, [ 'Content-Length',
  '221',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc0eb825-501f-001a-3089-a91f74000000',
  'Date',
  'Tue, 03 Dec 2019 03:25:45 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157534390223402564')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '22f3ea4a-901e-0089-3889-a9fcba000000',
  'x-ms-client-request-id',
  '86791005-6b28-470a-9ae2-30b57d7967bf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:45 GMT' ]);
