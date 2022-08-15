let nock = require('nock');

module.exports.hash = "e790f348c6f11540c7ba1ea8800d6889";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165940415018601355"},"newDate":{"tmr":"2022-08-02T01:35:50.186Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165940415018601355')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:50 GMT',
  'ETag',
  '"0x8DA7427550FC6D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326e994-601e-0034-0410-a6cac9000000',
  'x-ms-client-request-id',
  'cd283f71-b4cc-4129-96a9-0c98d594d446',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 02 Aug 2022 01:35:50 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem165940415018601355')
  .query(true)
  .reply(200, {"paths":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c70b0ee-601f-000b-5110-a6026a000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '4cb83d98-6c0e-400e-9987-850f83de9238',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 02 Aug 2022 01:35:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165940415018601355')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326e9b7-601e-0034-2010-a6cac9000000',
  'x-ms-client-request-id',
  '81dfea65-4ae9-4b63-8b63-b77d5dd76e8f',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 02 Aug 2022 01:35:50 GMT'
]);
