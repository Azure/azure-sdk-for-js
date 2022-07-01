// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";
import {
  createAzureMapsKeyCredentialPolicy,
  createMapsClientIdPolicy,
} from "../../maps-common/src";
import {
  Copyright,
  CopyrightCaption,
  GeneratedClient,
  MapAttribution,
  MapTileset,
  RasterTileFormat,
  TileIndex,
  TilesetId,
} from "./generated";
import { BoundingBox, KnownIncludeText } from "./models/models";
import {
  GetAttributionOptions,
  GetCopyrightCaptionOptions,
  GetCopyrightOptions,
  GetMapStateTileOptions,
  GetMapStaticImageOptions,
  GetMapTileOptions,
  GetMapTilesetOptions,
  MapsRenderClientOptions,
} from "./models/options";
import { logger } from "./utils/logger";
import { createSpan } from "./utils/tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { MapTile } from "./models/results";

const isMapsRenderClientOptions = (
  clientIdOrOptions: any
): clientIdOrOptions is MapsRenderClientOptions =>
  clientIdOrOptions && typeof clientIdOrOptions !== "string";

/**
 * Client class for interacting with Azure Maps Render Service.
 */
export class MapsRenderClient {
  /**
   * A reference to the auto-generated Render HTTP client.
   */
  private readonly client: GeneratedClient;
  private readonly defaultFormat: string = "json";
  /**
   * Creates an instance of MapsRenderClient from a subscription key.
   *
   * @example
   * ```ts
   * import { MapsRenderClient, AzureKeyCredential } from "@azure/maps-Render";
   * const credential = new AzureKeyCredential("<subscription-key>");
   *
   * const client = new MapsRenderClient(credential);
   *```
   *
   * @param credential - An AzureKeyCredential instance used to authenticate requests to the service
   * @param options - Options used to configure the Render Client
   */
  constructor(credential: AzureKeyCredential, options?: MapsRenderClientOptions);
  /**
   * Creates an instance of MapsRenderClient from an Azure Identity `TokenCredential`.
   *
   * @example
   * ```ts
   * import { MapsRenderClient } from "@azure/maps-render";
   * import { DefaultAzureCredential } from "@azure/identity";
   * const credential = new DefaultAzureCredential();
   *
   * const client = new MapsRenderClient(credential, "<maps-account-client-id>");
   *```
   *
   * @param credential - An TokenCredential instance used to authenticate requests to the service
   * @param mapsAccountClientId - The Azure Maps client id of a specific map resource
   * @param options - Options used to configure the Render Client
   */
  constructor(
    credential: TokenCredential,
    mapsAccountClientId: string,
    options?: MapsRenderClientOptions
  );
  constructor(
    credential: TokenCredential | AzureKeyCredential,
    clientIdOrOptions?: string | MapsRenderClientOptions,
    maybeOptions: MapsRenderClientOptions = {}
  ) {
    const options = isMapsRenderClientOptions(clientIdOrOptions) ? clientIdOrOptions : maybeOptions;
    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info,
        },
      },
    };

    this.client = new GeneratedClient(internalPipelineOptions);
    if (isTokenCredential(credential)) {
      const clientId = typeof clientIdOrOptions === "string" ? clientIdOrOptions : "";
      if (!clientId) {
        throw Error("Client id is needed for TokenCredential");
      }
      this.client.pipeline.addPolicy(
        bearerTokenAuthenticationPolicy({
          credential,
          scopes: "https://atlas.microsoft.com/.default",
        })
      );
      this.client.pipeline.addPolicy(createMapsClientIdPolicy(clientId));
    } else {
      this.client.pipeline.addPolicy(createAzureMapsKeyCredentialPolicy(credential));
    }
  }

  /**
   * Requests map tiles in vector or raster formats
   *
   * @param tilesetId - The tilesetId for specifying the tileset for the request
   * @param tileIndex - The x, y postion and zoom level of the requested tile
   * @param options - Optional parameters for the operation
   */
  public async getMapTile(
    tilesetId: TilesetId,
    tileIndex: TileIndex,
    options: GetMapTileOptions = {}
  ): Promise<MapTile> {
    const { span, updatedOptions } = createSpan("MapsRenderClient-getMapTile", options);
    try {
      const result = await this.client.renderV2.getMapTile(tilesetId, tileIndex, updatedOptions);
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Requests metadata for a tileset
   *
   * @param tilesetId - The tilesetId for specifying the tileset for the request
   * @param options - Optional parameters for the operation
   */
  public async getMapTileset(
    tilesetId: TilesetId,
    options: GetMapTilesetOptions = {}
  ): Promise<MapTileset> {
    const { span, updatedOptions } = createSpan("MapsRenderClient-getMapTileset", options);
    try {
      const result = await this.client.renderV2.getMapTileset(tilesetId, updatedOptions);
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Requests map copyright attribution information for a section of a tileset
   *
   * @param tilesetId - The tilesetId for specifying the tileset for the request
   * @param zoom - Zoom level of the desired map attribution
   * @param bounds - Bounding box to limit the request area
   * @param options - Optional parameters for the operation
   */
  public async getMapAttribution(
    tilesetId: TilesetId,
    zoom: number,
    boundingBox: BoundingBox,
    options: GetAttributionOptions = {}
  ): Promise<MapAttribution> {
    const { span, updatedOptions } = createSpan("MapsRenderClient-getMapAttribution", options);
    try {
      const result = await this.client.renderV2.getMapAttribution(
        tilesetId,
        zoom,
        [
          boundingBox.topLeft.longitude,
          boundingBox.bottomRight.latitude,
          boundingBox.bottomRight.longitude,
          boundingBox.topLeft.latitude,
        ],
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Fetches state tiles in vector format
   *
   * @param statesetId - The stateset id
   * @param tileIndex - The x, y postion and zoom level of the requested tile
   * @param options - Optional parameters for the operation
   */
  public async getMapStateTile(
    statesetId: string,
    tileIndex: TileIndex,
    options: GetMapStateTileOptions = {}
  ): Promise<MapTile> {
    const { span, updatedOptions } = createSpan("MapsRenderClient-getMapStateTile", options);
    try {
      const result = await this.client.renderV2.getMapStateTile(
        statesetId,
        tileIndex,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Retrieves copyright information for Render Tile service
   *
   * @param options - Optional parameters for the operation
   */
  public async getCopyrightCaption(
    options: GetCopyrightCaptionOptions = {}
  ): Promise<CopyrightCaption> {
    const { span, updatedOptions } = createSpan("MapsRenderClient-getCopyrightCaption", options);
    try {
      const result = await this.client.renderV2.getCopyrightCaption(
        this.defaultFormat,
        updatedOptions
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Renders a user-defined, rectangular image containing a map section
   *
   * @param format - Desired format of the response. Possible value: png.
   * @param options - Optional parameters for the operation
   */
  public async getMapStaticImage(
    format: RasterTileFormat,
    options: GetMapStaticImageOptions = {}
  ): Promise<MapTile> {
    const { span, updatedOptions } = createSpan("MapsRenderClient-getMapStaticImage", options);
    try {
      const result = await this.client.renderV2.getMapStaticImage(format, {
        ...updatedOptions,
        center: updatedOptions.center
          ? [updatedOptions.center.longitude, updatedOptions.center.latitude]
          : undefined,
        boundingBoxPrivate: updatedOptions.boundingBox
          ? [
              updatedOptions.boundingBox.topLeft.longitude,
              updatedOptions.boundingBox.bottomRight.latitude,
              updatedOptions.boundingBox.bottomRight.longitude,
              updatedOptions.boundingBox.topLeft.latitude,
            ]
          : undefined,
      });
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns copyright information for a given bounding box
   *
   * @param boundingBox - Bounding box
   * @param options - Optional parameters for the operation
   */
  public async getCopyrightFromBoundingBox(
    boundingBox: BoundingBox,
    options: GetCopyrightOptions = {}
  ): Promise<Copyright> {
    const { span, updatedOptions } = createSpan(
      "MapsRenderClient-getCopyrightFromBoundingBox",
      options
    );
    try {
      const result = await this.client.renderV2.getCopyrightFromBoundingBox(
        this.defaultFormat,
        {
          southWest: [boundingBox.bottomRight.latitude, boundingBox.topLeft.longitude],
          northEast: [boundingBox.topLeft.latitude, boundingBox.bottomRight.longitude],
        },
        {
          ...updatedOptions,
          includeText:
            updatedOptions.includeText === false ? KnownIncludeText.No : KnownIncludeText.Yes,
        }
      );
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns copyright information for a given tile
   *
   * @param tileIndex - The x, y postion and zoom level of the tile
   * @param options - Optional parameters for the operation
   */
  public async getCopyrightForTile(
    tileIndex: TileIndex,
    options: GetCopyrightOptions = {}
  ): Promise<Copyright> {
    const { span, updatedOptions } = createSpan("MapsRenderClient-getCopyrightForTile", options);
    try {
      const result = await this.client.renderV2.getCopyrightForTile(this.defaultFormat, tileIndex, {
        ...updatedOptions,
        includeText:
          updatedOptions.includeText === false ? KnownIncludeText.No : KnownIncludeText.Yes,
      });
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns the copyright information for the world
   *
   * @param options - Optional parameters for the operation
   */
  public async getCopyrightForWorld(options: GetCopyrightOptions = {}): Promise<Copyright> {
    const { span, updatedOptions } = createSpan("MapsRenderClient-getCopyrightForWorld", options);
    try {
      const result = await this.client.renderV2.getCopyrightForWorld(this.defaultFormat, {
        ...updatedOptions,
        includeText:
          updatedOptions.includeText === false ? KnownIncludeText.No : KnownIncludeText.Yes,
      });
      return result;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message,
      });
      throw e;
    } finally {
      span.end();
    }
  }
}
