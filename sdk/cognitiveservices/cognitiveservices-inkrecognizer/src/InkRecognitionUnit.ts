import { InkPoint, Rectangle } from './BaseType';

export enum InkRecognitionUnitKind {
  InkBullet = 'inkBullet',
  InkDrawing = 'inkDrawing',
  InkWord = 'inkWord',
  Line = 'line',
  Paragraph = 'paragraph',
  Root = 'root',
  WritingRegion = 'writingRegion',
  Unknown = 'unknown'
}

export interface InkRecognitionUnit {
  id: number;
  strokeIds: number[];
  kind: InkRecognitionUnitKind;
  children: InkRecognitionUnit[];
  parent: InkRecognitionUnit;
  boundingRectangle: Rectangle;
  rotatedBoundingRectangle: InkPoint[];
  toJSON(): object;
}