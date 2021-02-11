let nock = require('nock');

module.exports.hash = "3e2f24de6bde9de338cd7b13d55531b6";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240160907124","file":"file158368240163609165"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240160907124')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'ETag',
  '"0x8D7C377E5905819"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2b6f-601e-0014-6160-f586fa000000',
  'x-ms-client-request-id',
  '11353e80-491b-4a92-ad93-88419309f58f',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240160907124/file158368240163609165')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'ETag',
  '"0x8D7C377E5A1FDA4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14400e43-401f-0021-7360-f528af000000',
  'x-ms-version',
  '2019-07-07',
  'x-ms-client-request-id',
  'f3ccbc96-eeba-48bc-a3c2-0f0779d4e0df',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem158368240160907124/file158368240163609165')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7C377E5A1FDA4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2bb3-601e-0014-2060-f586fa000000',
  'x-ms-client-request-id',
  'c243d74b-24b7-4d42-8d81-d972691ee401',
  'x-ms-version',
  '2019-07-07',
  'x-ms-creation-time',
  'Sun, 08 Mar 2020 15:46:41 GMT',
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
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem158368240160907124')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2bdf-601e-0014-4260-f586fa000000',
  'x-ms-client-request-id',
  'aef9589a-64e3-4195-b739-8d00dd3a6a3c',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);
