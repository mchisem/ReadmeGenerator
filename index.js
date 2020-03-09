const inquirer = require("inquirer");
const fs = require("fs");
// const util = require("util");
const axios = require("axios");

// const writeFileAsync = util.promisify(fs.writeFile);

inquirer
.prompt([
    {
        type: "input",
        name: "question",
        message: "What's your name?"
      },
    {
        type: "input",
        name: "username",
        message: "Enter your GitHub username"
      },
      {
        type: "input",
        name: "name",
        message: "What is your project's name?"
      },
      {
        type: "input",
        name: "description",
        message: "How would you describe your project?"
      },
      {
        type: "input",
        name: "license",
        message: "What license should your project have?"
      },
      {
        type: "input",
        name: "installation",
        message: "What command should be installed to run dependencies?"
      },
      {
        type: "input",
        name: "test",
        message: "What command runs tests?"
      },
      {
        type: "input",
        name: "usage",
        message: "What mehtods did you use to make this README?"
      },
      {
        type: "input",
        name: "contributing",
        message: "Who contributed to this README?"
      }
  ])

.then (function(answers) {

const queryURL = `https://api.github.com/users/${answers.username}`;

axios.get(queryURL).then(function() { 

const generate = `
## GitHub Username

${answers.username}

# Project Name	

${answers.name}

## Description

${answers.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation

...
${answers.installation}
...

## Usage 

${answers.usage}

## License

${answers.license}

## Contributing

${answers.contributing}

## Tests

In order to run tests, input the following command:

...
${answers.test}
...

## Questions

<img src="https://avatars0.githubusercontent.com/u/58449282?v=4&v=4"
alt="avatar" style= "width: 40px"/>

Questions? Feel free to google some answers! Or contact me at ${answers.username}.
`;

fs.writeFile("README.md", generate, function(){
    console.log("Congrats! You made a README!");
})
}); 
})


// async function init() {
//   try {
//     const answers = await prompt();

//     const md = generateMD(answers);

//     await writeFileAsync("README.md", md);

//     console.log("Successfully wrote to readme!");
//   } catch(err) {
//     console.log("error");
//   }
// }

// init();
