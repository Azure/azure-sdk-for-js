import { InkRecognitionResult } from './InkRecognitionResult';
import { InkRecognitionUnit, InkRecognitionUnitKind } from './InkRecognitionUnit';
import { InkRecognitionRoot } from './InkRecognitionRoot';
import { WritingRegion } from './WritingRegion';
import { Paragraph } from './Paragraph';
import { Line } from './Line';
import { InkWord } from './InkWord';
import { InkBullet } from './InkBullet';
import { InkDrawing } from './InkDrawing';
import { InkPoint, Rectangle } from './BaseType';

interface JsonInkRecognitionUnit {
  category: string;
  class: string;
  id: number;
  strokeIds: number[];
  parentId: number;
  childIds: number[];
  boundingRectangle: {
    height: number;
    topX: number;
    topY: number;
    width: number;
  };
  rotatedBoundingRectangle: InkPoint[];
}

interface JsonInkRecognitionResult {
  language: string;
  version: number;
  unit: string;
  recognitionUnits: JsonInkRecognitionUnit[];
}

interface JsonInkWordAlternate {
  category: string;
  recognizedString: string;
}

interface JsonLineAlternate {
  category: string;
  recognizedString: string;
}

interface JsonInkWord extends JsonInkRecognitionUnit {
  alternates: JsonInkWordAlternate[];
  recognizedText: string;
}

interface JsonInkBullet extends JsonInkRecognitionUnit {
  recognizedText: string;
}

interface JsonInkDrawing extends JsonInkRecognitionUnit {
  center: InkPoint;
  confidence: number;
  recognizedObject: string;
  rotationAngle: number;
  points: InkPoint[];
  alternates: JsonInkDrawing[];
}

interface JsonLine extends JsonInkRecognitionUnit {
  alternates?: JsonLineAlternate[];
  recognizedText: string;
}

let nameToUnitKindMap: Map<string, InkRecognitionUnitKind> = new Map([
  ['inkBullet', InkRecognitionUnitKind.InkBullet],
  ['inkDrawing', InkRecognitionUnitKind.InkDrawing],
  ['inkWord', InkRecognitionUnitKind.InkWord],
  ['line', InkRecognitionUnitKind.Line],
  ['paragraph', InkRecognitionUnitKind.Paragraph],
  ['root', InkRecognitionUnitKind.Root],
  ['writingRegion', InkRecognitionUnitKind.WritingRegion],
  ['unknown', InkRecognitionUnitKind.Unknown],
]);

function getInkRecognitionUnitKindFromName(name: string): InkRecognitionUnitKind {
  return nameToUnitKindMap.get(name) || InkRecognitionUnitKind.Unknown;
}

function getInkRecognitionUnitJSON(unit: InkRecognitionUnit): object {
  return {
    id: unit.id,
    strokeIds: unit.strokeIds,
    kind: unit.kind,
    children: unit.children.map(elem => elem.id),
    parent: unit.parent ? unit.parent.id : {},
    boundingRectangle: unit.boundingRectangle,
    rotatedBoundingRectangle: unit.rotatedBoundingRectangle,
  };
}

function getInkDrawingUnitJSON(unit: InkDrawing): object {
  let jsonUnit = getInkRecognitionUnitJSON(unit);
  let jsonThis = {
    center: unit.center,
    confidence: unit.confidence,
    recognizedShape: unit.recognizedShape,
    rotationAngle: unit.rotationAngle,
    points: unit.points,
  };
  let jsonAlternates = {};
  if(unit.alternates) {
    jsonAlternates = {
      alternates: unit.alternates.map(alternate => getInkDrawingUnitJSON(alternate)),
    };
  } 
  return { ...jsonUnit, ...jsonThis, ...jsonAlternates};
}

function createInkRecognitionUnit(json: JsonInkRecognitionUnit): InkRecognitionUnit {
  let unit: InkRecognitionUnit = {} as InkRecognitionUnit;
  unit.id = json.id;
  unit.kind = getInkRecognitionUnitKindFromName(json.category);
  unit.strokeIds = json.strokeIds;

  if (json.boundingRectangle) {
    // InkDrawing.Alternates do not have boundingRectangle
    unit.boundingRectangle = {} as Rectangle;
    unit.boundingRectangle.x = json.boundingRectangle.topX;
    unit.boundingRectangle.y = json.boundingRectangle.topY;
    unit.boundingRectangle.width = json.boundingRectangle.width;
    unit.boundingRectangle.height = json.boundingRectangle.height;
  }
  unit.rotatedBoundingRectangle = json.rotatedBoundingRectangle || [];
  unit.parent = {} as InkRecognitionUnit;
  unit.children = [];
  unit.toJSON = () => { return getInkRecognitionUnitJSON(unit); };

  return unit;
}

function createInkDrawing(json: JsonInkDrawing): InkDrawing {
  let unit = createInkRecognitionUnit(json) as InkDrawing;
  unit.id = json.id;
  unit.center = json.center;
  unit.confidence = json.confidence;
  unit.recognizedShape = json.recognizedObject;
  unit.rotationAngle = json.rotationAngle;
  unit.points = json.points;
  if (json.alternates) {
    unit.alternates = [];
    json.alternates.forEach((jsonAlternate: JsonInkDrawing) => {
      let alternate = createInkRecognitionUnit(jsonAlternate) as InkDrawing;
      alternate.boundingRectangle = unit.boundingRectangle;
      alternate.rotatedBoundingRectangle = unit.rotatedBoundingRectangle;

      alternate.center = jsonAlternate.center;
      alternate.confidence = jsonAlternate.confidence;
      alternate.recognizedShape = jsonAlternate.recognizedObject;
      alternate.rotationAngle = jsonAlternate.rotationAngle;
      alternate.points = jsonAlternate.points;
      alternate.toJSON = () => { return getInkDrawingUnitJSON(alternate); };
      unit.alternates.push(alternate);
    });
  }
  unit.toJSON = () => { return getInkDrawingUnitJSON(unit); };
  return unit;
}

function createInkWord(json: JsonInkWord): InkWord {
  let unit = createInkRecognitionUnit(json) as InkWord;
  unit.text = json.recognizedText;
  unit.alternates = [];

  json.alternates.forEach((jsonInkWordAlternate: JsonInkWordAlternate) => {
    unit.alternates.push(jsonInkWordAlternate.recognizedString);
  });

  unit.toJSON = () => {
    let jsonUnit = getInkRecognitionUnitJSON(unit);
    let jsonThis = {
      text: unit.text,
      alternates: unit.alternates,
    };
    return { ...jsonUnit, ...jsonThis };
  };
  return unit;
}

function createInkBullet(json: JsonInkBullet): InkBullet {
  let unit = createInkRecognitionUnit(json) as InkBullet;
  unit.text = json.recognizedText;
  unit.toJSON = () => {
    let jsonUnit = getInkRecognitionUnitJSON(unit);
    let jsonThis = {
      text: unit.text,
    };
    return { ...jsonUnit, ...jsonThis };
  };
  return unit;
}

function createLine(json: JsonLine): Line {
  let unit = createInkRecognitionUnit(json) as Line;
  unit.text = json.recognizedText;

  if (json.alternates) {
    unit.alternates = [];
    json.alternates.forEach((jsonLineAlternate: JsonLineAlternate) => {
      unit.alternates.push(jsonLineAlternate.recognizedString);
    });
  }

  unit.toJSON = () => {
    let jsonUnit = getInkRecognitionUnitJSON(unit);
    let jsonThis = {
      text: unit.text,
      alternates: unit.alternates,
    };
    return { ...jsonUnit, ...jsonThis };
  };
  return unit;
}

function createParagraph(json: JsonInkRecognitionUnit): Paragraph {
  let unit = createInkRecognitionUnit(json) as Paragraph;
  return unit;
}

function createWritingRegion(json: JsonInkRecognitionUnit): WritingRegion {
  let unit = createInkRecognitionUnit(json) as WritingRegion;
  return unit;
}

function processInkRecognitionUnit(json: JsonInkRecognitionUnit, result: InkRecognitionResult): InkRecognitionUnit {
  let unit: InkRecognitionUnit = {} as InkRecognitionUnit;
  switch (json.category) {
    case 'inkDrawing':
      unit = createInkDrawing(json as JsonInkDrawing);
      result.inkDrawings.push(unit as InkDrawing);
      break;
    case 'inkWord':
      unit = createInkWord(json as JsonInkWord);
      result.inkWords.push(unit as InkWord);
      break;
    case 'line':
      unit = createLine(json as JsonLine);
      result.lines.push(unit as Line);
      break;
    case 'paragraph':
      unit = createParagraph(json);
      result.paragraphs.push(unit as Paragraph);
      break;
    case 'writingRegion':
      unit = createWritingRegion(json);
      result.writingRegions.push(unit as WritingRegion);
      break;
    case 'inkBullet':
      unit = createInkBullet(json as JsonInkBullet);
      result.inkBullets.push(unit as InkBullet);
      break;
    default:
      unit = createInkRecognitionUnit(json);
      break;
  }
  return unit;
}

export function parseInkRecognitionResult(responseText: string): InkRecognitionResult {
  let idToRecognitionUnitMap: Map<Number, InkRecognitionUnit> = new Map<Number, InkRecognitionUnit>();
  let idToJsonRecognitionUnitMap: Map<Number, JsonInkRecognitionUnit> = new Map<Number, JsonInkRecognitionUnit>();

  let result = {} as InkRecognitionResult;
  result.inkDrawings = [];
  result.inkWords = [];
  result.inkBullets = [];
  result.lines = [];
  result.paragraphs = [];
  result.writingRegions = [];

  // Parse InkRecognitionUnits from json
  const json: JsonInkRecognitionResult = JSON.parse(responseText) as JsonInkRecognitionResult;
  json.recognitionUnits.forEach((jsonUnit: JsonInkRecognitionUnit) => {
    let unit = processInkRecognitionUnit(jsonUnit, result);
    idToRecognitionUnitMap.set(unit.id, unit);
    idToJsonRecognitionUnitMap.set(unit.id, jsonUnit);
  });

  // Fill parent and children recognitionUnits
  idToRecognitionUnitMap.forEach((value: InkRecognitionUnit, key: Number) => {
    if (idToJsonRecognitionUnitMap.has(key)) {
      let jsonUnit = idToJsonRecognitionUnitMap.get(key);
      if (!jsonUnit) {
        return;
      }
      let parentId = jsonUnit.parentId;
      if (idToRecognitionUnitMap.has(parentId)) {
        let parent = idToRecognitionUnitMap.get(parentId);
        if (parent) {
          value.parent = parent;
        }
      }

      let childIds = jsonUnit.childIds;
      if (childIds) {
        childIds.forEach((cid) => {
          if (idToRecognitionUnitMap.has(cid)) {
            let child = idToRecognitionUnitMap.get(cid);
            if (child) {
              value.children.push(child);
            }
          }
        });
      }
    }
  });

  // Merge properties from Root
  const InkRecognitionRootId = 0;
  result.id = InkRecognitionRootId;
  result.kind = InkRecognitionUnitKind.Root;
  result.parent = {} as InkRecognitionUnit;
  result.children = [];
  result.strokeIds = [];
  result.boundingRectangle = {} as Rectangle;
  result.rotatedBoundingRectangle = [];

  if (!idToRecognitionUnitMap.has(InkRecognitionRootId)) {
    // InkRecognitionRoot will be available in GA, build here before then.
    // throw new Error("Fail to pass response: no InkRecognitionRoot present.");
    result.children = result.children.concat(result.inkDrawings);
    result.children = result.children.concat(result.writingRegions);
    if(result.children.length === 0) {
      throw new Error("Fail to pass response: no children under InkRecognitonRoot. Response:" + responseText);
    }
    else {
        result.boundingRectangle.x = result.children[0].boundingRectangle.x;
        result.boundingRectangle.y = result.children[0].boundingRectangle.y;
        result.boundingRectangle.width = result.children[0].boundingRectangle.width;
        result.boundingRectangle.height= result.children[0].boundingRectangle.height;
    }

    result.children.forEach((u: InkRecognitionUnit) => {
      u.parent = result;
      result.strokeIds = result.strokeIds.concat(u.strokeIds);

      let left = Math.min(result.boundingRectangle.x, u.boundingRectangle.x);
      let top = Math.min(result.boundingRectangle.y, u.boundingRectangle.y);
      let right = Math.max(result.boundingRectangle.x + result.boundingRectangle.width, u.boundingRectangle.x + u.boundingRectangle.width);
      let bottom = Math.max(result.boundingRectangle.y + result.boundingRectangle.height, u.boundingRectangle.y + u.boundingRectangle.height);

      result.boundingRectangle.x = left;
      result.boundingRectangle.y = top
      result.boundingRectangle.width = right - left;
      result.boundingRectangle.height = bottom - top;
    });

    let tl: InkPoint = { x: result.boundingRectangle.x, y: result.boundingRectangle.y };
    let tr: InkPoint = { x: result.boundingRectangle.x + result.boundingRectangle.width, y: result.boundingRectangle.y };
    let br: InkPoint = { x: result.boundingRectangle.x + result.boundingRectangle.width, y: result.boundingRectangle.y + result.boundingRectangle.height };
    let bl: InkPoint = { x: result.boundingRectangle.x, y: result.boundingRectangle.y + result.boundingRectangle.height };
    result.rotatedBoundingRectangle.push(tl);
    result.rotatedBoundingRectangle.push(tr);
    result.rotatedBoundingRectangle.push(br);
    result.rotatedBoundingRectangle.push(bl);
  }
  else {
    const root = idToRecognitionUnitMap.get(0) || {} as InkRecognitionUnit;
    result.boundingRectangle = root.boundingRectangle;
    result.rotatedBoundingRectangle = root.rotatedBoundingRectangle;
    result.strokeIds = root.strokeIds;
    result.children = root.children;
  }

  return result;
}