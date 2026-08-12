---
title: Python Fundamentals for AI (Part 1)
difficulty: 1
---

# Python Fundamentals for AI (Part 1)

Python is a popular language for artificial intelligence because its syntax is readable and it has powerful libraries such as NumPy, Pandas, and scikit-learn.

This lesson introduces the core Python concepts you need before working with those libraries.

## 1. Your First Python Program

Use `print()` to display a value.

```python
print("Hello, Python!")
```

Output:

```text
Hello, Python!
```

Python executes instructions from top to bottom.

```python
print("First")
print("Second")
print("Third")
```

Output:

```text
First
Second
Third
```

### Comments

A comment begins with `#`. Python ignores everything after it on that line.

```python
# This explains what the next line does.
print("Training started")  # Comments can also follow code.
```

Use comments to explain **why** code exists, not every obvious detail.

---

## 2. Variables

A variable gives a name to a value.

```python
name = "Ada"
age = 16
score = 92.5

print(name)
print(age)
print(score)
```

You do not need to declare a variable's type. Python determines it from the assigned value.

```python
model_name = "Image classifier"
number_of_classes = 10
is_trained = False
```

### Variable Naming Rules

Use descriptive `snake_case` names:

```python
learning_rate = 0.01
training_examples = 500
```

Avoid unclear names when the meaning matters:

```python
# Less clear
x = 0.01

# Clearer
learning_rate = 0.01

"""
Variable names:
- may contain letters, numbers, and underscores;
- cannot begin with a number;
- cannot contain spaces or hyphens;
- are case-sensitive; and
- cannot be Python keywords such as `if`, `for`, or `class`.
"""
```

### Reassigning Variables

A variable can be assigned a new value.

```python
score = 70
score = 85

print(score)
# 85
```

You can use the current value when calculating the next value.

```python
score = 85
score = score + 5

print(score)
# 90
```

---

## 3. Basic Data Types

Python values have different data types.

```python
student_name = "Mina"  # str: text
correct_answers = 18   # int: whole number
accuracy = 0.9         # float: decimal number
passed = True          # bool: True or False
nothing = None         # NoneType: no value
```

Use `type()` to inspect a value's type.

```python
print(type(student_name))
print(type(correct_answers))
print(type(accuracy))
print(type(passed))
```

Output:

```text
<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>
```

### Integers and Floats

An `int` is a whole number. A `float` can contain a decimal part.

```python
epochs = 20       # int
loss = 0.125      # float
temperature = -2  # int
```

### Booleans

A `bool` is either `True` or `False`. Capitalization matters.

```python
is_ready = True
has_error = False
```

### `None`

`None` represents the absence of a value.

```python
prediction = None

print(prediction)
# None
```

---

## 4. Type Conversion

Use conversion functions when a value has the wrong type.

```python
count = int("12")       # String to integer
price = float("4.50")  # String to float
label = str(7)          # Integer to string
```

```python
print(count + 3)
# 15

print(price * 2)
# 9.0

print("Class " + label)
# Class 7
```

Converting a float to an integer removes the decimal part; it does not round the value.

```python
print(int(3.9))
# 3
```

The text must represent a compatible value.

```python
# This would raise a ValueError:
# int("hello")
```

---

## 5. Reading Input

Use `input()` to read text entered by the user.

```python
name = input("Enter your name: ")
print("Hello, " + name)
```

`input()` always returns a string, even when the user types a number.

```python
age_text = input("Enter your age: ")
print(type(age_text))
# <class 'str'>
```

Convert numeric input before doing arithmetic.

```python
age = int(input("Enter your age: "))
next_age = age + 1

print("Next year, you will be", next_age)
```

---

## 6. Arithmetic Operators

Python supports the usual mathematical operations.

```python
a = 10
b = 3

print(a + b)   # Addition: 13
print(a - b)   # Subtraction: 7
print(a * b)   # Multiplication: 30
print(a / b)   # Division: 3.3333333333333335
print(a // b)  # Floor division: 3
print(a % b)   # Remainder: 1
print(a ** b)  # Exponent: 1000
```

### Operator Precedence

Python performs exponentiation first, then multiplication or division, then addition or subtraction.

```python
result = 2 + 3 * 4
print(result)
# 14
```

Use parentheses to make the intended order clear.

```python
result = (2 + 3) * 4
print(result)
# 20
```

### Assignment Operators

Assignment operators provide a shorter way to update a variable.

```python
score = 10

score += 5  # Same as score = score + 5
score -= 2  # Same as score = score - 2
score *= 3  # Same as score = score * 3
score /= 2  # Same as score = score / 2

print(score)
# 19.5
```

---

## 7. Comparisons and Logical Operators

Comparisons produce Boolean values.

```python
score = 85

print(score == 85)  # Equal to: True
print(score != 85)  # Not equal to: False
print(score > 80)   # Greater than: True
print(score < 80)   # Less than: False
print(score >= 85)  # Greater than or equal to: True
print(score <= 90)  # Less than or equal to: True
```

`=` assigns a value. `==` compares two values.

```python
score = 85          # Assignment
is_perfect = score == 100  # Comparison
```

### Logical Operators

Use `and`, `or`, and `not` to combine or reverse conditions.

```python
age = 16
score = 85

print(age >= 13 and score >= 80)  # True
print(age < 13 or score >= 80)    # True
print(not score >= 80)            # False
```

- `and` is `True` only when both conditions are true.
- `or` is `True` when at least one condition is true.
- `not` reverses a Boolean value.

---

## 8. Strings

A string is text surrounded by single or double quotes.

```python
message = "Hello"
language = 'Python'
```

### Combine Strings

Use `+` to concatenate strings.

```python
first_name = "Ada"
last_name = "Lovelace"
full_name = first_name + " " + last_name

print(full_name)
# Ada Lovelace
```

### f-Strings

An f-string inserts values into text. Put `f` before the opening quote and expressions inside `{}`.

```python
name = "Ada"
score = 94

print(f"{name} scored {score} points.")
# Ada scored 94 points.
```

Expressions can be calculated inside the braces.

```python
correct = 18
total = 20

print(f"Accuracy: {correct / total * 100}%")
# Accuracy: 90.0%
```

### String Length and Indexing

Use `len()` to count the characters in a string.

```python
word = "Python"

print(len(word))
# 6
```

Python indexes start at `0`.

```python
print(word[0])   # P
print(word[1])   # y
print(word[-1])  # n
```

### String Slicing

A slice selects a range of characters. The stop index is excluded.

```python
word = "Python"

print(word[0:3])  # Pyt
print(word[:4])   # Pyth
print(word[2:])   # thon
print(word[::-1]) # nohtyP
```

General syntax:

```python
text[start:stop:step]
```

### Useful String Methods

```python
text = "  Machine Learning  "

print(text.lower())        # "  machine learning  "
print(text.upper())        # "  MACHINE LEARNING  "
print(text.strip())        # "Machine Learning"
print(text.replace("Learning", "Vision"))
print(text.startswith("  Machine"))  # True
print("Learn" in text)               # True
```

Strings are immutable: methods return new strings instead of changing the original one.

```python
name = "python"
name = name.upper()

print(name)
# PYTHON
```

---

## 9. Lists

A list stores multiple values in order. Lists can be changed after creation.

```python
scores = [82, 91, 76, 88]
labels = ["cat", "dog", "bird"]
```

### Access List Items

List indexes also start at `0`.

```python
scores = [82, 91, 76, 88]

print(scores[0])   # 82
print(scores[-1])  # 88
print(scores[1:3]) # [91, 76]
```

### Change a List

```python
scores = [82, 91, 76]

scores[0] = 85          # Replace an item
scores.append(93)       # Add one item to the end
scores.extend([80, 89]) # Add several items
scores.insert(1, 100)   # Insert 100 at index 1

print(scores)
# [85, 100, 91, 76, 93, 80, 89]
```

### Remove List Items

```python
labels = ["cat", "dog", "bird", "dog"]

labels.remove("dog")  # Remove the first matching value
last_label = labels.pop()  # Remove and return the last item

print(labels)
# ['cat', 'bird']

print(last_label)
# dog
```

Use `del` to remove an item by index.

```python
scores = [70, 80, 90]
del scores[1]

print(scores)
# [70, 90]
```

### Useful List Operations

```python
scores = [82, 91, 76, 88]

print(len(scores))  # 4
print(min(scores))  # 76
print(max(scores))  # 91
print(sum(scores))  # 337
print(91 in scores) # True
```

Sorting a list changes it in place.

```python
scores.sort()
print(scores)
# [76, 82, 88, 91]
```

Use `sorted()` when you want a new list and need to preserve the original.

```python
scores = [82, 91, 76, 88]
ordered_scores = sorted(scores, reverse=True)

print(ordered_scores)
# [91, 88, 82, 76]
```

---

## 10. Tuples

A tuple is an ordered collection that cannot be changed after creation.

```python
image_size = (1920, 1080)
rgb = (255, 128, 0)
```

Access tuple items using indexes.

```python
print(image_size[0])
# 1920
```

Tuple unpacking assigns the items to separate variables.

```python
width, height = image_size

print(width)
print(height)
```

A one-item tuple requires a trailing comma.

```python
single_value = (42,)
```

Use a tuple for a fixed group of values and a list for a collection that may change.

---

## 11. Dictionaries

A dictionary stores key-value pairs.

```python
student = {
    "name": "Aisha",
    "age": 16,
    "score": 92
}
```

### Access Values

```python
print(student["name"])
# Aisha

print(student.get("score"))
# 92
```

`get()` can return a default when a key does not exist.

```python
print(student.get("country", "Unknown"))
# Unknown
```

### Add and Update Values

```python
student["country"] = "Singapore"  # Add a key-value pair
student["score"] = 95             # Update an existing value
```

### Remove Values

```python
age = student.pop("age")

print(age)
# 16
```

### Inspect a Dictionary

```python
student = {
    "name": "Aisha",
    "age": 16,
    "score": 92
}

print(student.keys())
print(student.values())
print(student.items())
print("score" in student)  # True
```

Dictionary keys must be unique. Assigning the same key again replaces its value.

---

## 12. Sets

A set stores unique values without relying on a fixed order.

```python
labels = {"cat", "dog", "cat", "bird"}

print(labels)
# The set contains "cat", "dog", and "bird" once each.
```

Sets are useful for removing duplicates and testing membership.

```python
predictions = ["cat", "dog", "cat", "bird"]
unique_predictions = set(predictions)

print("dog" in unique_predictions)
# True
```

Add or remove values with methods.

```python
labels = {"cat", "dog"}

labels.add("bird")
labels.discard("dog")
```

Create an empty set with `set()`. `{}` creates an empty dictionary instead.

```python
empty_set = set()
empty_dictionary = {}
```

---

## 13. Conditional Statements

Use `if` to run code only when a condition is true.

```python
score = 85

if score >= 80:
    print("Passed")
```

The colon and indentation are required. Four spaces per indentation level is the Python standard.

### `if` and `else`

```python
score = 72

if score >= 80:
    print("Passed")
else:
    print("Keep practicing")
```

### `if`, `elif`, and `else`

Use `elif` when there are several possible branches.

```python
score = 87

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "D"

print(grade)
# B
```

Python checks conditions from top to bottom and runs only the first matching branch.

### Nested Conditions

An `if` statement can appear inside another branch.

```python
age = 16
has_permission = True

if age < 18:
    if has_permission:
        print("Entry allowed")
    else:
        print("Permission required")
else:
    print("Entry allowed")
```

When possible, logical operators can keep the condition simpler.

```python
if age >= 18 or has_permission:
    print("Entry allowed")
else:
    print("Permission required")
```

---

## 14. Common Beginner Mistakes

### Mixing Strings and Numbers

```python
age = 16

# Incorrect: "Age: " + age
print("Age: " + str(age))
print(f"Age: {age}")
```

### Using `=` Instead of `==`

```python
score = 90

if score == 90:
    print("Excellent")
```

### Incorrect Indentation

```python
is_ready = True

if is_ready:
    print("Start")
```

### Accessing a Missing Index or Key

```python
values = [10, 20, 30]

print(values[2])  # Last valid index is 2
# print(values[3]) would raise IndexError.
```

```python
student = {"name": "Aisha"}

print(student.get("score"))  # Safely returns None
# student["score"] would raise KeyError.
```

---

## 15. Mini Practice Program

This program combines input, conversion, arithmetic, f-strings, and conditionals.

```python
name = input("Student name: ")
correct = int(input("Correct answers: "))
total = int(input("Total questions: "))

percentage = correct / total * 100

if percentage >= 80:
    result = "passed"
else:
    result = "needs more practice"

print(f"{name} scored {percentage:.1f}% and {result}.")
```

If the user enters `Mina`, `18`, and `20`, the result is:

```text
Mina scored 90.0% and passed.
```

The format specifier `.1f` displays a floating-point value with one digit after the decimal point.

---

## Quick Reference

```python
# Output and comments
print("Hello")
# This is a comment.

# Variables and basic types
name = "Ada"       # str
age = 16           # int
score = 92.5       # float
passed = True      # bool
result = None      # NoneType

# Inspect and convert types
type(score)
int("12")
float("3.5")
str(100)

# Input
name = input("Name: ")
age = int(input("Age: "))

# Arithmetic
a + b
a - b
a * b
a / b
a // b
a % b
a ** b

# Comparisons and logic
a == b
a != b
a > b
a <= b
condition_a and condition_b
condition_a or condition_b
not condition_a

# Strings
message = f"Hello, {name}"
len(message)
message[0]
message[1:4]
message.lower()
message.strip()

# Lists
scores = [80, 90, 100]
scores.append(95)
scores[0]
scores[1:3]
len(scores)
sum(scores)

# Tuples
image_size = (1920, 1080)
width, height = image_size

# Dictionaries
student = {"name": "Ada", "score": 95}
student["name"]
student.get("age", 0)
student["passed"] = True

# Sets
unique_labels = {"cat", "dog"}
unique_labels.add("bird")

# Conditions
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"
```