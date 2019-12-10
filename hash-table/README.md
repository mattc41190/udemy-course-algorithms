# Hash Table

## What is this?

This is a simple demonstration of how to make a hash table in javascript.

### What is a Hash Table?

A hash table is a data structure that uses a "hashing" function to place items into highly unique buckets. A hashing function transforms a value into another value consistently. In our example we transform a word into a number between 1 and 50. Then associate that number to a value using a fixed size array (in this case 50 is the fixed size). 

### How do we create a "hashing" function?

The rules for hashing are simple enough for our elementary use case. We must transform a word into a number between 0 and 50 consistently. To ensure this number is unique (at least unique in our very small range -- avoiding collisions at this size is obviously impossible) we build up a number using the "hash" of previous numbers as our "seed" value.

We will loop over the letters in a string and using then index of the letter (taken from a `for` loops iterator index) we will multiply that by its character code and then add that value to the previous hash thereby providing more uniqueness as the string grows. This value will then be modulus-ed by 50 ensuring that the current hash value is between 0 and 50.

_Note the obvious glaring issue with this approach being that all one letter words will be the same hash of 0. Additionally since our range is only 50 the odds are getting a collision are quite high. To workaround this issue in our small example we use a foor loop and iterate over an index._
