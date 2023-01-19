const core = require('@actions/core');
const github = require('@actions/github');


try {
    // `droplet-tag` input defined in action metadata file
    const dropletTag = core.getInput('droplet-tag');

    console.log(`Hello new ${dropletTag}!`);

    core.setOutput("ip_addresses", [1.1, 2.2, 3.3]);
    // core.setOutput("ip_addresses", "[1.1, 2.2, 3.3]");

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}