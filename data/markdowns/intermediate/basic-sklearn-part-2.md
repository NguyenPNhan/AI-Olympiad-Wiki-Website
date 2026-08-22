---
title: Sklearn Fundamentals For AI (Part 2)
difficulty: 2
---

# Sklearn Fundamentals For AI (Part 2)

In Part 1, we learned the basic Scikit-learn workflow:

```text
Prepare data -> Split data -> Create model -> Train with fit() -> Predict with predict() -> Evaluate
```

In this part, we introduce more machine learning models and learn several important techniques for preparing data before training a model.

---

## 1. More Classification Models

In Part 1, we used `LogisticRegression`. Scikit-learn provides many other classification models. Some common models are:
```python
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import GradientBoostingClassifier
```

Because Scikit-learn uses a consistent estimator pattern, we can often switch models without changing much of our code. For example:

```python
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
```
```python
from sklearn.neighbors import KNeighborsClassifier
model = KNeighborsClassifier()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
```

## 2. More Regression Models

Some common regression models are:
```python
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.neighbors import KNeighborsRegressor
from sklearn.svm import SVR
from sklearn.ensemble import GradientBoostingRegressor
```

For example:

```python
from sklearn.ensemble import RandomForestRegressor
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
```
Again, the general workflow is the same. On surface, we often do not care about what happens inside the model. Rather, we pay attention to input and output of each model and try every model to find the best one.

---

## 3. Why Feature Scale Matters

Suppose our dataset contains:

| Age | Income |
|---:|---:|
| 20 | 30000 |
| 25 | 45000 |
| 30 | 60000 |

The two features have very different scales:

```text
Age    → around 20–30
Income → around 30,000–60,000
```

Some machine learning algorithms are sensitive to differences in feature scale. For example: `K-Nearest Neighbors`, `Support Vector Machines`, `Logistic Regression`, `K-Means`. For these models, it is often useful to **standardize** numerical features before training.

---

## 4. `StandardScaler`

Scikit-learn provides `StandardScaler` for standardizing numerical features.
```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
```
`StandardScaler` transforms each feature approximately using:
$$
z = \frac{x-\mu}{\sigma}
$$

where:

- $x$ is the original value
- $\mu$ is the mean of the feature
- $\sigma$ is the standard deviation
- $z$ is the standardized value

After standardization, features usually have approximately `mean = 0, standard deviation = 1`.

---

## 5. `fit()` vs `transform()`

Preprocessing tools such as `StandardScaler` also follow the Scikit-learn estimator pattern. `fit()` learns information from the data:

```python
scaler.fit(X_train)
```

For `StandardScaler`, this means learning the mean and standard deviation of each feature. `transform()` uses the learned information to transform data:

```python
X_train_scaled = scaler.transform(X_train)
```

We can combine both operations using:

```python
X_train_scaled = scaler.fit_transform(X_train)
```

This is equivalent to:

```python
scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
```

---

## 6. Scale Training and Testing Data Correctly

The scaler should normally learn only from the **training data**.

Correct:

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

Notice that we use:

```text
fit_transform() → training data
transform()     → testing data
```

We should not use:

```python
X_test_scaled = scaler.fit_transform(X_test)
```

because the testing data should not be used to learn preprocessing parameters.

The important pattern is:

```text
Training data → fit + transform
Testing data  → transform only
```

---

## 7. Train a Model with Scaled Data

After scaling, use the transformed features to train the model.

```python
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = LogisticRegression()

model.fit(
    X_train_scaled,
    y_train
)

y_pred = model.predict(
    X_test_scaled
)
```

---

## 8. Categorical Data

Machine learning datasets often contain categorical features.

For example:

| Age | City | Education |
|---:|---|---|
| 20 | Singapore | High School |
| 25 | Hanoi | Bachelor |
| 30 | Singapore | Master |

Here:

```text
Age       → numerical
City      → categorical
Education → categorical
```

Most Scikit-learn models cannot directly use text such as:

```text
Singapore
Hanoi
Bachelor
Master
```

We therefore need to convert categorical values into numerical representations.

This process is called **encoding**.

---

## 9. Binary Encoding with `map()`

For a categorical feature with only two categories, we can sometimes manually convert categories into `0` and `1`.

Suppose:

```python
df["smoker"]
```

contains:

```text
Yes
No
Yes
No
```

We can write:

```python
df["smoker"] = df["smoker"].map({
    "No": 0,
    "Yes": 1
})
```

The result becomes:

```text
0
1
0
1
```

This approach is simple and useful for binary categorical variables.

---

## 10. Label Encoding

Another method is `LabelEncoder`.

Import:

```python
from sklearn.preprocessing import LabelEncoder
```

Example:

```python
encoder = LabelEncoder()

df["city_encoded"] = encoder.fit_transform(
    df["city"]
)
```

Suppose:

```text
Hanoi
Singapore
Tokyo
```

The result might become:

```text
Hanoi      → 0
Singapore  → 1
Tokyo      → 2
```

However, these numbers may accidentally suggest an ordering:

```text
Tokyo > Singapore > Hanoi
```

even though cities do not have such an order.

Therefore, `LabelEncoder` is generally more appropriate for encoding **target labels** than ordinary unordered input features.

For example:

```python
y = encoder.fit_transform(df["species"])
```

---

## 11. Ordinal Encoding

Some categorical variables have a meaningful order.

For example:

```text
Low < Medium < High
```

or:

```text
High School < Bachelor < Master < PhD
```

We can manually map them:

```python
df["education"] = df["education"].map({
    "High School": 0,
    "Bachelor": 1,
    "Master": 2,
    "PhD": 3
})
```

Scikit-learn also provides `OrdinalEncoder`.

```python
from sklearn.preprocessing import OrdinalEncoder

encoder = OrdinalEncoder(
    categories=[[
        "High School",
        "Bachelor",
        "Master",
        "PhD"
    ]]
)

df[["education"]] = encoder.fit_transform(
    df[["education"]]
)
```

Ordinal encoding should be used when the categories have a meaningful order.

---

## 12. One-Hot Encoding

For categorical variables without a meaningful order, one-hot encoding is usually more appropriate.

Suppose:

```text
City
----
Singapore
Hanoi
Tokyo
```

One-hot encoding creates separate columns:

| City_Singapore | City_Hanoi | City_Tokyo |
|---:|---:|---:|
| 1 | 0 | 0 |
| 0 | 1 | 0 |
| 0 | 0 | 1 |

Each category becomes its own binary feature.

---

## 13. One-Hot Encoding with Pandas

Pandas provides a convenient function:

```python
pd.get_dummies()
```

Example:

```python
df = pd.get_dummies(
    df,
    columns=["city"]
)
```

A column such as:

```text
city
----
Singapore
Hanoi
Tokyo
```

may become:

```text
city_Hanoi
city_Singapore
city_Tokyo
```

This is one of the simplest ways to encode categorical data when exploring a dataset.

---

## 14. `OneHotEncoder`

Scikit-learn also provides `OneHotEncoder`.

Import:

```python
from sklearn.preprocessing import OneHotEncoder
```

Create an encoder:

```python
encoder = OneHotEncoder(
    handle_unknown="ignore"
)
```

Train and transform:

```python
X_train_encoded = encoder.fit_transform(
    X_train[["city"]]
)

X_test_encoded = encoder.transform(
    X_test[["city"]]
)
```

Again, notice the same pattern:

```text
Training data → fit + transform
Testing data  → transform only
```

`handle_unknown="ignore"` is useful because the testing data may contain a category that was not present in the training data.

---

## 15. Choosing an Encoding Method

A simple guide is:

| Type of Feature | Possible Method |
|---|---|
| Yes / No | Map to `0` and `1` |
| Ordered categories | Ordinal encoding |
| Unordered categories | One-hot encoding |
| Target labels | Label encoding |

For example:

```text
Smoker: Yes / No
→ 0 / 1

Education: High School / Bachelor / Master / PhD
→ Ordinal encoding

City: Singapore / Hanoi / Tokyo
→ One-hot encoding

Target: Cat / Dog / Bird
→ Label encoding
```

There is no single encoding method that is best for every problem. The correct approach depends on what the categorical variable represents.

---

# Clustering

So far, most models we used were **supervised learning** models.

They use:

```text
X → model → y
```

where the correct target `y` is known during training.

Clustering is different.

Clustering is an **unsupervised learning** task. We usually have only:

```text
X
```

and ask the algorithm to find groups or patterns in the data.

---

## 16. K-Means Review

One common clustering algorithm is `KMeans`.

```python
from sklearn.cluster import KMeans

model = KMeans(
    n_clusters=3,
    random_state=42
)

model.fit(X)
```

We can obtain the cluster assigned to each sample:

```python
labels = model.labels_

print(labels)
```

For example:

```text
[0 0 2 2 1 1]
```

This means each observation has been assigned to one of three clusters:

```text
Cluster 0
Cluster 1
Cluster 2
```

The numbers themselves do not have an inherent meaning. Cluster `2` is not necessarily better or larger than cluster `1`.

---

## 17. Scaling Before Clustering

Many clustering algorithms depend on distances between observations.

Suppose we cluster using:

```text
Age    → 18–80
Income → 10,000–200,000
```

Without scaling, income may dominate the distance calculation simply because its numbers are much larger.

Therefore, scaling is often especially important for clustering.

```python
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)

model = KMeans(
    n_clusters=3,
    random_state=42
)

labels = model.fit_predict(X_scaled)
```

---

## 18. `fit_predict()`

Clustering algorithms often provide:

```python
fit_predict()
```

Instead of:

```python
model.fit(X)

labels = model.labels_
```

we can write:

```python
labels = model.fit_predict(X)
```

For example:

```python
from sklearn.cluster import KMeans

model = KMeans(
    n_clusters=3,
    random_state=42
)

labels = model.fit_predict(X_scaled)
```

---

## 19. More Clustering Models

Scikit-learn provides several clustering algorithms.

Some common ones are:

```text
KMeans
DBSCAN
AgglomerativeClustering
MeanShift
Birch
SpectralClustering
```

Imports:

```python
from sklearn.cluster import KMeans
from sklearn.cluster import DBSCAN
from sklearn.cluster import AgglomerativeClustering
from sklearn.cluster import MeanShift
from sklearn.cluster import Birch
from sklearn.cluster import SpectralClustering
```

Different clustering algorithms define clusters in different ways.

---

## 20. DBSCAN

`DBSCAN` stands for **Density-Based Spatial Clustering of Applications with Noise**.

Unlike K-Means, we do not directly tell DBSCAN how many clusters to create.

```python
from sklearn.cluster import DBSCAN

model = DBSCAN(
    eps=0.5,
    min_samples=5
)

labels = model.fit_predict(X_scaled)
```

Two important parameters are:

```text
eps
min_samples
```

`eps` controls how close observations must be to be considered neighbors.

`min_samples` controls how many nearby observations are required to form a dense region.

DBSCAN can also identify observations that do not belong to any cluster.

These observations receive the label:

```text
-1
```

For example:

```text
[0, 0, 0, 1, 1, -1]
```

Here:

```text
0  → cluster 0
1  → cluster 1
-1 → noise / outlier
```

DBSCAN is useful when clusters have irregular shapes or when the data contains noise.

---

## 21. Agglomerative Clustering

Another clustering method is `AgglomerativeClustering`.

```python
from sklearn.cluster import AgglomerativeClustering

model = AgglomerativeClustering(
    n_clusters=3
)

labels = model.fit_predict(X_scaled)
```

Agglomerative clustering is a form of **hierarchical clustering**.

It starts with individual observations and gradually combines similar observations into larger groups.

Conceptually:

```text
Individual observations
        ↓
Small groups
        ↓
Larger groups
        ↓
Final clusters
```

---

## 22. Birch

`Birch` is another clustering algorithm available in Scikit-learn.

```python
from sklearn.cluster import Birch

model = Birch(
    n_clusters=3
)

labels = model.fit_predict(X_scaled)
```

BIRCH is designed to efficiently cluster relatively large datasets by building a compact representation of the data.

---

## 23. Mean Shift

`MeanShift` attempts to find dense regions in the feature space.

```python
from sklearn.cluster import MeanShift

model = MeanShift()

labels = model.fit_predict(X_scaled)
```

Unlike K-Means, we do not necessarily have to specify the number of clusters beforehand.

However, Mean Shift can become computationally expensive on large datasets.

---

## 24. Spectral Clustering

Scikit-learn also provides `SpectralClustering`.

```python
from sklearn.cluster import SpectralClustering

model = SpectralClustering(
    n_clusters=3,
    random_state=42
)

labels = model.fit_predict(X_scaled)
```

Spectral clustering can be useful when groups cannot be separated well using simple spherical clusters.

---

## 25. Comparing Common Clustering Models

| Model | Need Number of Clusters? | Can Detect Noise? |
|---|---|---|
| `KMeans` | Yes | No |
| `DBSCAN` | No | Yes |
| `AgglomerativeClustering` | Usually yes | No |
| `MeanShift` | No | No |
| `Birch` | Optional | No |
| `SpectralClustering` | Yes | No |

A useful starting point is:

```text
KMeans
→ Simple general-purpose clustering

DBSCAN
→ Clusters with noise or irregular shapes

AgglomerativeClustering
→ Hierarchical relationships

Birch
→ Larger datasets
```

There is no clustering algorithm that is best for every dataset.

---

## 26. Complete Scaling and Classification Example

Suppose we want to predict whether a student passes.

```python
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score


X = df[[
    "hours_studied",
    "attendance"
]]

y = df["passed"]


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(
    X_train
)

X_test_scaled = scaler.transform(
    X_test
)


model = KNeighborsClassifier()

model.fit(
    X_train_scaled,
    y_train
)


y_pred = model.predict(
    X_test_scaled
)


accuracy = accuracy_score(
    y_test,
    y_pred
)

print(accuracy)
```

The workflow is now:

```text
Prepare X and y
        ↓
Train/test split
        ↓
Fit scaler on training data
        ↓
Transform training and testing data
        ↓
Train model
        ↓
Predict
        ↓
Evaluate
```

---

## 27. Complete Clustering Example

Suppose we have customer data:

```python
import pandas as pd

df = pd.DataFrame({
    "age": [
        20, 22, 23,
        45, 47, 50,
        70, 72, 75
    ],
    "income": [
        20000, 22000, 25000,
        60000, 65000, 62000,
        90000, 95000, 92000
    ]
})
```

Create the features:

```python
X = df[[
    "age",
    "income"
]]
```

Scale them:

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)
```

Create the clustering model:

```python
from sklearn.cluster import KMeans

model = KMeans(
    n_clusters=3,
    random_state=42
)

clusters = model.fit_predict(X_scaled)
```

Add the clusters back to the DataFrame:

```python
df["cluster"] = clusters

print(df)
```

Now each observation has been assigned to a cluster.

---

## Quick Reference

```python
# Standardize numerical features.
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

X_train_scaled = scaler.fit_transform(
    X_train
)

X_test_scaled = scaler.transform(
    X_test
)


# One-hot encode categorical features.
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(
    handle_unknown="ignore"
)


# Encode ordered categories.
from sklearn.preprocessing import OrdinalEncoder

encoder = OrdinalEncoder()


# Encode target labels.
from sklearn.preprocessing import LabelEncoder

encoder = LabelEncoder()


# Classification models.
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB


# Regression models.
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.neighbors import KNeighborsRegressor
from sklearn.svm import SVR


# Clustering models.
from sklearn.cluster import KMeans
from sklearn.cluster import DBSCAN
from sklearn.cluster import AgglomerativeClustering
from sklearn.cluster import Birch
from sklearn.cluster import MeanShift
from sklearn.cluster import SpectralClustering


# Fit a preprocessing tool on training data.
scaler.fit(X_train)


# Transform data.
scaler.transform(X_test)


# Fit and transform in one step.
scaler.fit_transform(X_train)


# Train a clustering model and return cluster labels.
labels = model.fit_predict(X_scaled)
```

---

## Main Ideas

The most important ideas from this part are:

```text
Different Scikit-learn models use a similar API:

model.fit(...)
model.predict(...)

Numerical features may need scaling:

StandardScaler

Categorical features must usually be encoded:

Binary mapping
Ordinal encoding
One-hot encoding
Label encoding

Preprocessing should learn from training data only:

Training → fit_transform()
Testing  → transform()

Clustering is unsupervised learning:

KMeans
DBSCAN
AgglomerativeClustering
Birch
MeanShift
SpectralClustering
```

Once these concepts are familiar, we can start combining preprocessing and machine learning models into a single Scikit-learn workflow.
