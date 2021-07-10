// @flow
type Range = [number, number];

export default class RangeList {
  rangeList: Range[] = [];

  constructor() {
  }

  get size(): number {
    return this.rangeList.length;
  }

  /**
   *
   * Adds a range to the list. It will merge the ranges overlapped.
   * @param range {[number, number]} tuple of two numbers which indicates beginning and end of range
   */
  add(range: Range) {
    this.validate(range);
    this.insertIntoRangeList(range);
  }

  /**
   *
   * @param range {[number, number]} tuple of two numbers which indicates beginning and end of range
   */
  remove(range: Range) {
    this.validate(range);

  }


  validate(range: [number, number]) {
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

  insertIntoRangeList(range: Range) {
    const overlapRanges: Range[] = this.findOverlapRanges(range);
    let updatedRange = range;
    if (overlapRanges.length > 0) {
      updatedRange = this.mergeRanges(range, overlapRanges);
    }
    this.rangeList.push(updatedRange);
    this.rangeList.sort((range1, range2) => range1[0]-range2[0]);
  }

  mergeRanges(range: Range, overlapRanges: Range[]): Range {
    const ranges = [...overlapRanges, range];
    let begin = Number.MAX_SAFE_INTEGER;
    let end = Number.MIN_SAFE_INTEGER;
    // find the minimum number in the list to be merged.
    // and find the maximum number in the list to be merged.
    for (const _range of ranges) {
      const [_begin, _end] = _range;
      if (_begin < begin) {
        begin = _begin;
      }
      if (_end > end) {
        end = _end;
      }
    }
    return [begin, end];
  }

  findOverlapRanges(range: Range): Range[] {
    const overlapRanges = [];
    const indexOfEleToDelete = [];
    for (let i = 0; i < this.rangeList.length; i++) {
      const rangeInList = this.rangeList[i];
      const [_beginning, _end] = rangeInList;
      const [beginning, end] = range;
      if (beginning <= _end && end >= _beginning) {
        // add overlap range into overlap range list.
        overlapRanges.push(rangeInList);
        // record the index of the overlap ranges.
        indexOfEleToDelete.push(i);
      }
    }
    // at the same time, update this.rangeList.
    // Since we are going to merge overlap ranges, and re-push them into this.rangeList.
    this.rangeList =
        this.rangeList.filter((range, index) => indexOfEleToDelete.indexOf(index) === -1);
    return overlapRanges;
  }
}