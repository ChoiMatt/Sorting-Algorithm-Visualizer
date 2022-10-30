function mergeSort(inputArray) {
    let inputLength = inputArray.length;
    
    if (inputLength < 2) {
      return;
    }
    
    let midIndex = inputLength / 2;
    let leftHalf = new Array(midIndex);
    let rightHalf = new Array(inputLength - midIndex);
    
    for (let i = 0; i < midIndex; i++) {
      leftHalf[i] = inputArray[i];
    }
    for (let i = midIndex; i < inputLength; i++) {
      rightHalf[i - midIndex] = inputArray[i];
    }
    
    mergeSort(leftHalf);
    mergeSort(rightHalf);
    
    merge(inputArray, leftHalf, rightHalf);
  }

  function merge (inputArray, leftHalf, rightHalf) {
    let leftSize = leftHalf.length;
    let rightSize = rightHalf.length;
    
    let i = 0, j = 0, k = 0;
    
    while (i < leftSize && j < rightSize) {
      if (leftHalf[i] <= rightHalf[j]) {
        inputArray[k] = leftHalf[i];
        i++;
      }
      else {
        inputArray[k] = rightHalf[j];
        j++;
      }
      k++;
    }
    
    while (i < leftSize) {
      inputArray[k] = leftHalf[i];
      i++;
      k++;
    }
    
    while (j < rightSize) {
      inputArray[k] = rightHalf[j];
      j++;
      k++;
    }
    
  }
  let arrayy = [5,2,8,4,7,1,3,9,6,4,56,3,5,12,46,435,22];
  mergeSort(arrayy);
  console.log(arrayy);

  //-------------------------------------------------------------
  async function mergeSort(arr , n) {
    let bars = document.getElementsByClassName("bar");
    
    // For current size of subarrays to
    // be merged curr_size varies from
    // 1 to n/2
    var curr_size;
  
    // For picking starting index of
    // left subarray to be merged
    var left_start;
  
    // Merge subarrays in bottom up
    // manner. First merge subarrays
    // of size 1 to create sorted
    // subarrays of size 2, then merge
    // subarrays of size 2 to create
    // sorted subarrays of size 4, and
    // so on.
    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
  
        // Pick starting point of different
        // subarrays of current size
        for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
            // Find ending point of left
            // subarray. mid+1 is starting
            // point of right
            var mid = Math.min(left_start + curr_size - 1, n - 1);
  
            var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);
  
            // Merge Subarrays arr[left_start...mid]
            // & arr[mid+1...right_end]
            merge(arr, left_start, mid, right_end,bars);
        }
    }
  }
  
  /*
  * Function to merge the two haves arr[l..m] and arr[m+1..r] of array arr
  */
  async function merge(arr , l , m , r,bars) {
    var i, j, k;
    var n1 = m - l + 1;
    var n2 = r - m;
  
    /* create temp arrays */
    var L = Array(n1).fill(0);
    var R = Array(n2).fill(0);
  
    /*
     * Copy data to temp arrays L and R
     */
    for (i = 0; i < n1; i++){
        L[i] = arr[l + i];
        // bars[i].style.height = L[i]*heightFactor+"px";
        bars[i].style.backgroundColor = "red";
        await sleep(speedFactor);
        bars[i].style.backgroundColor = "white";
    }
    for (j = 0; j < n2; j++){
        R[j] = arr[m + 1 + j];
        // bars[j].style.height = R[j]*heightFactor+"px";
        bars[j].style.backgroundColor = "red";
        await sleep(speedFactor);
        bars[j].style.backgroundColor = "white";
    }
  
    /*
     * Merge the temp arrays back into arr[l..r]
     */
    i = 0;
    j = 0;
    k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        bars[k].style.height = arr[k]*heightFactor+"px";
        bars[k].style.backgroundColor = "green";
        await sleep(speedFactor);
        bars[k].style.backgroundColor = "white";
        k++;
    }
  
    /*
     * Copy the remaining elements of L, if there are any
     */
    while (i < n1) {
        arr[k] = L[i];
        bars[k].style.height = arr[k]*heightFactor+"px";
        bars[k].style.backgroundColor = "green";
        await sleep(speedFactor);
        bars[k].style.backgroundColor = "white";
        i++;
        k++;
    }
  
    /*
     * Copy the remaining elements of R, if there are any
     */
    while (j < n2) {
        arr[k] = R[j];
        bars[k].style.height = arr[k]*heightFactor+"px";
        bars[k].style.backgroundColor = "green";
        await sleep(speedFactor);
        bars[k].style.backgroundColor = "white";
        j++;
        k++;
    }
  }