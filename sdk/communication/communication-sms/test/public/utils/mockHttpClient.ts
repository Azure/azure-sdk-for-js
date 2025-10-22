// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

export class MockHttpClient implements HttpClient {
  constructor(private _phoneNumber: string) {}

  async sendRequest(httpRequest: PipelineRequest): Promise<PipelineResponse> {
    const url = httpRequest.url;
    const method = httpRequest.method;

    // SMS Sending endpoint
    if (url.includes("/sms") && method === "POST" && !url.includes("optouts")) {
      return {
        status: 202,
        headers: createHttpHeaders(),
        request: httpRequest,
        bodyAsText: JSON.stringify({
          value: [
            {
              to: this._phoneNumber,
              messageId: "test-message-id-123",
              httpStatusCode: 202,
              errorMessage: null,
              repeatabilityResult: "accepted",
              successful: true,
            },
          ],
        }),
      };
    }

    // Delivery Reports endpoint
    if (url.includes("/deliveryReports/") && method === "GET") {
      const messageId = url.split("/deliveryReports/")[1].split("?")[0];
      
      if (messageId === "non-existent-message-id") {
        return {
          status: 200,
          headers: createHttpHeaders(),
          request: httpRequest,
          bodyAsText: JSON.stringify({
            messageId: messageId,
            from: "",
            to: "",
            deliveryStatus: "Unknown",
            deliveryStatusDetails: "Delivery report not found for the specified message ID",
            httpStatusCode: 404,
            errorMessage: "Delivery report not found for the specified message ID",
          }),
        };
      }

      return {
        status: 200,
        headers: createHttpHeaders(),
        request: httpRequest,
        bodyAsText: JSON.stringify({
          messageId: messageId,
          from: "+14255550123",
          to: this._phoneNumber,
          deliveryStatus: "Delivered",
          deliveryStatusDetails: "Message delivered successfully",
          deliveryAttempts: [
            {
              timestamp: new Date().toISOString(),
              segmentsSucceeded: 1,
              segmentsFailed: 0,
            },
          ],
          receivedTimestamp: new Date().toISOString(),
          tag: "test-tag",
          httpStatusCode: 200,
          errorMessage: null,
        }),
      };
    }

    // OptOuts Check endpoint
    if (url.includes("/sms/optouts:check") && method === "POST") {
      return {
        status: 200,
        headers: createHttpHeaders(),
        request: httpRequest,
        bodyAsText: JSON.stringify({
          value: [
            {
              to: this._phoneNumber,
              isOptedOut: false,
              httpStatusCode: 200,
              errorMessage: null,
            },
          ],
        }),
      };
    }

    // OptOuts Add endpoint
    if (url.includes("/sms/optouts:add") && method === "POST") {
      return {
        status: 200,
        headers: createHttpHeaders(),
        request: httpRequest,
        bodyAsText: JSON.stringify({
          value: [
            {
              to: this._phoneNumber,
              httpStatusCode: 200,
              errorMessage: null,
            },
          ],
        }),
      };
    }

    // OptOuts Remove endpoint
    if (url.includes("/sms/optouts:remove") && method === "POST") {
      return {
        status: 200,
        headers: createHttpHeaders(),
        request: httpRequest,
        bodyAsText: JSON.stringify({
          value: [
            {
              to: this._phoneNumber,
              httpStatusCode: 200,
              errorMessage: null,
            },
          ],
        }),
      };
    }

    // Default fallback
    return {
      status: 404,
      headers: createHttpHeaders(),
      request: httpRequest,
      bodyAsText: JSON.stringify({
        error: "Endpoint not mocked",
      }),
    };
  }
}
