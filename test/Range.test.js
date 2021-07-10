const RangeList = require("../src/RangeList").default;

describe("[Init: ] Range list type validation and constructor test case: ", function () {
    test("Range list should initiate correctly", function () {
        const rangeList = new RangeList();
        expect(rangeList instanceof RangeList).toBeTruthy();
    });
});

describe("[After Init: ] Range list behavior test case: ", function () {
    describe("adding behavior: ", function () {
        test("should return size of 1 after adding [10, 15]", function() {
            const rangeList = new RangeList();
            rangeList.add([10, 15]);
            expect(rangeList.size).toBe(1);
        });
    });
});