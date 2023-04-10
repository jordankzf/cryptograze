import BigNumber from "bignumber.js";

type KeyValuePair = Record<string, number | string>;

export function dynamicRounding(number: BigNumber): string {
  if (number.isLessThanOrEqualTo(0.1)) {
    return number.toFixed(8);
  } else if (number.isLessThan(1.1)) {
    return number.toFixed(4);
  } else {
    return number.toFixed(2);
  }
}

export function formatNumbers(
  obj: KeyValuePair
): KeyValuePair {
  const newObj: Record<string, number | string> = {};

  for (const key in obj) {
    if (typeof obj[key] === "number") {
      const parsedValue = BigNumber(obj[key]);
      newObj[key] = dynamicRounding(parsedValue);
    } else {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

export function formatArray(
  arr: KeyValuePair[]
): KeyValuePair[] {
  return arr.map((obj) => formatNumbers(obj));
}
