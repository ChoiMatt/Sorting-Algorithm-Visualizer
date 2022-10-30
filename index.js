let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  //console.log(numOfBars);
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

let algotouse = "";

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(1,150);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var piano = Synth.createInstrument('piano');

async function checkarray(array){
  // piano.play('C', 4, 2);
  //Synth.play('piano', 'C', 8, 2);
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i<array.length-1;i++){
    bars[i].style.backgroundColor = "green";
    bars[i+1].style.backgroundColor = "red";
    // if (i<8)
    // piano.play('B', i%8+1, 0.002);
    await sleep(20);
  }
  await sleep(30);
  for (let i = 0; i<array.length;i++){
    bars[i].style.backgroundColor = "white";
  }
}

async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "white";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "red";
        //bars[j].innerText = array[j];
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "red";
        //bars[j + 1].innerText = array[j + 1];
        await sleep(speedFactor/8);
      }
    }
    await sleep(speedFactor/8);
  }
  checkarray(array);
  return array;
}

async function swap(items, leftIndex, rightIndex, bars) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
  bars[leftIndex].style.backgroundColor = "red";
  //bars[leftIndex].innerText = items[leftIndex];
  bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
  bars[rightIndex].style.backgroundColor = "red";
  //bars[rightIndex].innerText = items[rightIndex];
  await sleep(speedFactor);
}
async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = items[pivotIndex]; //middle element
  bars[pivotIndex].style.backgroundColor = "lightgreen";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "white";
    }
  }

  (i = left), //left pointer
    (j = right); //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(items, left, right) {
  var index;
  let bars = document.getElementsByClassName("bar");
  if (items.length > 1) {
    index = await partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      await quickSort(items, index, right);
    }
  }
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "white";
  }
  if (left+5-numOfBars>0)
  checkarray(unsorted_array);
  // if (items.length ===1){
  //   await sleep(speedFactor);
  //   checkarray(items);
  // }
  
  //checkarray(items);
  // for(let i = 1;i<items.length;i++){
  //   let count = 0;
  //   if (items[i-1]<items[i]){
  //     count+=1;
  //     if (count === numOfBars-1){
  //       checkarray(items);
  //     }
  //   }
  // }
  return items;
}

// sort_btn.addEventListener("click", function () {
//   let sorted_array = quickSort(unsorted_array, 0, numOfBars - 1);
//   console.log(sorted_array);
// });

//write insertion sort function
async function InsertionSort(array) {
  let bars = document.getElementsByClassName("bar");
  // for (let i = 1; i < array.length; i++) {
  //   let key = array[i];
  //   let j = i - 1;
  //   while (j >= 0 && array[j] > key) {
  //     array[j + 1] = array[j];
  //     bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
  //     bars[j + 1].style.backgroundColor = "red";
  //     //bars[j + 1].innerText = array[j + 1];
  //     await sleep(speedFactor);

  //     for (let k = 0; k < bars.length; k++) {
  //       if (k != j + 1) {
  //         bars[k].style.backgroundColor = "white";
  //       }
  //     }
  //     j = j - 1;
  //   }
  //   array[j + 1] = key;
  //   bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
  //   bars[j + 1].style.backgroundColor = "lightgreen";
  //   //bars[j + 1].innerText = array[j + 1];
  //   await sleep(speedFactor);
  // }
  let i, key, j;  
    for (i = 1; i < array.length; i++) 
    {  
        key = array[i];
        //bars[i].style.backgroundColor = "lightgreen"  
        j = i - 1;  
        while (j >= 0 && array[j] > key) 
        {  
            let k = j;
            array[j + 1] = array[j]; 
            bars[j+1].style.height = array[j]* heightFactor+"px";
            bars[j].style.backgroundColor = "red"; 
            bars[j+1].style.backgroundColor = "red"; 
            bars[i].style.backgroundColor = "lightgreen"
            j = j - 1;  
            await sleep(speedFactor);
            bars[k].style.backgroundColor = "white"; 
            bars[k+1].style.backgroundColor = "white"; 
             
            // if(array[j+1]!=key){
            // bars[j+1].style.backgroundColor = "white"; 
            // }
        }  
        array[j + 1] = key;
        bars[j+1].style.backgroundColor ="red";
        bars[j+1].style.height = key* heightFactor+"px";  
        await sleep(speedFactor);
        bars[j+1].style.backgroundColor ="white";
    }
  // for (let k = 0; k < bars.length; k++) {
  //   bars[k].style.backgroundColor = "white";
  // }
  checkarray(array);
  return array;
}

async function SelectionSort(array){
  let bars = document.getElementsByClassName("bar");
  var i, j, min_idx;
  
    // One by one move boundary of unsorted subarray
    for (i = 0; i < array.length-1; i++)
    {
        // Find the minimum element in unsorted array
        var a , b;
        a = b = 0;
        min_idx = i;
        for (j = i + 1; j < array.length; j++){
        if (array[j] < array[min_idx]){
          
            min_idx = j;

            bars[min_idx].style.backgroundColor = "red";
           await sleep(speedFactor);
            if (b>0){
              bars[a].style.backgroundColor = "white";
            }
            b = 1;
            a = min_idx;
          }
          bars[j].style.backgroundColor = "red"
          await sleep(speedFactor);
          //bars[min_idx].style.backgroundColor = "white";
          if(j!=min_idx)
          bars[j].style.backgroundColor = "white";
        }
  
        // Swap the found minimum element with the first element
        var temp = array[min_idx];
        array[min_idx] = array[i];
        // bars[min_idx].style.backgroundColor = "red";
        bars[min_idx].style.height = array[min_idx]*heightFactor+"px";
        array[i] = temp;
        //bars[i].style.backgroundColor = "red"
        bars[i].style.height = array[i]*heightFactor+"px";
        //await sleep(speedFactor);
        // bars[min_idx].style.backgroundColor = "white";
        // bars[i].style.backgroundColor = "white";
        //await swap(array,min_idx, i,bars);
        bars[i].style.backgroundColor = "lightgreen";
        if(i!=0){
        bars[i-1].style.backgroundColor = "white";
      }
      bars[min_idx].style.backgroundColor = "white";
    }
    checkarray(array);
    return array;
}
//write heap sort function
async function ShellSort(array){
  let n = array.length;
  let bars = document.getElementsByClassName("bar");
        // Start with a big gap, then reduce the gap
        for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))
        {
          
            // Do a gapped insertion sort for this gap size.
            // The first gap elements a[0..gap-1] are already
            // in gapped order keep adding one more element
            // until the entire array is gap sorted
            for (let i = gap; i < n; i += 1)
            {
              
                // add a[i] to the elements that have been gap
                // sorted save a[i] in temp and make a hole at
                // position i
                let temp = array[i];
   
                // shift earlier gap-sorted elements up until
                // the correct location for a[i] is found
                let j;
                for (j = i; j >= gap && array[j - gap] > temp; j -= gap){
                    array[j] = array[j - gap];
                    bars[j].style.height = array[j]*heightFactor+"px";
                    bars[j].style.backgroundColor = "red";
                    await sleep(speedFactor);
                    bars[j].style.backgroundColor = "white";
                }
                // put temp (the original a[i]) in its correct
                // location
                    array[j] = temp;
                    bars[j].style.height = array[j]*heightFactor+"px";
                    bars[j].style.backgroundColor = "red";
                    await sleep(speedFactor);
                    bars[j].style.backgroundColor = "white";
            }
        }
        checkarray(array);
        return array;
}

async function isSorted(array){
  for (let i=1; i<array.length; i++){
            if (array[i] < array[i-1]){
                return true;}
        return false;}
}
// var stop = true;
let count = 0;
async function StupidSort(array){
  // let boolin = isSorted(array);
  // console.log(boolin);
  // let boolin = false;
  while (isSorted(array)&& count<20){
    // let bars = document.getElementsByClassName("bar");
    // for(let i =0; i<array.length;i++)
    // bars[i].style.backgroundColor = "blue"
    let unsorted_array = createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
    await sleep(speedFactor*5);
    count++;
    StupidSort(unsorted_array);
  }
  return array;
}
async function HeapSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await heapify(array, array.length, i);
  }
  for (let i = array.length - 1; i >= 0; i--) {
    await swap(array, 0, i, bars);
    await heapify(array, i, 0);
  }
  // for (let k = 0; k < bars.length; k++) {
  //   bars[k].style.backgroundColor = "white";
  //   await sleep(speedFactor);
  // }
  checkarray(array);
  return array;
}

async function heapify(array, n, i) {
  let bars = document.getElementsByClassName("bar");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  if (largest != i) {
    await swap(array, i, largest, bars);
    await heapify(array, n, largest);
  }
}

async function swap(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "red";
  bars[j].style.backgroundColor = "red";
  await sleep(speedFactor);

  for (let k = 0; k < bars.length; k++) {
    if (k != i && k != j) {
      bars[k].style.backgroundColor = "white";
    }
  }
  //bars[i].innerText = array[i];
  //bars[j].innerText = array[j];
  return array;
}

//write mergeSort function

// async function MergeSort(array) {
//   if (array.length <= 1) return array;
//   const auxiliaryArray = array.slice();
//   mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);
//   return array;
// }
// async function mergeSortHelper(
//   mainArray,
//   startIdx,
//   endIdx,
//   auxiliaryArray
// ) {
//   if (startIdx === endIdx) return;
//   const middleIdx = Math.floor((startIdx + endIdx) / 2);
//   mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
//   mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
//   doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
// }

// async function doMerge(
//   mainArray,
//   startIdx,
//   middleIdx,
//   endIdx,
//   auxiliaryArray
// ) {
//   let k = startIdx;
//   let i = startIdx;
//   let j = middleIdx + 1;
//   let bars = document.getElementsByClassName("bar");
//   while (i <= middleIdx && j <= endIdx) {
//     // These are the values that we're comparing; we push them once
//     // to change their color.
//     bars[i].style.backgroundColor = "red";
//     bars[j].style.backgroundColor = "red";
//     await sleep(speedFactor);
//     // These are the values that we're comparing; we push them a second
//     // time to revert their color.
//     bars[i].style.backgroundColor = "white";
//     bars[j].style.backgroundColor = "white";
//     if (auxiliaryArray[i] <= auxiliaryArray[j]) {
//       // We overwrite the value at index k in the original array with the
//       // value at index i in the auxiliary array.
//       //mainArray[k] = auxiliaryArray[i];
//       bars[k].style.height = auxiliaryArray[i]* heightFactor+"px";
//       mainArray[k++] = auxiliaryArray[i++];
//     } else {
//       // We overwrite the value at index k in the original array with the
//       // value at index j in the auxiliary array.
//       //mainArray[k] = auxiliaryArray[j];
//       bars[k].style.height = auxiliaryArray[j]* heightFactor+"px";
//       mainArray[k++] = auxiliaryArray[j++];
//     }
//   }
//   while (i <= middleIdx) {
//     bars[i].style.backgroundColor = "red";
    
//     await sleep(speedFactor);
//     // These are the values that we're comparing; we push them a second
//     // time to revert their color.
//     bars[i].style.backgroundColor = "white";
    
//     // We overwrite the value at index k in the original array with the
//     // value at index i in the auxiliary array.
//     //mainArray[k] = auxiliaryArray[i];
//     bars[k].style.height = auxiliaryArray[i]* heightFactor+"px";
//     mainArray[k++] = auxiliaryArray[i++];
//   }
//   while (j <= endIdx) {
//     bars[j].style.backgroundColor = "red";
    
//     await sleep(speedFactor);
//     // These are the values that we're comparing; we push them a second
//     // time to revert their color.
//     bars[j].style.backgroundColor = "white";
//     // We overwrite the value at index k in the original array with the
//     // value at index j in the auxiliary array.
//     //mainArray = auxiliaryArray[j];
//     bars[k].style.height = auxiliaryArray[j]* heightFactor+"px";
//     mainArray[k++] = auxiliaryArray[j++];
//   }
// }
//-----------------------------------------------------------------------------------------------------------


// async function mergeSort(array) {
//   var inputLength = array.length;
  
//   if (inputLength < 2) {
//     return;
//   }
  
//   let midIndex = Math.floor(inputLength / 2);
//   let leftHalf = new Array(midIndex);
//   let rightHalf = new Array(inputLength - midIndex);
  
//   for (let i = 0; i < midIndex; i++) {
//     leftHalf[i] = array[i];

//   }
//   for (let i = midIndex; i < inputLength; i++) {
//     rightHalf[i - midIndex] = array[i];
//   }
  
//   mergeSort(leftHalf);
//   mergeSort(rightHalf);
  
//   merge(array, leftHalf, rightHalf);
// }

// async function merge (inputArray, leftHalf, rightHalf) {
//   let bars = document.getElementsByClassName("bar");
//   let leftSize = leftHalf.length;
//   let rightSize = rightHalf.length;
  
//   let i = 0, j = 0, k = 0;
  
//   while (i < leftSize && j < rightSize) {
//     if (leftHalf[i] <= rightHalf[j]) {
//       inputArray[k] = leftHalf[i];
//       i++;
//     }
//     else {
//       inputArray[k] = rightHalf[j];
//       j++;
//     }
//     bars[k].style.height = inputArray[k]*heightFactor+"px";
//       bars[k].style.backgroundColor = "green";
//       await sleep(speedFactor);
//     k++;
//   }
  
//   while (i < leftSize) {
//     inputArray[k] = leftHalf[i];
//     bars[k].style.height = inputArray[k]*heightFactor+"px";
//     bars[k].style.backgroundColor = "green";
//     await sleep(speedFactor);
//     bars[k].style.backgroundColor = "white";
//     i++;
//     k++;
//   }
  
//   while (j < rightSize) {
//     inputArray[k] = rightHalf[j];
//     bars[k].style.height = inputArray[k]*heightFactor+"px";
//     bars[k].style.backgroundColor = "green";
//     await sleep(speedFactor);
//     bars[k].style.backgroundColor = "white";
//     j++;
//     k++;
//   }
  
// }

sort_btn.addEventListener("click", function () {
  switch (algotouse) {
    case "bubble":
      bubbleSort(unsorted_array);
      break;
    case "merge":
      // if (
      //   confirm(
      //     "Merge Sort is not visualized properly. Do you want to continue?"
      //   )
      // ) {
        MergeSort(unsorted_array);
      //mergeSort(unsorted_array,0,unsorted_array.length-1);
      // } else {
      //   break;
      // }
      //mergeSort(unsorted_array,0,unsorted_array.length-1);
      break;
    case "heap":
      HeapSort(unsorted_array);
      break;
    case "insertion":
      InsertionSort(unsorted_array);
      break;
    case "quick":
      quickSort(unsorted_array, 0, unsorted_array.length - 1);
      break;
    case "selection":
      SelectionSort(unsorted_array);
      break;
    case "shell":
      ShellSort(unsorted_array);
      break;
    // case "stupid":
    //   //stop = false;
    //   StupidSort(unsorted_array);
    //   // let btn = document.createElement("button");
    //   // btn.innerHTML = "Stop this stupid sort"
    //   // let stopbtn = document.getElementById("btn");
    //   // stopbtn.addEventListener("click",function(){
    //   //   stop = true;
    //   // })
    //   // //btn.classList.add()
    //   // buttons_container.appendChild(btn);
    //   break;
    default:
      InsertionSort(unsorted_array);
      break;
  }
});
