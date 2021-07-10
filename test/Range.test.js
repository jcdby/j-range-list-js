const RangeList = require("../src/RangeList").default;

describe("[Init: ] Range list type validation and constructor test case: ", function () {
    test("Range list should initiate correctly", function () {
        const rangeList = new RangeList();
        expect(rangeList instanceof RangeList).toBeTruthy();
    });
});

describe("[After Init: ] Range list behavior test case: ", function () {
    describe("[validation]", function () {
        test("should throw error when range is not equal to pair of 2 numbers in array.", function() {
            const rangeList = new RangeList();
            const errorMsg = "Range can only be pair of numbers.";
            expect(() => {
                rangeList._validate([10, 15, 20]);
            }).toThrow(errorMsg);

            expect(() => {
                rangeList._validate(null);
            }).toThrow(errorMsg);
        });
        test("should throw error when a range is not valid. eg, [30, 20].", function () {
            const rl = new RangeList();
            const errorMsg = "The end value of the range must be equal or larger than the start value";
            expect(() => {
                rl._validate([30, 20]);
            }).toThrow(errorMsg);
        });
        test("should throw error when range is not Array of number", function () {
            const rl = new RangeList();
            const errorMsg = "Element of range should be type of number.";
            expect(() => {
                rl._validate(["30", "20"]);
            }).toThrow(errorMsg);
        });
    });
    describe("[adding behavior:] ", function () {
        describe("[insert range with correct merge]", function() {
            test("should return size of 1 after adding [10, 15]", function() {
                const rangeList = new RangeList();
                rangeList.add([10, 15]);
                expect(rangeList.size).toBe(1);
            });
            test("should insert range to list when there is no overlaps.", function () {
                const rl = new RangeList();
                rl.add([10, 20]);
                rl.add([30, 40]);
                rl.add([21, 25]);
                const expectResult = [[10, 20], [21, 25], [30, 40]];
                expect(rl.rangeList).toEqual(expectResult);
            });
            test("should merge overlap ranges and insert merged range into list.", function() {
                const rl = new RangeList();
                rl.add([10, 20]);
                rl.add([15, 20]);
                const expectResult = [[10,20]];
                expect(rl.rangeList).toEqual(expectResult);

                rl.add([30, 40]);
                rl.add([21, 36]);
                const expectResult2 = [[10,20], [21, 40]];
                expect(rl.rangeList).toEqual(expectResult2);

                rl.add([20,20]);
                const expectResult3 = [[10, 20], [21, 40]];
                expect(rl.rangeList).toEqual(expectResult3);

                rl.add([20,21]);
                const expectResult4 = [[10,40]];
                expect(rl.rangeList).toEqual(expectResult4);

                rl.add([40, 41]);
                const expectResult5 = [[10, 41]];
                expect(rl.rangeList).toEqual(expectResult5);

                rl.add([22, 50]);
                const expectResult6 = [[10, 50]];
                expect(rl.rangeList).toEqual(expectResult6);
            });
        });
    });
    describe("[removing behavior:] ", function() {
        test("should return the original range list if the range to be removed is outside of this range list.", function() {
            const rl = new RangeList();
            rl.add([10, 20]);
            rl.remove([50, 60]);
            expect(rl.rangeList).toEqual([[10,20]]);
        });
        test("should return the rest of range list if we removed exact range from range list.", function () {
           const rl = new RangeList();
           rl.add([10,20]);
           rl.remove([10, 20]);
           expect(rl.rangeList).toEqual([]);
        });
        test("should return separated range list if the range to be removed is overlapped with other ranges.", function () {
           const rl = new RangeList();
           rl.add([10, 15]);
           rl.add([20, 25]);
           rl.remove([15, 20]);
           const expectResult = [[10,15], [20, 25]];
           expect(rl.rangeList).toEqual(expectResult);

           rl.remove([20,23]);
           const expectResult1 = [[10, 15], [23,25]];
           expect(rl.rangeList).toEqual(expectResult1);

           rl.remove([23,23]);
           const expectResult2 = [[10,15], [23,25]];
           expect(rl.rangeList).toEqual(expectResult2);

           rl.remove([23,24]);
           const expectResult3 = [[10, 15], [24, 25]];
           expect(rl.rangeList).toEqual(expectResult3);

           rl.remove([12,13]);
           const expectResult4 = [[10, 12], [13,15],[24,25]];
           expect(rl.rangeList).toEqual(expectResult4);

           rl.add([25, 29]);
           rl.remove([11,25]);
           const expectResult5 = [[10, 11], [25, 29]];
           expect(rl.rangeList).toEqual(expectResult5);
        });
    });
});

