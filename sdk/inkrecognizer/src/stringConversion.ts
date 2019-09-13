import { InkPoint, Rectangle} from './BaseType'

export function stringToIntArray(str: string): number[] {
  if (str === 'none') {
    return [];
  }

  return str.split(',').map(s => parseInt(s));
}

export function stringToFloatArray(str: string): number[] {
  if (str === 'none') {
    return [];
  }

  return str.split(',').map(s => parseFloat(s));
}

export function stringToRectangle(s: string): Rectangle {
  let str = s.toString();
  let nums = stringToFloatArray(str);
  if (nums.length !== 4) {
    console.error('Invalid Rectangle string', str);
    return <Rectangle>{};
  }

  return {
    x: nums[0],
    y: nums[1],
    width: nums[2],
    height: nums[3],
  };
}

export function stringToPoints(str: string): InkPoint[] {
  let nums = stringToFloatArray(str);
  let points = [];

  while (nums.length > 1) {
    let x = nums.shift()!;
    let y = nums.shift()!;
    let point = <InkPoint>{};
    point.x = x;
    point.y = y;
    points.push(point);
  }
  return points;
}