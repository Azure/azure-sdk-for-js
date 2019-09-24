/**
 * @remarks - The ApplicationKind enum allows an application to identify its
 * domain (if it has one). Specifying a domain allows the application
 * to inform the service of its contains. This can facilitate faster
 * processing as the service will forgo some classification steps.
 * Applications don't have a specific domain can simply specify "Mixed".
 * The default value is ApplicationKind.Mixed.
 */
export enum ApplicationKind {
    Drawing = "drawing",
    Writing = "writing",
    Mixed = "mixed",
}

/**
 * Version of Ink Recognizer Service. 
 * The default value is ServiceVersion.Preview.
 */
export enum ServiceVersion {
    Preview_1_0_0 = "preview_1_0_0",
}

/**
 * The InkStrokeKind enum represents the class a stroke belongs to. 
 * The user of the Ink recognizer service is expected to set this value when 
 * it is known with absolute certainly.
 * The default value is InkStrokeKind.Unknown.
 */
export enum InkStrokeKind {
    InkDrawing = "inkDrawing",
    InkWriting = "inkWriting",
    Unknown = "unknown",
}

/**
 * Unit of the x and y axis values for each InkPoint.
 * The default value is InkPointUnit.Millimeter.
 */
export enum InkPointUnit {
    Millimeter = "mm",
    Centimeter = "cm",
    Inch = "in"
}

/**
 * Interface that represents a rectangle. It is used to represents 
 * bounding rectangle of recognized units.
 */
export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * The InkPoint interface represents a single position on the path of an ink stroke.
 */
export interface InkPoint {
    x: number;
    y: number;
}

/**
 * The InkStroke interface represents an ink stroke (a collection of points from the time 
 * user places his writing intrument on the writing surface until the the instrument is lifted.
 */
export interface InkStroke {
    id: number;
    kind?: InkStrokeKind;
    points: InkPoint[];
    language?: string;
}