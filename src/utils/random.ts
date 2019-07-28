import { random } from "lodash/fp";

/**
 * The maximum and minimum are inclusive
 */
export const randomInt = (min: number, max: number) => {
  return random(min, max);
};
