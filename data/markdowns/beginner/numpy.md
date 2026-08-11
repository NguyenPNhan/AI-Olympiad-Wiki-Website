---
title: NumPy Fundamentals for AI
difficulty: 1
---

# NumPy Fundamentals for AI

NumPy is the foundation of numerical computing in Python. It gives us fast multidimensional arrays and a concise way to express the mathematical operations that appear throughout artificial intelligence.

Instead of processing numbers one at a time with Python loops, NumPy lets us operate on entire vectors, matrices, or batches at once.

## Learning goals

By the end of this article, you should be able to:

- create and inspect NumPy arrays;
- select values with indexing and slicing;
- perform vectorized calculations;
- understand shapes, axes, and broadcasting;
- calculate common statistics;
- use reproducible random numbers; and
- recognize common mistakes involving shapes and data types.

## Installation and import

Install NumPy from your terminal:

```bash
python -m pip install numpy
```

The conventional import uses the alias `np`:

```python
import numpy as np
```

## Why use NumPy arrays?

A Python list can store numbers, but it is designed as a general-purpose container. A NumPy array stores values in a regular block with a fixed data type, which makes numerical operations more compact and usually much faster.

```python
import numpy as np

python_scores = [72, 81, 90, 65]
numpy_scores = np.array([72, 81, 90, 65])

print(numpy_scores + 5)
# [77 86 95 70]
```

Adding `5` to a Python list is not a valid element-wise operation. NumPy applies the addition to every element automatically.

## Creating arrays

### From Python data

```python
vector = np.array([2, 4, 6, 8])

matrix = np.array([
    [1, 2, 3],
    [4, 5, 6],
])
```

### Common constructors

```python
zeros = np.zeros((2, 3))
ones = np.ones((3, 2))
identity = np.eye(3)

integers = np.arange(0, 10, 2)
evenly_spaced = np.linspace(0, 1, 5)
```

The results are:

```text
arange:   [0 2 4 6 8]
linspace: [0.   0.25 0.5  0.75 1.  ]
```

Use `arange` when the step size matters. Use `linspace` when you want a specific number of evenly spaced values, including both endpoints by default.

## Shape, dimensions, size, and data type

Four array properties appear frequently:

```python
x = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
])

print(x.shape)  # (2, 3)
print(x.ndim)   # 2
print(x.size)   # 6
print(x.dtype)  # usually float64
```

- `shape` describes the length of every axis;
- `ndim` is the number of axes;
- `size` is the total number of elements; and
- `dtype` is the stored data type.

For a matrix with shape `(2, 3)`, axis `0` contains the two rows and axis `1` contains the three columns.

### Choosing a data type

```python
features = np.array([1, 2, 3], dtype=np.float32)
labels = np.array([0, 1, 1], dtype=np.int64)
```

Floating-point types are appropriate for most model inputs. Integer types are useful for class labels, counts, and indices.

You can convert an existing array with `astype`:

```python
features = labels.astype(np.float32)
```

## Indexing and slicing

NumPy uses zero-based indexing, like Python lists.

```python
x = np.array([10, 20, 30, 40, 50])

print(x[0])    # 10
print(x[-1])   # 50
print(x[1:4])  # [20 30 40]
print(x[::2])  # [10 30 50]
```

For a two-dimensional array, provide a row index and a column index:

```python
grid = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
])

print(grid[1, 2])   # 6
print(grid[0, :])   # first row
print(grid[:, 1])   # second column
print(grid[:2, :2]) # top-left 2 x 2 block
```

### Slices may share memory

A basic NumPy slice is often a **view** of the original data. Modifying the slice may also modify the original array.

```python
x = np.array([1, 2, 3, 4])
part = x[1:3]
part[0] = 99

print(x)  # [ 1 99  3  4]
```

Use `.copy()` when you need an independent array:

```python
part = x[1:3].copy()
```

## Boolean masks

A comparison produces an array of Boolean values:

```python
scores = np.array([52, 81, 67, 93, 74])
mask = scores >= 70

print(mask)
# [False  True False  True  True]

print(scores[mask])
# [81 93 74]
```

The mask can be written directly inside the brackets:

```python
passing_scores = scores[scores >= 70]
```

Combine conditions with `&`, `|`, and `~`. Put every comparison inside parentheses:

```python
middle = scores[(scores >= 60) & (scores < 90)]
```

Do not use Python's `and` or `or` for element-wise array conditions.

## Vectorized operations

NumPy arithmetic is element-wise unless an operation explicitly says otherwise.

```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(a + b)   # [5 7 9]
print(a - b)   # [-3 -3 -3]
print(a * b)   # [4 10 18]
print(a / b)   # [0.25 0.4 0.5]
print(a ** 2)  # [1 4 9]
```

Many mathematical functions also work element by element:

```python
values = np.array([1.0, 2.0, 4.0])

print(np.sqrt(values))
print(np.log(values))
print(np.exp(values))
```

### Example: sigmoid activation

The sigmoid function is:

$$
\sigma(x) = \frac{1}{1 + e^{-x}}
$$

Its NumPy implementation operates on any compatible array:

```python
def sigmoid(x: np.ndarray) -> np.ndarray:
    return 1.0 / (1.0 + np.exp(-x))

logits = np.array([-2.0, 0.0, 2.0])
print(sigmoid(logits))
```

## Reshaping and transposing

Use `reshape` to change how the same values are organized:

```python
x = np.arange(12)
matrix = x.reshape(3, 4)

print(matrix)
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]
```

The total number of elements must remain unchanged. One dimension can be inferred with `-1`:

```python
matrix = x.reshape(2, -1)  # shape becomes (2, 6)
```

Transpose a matrix with `.T`:

```python
transposed = matrix.T
```

Convert a multidimensional array into one dimension with `ravel` or `flatten`:

```python
view_when_possible = matrix.ravel()
independent_copy = matrix.flatten()
```

## Understanding axes

An axis tells NumPy which dimension an operation should collapse.

```python
scores = np.array([
    [80, 70, 90],
    [60, 85, 75],
])

print(scores.sum())         # sum of every value
print(scores.sum(axis=0))   # one sum per column
print(scores.sum(axis=1))   # one sum per row
```

For an array shaped `(samples, features)`:

- `axis=0` aggregates across samples and returns one value per feature;
- `axis=1` aggregates across features and returns one value per sample.

When you are unsure, write down the input shape and the expected output shape before choosing an axis.

## Broadcasting

Broadcasting allows NumPy to combine arrays with compatible shapes without manually copying values.

### Scalar with an array

```python
x = np.array([1, 2, 3])
print(x * 10)  # [10 20 30]
```

### Row-wise feature scaling

```python
samples = np.array([
    [1.0, 10.0, 100.0],
    [2.0, 20.0, 200.0],
])

scale = np.array([1.0, 10.0, 100.0])
print(samples / scale)
# [[1. 1. 1.]
#  [2. 2. 2.]]
```

NumPy compares shapes from right to left. Two dimensions are compatible when they are equal or when one of them is `1`.

For example, `(4, 3)` and `(3,)` are compatible. Shapes `(4, 3)` and `(4,)` are not.

### Keeping an axis

`keepdims=True` is useful when the result must remain compatible with the original array:

```python
x = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
])

row_means = x.mean(axis=1, keepdims=True)  # shape: (2, 1)
centered = x - row_means                   # broadcasts correctly
```

## Aggregations and statistics

```python
x = np.array([4, 7, 1, 9, 3])

print(x.sum())
print(x.mean())
print(x.min())
print(x.max())
print(x.std())
print(x.argmax())  # index of the largest value
```

Percentiles are useful for inspecting distributions:

```python
print(np.percentile(x, [25, 50, 75]))
```

Use `np.any` and `np.all` for Boolean arrays:

```python
probabilities = np.array([0.2, 0.7, 0.1])

print(np.any(probabilities > 0.5))
print(np.all(probabilities >= 0.0))
```

## Matrix operations

The `*` operator performs element-wise multiplication. Use `@` or `np.matmul` for matrix multiplication.

```python
x = np.array([
    [1.0, 2.0],
    [3.0, 4.0],
])

weights = np.array([
    [0.5],
    [1.5],
])

predictions = x @ weights
print(predictions)
# [[3.5]
#  [7.5]]
```

The inner dimensions must match. A matrix with shape `(m, n)` can be multiplied by a matrix with shape `(n, p)`, producing shape `(m, p)`.

Other useful linear algebra tools live in `np.linalg`:

```python
length = np.linalg.norm(np.array([3.0, 4.0]))
solution = np.linalg.solve(
    np.array([[2.0, 1.0], [1.0, 3.0]]),
    np.array([5.0, 6.0]),
)
```

When solving a linear system, prefer `np.linalg.solve(A, b)` to explicitly calculating `np.linalg.inv(A) @ b`.

## Combining and splitting arrays

```python
a = np.array([[1, 2]])
b = np.array([[3, 4]])

rows = np.concatenate([a, b], axis=0)
columns = np.concatenate([a, b], axis=1)

stacked_rows = np.vstack([a, b])
stacked_columns = np.hstack([a, b])
```

`concatenate` joins along an existing axis. `stack` creates a new axis:

```python
new_axis = np.stack([a, b], axis=0)
```

Always inspect `.shape` after combining arrays.

## Reproducible random numbers

Use a random generator with a fixed seed when experiments must be reproducible:

```python
rng = np.random.default_rng(42)

uniform = rng.random((2, 3))
normal = rng.normal(loc=0.0, scale=1.0, size=(2, 3))
integers = rng.integers(0, 10, size=5)
```

The seed makes the generated sequence repeatable. This is helpful for debugging, comparing models, and creating consistent train-validation splits.

```python
indices = np.arange(100)
rng.shuffle(indices)

train_indices = indices[:80]
validation_indices = indices[80:]
```

## AI example: standardizing features

Features with very different scales can make training harder. A common transformation subtracts the mean and divides by the standard deviation:

```python
features = np.array([
    [170.0, 65.0, 18.0],
    [182.0, 82.0, 21.0],
    [160.0, 54.0, 17.0],
    [175.0, 73.0, 20.0],
])

mean = features.mean(axis=0, keepdims=True)
std = features.std(axis=0, keepdims=True)

# Prevent division by zero for constant features.
safe_std = np.where(std == 0, 1.0, std)
standardized = (features - mean) / safe_std
```

Notice the shapes:

```text
features:     (4, 3)
mean:         (1, 3)
safe_std:     (1, 3)
standardized: (4, 3)
```

Broadcasting applies the mean and standard deviation to every sample.

## AI example: nearest neighbor distances

Suppose every row is a point with two features. We can calculate the squared distance from a query point without a Python loop:

```python
points = np.array([
    [1.0, 2.0],
    [3.0, 4.0],
    [5.0, 1.0],
])

query = np.array([2.0, 3.0])

differences = points - query
squared_distances = np.sum(differences ** 2, axis=1)
nearest_index = np.argmin(squared_distances)

print(nearest_index)          # 0
print(points[nearest_index])  # [1. 2.]
```

This pattern—broadcast, calculate element-wise, then reduce along an axis—appears throughout machine learning.

## Common mistakes

### Confusing `*` with matrix multiplication

```python
a * b  # element-wise multiplication
a @ b  # matrix multiplication
```

### Ignoring shapes

Print shapes while debugging:

```python
print('features:', features.shape)
print('weights:', weights.shape)
```

Many NumPy errors become straightforward once every shape is written down.

### Accidentally changing the original array

Remember that basic slices may be views. Use `.copy()` when independent data is required.

### Comparing floating-point values with `==`

Small rounding differences are normal in floating-point calculations. Use:

```python
np.isclose(a, b)
np.allclose(array_a, array_b)
```

### Dividing by zero

Check denominators or replace unsafe values before division:

```python
safe_denominator = np.where(denominator == 0, 1, denominator)
result = numerator / safe_denominator
```

### Using loops for array-wide arithmetic

Prefer vectorized NumPy expressions when the same numerical operation applies to every element. Python loops are still appropriate when each step has irregular control flow or depends on the result of the previous step.

## Compact reference

| Task | NumPy expression |
|---|---|
| Create an array | `np.array(data)` |
| Create zeros | `np.zeros(shape)` |
| Inspect dimensions | `x.shape`, `x.ndim`, `x.size` |
| Change shape | `x.reshape(rows, columns)` |
| Select a column | `x[:, column_index]` |
| Filter values | `x[x > threshold]` |
| Mean per column | `x.mean(axis=0)` |
| Mean per row | `x.mean(axis=1)` |
| Matrix multiplication | `a @ b` |
| Largest-value index | `np.argmax(x)` |
| Sort indices | `np.argsort(x)` |
| Join arrays | `np.concatenate([...], axis=...)` |
| Reproducible randomness | `np.random.default_rng(seed)` |
| Floating-point comparison | `np.allclose(a, b)` |

## Practice exercises

1. Create a `4 × 5` matrix containing the integers from `0` to `19`.
2. Extract the second and third columns from that matrix.
3. Replace every value greater than `10` with `10` using `np.where` or Boolean indexing.
4. Calculate the mean of every row.
5. Standardize every column to have mean `0` and standard deviation `1`.
6. Given a matrix of model scores shaped `(samples, classes)`, find the predicted class for every sample.
7. Calculate all squared distances between one query vector and a matrix of candidate vectors without writing a loop.

Possible starting point for exercise 6:

```python
scores = np.array([
    [0.1, 0.7, 0.2],
    [0.8, 0.1, 0.1],
    [0.2, 0.3, 0.5],
])

predicted_classes = np.argmax(scores, axis=1)
```

## What to learn next

After you are comfortable with arrays, shapes, axes, and broadcasting, continue with:

- data visualization with Matplotlib;
- tabular data processing with pandas;
- linear algebra and probability for machine learning;
- implementing linear regression with NumPy; and
- tensor libraries such as PyTorch.

The most important habit is simple: **track the shape of every array**. This makes numerical code easier to design, debug, and explain.
