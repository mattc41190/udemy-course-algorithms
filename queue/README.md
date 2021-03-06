# Queue

## What is this?

This is a demonstration of the queue data structure in Javascript. A queue is a "first in first out" data structure. Think of it like a lunch line, the first person in line is the first person to get out with their food.

## Why make this?

To have a place to review the data structure for interviews and because it is such an important data structure. 

## How do I use this?

- Read the code?
- Run the code
- Modify and rerun the code to see if it behaves as expected

## Notes

- Never use an array to back a queue as repointing index 0 is a very expensive operation for arrays
- If you wanted to use an array to back a queue a very simple solution would be to use a stack as the queue backer and have the array back the stack. In this way when you call `queue.enqueue` you would under the hood call `stack.push` which would under the hood call `array.push`