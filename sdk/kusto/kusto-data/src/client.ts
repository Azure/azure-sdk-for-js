// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as Constants from "./constants";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import AadHelper from "./security";
import {
  KustoResponseDataSet,
  KustoResponseDataSetV1,
  KustoResponseDataSetV2,
  V1,
  V2Frames,
} from "./response";
import ConnectionStringBuilder from "./connectionBuilder";
import ClientRequestProperties from "./clientRequestProperties";
import { ThrottlingError } from "./errors";
import axios, { AxiosInstance } from "axios";
import http from "http";
import https from "https";
import { kustoTrustedEndpoints } from "./kustoTrustedEndpoints";
import { CloudSettings } from "./cloudSettings";

const COMMAND_TIMEOUT_IN_MILLISECS = moment.duration(10.5, "minutes").asMilliseconds();
const QUERY_TIMEOUT_IN_MILLISECS = moment.duration(4.5, "minutes").asMilliseconds();
const CLIENT_SERVER_DELTA_IN_MILLISECS = moment.duration(0.5, "minutes").asMilliseconds();
const MGMT_PREFIX = ".";

enum ExecutionType {
  Mgmt = "mgmt",
  Query = "query",
  Ingest = "ingest",
  QueryV1 = "queryv1",
}

export class KustoClient {
  connectionString: ConnectionStringBuilder;
  cluster: string;
  defaultDatabase?: string;
  endpoints: { [key in ExecutionType]: string };
  aadHelper: AadHelper;
  axiosInstance: AxiosInstance;

  constructor(kcsb: string | ConnectionStringBuilder) {
    this.connectionString = typeof kcsb === "string" ? new ConnectionStringBuilder(kcsb) : kcsb;
    if (!this.connectionString.dataSource) {
      throw new Error("Cluster url is required");
    }
    const url = new URL(this.connectionString.dataSource);
    this.cluster = `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ""}`;
    this.defaultDatabase = this.connectionString.initialCatalog;
    this.endpoints = {
      [ExecutionType.Mgmt]: `${this.cluster}/v1/rest/mgmt`,
      [ExecutionType.Query]: `${this.cluster}/v2/rest/query`,
      [ExecutionType.Ingest]: `${this.cluster}/v1/rest/ingest`,
      [ExecutionType.QueryV1]: `${this.cluster}/v1/rest/query`,
    };
    this.aadHelper = new AadHelper(this.connectionString);
    const headers = {
      Accept: "application/json",
      "Accept-Encoding": "gzip,deflate",
      "x-ms-client-version": `Kusto.Node.Client:${Constants.SDK_VERSION}`,
      Connection: "Keep-Alive",
    };
    this.axiosInstance = axios.create({
      headers,
      validateStatus: (status: number) => status === 200,

      // keepAlive pools and reuses TCP connections, so it's faster
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
    });
  }

  async execute(db: string | null, query: string, properties?: ClientRequestProperties) {
    query = query.trim();
    if (query.startsWith(MGMT_PREFIX)) {
      return this.executeMgmt(db, query, properties);
    }

    return this.executeQuery(db, query, properties);
  }

  async executeQuery(db: string | null, query: string, properties?: ClientRequestProperties) {
    return this._execute(
      this.endpoints[ExecutionType.Query],
      ExecutionType.Query,
      db,
      query,
      null,
      properties
    );
  }

  async executeQueryV1(db: string | null, query: string, properties?: ClientRequestProperties) {
    return this._execute(
      this.endpoints[ExecutionType.QueryV1],
      ExecutionType.QueryV1,
      db,
      query,
      null,
      properties
    );
  }

  async executeMgmt(db: string | null, query: string, properties?: ClientRequestProperties) {
    return this._execute(
      this.endpoints[ExecutionType.Mgmt],
      ExecutionType.Mgmt,
      db,
      query,
      null,
      properties
    );
  }

  async executeStreamingIngest(
    db: string | null,
    table: string,
    stream: any,
    streamFormat: any,
    mappingName: string | null,
    clientRequestId?: string
  ): Promise<KustoResponseDataSet> {
    let endpoint = `${this.endpoints[ExecutionType.Ingest]}/${this.getDb(
      db
    )}/${table}?streamFormat=${streamFormat}`;
    if (mappingName != null) {
      endpoint += `&mappingName=${mappingName}`;
    }
    let properties: ClientRequestProperties | null = null;
    if (clientRequestId) {
      properties = new ClientRequestProperties();
      properties.clientRequestId = clientRequestId;
    }
    return this._execute(endpoint, ExecutionType.Ingest, db, null, stream, properties);
  }

  async _execute(
    endpoint: string,
    executionType: ExecutionType,
    db: string | null,
    query: string | null,
    stream: any,
    properties?: ClientRequestProperties | null
  ): Promise<KustoResponseDataSet> {
    kustoTrustedEndpoints.validateTrustedEndpoint(
      endpoint,
      (await CloudSettings.getInstance().getCloudInfoForCluster(this.cluster)).LoginEndpoint
    );
    db = this.getDb(db);
    const headers: { [header: string]: string } = {};

    let payload: { db: string; csl: string; properties?: any };
    let clientRequestPrefix = "";
    let clientRequestId;

    const timeout = this._getClientTimeout(executionType, properties);
    let payloadContent: any = "";
    if (query != null) {
      payload = {
        db,
        csl: query,
      };

      if (properties != null) {
        payload.properties = properties.toJSON();
      }

      payloadContent = JSON.stringify(payload);

      headers["Content-Type"] = "application/json; charset=utf-8";
      clientRequestPrefix = "KNC.execute;";
    } else if (stream != null) {
      payloadContent = stream;
      clientRequestPrefix = "KNC.executeStreamingIngest;";
      headers["Content-Encoding"] = "gzip";
      headers["Content-Type"] = "application/octet-stream";
    } else {
      throw new Error("Invalid parameters - expected query or streaming ingest");
    }

    if (properties != null) {
      clientRequestId = properties.clientRequestId;

      if (properties.application != null) {
        headers["x-ms-app"] = properties.application;
      }

      if (properties.user != null) {
        headers["x-ms-user"] = properties.user;
      }
    }

    headers["x-ms-client-request-id"] = clientRequestId || clientRequestPrefix + `${uuidv4()}`;

    const authHeader = await this.aadHelper.getAuthHeader();
    if (authHeader != null) {
      headers.Authorization = authHeader;
    }

    return this._doRequest(endpoint, executionType, headers, payloadContent, timeout, properties);
  }

  private getDb(db: string | null) {
    if (db == null) {
      if (this.defaultDatabase == null) {
        throw new Error(
          "No database provided, and no default database specified in connection string"
        );
      }
      db = this.defaultDatabase;
    }
    return db;
  }

  async _doRequest(
    endpoint: string,
    executionType: ExecutionType,
    headers: { [header: string]: string },
    payload: any,
    timeout: number,
    properties?: ClientRequestProperties | null
  ): Promise<KustoResponseDataSet> {
    const axiosConfig = {
      headers,
      timeout,
    };

    let axiosResponse;
    try {
      axiosResponse = await this.axiosInstance.post(endpoint, payload, axiosConfig);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 429) {
          throw new ThrottlingError(
            "POST request failed with status 429 (Too Many Requests)",
            error
          );
        }
      }
      throw error;
    }

    return this._parseResponse(axiosResponse.data, executionType, properties, axiosResponse.status);
  }

  _parseResponse(
    response: any,
    executionType: ExecutionType,
    properties?: ClientRequestProperties | null,
    status?: number
  ): KustoResponseDataSet {
    const { raw } = properties || {};
    if (raw === true || executionType === ExecutionType.Ingest) {
      return response;
    }

    let kustoResponse = null;
    try {
      if (executionType === ExecutionType.Query) {
        kustoResponse = new KustoResponseDataSetV2(response as V2Frames);
      } else {
        kustoResponse = new KustoResponseDataSetV1(response as V1);
      }
    } catch (ex) {
      throw new Error(`Failed to parse response ({${status}}) with the following error [${ex}].`);
    }
    if (kustoResponse.getErrorsCount().errors > 0) {
      throw new Error(`Kusto request had errors. ${kustoResponse.getExceptions()}`);
    }
    return kustoResponse;
  }

  _getClientTimeout(
    executionType: ExecutionType,
    properties?: ClientRequestProperties | null
  ): number {
    if (properties != null) {
      const clientTimeout = properties.getClientTimeout();
      if (clientTimeout) {
        return clientTimeout;
      }

      const serverTimeout = properties.getTimeout();
      if (serverTimeout) {
        return serverTimeout + CLIENT_SERVER_DELTA_IN_MILLISECS;
      }
    }

    return executionType === ExecutionType.Query || executionType === ExecutionType.QueryV1
      ? QUERY_TIMEOUT_IN_MILLISECS
      : COMMAND_TIMEOUT_IN_MILLISECS;
  }
}

export default KustoClient;
