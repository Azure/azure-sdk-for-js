import { InkRecognitionUnit } from './InkRecognitionUnit';
import { InkWord } from './InkWord'
import { InkBullet } from './InkBullet'

export interface Line extends InkRecognitionUnit {
    alternates: string[];
    text: string;
    words: InkWord[];
    bullet: InkBullet;
}