---
title: Pandas Fundamentals For AI (Part 2)
difficulty: 1
---

# Pandas Fundamentals For AI (Part 2)

This section covers common Pandas operations used when preparing datasets for analysis and machine learning.

```python
import pandas as pd
```

---

## 1. Create a DataFrame

```python
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Charlie", "David"],
    "age": [20, 21, 19, 22],
    "city": ["Tokyo", "London", "Tokyo", "Paris"],
    "score": [85, 72, 91, 78]
})

print(df)
```

Output:

```text
      name  age    city  score
0    Alice   20   Tokyo     85
1      Bob   21  London     72
2  Charlie   19   Tokyo     91
3    David   22   Paris     78
```

---

## 2. Rename Columns

Rename one or more columns with `rename()`.

```python
df = df.rename(columns={
    "score": "exam_score"
})
```

You can also replace all column names:

```python
df.columns = ["name", "age", "city", "score"]
```

---

## 3. Change Data Types

Use `astype()` to convert a column into another data type.

```python
df["age"] = df["age"].astype(float)
```

Convert multiple columns:

```python
df = df.astype({
    "age": "int64",
    "score": "float64"
})
```

Check data types:

```python
df.dtypes
```

---

## 4. Create New Columns

Columns can be created using normal Python expressions.

```python
df["passed"] = df["score"] >= 80
```

```python
df["score_percent"] = df["score"] / 100
```

Using existing columns:

```python
df["description"] = df["name"] + " - " + df["city"]
```

---

## 5. Apply a Function

Use `apply()` when you want to run a function on every value.

```python
df["name_length"] = df["name"].apply(len)
```

With a lambda function:

```python
df["grade"] = df["score"].apply(
    lambda x: "A" if x >= 85 else "B"
)
```

For several conditions:

```python
def get_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "D"


df["grade"] = df["score"].apply(get_grade)
```

---

## 6. Replace Values

Replace specific values:

```python
df["city"] = df["city"].replace({
    "Tokyo": "Japan",
    "London": "UK",
    "Paris": "France"
})
```

Replace a single value:

```python
df["city"] = df["city"].replace("Tokyo", "Japan")
```

---

## 7. Map Values

`map()` is useful for transforming values in a single column.

```python
city_code = {
    "Tokyo": 0,
    "London": 1,
    "Paris": 2
}

df["city_code"] = df["city"].map(city_code)
```

Example:

```text
Tokyo  -> 0
London -> 1
Paris  -> 2
```

---

# Dummy Variables / One-Hot Encoding

Machine learning models usually require numerical inputs.

Suppose we have:

```python
df = pd.DataFrame({
    "city": ["Tokyo", "London", "Tokyo", "Paris"]
})
```

The `city` column contains categorical values:

```text
Tokyo
London
Tokyo
Paris
```

We can convert these categories into numerical dummy columns.

---

## 8. `pd.get_dummies()`

```python
dummy = pd.get_dummies(df["city"])

print(dummy)
```

Output:

```text
   London  Paris  Tokyo
0   False  False   True
1    True  False  False
2   False  False   True
3   False   True  False
```

To get `0` and `1` instead:

```python
dummy = pd.get_dummies(
    df["city"],
    dtype=int
)
```

Output:

```text
   London  Paris  Tokyo
0       0      0      1
1       1      0      0
2       0      0      1
3       0      1      0
```

---

## 9. Add Dummy Columns to a DataFrame

You can encode a categorical column directly.

```python
df = pd.get_dummies(
    df,
    columns=["city"],
    dtype=int
)
```

Result:

```text
   city_London  city_Paris  city_Tokyo
0            0           0           1
1            1           0           0
2            0           0           1
3            0           1           0
```

---

## 10. Encode Multiple Columns

```python
df = pd.DataFrame({
    "city": ["Tokyo", "London", "Paris"],
    "gender": ["M", "F", "F"]
})
```

Encode both columns:

```python
df = pd.get_dummies(
    df,
    columns=["city", "gender"],
    dtype=int
)
```

Possible result:

```text
   city_London  city_Paris  city_Tokyo  gender_F  gender_M
0            0           0           1         0         1
1            1           0           0         1         0
2            0           1           0         1         0
```

---

## 11. `drop_first=True`

Sometimes one dummy column is unnecessary.

```python
df = pd.get_dummies(
    df,
    columns=["city"],
    drop_first=True,
    dtype=int
)
```

Instead of:

```text
city_London
city_Paris
city_Tokyo
```

you may get:

```text
city_Paris
city_Tokyo
```

The missing category can be inferred when all other dummy columns are `0`.

This is commonly useful in statistical models.

---

# Missing Values

Missing values are usually represented as `NaN`.

```python
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Charlie"],
    "score": [85, None, 91]
})
```

---

## 12. Find Missing Values

```python
df.isna()
```

Count missing values:

```python
df.isna().sum()
```

Equivalent:

```python
df.isnull().sum()
```

---

## 13. Remove Missing Values

Remove rows containing missing values:

```python
df = df.dropna()
```

Remove rows only if `score` is missing:

```python
df = df.dropna(
    subset=["score"]
)
```

---

## 14. Fill Missing Values

Fill missing values with a fixed value:

```python
df["score"] = df["score"].fillna(0)
```

Fill with the mean:

```python
df["score"] = df["score"].fillna(
    df["score"].mean()
)
```

Fill with the median:

```python
df["score"] = df["score"].fillna(
    df["score"].median()
)
```

Fill categorical values:

```python
df["city"] = df["city"].fillna("Unknown")
```

---

# Sorting

## 15. Sort Values

Sort ascending:

```python
df = df.sort_values("score")
```

Sort descending:

```python
df = df.sort_values(
    "score",
    ascending=False
)
```

Sort using multiple columns:

```python
df = df.sort_values(
    ["city", "score"],
    ascending=[True, False]
)
```

---

# Unique Values

## 16. Find Unique Values

```python
df["city"].unique()
```

Example:

```text
array(['Tokyo', 'London', 'Paris'], dtype=object)
```

Number of unique values:

```python
df["city"].nunique()
```

---

## 17. Count Values

```python
df["city"].value_counts()
```

Example:

```text
Tokyo     2
London    1
Paris     1
```

Get proportions:

```python
df["city"].value_counts(
    normalize=True
)
```

---

# Duplicates

## 18. Find Duplicates

```python
df.duplicated()
```

Count duplicated rows:

```python
df.duplicated().sum()
```

Check duplicates using specific columns:

```python
df.duplicated(
    subset=["name"]
)
```

---

## 19. Remove Duplicates

```python
df = df.drop_duplicates()
```

Using specific columns:

```python
df = df.drop_duplicates(
    subset=["name"]
)
```

Keep the last duplicate:

```python
df = df.drop_duplicates(
    subset=["name"],
    keep="last"
)
```

---

# Reset Index

Operations such as filtering and sorting can leave unusual index values.

```python
df = df.reset_index()
```

This keeps the previous index as a column.

Usually, you want:

```python
df = df.reset_index(
    drop=True
)
```

---

# Combine DataFrames

## 20. `pd.concat()`

Combine DataFrames vertically:

```python
df1 = pd.DataFrame({
    "name": ["Alice", "Bob"]
})

df2 = pd.DataFrame({
    "name": ["Charlie", "David"]
})

df = pd.concat(
    [df1, df2],
    ignore_index=True
)
```

Result:

```text
      name
0    Alice
1      Bob
2  Charlie
3    David
```

Combine horizontally:

```python
df = pd.concat(
    [df1, df2],
    axis=1
)
```

---

# Merge DataFrames

## 21. `pd.merge()`

Suppose we have two tables.

```python
students = pd.DataFrame({
    "id": [1, 2, 3],
    "name": ["Alice", "Bob", "Charlie"]
})

scores = pd.DataFrame({
    "id": [1, 2, 3],
    "score": [85, 72, 91]
})
```

Merge them using `id`:

```python
df = pd.merge(
    students,
    scores,
    on="id"
)
```

Result:

```text
   id     name  score
0   1    Alice     85
1   2      Bob     72
2   3  Charlie     91
```

---

## Merge Types

### Inner Join

Keep rows appearing in both DataFrames.

```python
pd.merge(
    df1,
    df2,
    on="id",
    how="inner"
)
```

### Left Join

Keep every row from the left DataFrame.

```python
pd.merge(
    df1,
    df2,
    on="id",
    how="left"
)
```

### Right Join

Keep every row from the right DataFrame.

```python
pd.merge(
    df1,
    df2,
    on="id",
    how="right"
)
```

### Outer Join

Keep every row from both DataFrames.

```python
pd.merge(
    df1,
    df2,
    on="id",
    how="outer"
)
```

---

# String Operations

Pandas provides string functions through `.str`.

```python
df["name"].str.lower()
```

```python
df["name"].str.upper()
```

```python
df["name"].str.title()
```

---

## 22. Remove Extra Spaces

```python
df["name"] = df["name"].str.strip()
```

Remove spaces on the left:

```python
df["name"] = df["name"].str.lstrip()
```

Remove spaces on the right:

```python
df["name"] = df["name"].str.rstrip()
```

---

## 23. Search Strings

```python
df[df["name"].str.contains("Ali")]
```

Case-insensitive:

```python
df[
    df["name"].str.contains(
        "alice",
        case=False
    )
]
```

---

## 24. Replace Text

```python
df["name"] = df["name"].str.replace(
    "Alice",
    "Alicia"
)
```

---

## 25. Split Strings

```python
df["email"] = [
    "alice@gmail.com",
    "bob@yahoo.com"
]

df["domain"] = df["email"].str.split("@").str[1]
```

Result:

```text
gmail.com
yahoo.com
```

---

# Quick reference

```python
# Rename column
df.rename(columns={"old": "new"})

# Change data type
df["age"] = df["age"].astype(int)

# Create column
df["passed"] = df["score"] >= 80

# Apply function
df["grade"] = df["score"].apply(func)

# Replace values
df["city"] = df["city"].replace({"Tokyo": "Japan"})

# Map values
df["code"] = df["city"].map(mapping)

# One-hot encoding
pd.get_dummies(df, columns=["city"], dtype=int)

# Check missing values
df.isna().sum()

# Remove missing values
df.dropna()

# Fill missing values
df["score"].fillna(df["score"].mean())

# Sort
df.sort_values("score", ascending=False)

# Unique values
df["city"].unique()

# Value counts
df["city"].value_counts()

# Remove duplicates
df.drop_duplicates()

# Reset index
df.reset_index(drop=True)

# Combine rows
pd.concat([df1, df2], ignore_index=True)

# Merge tables
pd.merge(df1, df2, on="id", how="left")

# String operations
df["name"].str.lower()
df["name"].str.strip()
df["name"].str.contains("Alice")
```

---

## Example: Basic Data Cleaning Pipeline

```python
import pandas as pd

df = pd.read_csv("data.csv")

# Remove duplicates
df = df.drop_duplicates()

# Fill missing ages
df["age"] = df["age"].fillna(
    df["age"].median()
)

# Fill missing categories
df["city"] = df["city"].fillna("Unknown")

# Clean strings
df["name"] = df["name"].str.strip()

# Create a new feature
df["passed"] = df["score"] >= 80

# Convert categorical columns
df = pd.get_dummies(
    df,
    columns=["city"],
    dtype=int
)

# Reset index
df = df.reset_index(drop=True)

print(df.head())
```

This type of workflow is very common before training a machine learning model.
