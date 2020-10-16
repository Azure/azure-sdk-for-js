let nock = require('nock');

module.exports.hash = "e78a610b2e9f5da5139546e4cecffda6";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160257624536405504","directory":"directory160257624730204552","file":"file160257624860209355"},"newDate":{"now":"2020-10-13T08:04:08.916Z","tmr":"2020-10-13T08:04:08.918Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160257624536405504')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 13 Oct 2020 08:04:06 GMT',
  'ETag',
  '"0x8D86F4E8EBF8128"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5d6ceaf0-c01e-007b-6f37-a10f3c000000',
  'x-ms-client-request-id',
  'e981c8da-e1a7-489c-a559-94239299b0c3',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 08:04:06 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160257624536405504/directory160257624730204552')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 08:04:08 GMT',
  'ETag',
  '"0x8D86F4E8FDCE8BB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '957aa5e5-701f-0033-0437-a1120b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '30ad1f67-30ab-4cd8-9fda-28a5a88b859f',
  'Date',
  'Tue, 13 Oct 2020 08:04:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160257624536405504/directory160257624730204552/file160257624860209355')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 08:04:08 GMT',
  'ETag',
  '"0x8D86F4E900C8E68"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '957aa5e6-701f-0033-0537-a1120b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '533138f5-062d-4556-aa89-af55a6042044',
  'Date',
  'Tue, 13 Oct 2020 08:04:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160257624536405504/directory160257624730204552/file160257624860209355')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 08:04:08 GMT',
  'ETag',
  '"0x8D86F4E900C8E68"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '957aa5e7-701f-0033-0637-a1120b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '93524792-7c74-4e95-80d1-e8c28e7783f2',
  'Date',
  'Tue, 13 Oct 2020 08:04:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160257624536405504/directory160257624730204552/file160257624860209355')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 08:04:08 GMT',
  'ETag',
  '"0x8D86F4E900C8E68"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  'b77d5205-ddb5-42e1-80ee-26c74a5e9333',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'x-ms-acl',
  'user::rw-,group::r--,other::---',
  'x-ms-request-id',
  '957aa5e8-701f-0033-0737-a1120b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '78e61c93-eb93-4fad-b450-059e7d565024',
  'Date',
  'Tue, 13 Oct 2020 08:04:08 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160257624536405504/directory160257624730204552/file160257624860209355')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 13 Oct 2020 08:04:08 GMT',
  'ETag',
  '"0x8D86F4E900C8E68"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '51bd62b8-d01f-0077-0e37-a19834000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'cd263711-b23b-4770-9e70-514b27efe9ee',
  'Date',
  'Tue, 13 Oct 2020 08:04:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160257624536405504')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5d6cec8b-c01e-007b-1b37-a10f3c000000',
  'x-ms-client-request-id',
  '13d1f3c8-cf41-463e-80ca-9176150ecf78',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 13 Oct 2020 08:04:10 GMT'
]);
