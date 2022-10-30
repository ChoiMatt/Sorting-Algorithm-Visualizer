async function mergeSort(arr) {
    let bars = document.getElementsByClassName("bar");
    if (arr.length < 2) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    let actualHalf = await mergeSort(left);
    await mergeSort(right);
  
    let i = 0;
    let j = 0;
    let k = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        arr[k] = left[i];
        i++;
        // bars[k].style.height = arr[k] * heightFactor + "px";
        // bars[k].style.backgroundColor = "lightgreen";
        // bars[k].innerText = arr[k];
        //await sleep(speedFactor);
      } else {
        arr[k] = right[j];
        j++;
        // bars[k + middle].style.height = arr[k] * heightFactor + "px";
        // bars[k + middle].style.backgroundColor = "yellow";
        // bars[k].innerText = arr[k];
        //await sleep(speedFactor);
      }
      //shift to right side
      //console.log(k);
      //bars[k].style.height = arr[k] * heightFactor + "px";
      //bars[k].style.backgroundColor = "lightgreen";
  
      // bars[k + middle].style.height = arr[k] * heightFactor + "px";
      // bars[k + middle].style.backgroundColor = "yellow";
  
      //visualize it for right and left side
      bars[k].style.height = arr[k] * heightFactor + "px";
      bars[k].style.backgroundColor = "lightgreen";
      if (k + arr.length < bars.length) {
        bars[k + arr.length].style.height = arr[k] * heightFactor + "px";
        console.log(arr[k] * heightFactor);
        bars[k + arr.length].style.backgroundColor = "yellow";
      }
      await sleep(speedFactor);
      //bars[k].innerText = arr[k];
  
      k++;
    }
  
    while (i < left.length) {
      arr[k] = left[i];
      bars[k].style.height = arr[k] * heightFactor + "px";
      bars[k].style.backgroundColor = "lightgreen";
      await sleep(speedFactor);
      i++;
      k++;
    }
  
    while (j < right.length) {
      arr[k] = right[j];
      bars[k].style.height = arr[k] * heightFactor + "px";
      bars[k].style.backgroundColor = "lightgreen";
      await sleep(speedFactor);
      j++;
      k++;
    }
  
    // for (let i = 0; i < arr.length; i++) {
    //   bars[i].style.height = arr[i] * heightFactor + "px";
    //   bars[i].style.backgroundColor = "lightgreen";
    //   await sleep(speedFactor);
    // }
  
    for (let k = 0; k < bars.length; k++) {
      bars[k].style.backgroundColor = "aqua";
    }
  
    return arr;
  }
  
  function mergeSortD(arr, start, end) {
    if (arr.length < 2) {
      return arr;
    }
  
    let middle = Math.floor((start + end) / 2);
    let left = arr.slice(start, middle);
    let right = arr.slice(middle, end);
  
    //mergeSort(left);
    mergeSort(right);
  }



  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  async function merge(arr, start, mid, end,bars)
{
    var n1 = mid - start + 1;
    var n2 = end - mid;
  
    // Create temp arrays
    var L = new Array(n1); 
    var R = new Array(n2);
  
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[start + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
  
    // Merge the temp arrays back into arr[l..r]
  
    // Initial index of first subarray
    var i = 0;
  
    // Initial index of second subarray
    var j = 0;
  
    // Initial index of merged subarray
    var k = start;
  
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            bars[k].style.height = L[i]*heightFactor+"px";
         //   await sleep(speedFactor);
            i++;
        }
        else {
            arr[k] = R[j];
            bars[k].style.height = R[j]*heightFactor+"px";
         //   await sleep(speedFactor);
            j++;
        }
        k++;
    }
  
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        bars[k].style.height = L[i]*heightFactor+"px";
           // await sleep(speedFactor);
        i++;
        k++;
    }
  
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        bars[k].style.height = R[j]*heightFactor+"px";
           // await sleep(speedFactor);
        j++;
        k++;
    }
}

async function mergeSort(arr,start, end){
  let bars = document.getElementsByClassName("bar");
  if((end-start)<=1){
      return;//returns recursively
  }
  var mid = Math.floor((start+end)/2);
  mergeSort(arr,start,mid);
  mergeSort(arr,mid+1,end);
  merge(arr,start,mid,end,bars);
}
