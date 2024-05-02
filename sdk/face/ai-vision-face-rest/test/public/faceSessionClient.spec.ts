// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { readFileSync } from 'fs';
import { randomUUID } from 'crypto';
import { createRecorder, createClient } from './utils/recordedClient.js';
import { assert, beforeEach, afterEach, it, describe } from 'vitest';
import { Recorder, isLiveMode, isPlaybackMode } from '@azure-tools/test-recorder';

import {
  CreateLivenessSession200Response,
  CreateLivenessWithVerifySession200Response,
  CreateLivenessWithVerifySessionContentParametersPartDescriptor,
  CreateLivenessWithVerifySessionContentVerifyImagePartDescriptor,
  CreateLivenessWithVerifySessionWithVerifyImage200Response,
  DeleteLivenessSession200Response,
  DeleteLivenessWithVerifySession200Response,
  FaceClient,
  GetLivenessSessionAuditEntries200Response,
  GetLivenessSessionResult200Response,
  GetLivenessSessionResultDefaultResponse,
  GetLivenessSessions200Response,
  GetLivenessWithVerifySessionAuditEntries200Response,
  GetLivenessWithVerifySessionResult200Response,
  GetLivenessWithVerifySessionResultDefaultResponse,
  GetLivenessWithVerifySessions200Response,
} from '../../src/index.js';

describe('Session', () => {
  const livenessSessionAuditEntryOutputs = [
    {
      "id": 2,
      "sessionId": "7adb4c49-667f-4034-a7f5-680534094d86",
      "requestId": "4f323b41-fd5f-442f-bcc8-543eabd98c59",
      "receivedDateTime": "2024-04-18T07:46:00.6924401+00:00",
      "request": {
        "url": "/face/v1.1-preview.1/detectLiveness/singleModal",
        "method": "POST",
        "contentLength": 360044,
        "contentType": "multipart/form-data; boundary=--------------------------582969306951955997192689",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0"
      },
      "response": {
        "body": {
          "livenessDecision": "spoofface",
          "target": {
            "faceRectangle": {
              "top": 782,
              "left": 260,
              "width": 858,
              "height": 984
            },
            "fileName": "video.webp",
            "timeOffsetWithinFile": 0,
            "imageType": "Color"
          },
          "modelVersionUsed": "2022-10-15-preview.04"
        },
        "statusCode": 200,
        "latencyInMilliseconds": 699
      },
      "digest": "F929579483D4EF6A67725674072EA75AD87283A969FB8D93B8F1C63A60479A62"
    },
    {
      "id": 1,
      "sessionId": "7adb4c49-667f-4034-a7f5-680534094d86",
      "requestId": "64bd9bc4-ee35-4f05-87e2-b7297fc95e01",
      "receivedDateTime": "2024-04-18T07:45:48.7983472+00:00",
      "request": {
        "url": "/face/v1.1-preview.1/detectLiveness/singleModal",
        "method": "POST",
        "contentLength": 360044,
        "contentType": "multipart/form-data; boundary=--------------------------582969306951955997192689",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0"
      },
      "response": {
        "body": {
          "livenessDecision": "spoofface",
          "target": {
            "faceRectangle": {
              "top": 782,
              "left": 260,
              "width": 858,
              "height": 984
            },
            "fileName": "video.webp",
            "timeOffsetWithinFile": 0,
            "imageType": "Color"
          },
          "modelVersionUsed": "2022-10-15-preview.04"
        },
        "statusCode": 200,
        "latencyInMilliseconds": 688
      },
      "digest": "E11BF3733D1B0530F0BD509327E6135DDF2303BBBFFFC02EACDE2C42BCBA3212"
    }
  ];

  let recorder: Recorder;
  let client: FaceClient;

  beforeEach(async context => {
    recorder = await createRecorder(context);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  it('TestCreateSession', async () => {
    const deviceCorrelationId = recorder.variable('deviceCorrelationId', randomUUID());

    const createLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions').post({
      body: {
        livenessOperationMode: 'Passive',
        deviceCorrelationId,
      },
    }) as CreateLivenessSession200Response;
    assert.equal(createLivenessSessionResponse.status, '200');
    assert.isNotEmpty(createLivenessSessionResponse.body.sessionId);
    assert.isNotEmpty(createLivenessSessionResponse.body.authToken);

    const { sessionId } = createLivenessSessionResponse.body;

    const getLivenessSessionResultResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).get() as GetLivenessSessionResult200Response;
    assert.equal(getLivenessSessionResultResponse.status, '200');
    assert.equal(getLivenessSessionResultResponse.body.deviceCorrelationId, deviceCorrelationId);

    const deleteLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).delete() as DeleteLivenessSession200Response;
    assert.equal(deleteLivenessSessionResponse.status, '200');
  });

  it('TestListSessions', async () => {
    const createSession = async () => {
      const deviceCorrelationId = recorder.variable('deviceCorrelationId', randomUUID());
      const createLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions').post({
        body: {
          livenessOperationMode: 'Passive',
          deviceCorrelationId,
        },
      }) as CreateLivenessSession200Response;
      assert.equal(createLivenessSessionResponse.status, '200');
      return [createLivenessSessionResponse.body.sessionId, deviceCorrelationId];
    };

    const sessions = Object.fromEntries(await Promise.all([createSession(), createSession()]));
    console.log(sessions);

    const getLivenessSessionsResponse = await client.path('/detectLiveness/singleModal/sessions').get() as GetLivenessSessions200Response;
    assert.equal(getLivenessSessionsResponse.status, '200');
    assert.equal(getLivenessSessionsResponse.body.length, 2);
    for (const livenessSessionItemOutput of getLivenessSessionsResponse.body) {
      assert.isNotEmpty(livenessSessionItemOutput.createdDateTime);
      assert.isAtLeast(livenessSessionItemOutput.authTokenTimeToLiveInSeconds ?? 0, 60);
      assert.isAtMost(livenessSessionItemOutput.authTokenTimeToLiveInSeconds ?? 0, 86400);
      assert.isTrue(livenessSessionItemOutput.id in sessions);
      assert.equal(livenessSessionItemOutput.deviceCorrelationId, sessions[livenessSessionItemOutput.id]);
    }

    await Promise.all(Object.keys(sessions).map(async sessionId => {
      const deleteLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).delete() as DeleteLivenessSession200Response;
      assert.equal(deleteLivenessSessionResponse.status, '200');
    }));
  });

  it.runIf(isPlaybackMode())('TestGetSessionResult', async () => {
    const deviceCorrelationId = recorder.variable('deviceCorrelationId');
    const sessionId = recorder.variable('sessionId');

    const getLivenessSessionResultResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).get() as GetLivenessSessionResult200Response;
    assert.equal(getLivenessSessionResultResponse.status, '200');

    const livenessSessionOutput = getLivenessSessionResultResponse.body;
    assert.equal(livenessSessionOutput.deviceCorrelationId, deviceCorrelationId);
    assert.equal(livenessSessionOutput.id, sessionId);
    assert.equal(livenessSessionOutput.status, 'ResultAvailable');
    assert.equal(livenessSessionOutput.result?.sessionId, sessionId);
    assert.deepEqual(livenessSessionOutput.result as any, livenessSessionAuditEntryOutputs[0]);
  });

  it.runIf(isPlaybackMode())('TestGetSessionAuditEntries', async () => {
    const sessionId = recorder.variable('sessionId');

    const getLivenessSessionAuditEntriesResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}/audit', sessionId).get() as GetLivenessSessionAuditEntries200Response;
    assert.equal(getLivenessSessionAuditEntriesResponse.status, '200');
    assert.isTrue(getLivenessSessionAuditEntriesResponse.body.every(entry => entry.sessionId === sessionId));
    assert.deepEqual(getLivenessSessionAuditEntriesResponse.body as any, livenessSessionAuditEntryOutputs);
  });

  it('TestDeleteSession', async () => {
    const createLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions').post({
      body: {
        livenessOperationMode: 'Passive',
        deviceCorrelationId: recorder.variable('deviceCorrelationId', randomUUID()),
      },
    }) as CreateLivenessSession200Response;
    assert.equal(createLivenessSessionResponse.status, '200');

    const { sessionId } = createLivenessSessionResponse.body;

    const deleteLivenessSessionResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).delete() as DeleteLivenessSession200Response;
    assert.equal(deleteLivenessSessionResponse.status, '200');

    const getLivenessSessionResultResponse = await client.path('/detectLiveness/singleModal/sessions/{sessionId}', sessionId).get() as GetLivenessSessionResultDefaultResponse;
    assert.equal(getLivenessSessionResultResponse.status, '404');
    assert.equal(getLivenessSessionResultResponse.body.error.code, 'SessionNotFound');
  });
});

describe('SessionWithVerify', () => {
  const livenessSessionAuditEntryOutputs = [
    {
      "id": 2,
      "sessionId": "4f418924-6092-4332-a24a-30790092b0e6",
      "requestId": "46d94c1d-f519-4702-a416-0bc0a04c5218",
      "receivedDateTime": "2024-04-18T08:48:53.6193575+00:00",
      "request": {
        "url": "/face/v1.1-preview.1/detectLivenessWithVerify/singleModal",
        "method": "POST",
        "contentLength": 1358601,
        "contentType": "multipart/form-data; boundary=--------------------------154024349300168487268618",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0"
      },
      "response": {
        "body": {
          "livenessDecision": "spoofface",
          "target": {
            "faceRectangle": {
              "top": 782,
              "left": 260,
              "width": 858,
              "height": 984
            },
            "fileName": "video.webp",
            "timeOffsetWithinFile": 0,
            "imageType": "Color"
          },
          "modelVersionUsed": "2022-10-15-preview.04",
          "verifyResult": {
            "verifyImage": {
              "faceRectangle": {
                "top": 302,
                "left": 93,
                "width": 601,
                "height": 681
              },
              "qualityForRecognition": "high"
            },
            "matchConfidence": 0.99736166,
            "isIdentical": true
          }
        },
        "statusCode": 200,
        "latencyInMilliseconds": 1425
      },
      "digest": "AF7AF4C6B49861F330104A87EAC1D7EADA5AA2143435E80AEA1F93E58B07CF7A"
    },
    {
      "id": 1,
      "sessionId": "4f418924-6092-4332-a24a-30790092b0e6",
      "requestId": "291147d4-ad7d-45ea-ba67-a22d959f528a",
      "receivedDateTime": "2024-04-18T08:48:38.4940472+00:00",
      "request": {
        "url": "/face/v1.1-preview.1/detectLivenessWithVerify/singleModal",
        "method": "POST",
        "contentLength": 1358601,
        "contentType": "multipart/form-data; boundary=--------------------------154024349300168487268618",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0"
      },
      "response": {
        "body": {
          "livenessDecision": "spoofface",
          "target": {
            "faceRectangle": {
              "top": 782,
              "left": 260,
              "width": 858,
              "height": 984
            },
            "fileName": "video.webp",
            "timeOffsetWithinFile": 0,
            "imageType": "Color"
          },
          "modelVersionUsed": "2022-10-15-preview.04",
          "verifyResult": {
            "verifyImage": {
            "faceRectangle": {
                "top": 302,
                "left": 93,
                "width": 601,
                "height": 681
              },
              "qualityForRecognition": "high"
            },
            "matchConfidence": 0.99736166,
            "isIdentical": true
          }
        },
        "statusCode": 200,
        "latencyInMilliseconds": 889
      },
      "digest": "AE222AEDB3453E14F1EB746CC0EAFF2DA0D31444771B50C5EF3BD138903BE1A7"
    }
  ];
  let recorder: Recorder;
  let client: FaceClient;

  beforeEach(async context => {
    recorder = await createRecorder(context);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    if (recorder?.recordingId) {
      await recorder.stop();
    }
  });

  it.skip('TestDeleteAllVerifySessions', async () => {
    const getLivenessSessionsResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').get() as GetLivenessWithVerifySessions200Response;
    assert.equal(getLivenessSessionsResponse.status, '200');
    console.log(`Number of sessions: ${getLivenessSessionsResponse.body.length}`);
    const deleteLivenessSessionResponses = await Promise.all(getLivenessSessionsResponse.body.map(livenessSessionItemOutput => client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', livenessSessionItemOutput.id).delete()));
    assert.isTrue(deleteLivenessSessionResponses.every(response => response.status === '200'));
  });

  it('TestCreateVerifySession', async () => {
    const deviceCorrelationId = recorder.variable('deviceCorrelationId', randomUUID());
    const createLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').post({
      body: {
        livenessOperationMode: 'Passive',
        deviceCorrelationId,
      },
    }) as CreateLivenessWithVerifySession200Response;
    assert.equal(createLivenessSessionResponse.status, '200');
    assert.isNotEmpty(createLivenessSessionResponse.body.sessionId);
    assert.isNotEmpty(createLivenessSessionResponse.body.authToken);

    const { sessionId } = createLivenessSessionResponse.body;

    const getLivenessSessionResultResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get() as GetLivenessWithVerifySessionResult200Response;
    assert.equal(getLivenessSessionResultResponse.status, '200');
    assert.equal(getLivenessSessionResultResponse.body.deviceCorrelationId, deviceCorrelationId);

    const deleteLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).delete() as DeleteLivenessWithVerifySession200Response;
    assert.equal(deleteLivenessSessionResponse.status, '200');
  });

  it.runIf(isLiveMode())('TestCreateVerifySessionWithImage', async () => {
    const deviceCorrelationId = recorder.variable('deviceCorrelationId', randomUUID());
    const createLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').post({
      contentType: 'multipart/form-data',
      body: [
        new CreateLivenessWithVerifySessionContentVerifyImagePartDescriptor({
            name: 'VerifyImage',
            body: readFileSync('samples-dev/data/detection1.jpg'),
        }),
        new CreateLivenessWithVerifySessionContentParametersPartDescriptor({
            name: 'Parameters',
            body: {
                livenessOperationMode: 'Passive',
                sendResultsToClient: false,
                authTokenTimeToLiveInSeconds: 60,
                deviceCorrelationId: deviceCorrelationId,
            },
        }),
      ],
    }) as CreateLivenessWithVerifySessionWithVerifyImage200Response;
    assert.equal(createLivenessSessionResponse.status, '200');
    assert.isNotEmpty(createLivenessSessionResponse.body.sessionId);
    assert.isNotEmpty(createLivenessSessionResponse.body.authToken);
    assert.isNotEmpty(createLivenessSessionResponse.body.verifyImage?.faceRectangle);
    assert.isNotEmpty(createLivenessSessionResponse.body.verifyImage?.qualityForRecognition);

    const { sessionId } = createLivenessSessionResponse.body;

    const getLivenessSessionResultResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get() as GetLivenessWithVerifySessionResult200Response;
    assert.equal(getLivenessSessionResultResponse.status, '200');
    assert.equal(getLivenessSessionResultResponse.body.deviceCorrelationId, deviceCorrelationId);

    const deleteLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).delete() as DeleteLivenessWithVerifySession200Response;
    assert.equal(deleteLivenessSessionResponse.status, '200');
  });

  it('TestListVerifySessions', async () => {
    const createSession = async () => {
      const deviceCorrelationId = recorder.variable('deviceCorrelationId', randomUUID());
      const createLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').post({
        body: {
          livenessOperationMode: 'Passive',
          deviceCorrelationId,
        },
      }) as CreateLivenessWithVerifySession200Response;
      assert.equal(createLivenessSessionResponse.status, '200');
      return [createLivenessSessionResponse.body.sessionId, deviceCorrelationId];
    };

    const sessions = Object.fromEntries(await Promise.all([createSession(), createSession()]));
    console.log(sessions);

    const getLivenessSessionsResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').get() as GetLivenessWithVerifySessions200Response;
    assert.equal(getLivenessSessionsResponse.status, '200');
    assert.equal(getLivenessSessionsResponse.body.length, 2);
    for (const livenessSessionItemOutput of getLivenessSessionsResponse.body) {
      assert.isNotEmpty(livenessSessionItemOutput.createdDateTime);
      assert.isAtLeast(livenessSessionItemOutput.authTokenTimeToLiveInSeconds ?? 0, 60);
      assert.isAtMost(livenessSessionItemOutput.authTokenTimeToLiveInSeconds ?? 0, 86400);
      assert.isTrue(livenessSessionItemOutput.id in sessions);
      assert.equal(livenessSessionItemOutput.deviceCorrelationId, sessions[livenessSessionItemOutput.id]);
    }

    await Promise.all(Object.keys(sessions).map(async sessionId => {
      const deleteLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).delete() as DeleteLivenessWithVerifySession200Response;
      assert.equal(deleteLivenessSessionResponse.status, '200');
    }));
  });

  it.runIf(isPlaybackMode())('TestGetVerifySessionResult', async () => {
    const deviceCorrelationId = recorder.variable('deviceCorrelationId');
    const sessionId = recorder.variable('sessionId');

    const getLivenessSessionResultResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get() as GetLivenessWithVerifySessionResult200Response;
    assert.equal(getLivenessSessionResultResponse.status, '200');

    const livenessSessionOutput = getLivenessSessionResultResponse.body;
    assert.equal(livenessSessionOutput.deviceCorrelationId, deviceCorrelationId);
    assert.equal(livenessSessionOutput.id, sessionId);
    assert.equal(livenessSessionOutput.status, 'ResultAvailable');
    assert.equal(livenessSessionOutput.result?.sessionId, sessionId);
    assert.deepEqual(livenessSessionOutput.result as any, livenessSessionAuditEntryOutputs[0]);
  });

  it.runIf(isPlaybackMode())('TestGetVerifySessionAuditEntries', async () => {
    const sessionId = recorder.variable('sessionId');

    const getLivenessSessionAuditEntriesResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}/audit', sessionId).get() as GetLivenessWithVerifySessionAuditEntries200Response;
    assert.equal(getLivenessSessionAuditEntriesResponse.status, '200');
    assert.isTrue(getLivenessSessionAuditEntriesResponse.body.every(entry => entry.sessionId === sessionId));
    assert.deepEqual(getLivenessSessionAuditEntriesResponse.body as any, livenessSessionAuditEntryOutputs);
  });

  it('TestDeleteVerifySession', async () => {
    const createLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions').post({
      body: {
        livenessOperationMode: 'Passive',
        deviceCorrelationId: recorder.variable('deviceCorrelationId', randomUUID()),
      },
    }) as CreateLivenessWithVerifySession200Response;
    assert.equal(createLivenessSessionResponse.status, '200');

    const { sessionId } = createLivenessSessionResponse.body;

    const deleteLivenessSessionResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).delete() as DeleteLivenessWithVerifySession200Response;
    assert.equal(deleteLivenessSessionResponse.status, '200');

    const getLivenessSessionResultResponse = await client.path('/detectLivenessWithVerify/singleModal/sessions/{sessionId}', sessionId).get() as GetLivenessWithVerifySessionResultDefaultResponse;
    assert.equal(getLivenessSessionResultResponse.status, '404');
    assert.equal(getLivenessSessionResultResponse.body.error.code, 'SessionNotFound');
  });
});
