---
title: NumPy Fundamentals for AI
difficulty: 1
---

# NumPy Fundamentals for AI

NumPy is the foundation of numerical computing in Python. It lets you work with vectors, matrices, and batches of data using concise operations instead of element-by-element loops.

> **Practice this:** track the shape of every array. Most NumPy bugs become much easier to solve once you know the shape going into and coming out of each operation.

By the end of this guide, you will be able to create and inspect arrays, select and transform data, use broadcasting, perform matrix operations, and recognize when arrays share memory.

## 1. Getting Started

### Import NumPy

```python
import numpy as np  # Import NumPy using the standard alias np
```

---

### Create Arrays

### `np.array()`

```python
arr = np.array([1, 2, 3, 4, 5])  # Create a 1D NumPy array

print(arr)
# [1 2 3 4 5]
```

### Create a 2D Array

```python
arr = np.array([
    [1, 2, 3],
    [4, 5, 6]
])  # Create a 2D array

print(arr)
# [[1 2 3]
#  [4 5 6]]
```

---

### Inspect Array Properties

```python
arr = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
```

### `ndim`

```python
print(arr.ndim)  # Get the number of dimensions
# 2
```

### `shape`

```python
print(arr.shape)  # Get array shape: (rows, columns)
# (2, 3)
```

### `size`

```python
print(arr.size)  # Get total number of elements
# 6
```

### `dtype`

```python
print(arr.dtype)  # Get the data type of array elements
# int64
```

---

### Array Creation Functions

### `np.zeros()`

```python
arr = np.zeros(5)  # Create a 1D array containing 5 zeros

print(arr)
# [0. 0. 0. 0. 0.]
```

```python
arr = np.zeros((2, 3))  # Create a 2x3 array containing zeros

print(arr)
# [[0. 0. 0.]
#  [0. 0. 0.]]
```

### `np.ones()`

```python
arr = np.ones((2, 3))  # Create a 2x3 array containing ones

print(arr)
# [[1. 1. 1.]
#  [1. 1. 1.]]
```

### `np.full()`

```python
arr = np.full((2, 3), 7)  # Create a 2x3 array filled with 7

print(arr)
# [[7 7 7]
#  [7 7 7]]
```

### `np.arange()`

```python
arr = np.arange(0, 10, 2)  # Create values from 0 to 10 with step 2

print(arr)
# [0 2 4 6 8]
```

Syntax:

```python
np.arange(start, stop, step)
```

### `np.linspace()`

```python
arr = np.linspace(0, 10, 5)  # Create 5 evenly spaced values from 0 to 10

print(arr)
# [ 0.   2.5  5.   7.5 10. ]
```

---

## 2. Selecting and Updating Data

### Indexing

```python
arr = np.array([10, 20, 30, 40, 50])
```

```python
print(arr[0])  # Get the first element
# 10
```

```python
print(arr[2])  # Get the third element
# 30
```

```python
print(arr[-1])  # Get the last element
# 50
```

---

### Slicing

```python
arr = np.array([10, 20, 30, 40, 50])
```

```python
print(arr[1:4])  # Get elements from index 1 to index 3
# [20 30 40]
```

```python
print(arr[:3])  # Get elements from the beginning to index 2
# [10 20 30]
```

```python
print(arr[2:])  # Get elements from index 2 to the end
# [30 40 50]
```

```python
print(arr[::2])  # Get every second element
# [10 30 50]
```

Syntax:

```python
arr[start:stop:step]
```

---

### Two-Dimensional Indexing

```python
arr = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])
```

```python
print(arr[1, 2])  # Get element at row 1, column 2
# 6
```

```python
print(arr[0])  # Get the first row
# [1 2 3]
```

```python
print(arr[:, 1])  # Get the second column
# [2 5 8]
```

```python
print(arr[0:2, 1:3])  # Get rows 0-1 and columns 1-2
# [[2 3]
#  [5 6]]
```

---

### Changing Array Values

```python
arr = np.array([1, 2, 3, 4])

arr[0] = 100  # Change the first value to 100

print(arr)
# [100   2   3   4]
```

```python
arr[1:3] = 50  # Change index 1 and 2 to 50

print(arr)
# [100  50  50   4]
```

---

## 3. Array Calculations

### Scalar Arithmetic

```python
arr = np.array([1, 2, 3])
```

### Addition

```python
result = arr + 10  # Add 10 to every element

print(result)
# [11 12 13]
```

### Subtraction

```python
result = arr - 1  # Subtract 1 from every element

print(result)
# [0 1 2]
```

### Multiplication

```python
result = arr * 2  # Multiply every element by 2

print(result)
# [2 4 6]
```

### Division

```python
result = arr / 2  # Divide every element by 2

print(result)
# [0.5 1.  1.5]
```

### Power

```python
result = arr ** 2  # Square every element

print(result)
# [1 4 9]
```

---

### Operations Between Arrays

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
```

```python
print(a + b)  # Add corresponding elements
# [5 7 9]
```

```python
print(a - b)  # Subtract corresponding elements
# [-3 -3 -3]
```

```python
print(a * b)  # Multiply corresponding elements
# [ 4 10 18]
```

```python
print(a / b)  # Divide corresponding elements
# [0.25 0.4  0.5 ]
```

---

### Aggregate Functions

```python
arr = np.array([1, 2, 3, 4, 5])
```

### `np.sum()`

```python
print(np.sum(arr))  # Calculate the sum of all values
# 15
```

### `np.mean()`

```python
print(np.mean(arr))  # Calculate the average
# 3.0
```

### `np.min()`

```python
print(np.min(arr))  # Get the smallest value
# 1
```

### `np.max()`

```python
print(np.max(arr))  # Get the largest value
# 5
```

### `np.std()`

```python
print(np.std(arr))  # Calculate standard deviation
# 1.4142135623730951
```

### `np.var()`

```python
print(np.var(arr))  # Calculate variance
# 2.0
```

### `np.median()`

```python
print(np.median(arr))  # Calculate the median
# 3.0
```

---

## 5. Shape and Memory

### `reshape()`

```python
arr = np.array([1, 2, 3, 4, 5, 6])

matrix = arr.reshape(2, 3)  # Reshape a 1D array into 2 rows and 3 columns

print(matrix)
# [[1 2 3]
#  [4 5 6]]
```

```python
matrix = arr.reshape(3, 2)  # Reshape into 3 rows and 2 columns

print(matrix)
# [[1 2]
#  [3 4]
#  [5 6]]
```

---

### `flatten()`

```python
arr = np.array([
    [1, 2],
    [3, 4]
])

flat = arr.flatten()  # Convert a multidimensional array into a 1D array

print(flat)
# [1 2 3 4]
```

---

### `ravel()`

```python
arr = np.array([
    [1, 2],
    [3, 4]
])

flat = arr.ravel()  # Return a flattened representation of the array

print(flat)
# [1 2 3 4]
```

---

### Transpose

### `.T`

```python
arr = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print(arr.T)  # Swap rows and columns
# [[1 4]
#  [2 5]
#  [3 6]]
```

### `np.transpose()`

```python
result = np.transpose(arr)  # Transpose the array

print(result)
# [[1 4]
#  [2 5]
#  [3 6]]
```

---

## 6. Filtering, Sorting, and Searching

### Boolean Filtering

```python
arr = np.array([10, 20, 30, 40, 50])
```

```python
print(arr > 25)  # Check which elements are greater than 25
# [False False  True  True  True]
```

```python
print(arr[arr > 25])  # Get values greater than 25
# [30 40 50]
```

```python
print(arr[arr <= 30])  # Get values less than or equal to 30
# [10 20 30]
```

```python
result = arr[(arr >= 20) & (arr <= 40)]  # Get values between 20 and 40

print(result)
# [20 30 40]
```

---

### `np.where()`

```python
arr = np.array([10, 20, 30, 40])

result = np.where(arr > 20, 1, 0)  # Return 1 if value > 20, otherwise return 0

print(result)
# [0 0 1 1]
```

```python
indexes = np.where(arr > 20)  # Get indexes where values are greater than 20

print(indexes)
# (array([2, 3]),)
```

---

### `np.sort()`

```python
arr = np.array([5, 2, 8, 1, 3])

result = np.sort(arr)  # Sort values in ascending order

print(result)
# [1 2 3 5 8]
```

---

### `np.argsort()`

```python
arr = np.array([50, 10, 30])

indexes = np.argsort(arr)  # Get the indexes that would sort the array

print(indexes)
# [1 2 0]
```

---

### `np.unique()`

```python
arr = np.array([1, 1, 2, 2, 2, 3, 4])

result = np.unique(arr)  # Return unique values

print(result)
# [1 2 3 4]
```

---

## 7. Combining and Splitting Arrays

### `np.concatenate()`

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

result = np.concatenate((a, b))  # Join two arrays

print(result)
# [1 2 3 4 5 6]
```

---

### `np.vstack()`

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

result = np.vstack((a, b))  # Stack arrays vertically

print(result)
# [[1 2 3]
#  [4 5 6]]
```

---

### `np.hstack()`

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

result = np.hstack((a, b))  # Stack arrays horizontally

print(result)
# [1 2 3 4 5 6]
```

---

### `np.split()`

```python
arr = np.array([1, 2, 3, 4, 5, 6])

result = np.split(arr, 3)  # Split the array into 3 equal arrays

print(result)
# [array([1, 2]), array([3, 4]), array([5, 6])]
```

---

## 8. Random Numbers

### `np.random.random()`

```python
arr = np.random.random(5)  # Generate 5 random float values from 0 to 1

print(arr)
```

### `np.random.randint()`

```python
arr = np.random.randint(1, 10, size=5)  # Generate 5 random integers from 1 to 9

print(arr)
```

```python
matrix = np.random.randint(1, 100, size=(3, 3))  # Generate a 3x3 random integer matrix

print(matrix)
```

### `np.random.choice()`

```python
arr = np.array([10, 20, 30, 40])

value = np.random.choice(arr)  # Randomly select one value from the array

print(value)
```

### `np.random.shuffle()`

```python
arr = np.array([1, 2, 3, 4, 5])

np.random.shuffle(arr)  # Shuffle the array in place

print(arr)
```

---

## 9. Matrix Operations

```python
a = np.array([
    [1, 2],
    [3, 4]
])

b = np.array([
    [5, 6],
    [7, 8]
])
```

### Element-Wise Multiplication

```python
result = a * b  # Multiply corresponding elements

print(result)
# [[ 5 12]
#  [21 32]]
```

### Matrix Multiplication with `@`

```python
result = a @ b  # Perform matrix multiplication

print(result)
# [[19 22]
#  [43 50]]
```

### `np.matmul()`

```python
result = np.matmul(a, b)  # Perform matrix multiplication

print(result)
# [[19 22]
#  [43 50]]
```

### `np.dot()`

```python
result = np.dot(a, b)  # Calculate the dot product of two matrices

print(result)
# [[19 22]
#  [43 50]]
```

---

## Broadcasting

```python
arr = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

values = np.array([10, 20, 30])

result = arr + values  # Add values to each row using broadcasting

print(result)
# [[11 22 33]
#  [14 25 36]]
```

---

## 10. Copies, Views, and Data Types

### `copy()`

```python
a = np.array([1, 2, 3])

b = a.copy()  # Create an independent copy of the array

b[0] = 100

print(a)
# [1 2 3]

print(b)
# [100   2   3]
```

---

### `view()`

```python
a = np.array([1, 2, 3])

b = a.view()  # Create a view that shares data with the original array

b[0] = 100

print(a)
# [100   2   3]
```

---

### Data Types

### `astype()`

```python
arr = np.array([1.2, 2.5, 3.8])

result = arr.astype(int)  # Convert array values from float to integer

print(result)
# [1 2 3]
```

```python
arr = np.array([1, 2, 3])

result = arr.astype(float)  # Convert integers to floats

print(result)
# [1. 2. 3.]
```

---

## 11. Useful Numerical Functions

### `np.any()`

```python
arr = np.array([10, 20, 30])

result = np.any(arr > 25)  # Check whether at least one value is greater than 25

print(result)
# True
```

---

### `np.all()`

```python
arr = np.array([10, 20, 30])

result = np.all(arr > 5)  # Check whether every value is greater than 5

print(result)
# True
```

---

### `np.argmax()`

```python
arr = np.array([10, 50, 20, 40])

index = np.argmax(arr)  # Get the index of the largest value

print(index)
# 1
```

---

### `np.argmin()`

```python
arr = np.array([10, 50, 20, 5])

index = np.argmin(arr)  # Get the index of the smallest value

print(index)
# 3
```

---

### `np.abs()`

```python
arr = np.array([-5, -2, 3, -10])

result = np.abs(arr)  # Convert negative values to absolute values

print(result)
# [ 5  2  3 10]
```

---

### `np.sqrt()`

```python
arr = np.array([1, 4, 9, 16])

result = np.sqrt(arr)  # Calculate the square root of each value

print(result)
# [1. 2. 3. 4.]
```

---

### `np.round()`

```python
arr = np.array([1.234, 2.678, 3.456])

result = np.round(arr, 2)  # Round each value to 2 decimal places

print(result)
# [1.23 2.68 3.46]
```

---

### `np.clip()`

```python
arr = np.array([1, 5, 10, 15, 20])

result = np.clip(arr, 5, 15)  # Restrict values to the range 5 to 15

print(result)
# [ 5  5 10 15 15]
```

---

### `np.cumsum()`

```python
arr = np.array([1, 2, 3, 4])

result = np.cumsum(arr)  # Calculate the cumulative sum

print(result)
# [ 1  3  6 10]
```

---

### `np.cumprod()`

```python
arr = np.array([1, 2, 3, 4])

result = np.cumprod(arr)  # Calculate the cumulative product

print(result)
# [ 1  2  6 24]
```

---

## Quick Reference

```python
import numpy as np  # Import NumPy

# -------------------------
# Array Creation
# -------------------------
a = np.array([1, 2, 3])  # Create array: [1 2 3]
a = np.zeros(3)  # Create zeros: [0. 0. 0.]
a = np.ones(3)  # Create ones: [1. 1. 1.]
a = np.full(3, 5)  # Create array filled with 5: [5 5 5]
a = np.arange(0, 10, 2)  # Create range: [0 2 4 6 8]
a = np.linspace(0, 10, 5)  # Create 5 evenly spaced numbers

# -------------------------
# Array Information
# -------------------------
a.shape  # Get array shape
a.ndim  # Get number of dimensions
a.size  # Get total number of elements
a.dtype  # Get data type

# -------------------------
# Statistics
# -------------------------
np.sum(a)  # Calculate sum
np.mean(a)  # Calculate average
np.median(a)  # Calculate median
np.min(a)  # Get minimum value
np.max(a)  # Get maximum value
np.std(a)  # Calculate standard deviation
np.var(a)  # Calculate variance

# -------------------------
# Reshaping
# -------------------------
a.reshape(1, -1)  # Reshape array
a.flatten()  # Convert array to 1D copy
a.ravel()  # Return flattened representation
a.T  # Transpose array

# -------------------------
# Filtering
# -------------------------
a[a > 2]  # Get values greater than 2
np.where(a > 2, 1, 0)  # Return 1 when condition is true, otherwise 0

# -------------------------
# Sorting
# -------------------------
np.sort(a)  # Sort values
np.argsort(a)  # Get indexes that sort the array

# -------------------------
# Searching
# -------------------------
np.argmax(a)  # Get index of maximum value
np.argmin(a)  # Get index of minimum value

# -------------------------
# Array Combination
# -------------------------
np.concatenate((a, a))  # Join arrays
np.vstack((a, a))  # Stack arrays vertically
np.hstack((a, a))  # Stack arrays horizontally

# -------------------------
# Other Functions
# -------------------------
np.unique(a)  # Get unique values
np.abs(a)  # Get absolute values
np.sqrt(a)  # Calculate square roots
np.round(a, 2)  # Round to 2 decimal places
np.clip(a, 0, 10)  # Limit values between 0 and 10
np.cumsum(a)  # Calculate cumulative sum
np.cumprod(a)  # Calculate cumulative product
np.any(a > 5)  # Check whether any value matches condition
np.all(a > 0)  # Check whether all values match condition

# -------------------------
# Random
# -------------------------
np.random.random(5)  # Generate 5 random floats
np.random.randint(1, 10, size=5)  # Generate 5 random integers
np.random.choice(a)  # Randomly select one element
np.random.shuffle(a)  # Shuffle array in place

# -------------------------
# Matrix Operations
# -------------------------
np.dot(a, a)  # Calculate dot product
np.matmul([[1, 2]], [[3], [4]])  # Perform matrix multiplication
```
