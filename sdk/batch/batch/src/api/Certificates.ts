// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CertificateState,
  DeleteCertificateError,
  CertificateFormat,
  CertificateListResult,
  Certificate,
} from "./models.js";
import { BatchServiceClient as Client, isUnexpected } from "../rest/index.js";

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface CertificatesaddCertificateOptions
  extends RequestParametersCommon {
  /**
   * The X.509 thumbprint of the Certificate. This is a sequence of up to 40 hex
   * digits.
   */
  thumbprint?: string;
  /** The algorithm used to derive the thumbprint. */
  thumbprintAlgorithm?: string;
  /** The URL of the Certificate. */
  url?: string;
  /** The state of the Certificate. */
  state?: CertificateState;
  /** The time at which the Certificate entered its current state. */
  stateTransitionTime?: Date;
  /** This property is not set if the Certificate is in its initial active state. */
  previousState?: CertificateState;
  /** This property is not set if the Certificate is in its initial Active state. */
  previousStateTransitionTime?: Date;
  /** The public part of the Certificate as a base-64 encoded .cer file. */
  publicData?: string;
  /** This property is set only if the Certificate is in the DeleteFailed state. */
  deleteCertificateError?: DeleteCertificateError;
  /** The base64-encoded contents of the Certificate. The maximum size is 10KB. */
  data?: string;
  /** The format of the Certificate data. */
  certificateFormat?: CertificateFormat;
  /** This must be omitted if the Certificate format is cer. */
  password?: string;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /** Body parameter Content-Type. Known values are: application/json. */
  content_type?: string;
}

/** Adds a Certificate to the specified Account. */
export async function addCertificate(
  context: Client,
  options: CertificatesaddCertificateOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context.path("/certificates").post({
    headers: {
      ...(options.clientRequestId && {
        "client-request-id": options.clientRequestId,
      }),
      ...(options.returnClientRequestId && {
        "return-client-request-id": options.returnClientRequestId,
      }),
      ...(options.ocpDate && { "ocp-date": options.ocpDate }),
      ...(options.content_type && { "Content-Type": options.content_type }),
      ...options.requestOptions?.customHeaders,
    },
    queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
    body: {
      ...(options.thumbprint && { thumbprint: options.thumbprint }),
      ...(options.thumbprintAlgorithm && {
        thumbprintAlgorithm: options.thumbprintAlgorithm,
      }),
      ...(options.data && { data: options.data }),
      ...(options.certificateFormat && {
        certificateFormat: options.certificateFormat,
      }),
      ...(options.password && { password: options.password }),
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface CertificateslistCertificatesOptions
  extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-certificates.
   */
  $filter?: string;
  /** An OData $select clause. */
  $select?: string;
}

/** Lists all of the Certificates that have been added to the specified Account. */
export async function listCertificates(
  context: Client,
  options: CertificateslistCertificatesOptions = { requestOptions: {} }
): Promise<CertificateListResult> {
  const result = await context.path("/certificates").get({
    headers: {
      ...(options.ocpDate && { "ocp-date": options.ocpDate }),
      ...(options.clientRequestId && {
        "client-request-id": options.clientRequestId,
      }),
      ...(options.returnClientRequestId && {
        "return-client-request-id": options.returnClientRequestId,
      }),
      Accept: "application/json",
      ...options.requestOptions?.customHeaders,
    },
    queryParameters: {
      ...(options.maxresults && { maxresults: options.maxresults }),
      ...(options.timeOut && { timeOut: options.timeOut }),
      ...(options.$filter && { $filter: options.$filter }),
      ...(options.$select && { $select: options.$select }),
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body["value"] ?? []).map((p) => ({
      thumbprint: p["thumbprint"],
      thumbprintAlgorithm: p["thumbprintAlgorithm"],
      url: p["url"],
      state: p["state"],
      stateTransitionTime: new Date(p["stateTransitionTime"] ?? ""),
      previousState: p["previousState"],
      previousStateTransitionTime: new Date(
        p["previousStateTransitionTime"] ?? ""
      ),
      publicData: p["publicData"],
      deleteCertificateError: !p.deleteCertificateError
        ? undefined
        : {
            code: p.deleteCertificateError?.["code"],
            message: p.deleteCertificateError?.["message"],
            values: (p.deleteCertificateError?.["values"] ?? []).map((p) => ({
              name: p["name"],
              value: p["value"],
            })),
          },
      data: p["data"],
      certificateFormat: p["certificateFormat"],
      password: p["password"],
    })),
    nextLink: result.body["odata.nextLink"],
  };
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface CertificatescancelCertificateDeletionOptions
  extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
}

/**
 * If you try to delete a Certificate that is being used by a Pool or Compute
 * Node, the status of the Certificate changes to deleteFailed. If you decide that
 * you want to continue using the Certificate, you can use this operation to set
 * the status of the Certificate back to active. If you intend to delete the
 * Certificate, you do not need to run this operation after the deletion failed.
 * You must make sure that the Certificate is not being used by any resources, and
 * then you can try again to delete the Certificate.
 */
export async function cancelCertificateDeletion(
  context: Client,
  thumbprintAlgorithm: string,
  thumbprint: string,
  options: CertificatescancelCertificateDeletionOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path(
      "/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})/canceldelete",
      thumbprintAlgorithm,
      thumbprint
    )
    .post({
      headers: {
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface CertificatesdeleteCertificateOptions
  extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
}

/**
 * You cannot delete a Certificate if a resource (Pool or Compute Node) is using
 * it. Before you can delete a Certificate, you must therefore make sure that the
 * Certificate is not associated with any existing Pools, the Certificate is not
 * installed on any Nodes (even if you remove a Certificate from a Pool, it is not
 * removed from existing Compute Nodes in that Pool until they restart), and no
 * running Tasks depend on the Certificate. If you try to delete a Certificate
 * that is in use, the deletion fails. The Certificate status changes to
 * deleteFailed. You can use Cancel Delete Certificate to set the status back to
 * active if you decide that you want to continue using the Certificate.
 */
export async function deleteCertificate(
  context: Client,
  thumbprintAlgorithm: string,
  thumbprint: string,
  options: CertificatesdeleteCertificateOptions = { requestOptions: {} }
): Promise<void> {
  const result = await context
    .path(
      "/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})",
      thumbprintAlgorithm,
      thumbprint
    )
    .delete({
      headers: {
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: { ...(options.timeOut && { timeOut: options.timeOut }) },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

interface RequestOptions {
  customHeaders?: Record<string, string | number | boolean>;
}

interface RequestParametersCommon {
  requestOptions?: RequestOptions;
}

export interface CertificatesgetCertificateOptions
  extends RequestParametersCommon {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  timeOut?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  clientRequestId?: string;
  /** Whether the server should return the client-request-id in the response. */
  returnClientRequestId?: boolean;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocpDate?: string;
  /** An OData $select clause. */
  $select?: string;
}

/** Gets information about the specified Certificate. */
export async function getCertificate(
  context: Client,
  thumbprintAlgorithm: string,
  thumbprint: string,
  options: CertificatesgetCertificateOptions = { requestOptions: {} }
): Promise<Certificate> {
  const result = await context
    .path(
      "/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})",
      thumbprintAlgorithm,
      thumbprint
    )
    .get({
      headers: {
        ...(options.clientRequestId && {
          "client-request-id": options.clientRequestId,
        }),
        ...(options.returnClientRequestId && {
          "return-client-request-id": options.returnClientRequestId,
        }),
        ...(options.ocpDate && { "ocp-date": options.ocpDate }),
        Accept: "application/json",
        ...options.requestOptions?.customHeaders,
      },
      queryParameters: {
        ...(options.timeOut && { timeOut: options.timeOut }),
        ...(options.$select && { $select: options.$select }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    thumbprint: result.body["thumbprint"],
    thumbprintAlgorithm: result.body["thumbprintAlgorithm"],
    url: result.body["url"],
    state: result.body["state"],
    stateTransitionTime: new Date(result.body["stateTransitionTime"] ?? ""),
    previousState: result.body["previousState"],
    previousStateTransitionTime: new Date(
      result.body["previousStateTransitionTime"] ?? ""
    ),
    publicData: result.body["publicData"],
    deleteCertificateError: !result.body.deleteCertificateError
      ? undefined
      : {
          code: result.body.deleteCertificateError?.["code"],
          message: result.body.deleteCertificateError?.["message"],
          values: (result.body.deleteCertificateError?.["values"] ?? []).map(
            (p) => ({ name: p["name"], value: p["value"] })
          ),
        },
    data: result.body["data"],
    certificateFormat: result.body["certificateFormat"],
    password: result.body["password"],
  };
}
