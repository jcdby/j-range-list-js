// @flow

export default class RangeList {
  size: number = 0;

  constructor() {
  }

  /**
   *
   *
   * @param range tuple of two numbers which indicates beginning and end of range
   */
  add(range: [number, number]) {
    this.size++;
  }
}