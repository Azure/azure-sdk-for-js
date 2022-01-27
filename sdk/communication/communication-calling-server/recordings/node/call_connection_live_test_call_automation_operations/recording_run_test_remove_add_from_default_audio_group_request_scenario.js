let nock = require('nock');

module.exports.hash = "e1163c4247597ba532b8fc0b47fbe282";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities')
  .query(true)
  .reply(201, {"identity":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3c12-6759-2c8a-08482200bb81"}}, [
  'Content-Length',
  '101',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'MFnxV4ZLyUCU8DjHBLS65A.2.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'e20c328b-7178-4a53-bf82-81118e574e99',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07, 2021-03-31-preview1, 2021-10-31-preview, 2021-11-01',
  'X-Processing-Time',
  '53ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0m7zyYQAAAADuxhBirvHzTqL7ty2kRBmAREVMMDFFREdFMDUxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 15:39:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections', {"alternateCallerId":{"value":"+18445764430"},"targets":[{"phoneNumber":{"value":"+15551234567"}}],"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3c12-6759-2c8a-08482200bb81"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated","toneReceived"]})
  .query(true)
  .reply(201, {"callConnectionId":"ca1f1300-bd95-4504-aede-d0ed3240f0e5"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '082f6d46-d897-449a-93bb-fb17afc4278f',
  'X-Microsoft-Skype-Chain-ID',
  'bf08a578-ebee-4068-89ac-214f9aed6249',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0nLzyYQAAAABu/KwNtvIXT5tKv67EumudREVMMDFFREdFMDYwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 15:39:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/ca1f1300-bd95-4504-aede-d0ed3240f0e5/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-113a0d00ad92"}}})
  .query(true)
  .reply(202, {"operationId":"ff08e08a-01dd-4d75-967e-9bbe170b6af2","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'bf08a578-ebee-4068-89ac-214f9aed6249',
  'x-ms-client-request-id',
  '8fbfeef8-ccd0-493e-b993-4fb715d0d884',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0rrzyYQAAAAAQJktAcNTOQqS8NWxuJc7jREVMMDFFREdFMDYwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 15:39:27 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/ca1f1300-bd95-4504-aede-d0ed3240f0e5/:createAudioGroup', {"audioRoutingMode":"multicast","targets":[{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-113a0d00ad92"}}]})
  .query(true)
  .reply(201, {"audioGroupId":"541731b6-5375-4d11-b949-fb00789e2142"}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'bf08a578-ebee-4068-89ac-214f9aed6249',
  'x-ms-client-request-id',
  '556795a7-aa75-423e-9015-b4c1ab2f06f1',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0t7zyYQAAAACSBEAkzZRdSqTCDjfmNwt/REVMMDFFREdFMDYwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 15:39:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/calling/callConnections/ca1f1300-bd95-4504-aede-d0ed3240f0e5/audioGroups/541731b6-5375-4d11-b949-fb00789e2142')
  .query(true)
  .reply(200, {"audioRoutingMode":"multicast","targets":[{"rawId":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-113a0d00ad92","communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-113a0d00ad92"}}]}, [
  'Content-Length',
  '245',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'bf08a578-ebee-4068-89ac-214f9aed6249',
  'x-ms-client-request-id',
  '25cef63d-6ccd-4cb5-827d-b7f14da73945',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ubzyYQAAAAD1EL6ro3ulRrAzESQUTFfOREVMMDFFREdFMDYwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 15:39:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/ca1f1300-bd95-4504-aede-d0ed3240f0e5/participants', {"participant":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3be5-ea53-b4f1-9c3a0d00bb4e"}}})
  .query(true)
  .reply(202, {"operationId":"804480bb-57b6-49b8-9e53-2dc0485fa2e4","status":"running"}, [
  'Content-Length',
  '73',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  'bf08a578-ebee-4068-89ac-214f9aed6249',
  'x-ms-client-request-id',
  'ec2f8ce8-4f13-4db3-b9d1-59c500c75e50',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0w7zyYQAAAACyODwf4hmURZa4WGcqmtPYREVMMDFFREdFMDYwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 15:39:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/calling/callConnections/ca1f1300-bd95-4504-aede-d0ed3240f0e5/audioGroups/541731b6-5375-4d11-b949-fb00789e2142', {"targets":[{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3be5-ea53-b4f1-9c3a0d00bb4e"}}]})
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'bf08a578-ebee-4068-89ac-214f9aed6249',
  'x-ms-client-request-id',
  'fcf6e085-de89-4bcb-908a-ec4594c0c203',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0z7zyYQAAAADOX1spltP4Tp2dwO1NUVOdREVMMDFFREdFMDYwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 15:39:59 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/calling/callConnections/ca1f1300-bd95-4504-aede-d0ed3240f0e5/audioGroups/541731b6-5375-4d11-b949-fb00789e2142')
  .query(true)
  .reply(200, "", [
  'X-Microsoft-Skype-Chain-ID',
  'bf08a578-ebee-4068-89ac-214f9aed6249',
  'x-ms-client-request-id',
  'b2317947-2705-4b75-bd5f-6da246be6e11',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0z7zyYQAAAAA6LWwMZP9hQLhNSU0Pv9V2REVMMDFFREdFMDYwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 15:40:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/ca1f1300-bd95-4504-aede-d0ed3240f0e5/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3adc-c3b2-290c-113a0d00ad92"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'bf08a578-ebee-4068-89ac-214f9aed6249',
  'x-ms-client-request-id',
  'ae4f146b-d421-4bfd-b6c0-da84e0ef4340',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '007zyYQAAAADNzNQ6/PMdRbtDy19LY43nREVMMDFFREdFMDYwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 15:40:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/ca1f1300-bd95-4504-aede-d0ed3240f0e5/participants:remove', {"identifier":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_0000000f-3be5-ea53-b4f1-9c3a0d00bb4e"}}})
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'bf08a578-ebee-4068-89ac-214f9aed6249',
  'x-ms-client-request-id',
  '4a0b0b3f-d674-44e5-bf96-fa862d07d42f',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '007zyYQAAAAAKAYS+cP9cT7qCQ0HdtH1oREVMMDFFREdFMDYwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 15:40:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/ca1f1300-bd95-4504-aede-d0ed3240f0e5/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  'bf08a578-ebee-4068-89ac-214f9aed6249',
  'x-ms-client-request-id',
  'e3820231-5212-4a70-b57a-437f3ab67c68',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '017zyYQAAAAD/HdDECSmHR6XnPa/R6QBmREVMMDFFREdFMDYwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 27 Jan 2022 15:40:07 GMT',
  'Content-Length',
  '0'
]);
