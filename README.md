# Diff Assignment

Being able to compare version differences is important,
imagine for example that a user has made a change to a file.
That change has been represented in the form of an update SHA256 hash, ie
"7aec47f359bb75b7..."

Now we want to compare the user's new version, to a prior stored version.
The prior version may have a different hash, say "f05e411f0e98d2..."

This clearly indicates a change. Since "7aec47f359bb75b7..." != "f05e411f0e98d2...".
However, in a version we may have many files. See the list below for two tiny examples.
How do we know which file was added? Which relates to which?

One way is to compare the file hashes. Python has some powerful built in
tools to help do this in O ( len(s) ) running time.

After you are done comparing the files, make some formatting adjustments
to pretty print for web.

The lists may not be the same length.

## Installing

1. In terminal while in the root of this project, run `npm install`

## Running the program

1. In terminal while in the root of this project, run `npm test`
