# Simple dev environment for typescript with webpack.

## Installation

```
npm i
```

## Usage

### build

When you want build source file, input command:

```
npm run build
```

And also, you want build as library, you can use `--env.lib` option:

```
npm run build -- --env.lib=libraryName
```

You must give library name as the value of `--env.lib` option.


### watch

You want build source file when you save any files.

```
npm run watch
```

Can you use `--env.lib` option too.
