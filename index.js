const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
    const inputText = core.getInput('input-text');
    let regex = new RegExp('.+\\/(.*-\\d+)', 'gim');
    let issue = regex.exec(inputText);

    if (issue && Array.isArray(issue)) {
      console.log("Issue found, Jira number: " + issue[1]);
    } else {
        console.log("Issue not found");
    }

    // console.log(`Input text: ${inputText}!`);

    const time = (new Date()).toTimeString();
    core.setOutput("time", time);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
