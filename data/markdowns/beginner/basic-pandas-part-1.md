---
title: Pandas Fundamentals For AI (Part 1)
difficulty: 1
---

# Pandas Fundamentals For AI (Part 1)

Pandas is a Python library for working with **tabular data** such as CSV files, spreadsheets, and datasets.

```python
import pandas as pd
```

---

## 1. Create a Series

A `Series` is a one-dimensional collection of values.

```python
s = pd.Series([10, 20, 30, 40])

print(s)
```

Output:

```text
0    10
1    20
2    30
3    40
dtype: int64
```

You can also give custom labels to the values.

```python
s = pd.Series(
    [10, 20, 30],
    index=["a", "b", "c"]
)

print(s)
```

Access a value using its label:

```python
s["b"]  # 20
```

---

## 2. Create a DataFrame

A `DataFrame` is a two-dimensional table with rows and columns.

```python
data = {
    "name": ["Alice", "Bob", "Charlie"],
    "age": [18, 20, 19],
    "score": [85, 92, 78]
}

df = pd.DataFrame(data)

print(df)
```

Output:

```text
      name  age  score
0    Alice   18     85
1      Bob   20     92
2  Charlie   19     78
```

---

## 3. Read a CSV File

Use `pd.read_csv()` to load a CSV file.

```python
df = pd.read_csv("students.csv")
```

Example `students.csv`:

```csv
name,age,score
Alice,18,85
Bob,20,92
Charlie,19,78
```

After loading:

```python
print(df)
```

```text
      name  age  score
0    Alice   18     85
1      Bob   20     92
2  Charlie   19     78
```

---

## 4. View Data

### First Rows

```python
df.head()
```

By default, `head()` shows the first 5 rows.

```python
df.head(2)
```

Output:

```text
    name  age  score
0  Alice   18     85
1    Bob   20     92
```

### Last Rows

```python
df.tail()
```

Show a specific number of rows:

```python
df.tail(2)
```

---

## 5. DataFrame Information

### Shape

```python
df.shape
```

Example:

```text
(3, 3)
```

This means:

```text
3 rows
3 columns
```

You can access them separately:

```python
rows = df.shape[0]
columns = df.shape[1]
```

### Column Names

```python
df.columns
```

Example:

```text
Index(['name', 'age', 'score'], dtype='object')
```

Convert them to a normal list:

```python
df.columns.tolist()
```

```text
['name', 'age', 'score']
```

### Data Types

```python
df.dtypes
```

Example:

```text
name     object
age       int64
score     int64
dtype: object
```

### General Information

```python
df.info()

"""
This shows information such as:
- number of rows
- column names
- missing values
- data types
- memory usage
"""
```

---

## 6. Select a Column

Use square brackets to select a column.

```python
df["name"]
```

Output:

```text
0      Alice
1        Bob
2    Charlie
Name: name, dtype: object
```

The result is a `Series`.

```python
type(df["name"])
```

```text
pandas.core.series.Series
```

---

## 7. Select Multiple Columns

Use a list of column names.

```python
df[["name", "score"]]
```

Output:

```text
      name  score
0    Alice     85
1      Bob     92
2  Charlie     78
```

The result is a `DataFrame`.

```python
type(df[["name", "score"]])
```

```text
pandas.core.frame.DataFrame
```

---

## 8. Select Rows with `iloc`

`iloc` selects rows and columns using their **integer positions**.

```python
df.iloc[0]
```

Select the first row:

```text
name     Alice
age         18
score       85
Name: 0, dtype: object
```

Select multiple rows:

```python
df.iloc[0:2]
```

```text
    name  age  score
0  Alice   18     85
1    Bob   20     92
```

Select a specific cell:

```python
df.iloc[1, 2]
```

```text
92
```

Here:

```text
1 → second row
2 → third column
```

---

## 9. Select Rows with `loc`

`loc` selects data using **labels**.

```python
df.loc[0]
```

Select a specific row and column:

```python
df.loc[1, "score"]
```

```text
92
```

Select several columns:

```python
df.loc[:, ["name", "score"]]
```

```text
      name  score
0    Alice     85
1      Bob     92
2  Charlie     78
```

---

## 10. Filter Rows

Pandas makes it easy to select rows that satisfy a condition.

```python
df[df["score"] >= 80]
```

Output:

```text
    name  age  score
0  Alice   18     85
1    Bob   20     92
```

Filter by age:

```python
df[df["age"] == 20]
```

```text
  name  age  score
1  Bob   20     92
```

---

## 11. Multiple Conditions

Use `&` for **AND**.

```python
df[
    (df["age"] >= 18) &
    (df["score"] >= 80)
]
```

Use `|` for **OR**.

```python
df[
    (df["age"] == 18) |
    (df["score"] >= 90)
]
```

Always put each condition inside parentheses.

```python
(df["age"] >= 18)
```

---

## 12. Add a Column

Create a new column by assigning values to a new column name.

```python
df["passed"] = df["score"] >= 80
```

Result:

```text
      name  age  score  passed
0    Alice   18     85    True
1      Bob   20     92    True
2  Charlie   19     78   False
```

You can also calculate a column:

```python
df["score_plus_5"] = df["score"] + 5
```

---

## 13. Modify a Column

You can replace an existing column.

```python
df["score"] = df["score"] + 10
```

Or modify selected rows:

```python
df.loc[df["name"] == "Alice", "score"] = 100
```

---

## 14. Remove a Column

Use `drop()`.

```python
df = df.drop(columns=["passed"])
```

Remove multiple columns:

```python
df = df.drop(
    columns=["passed", "score_plus_5"]
)
```

You can also modify the existing DataFrame directly:

```python
df.drop(columns=["passed"], inplace=True)
```

---

## 15. Sort Data

Sort rows by a column:

```python
df.sort_values("score")
```

Ascending order is the default.

For descending order:

```python
df.sort_values(
    "score",
    ascending=False
)
```

Sort by multiple columns:

```python
df.sort_values(
    ["age", "score"],
    ascending=[True, False]
)
```

---

## 16. Basic Statistics

### Mean

```python
df["score"].mean()
```

### Maximum

```python
df["score"].max()
```

### Minimum

```python
df["score"].min()
```

### Sum

```python
df["score"].sum()
```

### Count

```python
df["score"].count()
```

### Summary

```python
df.describe()
```

Example:

```text
        age      score
count   3.0   3.000000
mean   19.0  85.000000
std     1.0   7.000000
min    18.0  78.000000
25%    18.5  81.500000
50%    19.0  85.000000
75%    19.5  88.500000
max    20.0  92.000000
```

---

## Quick Reference

```python
import pandas as pd

# Create DataFrame
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Charlie"],
    "age": [18, 20, 19],
    "score": [85, 92, 78]
})

# Read CSV
df = pd.read_csv("students.csv")

# View data
df.head()
df.tail()

# Information
df.shape
df.columns
df.dtypes
df.info()

# Select columns
df["name"]
df[["name", "score"]]

# Select rows
df.iloc[0]
df.loc[0]

# Select a cell
df.iloc[1, 2]
df.loc[1, "score"]

# Filter
df[df["score"] >= 80]

# Multiple conditions
df[
    (df["age"] >= 18) &
    (df["score"] >= 80)
]

# Add column
df["passed"] = df["score"] >= 80

# Modify values
df["score"] = df["score"] + 5

# Remove column
df.drop(columns=["passed"], inplace=True)

# Sort
df.sort_values("score")
df.sort_values("score", ascending=False)

# Statistics
df["score"].mean()
df["score"].max()
df["score"].min()
df["score"].sum()
df.describe()
```
