const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;


    axios.get(queryUrl)
    .then(function (response) {
      //map will always return an array//
      const repoNames = response.data.map(function(repo){
        return repo.name;
      });
      console.log(response);

      //slash n means new line//
      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("repos.txt", repoNamesStr, function(err){
        if(err) {
          throw err;
        }
      });
    })
  
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  
  });