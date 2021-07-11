// @flow
type Range = [number, number];

export default class RangeList {
  rangeList: Range[];
  cachedPrintString: string;

  constructor(rangeList: Range[] = []) {
    this.rangeList = rangeList;
    this.cachedPrintString = "";
  }

  get size(): number {
    return this.rangeList.length;
  }

  /**
   *
   * Adds a range to the list. It will merge the ranges overlapped.
   * @param range {Range} tuple of two numbers which indicates beginning and end of range
   */
  add(range: Range) {
    this._validate(range);
    this._insertIntoRangeList(range);
    this._clearCachedPrintStr();
  }

  /**
   * Removes a range from the list.
   * Separate a range if the range to be removed is included in another range in range list.
   * eg. given range list = [[10, 30]], range to be remove is [15, 20],
   * then the return value would be [[10, 15],[20,30]]
   * @param range {Range} tuple of two numbers which indicates beginning and end of range
   */
  remove(range: Range) {
    this._validate(range);
    this._removeRangeFromList(range);
    this._clearCachedPrintStr();
  }

  /**
   * cached print
   * it prefer cached print string to print if there is no modification to range list
   * when there is add or remove behavior occurs, those behaviors will clear cached print strings
   * and then print method will re-calculate the string to print and store it to cache.
   */
  print() {
    if (this.cachedPrintString.length === 0) {
      this.cachedPrintString = this.toString();
    }
    console.log(this.cachedPrintString);
  }

  /**
   * format range list to [xx, xx) ...
   * @returns {string}
   */
  toString(): string {
    return this.rangeList.map(range => this._rangeToString(range)).join(" ");
  }

  _clearCachedPrintStr() {
    this.cachedPrintString = "";
  }

  /**
   * format a range
   * @param range
   * @returns {string}
   * @private
   */
  _rangeToString(range: Range): string {
    return `[${range[0]}, ${range[1]})`
  }

  /**
   * validate input range
   * range should be pair of number and non-null and ascend sort
   * @param range {Range}
   * @private
   */
  _validate(range: [number, number]) {
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

  /**
   * main logic for adding a range into range list
   * 1. check overlap ranges.
   * 2. if there is overlap ranges, merge and push the merged range to range list, otherwise, push the input range to range list
   * @param range {Range}
   * @private
   */
  _insertIntoRangeList(range: Range) {
    const overlapRanges: Range[] = this._findOverlapRanges(range);
    let updatedRange = range;
    if (overlapRanges.length > 0) {
      updatedRange = this._mergeRanges(range, overlapRanges);
    }
    this._insertSingleRange(updatedRange);
  }

  _mergeRanges(range: Range, overlapRanges: Range[]): Range {
    const ranges = [...overlapRanges, range];
    let begin = Number.MAX_SAFE_INTEGER;
    let end = Number.MIN_SAFE_INTEGER;
    // find the minimum number in the list to be merged.
    // and find the maximum number in the list to be merged.
    for (const _range of ranges) {
      const [_begin, _end] = _range;
      begin = Math.min(_begin, begin);
      end = Math.max(_end, end);
    }
    return [begin, end];
  }

  _findOverlapRanges(range: Range): Range[] {
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
        // this is to check the last range in list that overlaps with the input range
        // make this loop break earlier.
        if (end <= _end) {
          break;
        }
      }
    }
    // update this.rangeList.
    // Since we are going to merge overlap ranges, and re-push them into this.rangeList.
    // filter out ranges that overlaps with input range
    this.rangeList =
        this.rangeList.filter((range: Range, index: number) => indexOfEleToDelete.indexOf(index) === -1);
    return overlapRanges;
  }

  /**
   * main logic for remove range from range list
   * 1. check overlap ranges
   * 2. keep the range list if there is no overlap ranges or separate ranges
   * 3. push the separated ranges into range list
   * @param range
   * @private
   */
  _removeRangeFromList(range: Range) {
    const overlapRanges: Range[] = this._findOverlapRanges(range);
    let updatedRanges = [];
    if (overlapRanges.length > 0) {
      updatedRanges = this._separateRanges(range, overlapRanges);
    }
    this._insertRanges(updatedRanges);
  }

  _separateRanges(rangeToDelete: Range, overlapRanges: Range[]): Range[] {
    const separatedRanges = [];
    for (const overlapRange of overlapRanges) {
      const [begin4OverlapRange, end4OverlapRange] = overlapRange;
      const [begin4RangeToDel, end4RangeToDel] = rangeToDelete;

      if (begin4RangeToDel > begin4OverlapRange) {
        separatedRanges.push([begin4OverlapRange, begin4RangeToDel]);
      }
      if (end4RangeToDel < end4OverlapRange) {
        separatedRanges.push([end4RangeToDel, end4OverlapRange]);
      }
    }

    return separatedRanges;
  }

  _insertSingleRange(range: Range) {
    this.rangeList.push(range);
    this._sortRangeList();
  }

  _insertRanges(ranges: Range[]) {
    this.rangeList = [...this.rangeList, ...ranges];
    this._sortRangeList();
  }

  _sortRangeList() {
    this.rangeList.sort((range1, range2) => range1[0]-range2[0]);
  }
}