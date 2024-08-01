# Explains Typescript compile workflow
To compile TypeScript code into JavaScript, follow these steps:

### Step 1: Install TypeScript (if not already installed)
+ To install TypeScript, use the Node Package Manager `npm` by running the following command in Command Prompt or Terminal:
```bash
npm install -g typescript
```

### Step 2: Create a TypeScript file
+ Create a new file with a `.ts` extension, for example: `app.ts`.
+ Write your TypeScript code in this file. For example, you can create a simple function:
```js
// typescript
function sayHello(name: string) 
{ 
    console.log("Hello, " + name + "!"); 
}
```

### Step 3: Compile the TypeScript code
+ Open Command Prompt or Terminal and navigate to the directory containing your TypeScript file.
+ Run the following command to compile the TypeScript file into JavaScript:
```bash
tsc app.ts
```
+ When you run this command, the TypeScript compiler `tsc` will compile `app.ts` and generate a corresponding `app.js` file containing the JavaScript code.

### Step 4: Run the JavaScript code
+ You can run the compiled JavaScript file `app.js` using a web browser or any other JavaScript runtime environment.
+ Note: If you have multiple TypeScript files, you can compile all of them by specifying them in the `tsc` command. For example:
```bash
 tsc file1.ts file2.ts.
```