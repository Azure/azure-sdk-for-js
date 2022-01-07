let nock = require('nock');

module.exports.hash = "23b4f4ed6a09f16366385932b6638e7b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/deviceupdate/sdkinstance/management/devices')
  .query(true)
  .reply(200, {"value":[{"deviceId":"joseph-edgevm1","deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1","manufacturer":"fabrikam","model":"vacuum","lastAttemptedUpdateId":null,"installedUpdateId":null,"onLatestUpdate":false,"deploymentStatus":"NotStarted","groupId":"testgroup","lastDeploymentId":null,"lastInstallResult":{"updateInstallResult":{"resultCode":null,"extendedResultCode":null},"resultCode":null,"extendedResultCode":null}},{"deviceId":"nox-sdk-test-1","deviceClassId":"0919e3ae422a2bfa8c84ff905813e60351e456d1","manufacturer":"fabrikam","model":"vacuum","lastAttemptedUpdateId":null,"installedUpdateId":null,"onLatestUpdate":false,"deploymentStatus":"Succeeded","groupId":"testgroup","lastDeploymentId":null,"lastInstallResult":{"updateInstallResult":{"resultCode":700,"extendedResultCode":0,"resultDetails":""},"resultCode":700,"extendedResultCode":0,"resultDetails":""}}]}, [
  'Date',
  'Tue, 16 Nov 2021 05:07:04 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Length',
  '882',
  'traceparent',
  '00-2c7c66296d7e1647aa89a311f5c1fcc8-0ea5bbffbb86c04a-00'
]);
