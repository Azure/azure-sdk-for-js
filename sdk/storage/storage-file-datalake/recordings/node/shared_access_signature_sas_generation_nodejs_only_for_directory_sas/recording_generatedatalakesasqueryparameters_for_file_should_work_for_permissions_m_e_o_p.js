let nock = require('nock');

module.exports.hash = "39f7c5fcace29f8de1b67dc28f7ed4f6";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem160119086295008444","directory":"directory160119086329007780","file":"file160119086365704236"},"newDate":{"now":"2020-09-27T07:14:24.025Z","tmr":"2020-09-27T07:14:24.026Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119086295008444')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:23 GMT',
  'ETag',
  '"0x8D862B4F5DADB98"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3951018b-a01e-001f-6c9d-94fea4000000',
  'x-ms-client-request-id',
  'a006ad22-f730-44d0-b9c1-2a22121094ac',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 07:14:22 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119086295008444/directory160119086329007780')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:23 GMT',
  'ETag',
  '"0x8D862B4F613F1CD"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd79f91db-401f-005a-6e9d-942b47000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '52ce7a5d-fca8-4500-a2fb-29ef5dc5656d',
  'Date',
  'Sun, 27 Sep 2020 07:14:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem160119086295008444/directory160119086329007780/file160119086365704236')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:23 GMT',
  'ETag',
  '"0x8D862B4F64C2D26"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd79f91e0-401f-005a-739d-942b47000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '47de2d9a-cacd-4beb-b7d6-5361d535a1bc',
  'Date',
  'Sun, 27 Sep 2020 07:14:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem160119086295008444/directory160119086329007780/file160119086365704236')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:23 GMT',
  'ETag',
  '"0x8D862B4F64C2D26"',
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
  'd79f91e2-401f-005a-759d-942b47000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  'e2dd6f54-a0ad-426c-b0ee-c950f2ee5767',
  'Date',
  'Sun, 27 Sep 2020 07:14:23 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem160119086295008444/directory160119086329007780/file160119086365704236')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 27 Sep 2020 07:14:23 GMT',
  'ETag',
  '"0x8D862B4F64C2D26"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '0453a43a-301f-007f-389d-94823b000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '26bd1ab0-8b60-4188-bfa4-25b45030e1b4',
  'Date',
  'Sun, 27 Sep 2020 07:14:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem160119086295008444')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '395102a8-a01e-001f-499d-94fea4000000',
  'x-ms-client-request-id',
  '43c13ad8-62bd-415f-a6d8-1456e23c2c28',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 07:14:25 GMT'
]);
