---
title: Python Fundamentals for AI (Part 2)
difficulty: 1
---

# Python Fundamentals for AI (Part 2)

Part 1 introduced variables, data types, collections, and conditional statements. This lesson builds on those foundations with the tools needed to organize and repeat real data-processing code.

You will learn how to use loops, write functions, build collections concisely, handle errors, and work with files.

## 1. `for` Loops

A `for` loop repeats a block of code once for each item in a collection.

```python
labels = ["cat", "dog", "bird"]

for label in labels:
    print(label)
```

Output:

```text
cat
dog
bird
```

The loop variable receives one value at a time. Its name should describe a single item from the collection.

```python
scores = [0.82, 0.91, 0.76]

for score in scores:
    print(f"Confidence: {score:.0%}")
```

Output:

```text
Confidence: 82%
Confidence: 91%
Confidence: 76%
```

The loop body must be indented, normally by four spaces.

### Accumulating a Result

A loop can update a value on every iteration.

```python
losses = [0.8, 0.5, 0.3]
total_loss = 0

for loss in losses:
    total_loss += loss

average_loss = total_loss / len(losses)
print(average_loss)
# 0.5333333333333333
```

Python already provides `sum()` for this particular calculation:

```python
average_loss = sum(losses) / len(losses)
```

Use a built-in operation when one clearly expresses the task. Use a loop when each item needs custom processing.

### `range()`

`range()` produces a sequence of integers. The stop value is excluded.

```python
for epoch in range(5):
    print(epoch)
```

Output:

```text
0
1
2
3
4
```

You can provide a start, stop, and step:

```python
for value in range(2, 11, 2):
    print(value)
```

Output:

```text
2
4
6
8
10
```

General form:

```python
range(start, stop, step)
```

### `enumerate()`

Use `enumerate()` when you need both an item's index and its value.

```python
class_names = ["airplane", "car", "bird"]

for index, class_name in enumerate(class_names):
    print(index, class_name)
```

Output:

```text
0 airplane
1 car
2 bird
```

Set `start=1` for human-friendly numbering.

```python
for position, class_name in enumerate(class_names, start=1):
    print(f"{position}. {class_name}")
```

### `zip()`

Use `zip()` to loop over matching items from multiple collections.

```python
actual_labels = ["cat", "dog", "bird"]
predicted_labels = ["cat", "cat", "bird"]

for actual, predicted in zip(actual_labels, predicted_labels):
    print(f"actual={actual}, predicted={predicted}")
```

`zip()` stops when the shortest input collection ends. Check collection lengths first if silently dropping extra items would be a problem.

```python
if len(actual_labels) != len(predicted_labels):
    print("The label lists must have the same length.")
```

### Looping Through Dictionaries

Looping over a dictionary directly gives its keys.

```python
metrics = {
    "accuracy": 0.92,
    "precision": 0.88,
    "recall": 0.90,
}

for metric_name in metrics:
    print(metric_name)
```

Use `.items()` to receive each key and value together.

```python
for metric_name, value in metrics.items():
    print(f"{metric_name}: {value:.2f}")
```

### Nested Loops

A loop can contain another loop. This is useful for grids or combinations.

```python
learning_rates = [0.1, 0.01]
batch_sizes = [16, 32]

for learning_rate in learning_rates:
    for batch_size in batch_sizes:
        print(learning_rate, batch_size)
```

Output:

```text
0.1 16
0.1 32
0.01 16
0.01 32
```

The inner loop completes all of its iterations for each iteration of the outer loop.

---

## 2. `while` Loops

A `while` loop repeats as long as its condition remains true.

```python
epoch = 1

while epoch <= 3:
    print(f"Training epoch {epoch}")
    epoch += 1
```

Output:

```text
Training epoch 1
Training epoch 2
Training epoch 3
```

Make sure something in the loop eventually makes the condition false. Otherwise, the loop will run forever.

### `break`

`break` exits the nearest loop immediately.

```python
losses = [0.9, 0.6, 0.4, 0.2]

for epoch, loss in enumerate(losses, start=1):
    print(f"Epoch {epoch}: {loss}")

    if loss < 0.5:
        print("Target loss reached")
        break
```

### `continue`

`continue` skips the rest of the current iteration and starts the next one.

```python
scores = [0.8, None, 0.9, None, 0.7]

for score in scores:
    if score is None:
        continue

    print(score)
```

### When to Use Each Loop

- Use `for` when iterating through a collection or a known range.
- Use `while` when repetition depends on a condition and the number of iterations is not known in advance.
- Use `break` and `continue` sparingly; simple loop conditions are often easier to read.

---

## 3. Functions

A function is a reusable block of code that performs one task.

Define a function with `def`, then call it using its name followed by parentheses.

```python
def greet_student():
    print("Welcome to AI training!")


greet_student()
```

The blank lines are not required for Python to run, but standard Python style uses two blank lines between top-level functions and surrounding code.

### Parameters and Arguments

Parameters are names in the function definition. Arguments are values supplied when the function is called.

```python
def display_score(name, score):
    print(f"{name}: {score:.1f}")


display_score("Mina", 92.5)
display_score("Aisha", 88.0)
```

Here, `name` and `score` are parameters. `"Mina"` and `92.5` are arguments.

### Returning Values

Use `return` to send a result back to the caller.

```python
def calculate_accuracy(correct, total):
    return correct / total


accuracy = calculate_accuracy(18, 20)
print(f"Accuracy: {accuracy:.1%}")
# Accuracy: 90.0%
```

Code after `return` in the same branch does not run.

```python
def classify_score(score):
    if score >= 0.8:
        return "high"

    return "low"
```

A function without an explicit `return` statement returns `None`.

### Return More Than One Value

Python can return multiple values as a tuple.

```python
def find_score_range(scores):
    return min(scores), max(scores)


lowest, highest = find_score_range([0.72, 0.95, 0.81])

print(lowest)   # 0.72
print(highest)  # 0.95
```

### Default Arguments

A default value makes an argument optional.

```python
def train_model(epochs=10):
    print(f"Training for {epochs} epochs")


train_model()    # Uses 10
train_model(25)  # Uses 25
```

Required parameters must come before parameters with default values.

```python
def describe_run(model_name, epochs=10):
    print(f"{model_name}: {epochs} epochs")
```

Avoid using a mutable list or dictionary as a default value. Create it inside the function instead.

```python
def add_prediction(label, predictions=None):
    if predictions is None:
        predictions = []

    predictions.append(label)
    return predictions
```

### Keyword Arguments

Keyword arguments make calls clearer and can be supplied in a different order.

```python
def describe_run(model_name, epochs=10, batch_size=32):
    print(f"{model_name}: epochs={epochs}, batch_size={batch_size}")


describe_run("classifier", batch_size=64, epochs=20)
```

### Type Hints

Type hints document the values a function expects and returns.

```python
def calculate_accuracy(correct: int, total: int) -> float:
    return correct / total
```

Python does not enforce these hints by itself, but editors and type-checking tools can use them to detect mistakes.

### Docstrings

A docstring explains what a function does. Place it immediately after the function definition.

```python
def calculate_accuracy(correct: int, total: int) -> float:
    """Return the fraction of predictions that are correct."""
    return correct / total
```

A useful docstring describes the behavior, important inputs, returned value, and any errors callers should expect.

### Variable Scope

A variable created inside a function is local to that function.

```python
def calculate_double(value):
    result = value * 2
    return result


print(calculate_double(5))
# print(result) would raise NameError here.
```

A function can read a variable defined outside it, but relying heavily on global variables makes code harder to test and understand.

Prefer passing values as arguments and returning results.

```python
# Clear: inputs and output are explicit.
def normalize_score(score, maximum):
    return score / maximum
```

### Keep Functions Focused

A good beginner function usually:

- performs one clear task;
- has a descriptive verb-based name;
- receives its inputs through parameters; and
- returns a result instead of changing unrelated global state.

---

## 4. Comprehensions

A comprehension builds a collection from another iterable.

### List Comprehensions

This loop builds a list of squared values:

```python
squares = []

for number in range(1, 6):
    squares.append(number ** 2)
```

The equivalent list comprehension is:

```python
squares = [number ** 2 for number in range(1, 6)]

print(squares)
# [1, 4, 9, 16, 25]
```

General form:

```python
[expression for item in iterable]
```

### Filtering in a Comprehension

Add a condition to keep only selected items.

```python
scores = [0.45, 0.82, 0.67, 0.91]
passing_scores = [score for score in scores if score >= 0.8]

print(passing_scores)
# [0.82, 0.91]
```

General form:

```python
[expression for item in iterable if condition]
```

### Conditional Expressions

An `if` and `else` before the `for` chooses one output for every item.

```python
probabilities = [0.2, 0.8, 0.55, 0.4]
labels = ["positive" if probability >= 0.5 else "negative"
          for probability in probabilities]

print(labels)
# ['negative', 'positive', 'positive', 'negative']
```

Notice the difference:

- `... for item in values if condition` filters items out.
- `value_a if condition else value_b ...` produces one result for every item.

### Dictionary Comprehensions

A dictionary comprehension creates key-value pairs.

```python
class_names = ["cat", "dog", "bird"]
class_to_index = {name: index for index, name in enumerate(class_names)}

print(class_to_index)
# {'cat': 0, 'dog': 1, 'bird': 2}
```

### Set Comprehensions

A set comprehension keeps unique results.

```python
labels = ["Cat", "dog", "CAT", "Bird", "dog"]
normalized_labels = {label.lower() for label in labels}

print(normalized_labels)
# Contains 'cat', 'dog', and 'bird'. Set display order may vary.
```

### Prefer Readability

Comprehensions are best for short transformations and filters. Use a regular loop when the logic needs several steps, nested conditions, logging, or error handling.

```python
clean_scores = []

for raw_score in ["0.8", "missing", "0.9"]:
    if raw_score == "missing":
        continue

    score = float(raw_score)
    clean_scores.append(score)
```

---

## 5. Useful Tools for Iterables

An iterable is an object that can provide items one at a time. Lists, tuples, strings, dictionaries, sets, ranges, and many data-library objects are iterable.

### `any()` and `all()`

`any()` returns `True` when at least one item is true. `all()` returns `True` when every item is true.

```python
confidences = [0.91, 0.84, 0.96]

print(any(score >= 0.95 for score in confidences))  # True
print(all(score >= 0.80 for score in confidences))  # True
```

The expressions inside these calls are generator expressions. They produce values as needed instead of building a complete list first.

### `sorted()` with a Key

The `key` argument tells `sorted()` what value to compare.

```python
predictions = [
    {"label": "cat", "confidence": 0.82},
    {"label": "dog", "confidence": 0.95},
    {"label": "bird", "confidence": 0.76},
]

ordered = sorted(
    predictions,
    key=lambda prediction: prediction["confidence"],
    reverse=True,
)

print(ordered[0]["label"])
# dog
```

A `lambda` is a small anonymous function. The example above is equivalent to defining:

```python
def confidence_value(prediction):
    return prediction["confidence"]
```

Use a named function when the operation is complex or reused.

### Unpacking with `*`

Use `*` to unpack an iterable into separate positional values.

```python
scores = [0.7, 0.8, 0.9]
print(*scores)
# 0.7 0.8 0.9
```

Extended unpacking can collect remaining items into a list.

```python
first, *middle, last = [10, 20, 30, 40, 50]

print(first)   # 10
print(middle)  # [20, 30, 40]
print(last)    # 50
```

---

## 6. Errors and Exceptions

An exception is an error detected while a program is running. The error message usually contains the exception type, a description, and a traceback showing where it occurred.

Common exception types include:

- `ValueError`: a value has the correct general type but invalid content, such as `int("cat")`;
- `TypeError`: an operation receives an incompatible type, such as `"3" + 2`;
- `IndexError`: a sequence index is outside its valid range;
- `KeyError`: a dictionary key does not exist;
- `ZeroDivisionError`: a number is divided by zero;
- `FileNotFoundError`: a requested file does not exist; and
- `NameError`: a variable name has not been defined.

Read the final line of a traceback first. It usually states the immediate problem.

### `try` and `except`

Use `try` when an operation can fail in an expected way and the program knows how to respond.

```python
raw_value = "not-a-number"

try:
    score = float(raw_value)
except ValueError:
    print(f"Invalid score: {raw_value}")
```

Catch specific exception types. A broad `except:` can hide programming mistakes that should be fixed.

### Handling Multiple Exceptions

Different failures can have different responses.

```python
def safe_average(total, count):
    try:
        return float(total) / int(count)
    except ValueError:
        print("Total and count must be numeric.")
    except ZeroDivisionError:
        print("Count must not be zero.")

    return None
```

If several exceptions share the same response, group them in a tuple.

```python
try:
    value = float(user_input)
except (TypeError, ValueError):
    value = 0.0
```

### `else` and `finally`

The `else` block runs only when the `try` block succeeds. The `finally` block runs whether the operation succeeds or fails.

```python
try:
    score = float("0.92")
except ValueError:
    print("Could not parse the score.")
else:
    print(f"Parsed score: {score}")
finally:
    print("Parsing attempt finished.")
```

Keep the `try` block small. This makes it clear which operation is expected to fail.

### Raising an Exception

Use `raise` when a function receives an invalid value and cannot continue correctly.

```python
def calculate_accuracy(correct, total):
    if total <= 0:
        raise ValueError("total must be greater than zero")

    if correct < 0 or correct > total:
        raise ValueError("correct must be between zero and total")

    return correct / total
```

Failing early with a clear message is safer than silently returning a misleading result.

---

## 7. File Paths and Text Files

Programs often load datasets, configuration files, and saved results. A file path tells Python where to find a file.

The standard-library `pathlib` module provides a convenient way to work with paths across operating systems.

```python
from pathlib import Path

data_path = Path("data") / "labels.txt"

print(data_path)
# data/labels.txt on macOS and Linux, or data\labels.txt on Windows
```

A relative path starts from the program's current working directory. An absolute path starts from a filesystem root.

```python
print(Path.cwd())  # Current working directory
print(data_path.is_absolute())
```

### Write a Text File

Use `with` to ensure the file is closed correctly, even if an error occurs.

```python
from pathlib import Path

output_path = Path("predictions.txt")

with output_path.open("w", encoding="utf-8") as file:
    file.write("cat\n")
    file.write("dog\n")
    file.write("bird\n")
```

Opening a file with mode `"w"` replaces its existing contents. Use it only when overwriting the file is intended.

### Read an Entire Text File

```python
with output_path.open("r", encoding="utf-8") as file:
    contents = file.read()

print(contents)
```

Mode `"r"` is the default, so it may be omitted.

```python
with output_path.open(encoding="utf-8") as file:
    contents = file.read()
```

### Read One Line at a Time

Loop over the file when it may be large. This avoids loading the entire file into memory.

```python
labels = []

with output_path.open(encoding="utf-8") as file:
    for line in file:
        label = line.strip()

        if label:
            labels.append(label)

print(labels)
# ['cat', 'dog', 'bird']
```

`strip()` removes the newline and surrounding whitespace.

### Append to a File

Mode `"a"` writes new content at the end without removing existing content.

```python
with output_path.open("a", encoding="utf-8") as file:
    file.write("fish\n")
```

Common text modes are:

| Mode | Meaning | Existing content |
|---|---|---|
| `"r"` | Read | Preserved; file must exist |
| `"w"` | Write | Replaced |
| `"a"` | Append | Preserved; new content goes at the end |
| `"x"` | Create | Fails if the file already exists |

### Check Whether a File Exists

```python
if output_path.exists():
    print("Prediction file found")
else:
    print("Prediction file is missing")
```

If a missing file is normal, check for it or catch `FileNotFoundError`. If it indicates a bug, letting the exception appear may be more helpful.

```python
try:
    text = Path("missing.txt").read_text(encoding="utf-8")
except FileNotFoundError:
    print("Create missing.txt before running this program.")
```

`Path.read_text()` and `Path.write_text()` are concise options for small files.

```python
notes_path = Path("notes.txt")
notes_path.write_text("Model trained successfully\n", encoding="utf-8")
notes = notes_path.read_text(encoding="utf-8")
```

---

## 8. CSV and JSON Files

Plain text is useful, but structured formats are better for many datasets and results.

### Read CSV Data

The `csv` module is part of Python's standard library.

Suppose `predictions.csv` contains:

```csv
image,actual,predicted
001.jpg,cat,cat
002.jpg,dog,cat
003.jpg,bird,bird
```

Read each row as a dictionary:

```python
import csv
from pathlib import Path

csv_path = Path("predictions.csv")

with csv_path.open(encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)

    for row in reader:
        print(row["image"], row["predicted"])
```

Using `newline=""` lets the `csv` module handle newlines correctly on every operating system.

### Write CSV Data

```python
import csv
from pathlib import Path

rows = [
    {"image": "001.jpg", "label": "cat"},
    {"image": "002.jpg", "label": "dog"},
]

csv_path = Path("submission.csv")
field_names = ["image", "label"]

with csv_path.open("w", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=field_names)
    writer.writeheader()
    writer.writerows(rows)
```

For larger tabular workflows, Pandas provides higher-level CSV tools. The standard `csv` module remains useful for small scripts and understanding the format.

### Read JSON Data

JSON represents objects, arrays, strings, numbers, Booleans, and null values. These map naturally to Python dictionaries, lists, strings, numbers, `True` or `False`, and `None`.

```python
import json
from pathlib import Path

config_path = Path("config.json")

with config_path.open(encoding="utf-8") as file:
    config = json.load(file)

print(config["learning_rate"])
```

### Write JSON Data

```python
import json
from pathlib import Path

metrics = {
    "accuracy": 0.92,
    "correct": 92,
    "total": 100,
}

report_path = Path("metrics.json")

with report_path.open("w", encoding="utf-8") as file:
    json.dump(metrics, file, indent=2)
```

`indent=2` makes the output easier for people to read.

---

## 9. Modules and Imports

A module is a Python file containing reusable code. Python's standard library includes modules such as `math`, `random`, `csv`, `json`, and `pathlib`.

Import a module and access its members with dot notation.

```python
import math

distance = math.sqrt(25)
print(distance)
# 5.0
```

Import a specific name when that makes the code clearer.

```python
from pathlib import Path

data_path = Path("data.csv")
```

Aliases are common for widely used data libraries.

```python
import numpy as np
import pandas as pd
```

Place imports near the top of a file. Avoid `from module import *` because it becomes difficult to tell where names came from and different modules may define the same name.

### Create Your Own Module

Suppose `metrics.py` contains:

```python
def accuracy(actual, predicted):
    correct = sum(a == p for a, p in zip(actual, predicted))
    return correct / len(actual)
```

Another file in the same folder can import it:

```python
from metrics import accuracy

score = accuracy(["cat", "dog"], ["cat", "bird"])
print(score)
# 0.5
```

Giving related functions their own module keeps larger projects organized.

---

## 10. Mini Project: Evaluate Predictions

This program compares actual and predicted labels, calculates accuracy, finds mistakes, and saves a JSON report.

```python
import json
from pathlib import Path


def evaluate_predictions(actual, predicted):
    """Return accuracy and information about incorrect predictions."""
    if len(actual) != len(predicted):
        raise ValueError("actual and predicted must have the same length")

    if not actual:
        raise ValueError("at least one prediction is required")

    mistakes = []

    for index, (actual_label, predicted_label) in enumerate(
        zip(actual, predicted)
    ):
        if actual_label != predicted_label:
            mistakes.append({
                "index": index,
                "actual": actual_label,
                "predicted": predicted_label,
            })

    correct = len(actual) - len(mistakes)

    return {
        "accuracy": correct / len(actual),
        "correct": correct,
        "total": len(actual),
        "mistakes": mistakes,
    }


def save_report(report, path):
    """Write an evaluation report to a JSON file."""
    with path.open("w", encoding="utf-8") as file:
        json.dump(report, file, indent=2)


actual_labels = ["cat", "dog", "bird", "cat", "dog"]
predicted_labels = ["cat", "cat", "bird", "cat", "dog"]

try:
    evaluation = evaluate_predictions(actual_labels, predicted_labels)
    save_report(evaluation, Path("evaluation.json"))
except (OSError, ValueError) as error:
    print(f"Could not create report: {error}")
else:
    print(f"Accuracy: {evaluation['accuracy']:.1%}")
    print(f"Mistakes: {len(evaluation['mistakes'])}")
    print("Saved evaluation.json")
```

Output:

```text
Accuracy: 80.0%
Mistakes: 1
Saved evaluation.json
```

The saved file contains:

```json
{
  "accuracy": 0.8,
  "correct": 4,
  "total": 5,
  "mistakes": [
    {
      "index": 1,
      "actual": "dog",
      "predicted": "cat"
    }
  ]
}
```

This program combines functions, validation, loops, `enumerate()`, `zip()`, dictionaries, exceptions, file paths, and JSON.

---

## 11. Common Beginner Mistakes

### Forgetting to Update a `while` Condition

```python
count = 0

while count < 3:
    print(count)
    count += 1  # Without this update, the loop never ends.
```

### Replacing a List Instead of Adding to It

```python
results = []

for score in [0.7, 0.8, 0.9]:
    results.append(score * 100)
```

Writing `results = score * 100` inside the loop would replace the variable on every iteration.

### Printing When a Function Should Return

```python
# Less reusable: the caller cannot use the calculated value.
def show_double(value):
    print(value * 2)


# More reusable: the caller decides what to do with the value.
def double(value):
    return value * 2
```

### Calling a Function Without Parentheses

```python
def get_label():
    return "cat"


function_object = get_label
label = get_label()
```

`get_label` refers to the function itself. `get_label()` calls it and returns `"cat"`.

### Catching Every Error

```python
# Too broad: this can hide unexpected bugs.
# try:
#     score = process_value(raw_value)
# except:
#     score = 0

# Better: handle the failure you expect.
try:
    score = float(raw_value)
except ValueError:
    score = 0.0
```

### Forgetting That Write Mode Overwrites

```python
# "w" replaces the file. Use "a" when appending is intended.
with Path("training.log").open("a", encoding="utf-8") as file:
    file.write("Epoch completed\n")
```

### Using Backslashes in Portable Paths

```python
from pathlib import Path

# Portable across operating systems:
data_path = Path("datasets") / "training" / "labels.csv"
```

---

## 12. Practice Tasks

### Task 1: Count Correct Predictions

Given two label lists, use `zip()` and a loop to count matching pairs.

```python
actual = ["cat", "dog", "bird", "cat"]
predicted = ["cat", "bird", "bird", "cat"]
```

Expected count: `3`.

### Task 2: Filter Confident Predictions

Use a list comprehension to keep scores greater than or equal to `0.8`.

```python
scores = [0.45, 0.81, 0.93, 0.62, 0.88]
```

Expected result:

```python
[0.81, 0.93, 0.88]
```

### Task 3: Write an Accuracy Function

Write a function named `accuracy` that:

- accepts `actual` and `predicted` lists;
- raises `ValueError` when their lengths differ or they are empty; and
- returns the fraction of matching pairs.

### Task 4: Summarize Labels

Build a dictionary that counts how many times each label occurs.

```python
labels = ["cat", "dog", "cat", "bird", "dog", "cat"]
```

Expected result:

```python
{"cat": 3, "dog": 2, "bird": 1}
```

### Task 5: Save the Summary

Save the dictionary from Task 4 to `label_counts.json`, then load it again and print the result.

---

## Quick Reference

```python
# for loops
for item in items:
    print(item)

for index, item in enumerate(items):
    print(index, item)

for left, right in zip(left_items, right_items):
    print(left, right)

for key, value in mapping.items():
    print(key, value)

# Ranges
range(5)          # 0, 1, 2, 3, 4
range(2, 6)       # 2, 3, 4, 5
range(2, 11, 2)   # 2, 4, 6, 8, 10

# while, break, and continue
while condition:
    if should_stop:
        break
    if should_skip:
        continue

# Functions
def calculate_accuracy(correct: int, total: int = 100) -> float:
    """Return correct predictions as a fraction of the total."""
    if total <= 0:
        raise ValueError("total must be positive")
    return correct / total


score = calculate_accuracy(92)

# Comprehensions
squares = [number ** 2 for number in range(5)]
positive = [value for value in values if value > 0]
labels = ["high" if value >= 0.5 else "low" for value in values]
index_by_name = {name: index for index, name in enumerate(names)}
unique_names = {name.lower() for name in names}

# Iterable tools
any(flags)
all(flags)
sorted(items, key=lambda item: item["score"], reverse=True)

# Exceptions
try:
    number = float(raw_value)
except ValueError:
    print("Invalid number")
else:
    print(number)
finally:
    print("Finished")

# Paths and text files
from pathlib import Path

path = Path("data") / "labels.txt"

with path.open(encoding="utf-8") as file:
    text = file.read()

with path.open("w", encoding="utf-8") as file:
    file.write("cat\n")

# JSON
import json

with Path("metrics.json").open(encoding="utf-8") as file:
    metrics = json.load(file)

with Path("metrics.json").open("w", encoding="utf-8") as file:
    json.dump(metrics, file, indent=2)

# CSV
import csv

with Path("data.csv").open(encoding="utf-8", newline="") as file:
    rows = list(csv.DictReader(file))
```