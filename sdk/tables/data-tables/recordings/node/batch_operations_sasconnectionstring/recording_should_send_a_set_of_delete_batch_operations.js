let nock = require('nock');

module.exports.hash = "bb6fb6ab6bcd4ba9d95528629452b831";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/Tables', {"TableName":"batchTableTestSASConnectionStringnode"})
  .query(true)
  .reply(409, {"odata.error":{"code":"TableAlreadyExists","message":{"lang":"en-US","value":"The table specified already exists.\nRequestId:0076604d-e002-0038-5a04-a4c0e6000000\nTime:2021-09-07T16:24:23.9886062Z"}}}, [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;odata=minimalmetadata;streaming=true;charset=utf-8',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0076604d-e002-0038-5a04-a4c0e6000000',
  'x-ms-client-request-id',
  '7b11c210-589e-4318-b601-fcfcb0d6adcf',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Sep 2021 16:24:23 GMT'
]);

nock('https://fakeaccount.table.core.windows.net:443', {"encodedQueryParams":true})
  .post('/$batch', "--batch_fakeId\r\ncontent-type: multipart/mixed; boundary=changeset_fakeId\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='1') HTTP/1.1\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nIf-Match: *\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='2') HTTP/1.1\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nIf-Match: *\r\n\r\n\r\n--changeset_fakeId\r\ncontent-type: application/http\r\ncontent-transfer-encoding: binary\r\n\r\nDELETE https://fakeaccount.table.core.windows.net/batchTableTestSASConnectionStringnode(PartitionKey='batchTest',RowKey='3') HTTP/1.1\r\nAccept: application/json;odata=minimalmetadata\r\nDataServiceVersion: 3.0\r\nIf-Match: *\r\n\r\n\r\n--changeset_fakeId--\r\n--batch_fakeId--\r\n")
  .query(true)
  .reply(202, "--batchresponse_80aa529a-6281-4320-8d83-a4efe9c097e9\r\nContent-Type: multipart/mixed; boundary=changesetresponse_390a4a0a-c0d2-4509-83cd-0252d37af50f\r\n\r\n--changesetresponse_390a4a0a-c0d2-4509-83cd-0252d37af50f\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_390a4a0a-c0d2-4509-83cd-0252d37af50f\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_390a4a0a-c0d2-4509-83cd-0252d37af50f\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 204 No Content\r\nX-Content-Type-Options: nosniff\r\nCache-Control: no-cache\r\nDataServiceVersion: 1.0;\r\n\r\n\r\n--changesetresponse_390a4a0a-c0d2-4509-83cd-0252d37af50f--\r\n--batchresponse_80aa529a-6281-4320-8d83-a4efe9c097e9--\r\n", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'multipart/mixed; boundary=batchresponse_80aa529a-6281-4320-8d83-a4efe9c097e9',
  'Server',
  'Windows-Azure-Table/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '00766058-e002-0038-6504-a4c0e6000000',
  'x-ms-client-request-id',
  '8a04c663-f861-4dcf-9e06-1a5d2f951931',
  'x-ms-version',
  '2019-02-02',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 07 Sep 2021 16:24:23 GMT'
]);
