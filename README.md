## Introduction
Useful lib for managing range list. 

#### What is Range List:
A range list is an aggregate of these ranges: [1, 5), [10, 11), [100,201);

#### What is Range
Range: A pair of integers define a range, for example: [1, 5).   
This range includes integers: 1, 2, 3, and 4.  

### public behaviors
1. #### add behavior  
   add a range into range list.   
   if there is no overlap ranges in range list, just add range into list.  
   if there are one or more overlap ranges in range list, remove existing overlapped ranges in the range list, and put
   the merged range into range list.  
   every time before adding range, it will validate if the range to be added correct.   
2. #### remove behavior  
   remove a range from range list.   
   if there is no range in range list match the range to be removed, then keep range list unchanged.  
   if there is any overlap area between the range to be removed,   
   and the ranges in range list, then remove the overlap part and split ranges to small ranges if possible.   
3. #### print behavior  
   print range list according to the format.   
   the format is as below:  
   [10,20) [30, 40)  
   the function will cache the printed string when there is no modification to range list.   
   
## Usage
```
npm install j-range-list-js
```

```javascript
// ---------------------------
// cjs: 
const RangeList = require('j-range-list-js').default;

// esm:
import RangeList from 'j-range-list-js';


const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)
 
```

## Development
Plain js with FlowJS.  
Develop functions following flow js   
recommend: test first  (TDD). Make sure your code coverage is enough(>=90%, best to have 100%).   
use 'yarn test' to check the coverage   

**src** folder: for source code development.  
**lib** folder: minified code which can be used as library module  
**test** folder: test cases  


## Git 
**master** branch for production release version  
**develop** branch for QA release version  
**feature** branch for feature development  
  
make sure squash merge feature to develop branch  


## Publish
Before publish, you should make sure thins as below:  
1. change .npmrc **registry**: registry.yarnpkg.com
2. make sure you have logged in  
3. make sure all new changes has been merged to master branch, and you have checked out to master branch.



