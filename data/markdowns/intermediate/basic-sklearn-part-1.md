---
title: Sklearn Fundamentals For AI (Part 1)
difficulty: 2
---

# Sklearn Fundamentals For AI (Part 1)

Scikit-learn, usually imported through the `sklearn` package, is one of the most commonly used Python libraries for machine learning.

---

## 1. Import Scikit-learn Tools

Unlike Pandas, Scikit-learn is usually not imported with one short alias. Instead, we import the specific tools that we need.

For example:

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
```

Different tools are stored in different Scikit-learn modules. For example: `sklearn.model_selection`, `sklearn.linear_model`, `sklearn.metrics`, `sklearn.preprocessing`, `sklearn.ensemble`.

---

## 2. Create a Dataset

Scikit-learn works very well with Pandas DataFrames. Suppose we have student data:

```python
import pandas as pd

df = pd.DataFrame({
    "hours_studied": [1, 2, 2, 3, 4, 5, 6, 7, 8, 9],
    "attendance": [50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
    "passed": [0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
})

print(df)
```

```text
   hours_studied  attendance  passed
0              1          50       0
1              2          55       0
2              2          60       0
3              3          65       0
4              4          70       1
5              5          75       1
6              6          80       1
7              7          85       1
8              8          90       1
9              9          95       1
```

The goal is to use `hours_studied` and `attendance` to predict `passed`.

---

## 3. Features and Target

In machine learning, the input variables are commonly called **features**. The variable we want to predict is called the **target**. For our example:

```text
Features: hours_studied, attendance
Target: passed
```

Scikit-learn conventionally uses `X = features` and `y = target`. Notice that `X` is usually uppercase and `y` is usually lowercase.

---

## 4. Create `X`

Use `pandas` to select the columns that we will use to train module to predict the target. 

```python
X = df[["hours_studied", "attendance"]] # We can also use: X = df.drop(columns=["passed"])
print(X)
```
```text
   hours_studied  attendance
0              1          50
1              2          55
2              2          60
3              3          65
4              4          70
...
```
---

## 5. Create `y`

```python
y = df["passed"]
print(y)
```
```text
0    0
1    0
2    0
3    0
4    1
5    1
6    1
7    1
8    1
9    1
```

The relationship can be thought of as `X → model → y`. Hence, model learns how the features in `X` relate to the target `y`.

---

## 6. Check the Shape

You can inspect the dimensions of the data using `.shape`.

```python
X.shape
```
```text
(10, 2)
```

This means `X` has 10 row, each row has 2 features (or columns). 

We can also do so for the target:

```python
y.shape
```
```text
(10,)
```

This means that there are 10 target values.

---

## 7. Training Data and Testing Data

We should not train a model and evaluate it using exactly the same data. Instead, we divide the dataset into `training_data` and `testing_data`. The **training data** is used to teach the model. On the other hand, **testing data** is used to evaluate how well the model works on data it did not train on.

---

## 8. `train_test_split()`

We can use the function `train_test_split()` from sklearn to split our dataset into two parts: `training_data` and `testing_data`.

In the code below, test_size specifies the proportion of the dataset used for testing. Usually, we set `test_size = 0.2`, which means that 80% of the data is used to train the model and 20% is used to evaluate it.

`random_state` controls how the data is randomly split. Setting a fixed value, such as `random_state = 42`, ensures that we get the same training and testing sets every time we run the code. This makes our results reproducible.

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

The result is four datasets:

```text
X_train -> features used for training
y_train -> correct answers used for training
X_test  -> features used for testing
y_test  -> correct answers used for evaluation
```

---

## 11. Classification vs Regression

Two major types of supervised machine learning are:

### Classification

Classification predicts a **category**. For example:

```python
y = df["passed"]
```

where:

```text
0 = failed
1 = passed
```

This is a classification problem.

---

### Regression

Regression predicts a **numerical value**. For example:

```text
Age, BMI, exercise → blood pressure
```

The above one would be a regression problem if blood pressure is predicted as a continuous number.

---

## 12. Create a Classification Model

One common classification model is logistic regression. We can import it from `sklearn.linear_model`.

```python
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
```
At this point, the model has been created but has **not learned anything yet**.

---

## 13. Train the Model with `fit()`

To train a model on `X_train` and `y_train`, we use `fit()` function.
```python
model.fit(X_train, y_train)
```

---

## 14. Make Predictions with `predict()`

Once the model has been trained, we can use `predict()` function to predict.
```python
y_pred = model.predict(X_test)
print(y_pred)
```
`y_pred` contains the predictions made by the model.
---

## 16. Classification Accuracy

One simple classification metric is accuracy. We can import it from `sklearn.metrics` library.

```python
from sklearn.metrics import accuracy_score
accuracy = accuracy_score(y_test, y_pred)
print(accuracy)
```
```text
0.8
```
This means that 80% of predictions were correct.

---

## 17. `model.score()`

Many Scikit-learn models also provide a convenient `.score()` method. For a classifier such as logistic regression:

```python
model.score(X_test, y_test)
```
This returns classification accuracy. This is equivalent to the use of `accuracy_score`.

---

## 18. Predict One New Sample

Suppose a new student has `hours_studied = 6` and `attendance = 82`. Create the input:

```python
new_student = pd.DataFrame({
    "hours_studied": [6],
    "attendance": [82]
})
```

Predict:

```python
prediction = model.predict(new_student)
print(prediction)
```
```text
[1]
```

This means that the model predict the student passed:

```text
passed
```

---

## 19. Predict Several Samples

You can predict multiple observations at once.

```python
new_students = pd.DataFrame({
    "hours_studied": [2, 5, 8],
    "attendance": [55, 75, 90]
})
predictions = model.predict(new_students)
print(predictions)
```
```text
[0, 1, 1]
```
The model returns one prediction for each row.

---

## 22. Regression with `LinearRegression`

Now consider a regression problem. Suppose we want to predict exam scores from hours studied.

```python
df = pd.DataFrame({
    "hours_studied": [1, 2, 3, 4, 5, 6],
    "score": [55, 60, 65, 72, 78, 85]
})
```

Create features and target:
```python
X = df[["hours_studied"]]
y = df["score"]
```

Train the model:
```python
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X, y)
```

---

## 23. Regression Prediction

Predict the score for a student who studies 7 hours.
```python
new_student = pd.DataFrame({
    "hours_studied": [7]
})
prediction = model.predict(new_student)
print(prediction)
```
Unlike classification, the result is a continuous numerical value. For example:
```text
[90.4]
```

---

## 24. Train/Test Split for Regression

Regression models should also be evaluated on testing data.

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
```

---

## 25. Mean Squared Error

Regression models use different evaluation metrics from classification models. One of the most common is **Mean Squared Error (MSE)**.

Import:

```python
from sklearn.metrics import mean_squared_error
```

Calculate:

```python
mse = mean_squared_error(y_test, y_pred)
print(mse)
```

MSE measures the average squared difference between the **actual values** and the **predicted values**. Mathematically, $\text{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{y}_i)^2$, where:

- $n$ is the number of observations
- $y_i$ is the actual value
- $(\hat{y}_i)$ is the predicted value

In general, smaller `MSE` value means better predictions.

> Note: MSE is expressed in the **square of the target's unit**. For example, if the target is measured in dollars, MSE is measured in dollars².

---

## 26. R² Score

Another common regression metric is the **R² score**, also called the **coefficient of determination**.

Import:

```python
from sklearn.metrics import r2_score
```

Calculate:

```python
r2 = r2_score(y_test, y_pred)
print(r2)
```

R² measures how well the model explains the variation in the target variable.

Mathematically,

$R^2
===

1-
\frac{
\sum_{i=1}^{n}(y_i-\hat{y}*i)^2
}{
\sum*{i=1}^{n}(y_i-\bar{y})^2
}$

where:

* (y_i) is the actual value
* (\hat{y}_i) is the predicted value
* (\bar{y}) is the mean of the actual values

The numerator,

[
\sum (y_i-\hat{y}_i)^2
]

represents the model's prediction error.

The denominator,

[
\sum (y_i-\bar{y})^2
]

represents the total variation in the target.

Therefore, R² compares your model with a simple baseline that always predicts the mean of the target.

Common interpretations are:

```text
R² = 1      -> perfect predictions

R² = 0      -> model performs about as well as predicting the mean

R² < 0      -> model performs worse than predicting the mean
```

For example:

```text
R² = 0.85
```

means that the model explains approximately **85% of the variation** in the target variable.

For `LinearRegression`, you can also calculate R² using:

```python
model.score(X_test, y_test)
```

Therefore, remember:

```text
Classifier .score()        -> usually accuracy
LinearRegression .score()  -> R²
```

MSE and R² describe regression performance from different perspectives:

```text
MSE  -> How large are the prediction errors?
R²   -> How well does the model explain variation in the target?
```

For both metrics:

```text
Lower MSE is better.
Higher R² is better.
```

## 27. Model Parameters

After a linear model has been trained, we can inspect what it learned.

For linear regression:

```python
model.coef_
```

returns the coefficient.

And:

```python
model.intercept_
```

returns the intercept.

Conceptually, linear regression learns an equation like:

```text
prediction = intercept + coefficient × feature
```

With multiple features:

```text
prediction =
intercept
+ coefficient1 × feature1
+ coefficient2 × feature2
+ ...
```

---

## 28. The Scikit-learn Estimator Pattern

Many Scikit-learn models follow the same basic API.

Create:

```python
model = SomeModel()
```

Train:

```python
model.fit(
    X_train,
    y_train
)
```

Predict:

```python
y_pred = model.predict(
    X_test
)
```

Evaluate:

```python
metric(
    y_test,
    y_pred
)
```

This pattern is extremely important.

Even when you change the algorithm, the overall workflow often remains very similar.

For example:

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()

model.fit(X_train, y_train)

y_pred = model.predict(X_test)
```

A different model can follow a similar structure:

```python
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier()

model.fit(X_train, y_train)

y_pred = model.predict(X_test)
```

---

## 29. Common Scikit-learn Naming Convention

You will see these names very frequently:

```text
X
y

X_train
X_test

y_train
y_test

y_pred
```

Their meanings are:

```text
X
Features

y
Target

X_train
Training features

X_test
Testing features

y_train
Training targets

y_test
Actual testing targets

y_pred
Predicted testing targets
```

Understanding these names makes machine learning code much easier to read.

---

## 30. Classification Workflow

A standard classification workflow looks like:

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

X = df[
    ["hours_studied", "attendance"]
]

y = df["passed"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = LogisticRegression()

model.fit(
    X_train,
    y_train
)

y_pred = model.predict(
    X_test
)

accuracy = accuracy_score(
    y_test,
    y_pred
)

print(accuracy)
```

The important sequence is:

```text
1. Select X
2. Select y
3. Split data
4. Create model
5. Fit model
6. Predict
7. Evaluate
```

---

## 31. Regression Workflow

A standard regression workflow looks like:

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

X = df[
    ["hours_studied"]
]

y = df["score"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = LinearRegression()

model.fit(
    X_train,
    y_train
)

y_pred = model.predict(
    X_test
)

mse = mean_squared_error(
    y_test,
    y_pred
)

print(mse)
```

Again:

```text
X → split → fit → predict → evaluate
```

---

## Quick Reference

```python
# Example: import the train/test splitting utility.
from sklearn.model_selection import train_test_split

# Example: import a classification model.
from sklearn.linear_model import LogisticRegression

# Example: import a regression model.
from sklearn.linear_model import LinearRegression

# Example: import classification accuracy.
from sklearn.metrics import accuracy_score

# Example: import regression mean squared error.
from sklearn.metrics import mean_squared_error

# Example: select two feature columns.
X = df[["age", "income"]]

# Example: select the target column.
y = df["purchased"]

# Example: inspect the number of samples and features.
X.shape

# Example: create an 80/20 training and testing split.
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Example: create a logistic regression classifier.
model = LogisticRegression()

# Example: train a model using training data.
model.fit(X_train, y_train)

# Example: predict targets for testing samples.
y_pred = model.predict(X_test)

# Example: calculate classification accuracy.
accuracy_score(y_test, y_pred)

# Example: calculate probabilities for each class.
model.predict_proba(X_test)

# Example: inspect the classifier's class ordering.
model.classes_

# Example: create a linear regression model.
model = LinearRegression()

# Example: calculate regression mean squared error.
mean_squared_error(y_test, y_pred)

# Example: obtain the model's built-in score.
model.score(X_test, y_test)

# Example: inspect learned linear coefficients.
model.coef_

# Example: inspect the learned intercept.
model.intercept_
```

---

## Example: Basic Machine Learning Pipeline

```python
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score


df = pd.DataFrame({
    "hours_studied": [
        1, 2, 2, 3, 4,
        5, 6, 7, 8, 9
    ],
    "attendance": [
        50, 55, 60, 65, 70,
        75, 80, 85, 90, 95
    ],
    "passed": [
        0, 0, 0, 0, 1,
        1, 1, 1, 1, 1
    ]
})


# Select features.

X = df[
    ["hours_studied", "attendance"]
]


# Select target.

y = df["passed"]


# Split the dataset.

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# Create the model.

model = LogisticRegression()


# Train the model.

model.fit(
    X_train,
    y_train
)


# Make predictions.

y_pred = model.predict(
    X_test
)


# Evaluate the model.

accuracy = accuracy_score(
    y_test,
    y_pred
)


print("Predictions:", y_pred)
print("Accuracy:", accuracy)
```

This basic pattern is the foundation of many machine learning projects:

```text
Prepare data
     ↓
Select X and y
     ↓
Split train/test
     ↓
Create model
     ↓
fit()
     ↓
predict()
     ↓
Evaluate
```

Once this workflow is familiar, you can replace the model with many other Scikit-learn algorithms while keeping much of the surrounding code the same.
