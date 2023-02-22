let nock = require('nock');

module.exports.hash = "021f58de981f678f192771b2377e35cd";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167706825308407464","file":"file167706825372902039","dirname":"dirname167706825455802686","subdirname":"subdirname167706825468100912","subdirname1":"subdirname1167706825491401528"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167706825308407464')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 12:17:33 GMT',
  'ETag',
  '"0x8DB14CEC6F045A1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '779dbff1-c01e-004f-2ab7-468855000000',
  'x-ms-client-request-id',
  '18e6f84a-eda4-4a93-bb9f-08e4a0083429',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 12:17:33 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167706825308407464/file167706825372902039')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 12:17:34 GMT',
  'ETag',
  '"0x8DB14CEC7529500"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '8716d60f-201f-0025-02b7-46507d000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'ee4934ef-3581-4e3e-a6b9-d0d6e8c754d2',
  'Date',
  'Wed, 22 Feb 2023 12:17:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167706825308407464/file167706825372902039', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '8716d618-201f-0025-0bb7-46507d000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'bb01e40b-ad58-4ade-9946-4d7274c334a8',
  'Date',
  'Wed, 22 Feb 2023 12:17:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167706825308407464/file167706825372902039')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 12:17:34 GMT',
  'ETag',
  '"0x8DB14CEC7772745"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '8716d621-201f-0025-14b7-46507d000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'e1b9b000-997c-4ef0-a482-94a0eaf6ca13',
  'Date',
  'Wed, 22 Feb 2023 12:17:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167706825308407464/dirname167706825455802686')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 12:17:34 GMT',
  'ETag',
  '"0x8DB14CEC788A6D5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '8716d62a-201f-0025-1db7-46507d000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '7b545463-94cf-4600-b224-ee494256f715',
  'Date',
  'Wed, 22 Feb 2023 12:17:33 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167706825308407464/dirname167706825455802686/subdirname167706825468100912')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 12:17:34 GMT',
  'ETag',
  '"0x8DB14CEC79BF486"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '8716d634-201f-0025-27b7-46507d000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'cc2150fb-9a66-403f-81f6-e5270905f42d',
  'Date',
  'Wed, 22 Feb 2023 12:17:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem167706825308407464')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133215418547762310","etag":"0x8DB14CEC79BF486","expiryTime":"0","group":"$superuser","isDirectory":"true","lastModified":"Wed, 22 Feb 2023 12:17:34 GMT","name":"dirname167706825455802686/subdirname167706825468100912","owner":"$superuser","permissions":"rwxr-x---"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8716d63c-201f-0025-2eb7-46507d000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '1d97d3f1-d8bb-42d7-9f51-50dbf0174a8f',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 12:17:34 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167706825308407464/subdirname1167706825491401528')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 12:17:35 GMT',
  'ETag',
  '"0x8DB14CEC7BF2D26"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '8716d641-201f-0025-33b7-46507d000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '5d0c46db-0b93-4adc-95db-c8e88b605c95',
  'Date',
  'Wed, 22 Feb 2023 12:17:34 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem167706825308407464')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133215418546497237","etag":"0x8DB14CEC788A6D5","expiryTime":"0","group":"$superuser","isDirectory":"true","lastModified":"Wed, 22 Feb 2023 12:17:34 GMT","name":"dirname167706825455802686","owner":"$superuser","permissions":"rwxr-x---"},{"contentLength":"11","creationTime":"133215418542953728","etag":"0x8DB14CEC7772745","expiryTime":"0","group":"$superuser","lastModified":"Wed, 22 Feb 2023 12:17:34 GMT","name":"file167706825372902039","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133215418550070566","etag":"0x8DB14CEC7BF2D26","expiryTime":"0","group":"$superuser","isDirectory":"true","lastModified":"Wed, 22 Feb 2023 12:17:35 GMT","name":"subdirname1167706825491401528","owner":"$superuser","permissions":"rwxr-x---"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8716d649-201f-0025-3bb7-46507d000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '758bc941-edeb-4762-b14c-c611daf57b56',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 12:17:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167706825308407464')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '779dc125-c01e-004f-34b7-468855000000',
  'x-ms-client-request-id',
  'c92f3c3e-5338-480f-9018-3f771a5dea01',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 12:17:35 GMT'
]);
