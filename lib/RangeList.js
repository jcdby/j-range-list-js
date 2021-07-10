export default class RangeList {
  rangeList = [];

  constructor() {}

  get size() {
    return this.rangeList.length;
  }
  /**
   *
   *
   * @param range tuple of two numbers which indicates beginning and end of range
   */


  add(range) {
    this.validate(range);
    this.insertIntoRangeList(range);
  }

  validate(range) {
    if (!range || !(range instanceof Array) || range.length !== 2) {
      throw new Error("Range can only be pair of numbers.");
    }

    const [beginning, end] = range;

    if (typeof beginning !== 'number' || typeof end !== "number") {
      throw new Error("Element of range should be type of number.");
    }

    if (beginning > end) {
      throw new Error("The end value of the range must be equal or larger than the start value");
    }
  }

  insertIntoRangeList(range) {
    const overlapRanges = this.findOverlapRanges(range);

    if (overlapRanges.length > 0) {
      range = this.mergeRanges(range, overlapRanges);
    }

    this.rangeList.push(range);
  }

  mergeRanges(range, overlapRanges) {
    return [0, 0];
  }

  findOverlapRanges(range) {
    return this.rangeList.filter(rangeInList => {
      const [_beginning, _end] = rangeInList;
      const [beginning, end] = range;

      if (beginning <= _end || end >= _beginning) {
        return rangeInList;
      }
    });
  }

}