// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LatLon } from "@azure/maps-common";
import { createMultiCollection } from "./createMultiCollection";

/**
 * Specify how the pin's position and label text.
 */
export interface Pin {
  /** The coordinate of the pin. */
  coordinate: LatLon;
  /** The label text for the pin. */
  label?: string;
}

/**
 * The pin options for default/none image style..
 */
export interface PinOptions {
  /** The opacity of the pin. Range from 0 to 1 */
  opacity?: number;
  /**
   * The labels are centered at the pushpin 'label anchor.' The anchor location is predefined for built-in pushpins and is at the top center of custom pushpins (see below).
   * To override the label anchor, using the _labelAnchor_ option and provide X and Y pixel coordinates for the anchor.
   * These coordinates are relative to the top left corner of the pushpin image. Positive X values move the anchor to the right, and positive Y values move the anchor down.
   * For example, to position the label anchor 10 pixels right and 4 pixels above the top left corner of the pushpin image, use \{labelAnchor: [10, -4]\}
   * */
  labelAnchor?: [number, number];
  /** Color of the label. Range from 000000 to FFFFFF */
  labelColor?: string;
  /** Size of the label in pixels. */
  labelSizeInPixels?: number;
  /**
   * By default, custom pushpin images are drawn centered at the pin coordinates. This usually isn't ideal as it obscures the location that you're trying to highlight.
   * To override the anchor location of the pin image, use the _pinAnchor_ option. This uses the same format as the _labelAnchor_ options.
   * For example, if your custom pin image has the tip of the pin at the top left corner of the image, you can set the anchor to that spot by using \{pinAnchor: [0, 0]\}
   */
  pinAnchor?: [number, number];
  /** The ration of the pin. Range from -360 to 360*/
  rotationInDegree?: number;
  /** The scale of the pin. Should be greater than 0. */
  scale?: number;
  /** Color of the pin. Range from 000000 to FFFFFF */
  pinColor?: string;
}

const optionKeyMap: Record<keyof PinOptions, string> = {
  opacity: "al",
  labelAnchor: "la",
  labelColor: "lc",
  labelSizeInPixels: "ls",
  pinAnchor: "an",
  rotationInDegree: "ro",
  scale: "sc",
  pinColor: "co",
};

function isOptionKeyMap(key: any): key is keyof PinOptions {
  return key in optionKeyMap;
}

export interface PinSet {
  pins: Pin[];
  pinImage?: "default" | "none" | string;
  options?: PinOptions;
}
/**
 * Create a pin query string for _get map static image_
 *
 * @example
 * ```ts
 *
 * const pins = {
 *  pins: [
 *    { coordinate: [52.577, 13.35], label: "Label start" },
 *    { coordinate: [52.6, 13.2988], label: "Label end" },
 *  ],
 *  pinImage: "<image source url || default || none>"
 *  options: {
 *    scale: 0.9,
 *    pinColor: "FF0000",
 *    labelColor: "0000FF",
 *    labelSizeInPixels: 18,
 *  }
 * );
 * const res = await client
 *  .path("/map/static/{format}", "png")
 *  .get({
 *    queryParameters: {
 *      bbox: [13.228, 52.4559, 13.5794, 52.62],
 *      zoom: 10,
 *      pins: pins,
 *    },
 *    skipUrlEncoding: true,
 *  })
 * ```
 *
 * @param pins - An array of {@link Pin} that specify the positions and label text of each pin.
 * @param pinImage - Specify the image source for custom pin. Set this to "none" if you don't want to show a pin image.
 * @param options - The style options of the pins. See {@link PinOptions}
 * @returns - The composed query string.
 */

export function createPinsQuery(pinSets: PinSet[]): string {
  const pinsQueries = pinSets.map(({ pins, pinImage = "default", options = {} }) => {
    // compose the pins' position query string
    const pinsQueryStr = pins
      .map(({ coordinate: [lat, lon], label }) => `${label ? `'${label}'` : ""}${lon} ${lat}`)
      .join("|");
    // compose the options query string
    const optionsQueryStr = Object.entries(options).reduce<string>((queryStr, [key, val]) => {
      if (!isOptionKeyMap(key)) throw Error(`Unexpected option: ${key}`);
      if (Array.isArray(val)) return (queryStr += `|${optionKeyMap[key]}${val[0]} ${val[1]}`);
      return (queryStr += `|${optionKeyMap[key]}${val}`);
    }, "");
    if (pinImage === "none" || pinImage === "default") {
      return `${pinImage}${optionsQueryStr}||${pinsQueryStr}`;
    }
    return `custom${optionsQueryStr}||${pinsQueryStr}||${pinImage}`;
  });
  return createMultiCollection("pins", pinsQueries);
}
