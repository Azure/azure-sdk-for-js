let nock = require('nock');

module.exports.hash = "25a915cd81e7b01a19aaf005f2f5744e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160715138023508164","directory":"directory160715138165203319","file":"file160715138314707006"},"newDate":{"now":"2020-12-05T06:56:23.453Z","tmr":"2020-12-05T06:56:23.455Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160715138023508164')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 05 Dec 2020 06:56:21 GMT',
  'ETag',
  '"0x8D898EADFA4C369"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'afe26227-f01e-007c-1ad3-cad8ab000000',
  'x-ms-client-request-id',
  '84f993e9-459b-429e-bd75-6e3a31beeb06',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 06:56:20 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160715138023508164/directory160715138165203319')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sat, 05 Dec 2020 06:56:23 GMT',
  'ETag',
  '"0x8D898EAE08E218B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fa1d2d1e-d01f-002f-5dd3-cac4a4000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '94fb6c92-f807-481c-a99a-3d9d7c1deb90',
  'Date',
  'Sat, 05 Dec 2020 06:56:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160715138023508164/directory160715138165203319/file160715138314707006')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sat, 05 Dec 2020 06:56:23 GMT',
  'ETag',
  '"0x8D898EAE0BC99AC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fa1d2d23-d01f-002f-61d3-cac4a4000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'b5513201-7640-445c-a3ba-c778dc266089',
  'Date',
  'Sat, 05 Dec 2020 06:56:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160715138023508164/directory160715138165203319/file160715138314707006')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sat, 05 Dec 2020 06:56:23 GMT',
  'ETag',
  '"0x8D898EAE0BC99AC"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'x-ms-acl',
  'user::rw-,group::r--,other::---',
  'x-ms-request-id',
  'fa1d2d24-d01f-002f-62d3-cac4a4000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '8b64d537-7e32-4edd-b1db-a4f88e6dd8e1',
  'Date',
  'Sat, 05 Dec 2020 06:56:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160715138023508164')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'afe26df9-f01e-007c-40d3-cad8ab000000',
  'x-ms-client-request-id',
  '3791178f-701d-4c30-a8c6-75d4d2ff5c3c',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 05 Dec 2020 06:56:24 GMT'
]);
