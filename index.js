const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    // `droplet-tag` input defined in action metadata file
    const dropletTag = core.getInput('droplet-tag');
    const digital_ocean_token = core.getInput('digitalocean-access-token');

    axios.defaults.baseURL = 'https://api.digitalocean.com';
    axios.defaults.headers.common['Authorization'] = `Bearer ${digital_ocean_token}`;

    console.log(`Hello new ${dropletTag}!`);

    axios.get('/v2/droplets', {
        params: {
            tag_name: dropletTag
        }
    })
        .then(function (response) {
            // console.log(response);
            var ips = response.data.droplets.map(res => {
                return res.networks.v4.filter(t => t.type == "public")[0]["ip_address"]
            })
            core.setOutput("ip_addresses", ips);
        })
        .catch(function (error) {
            console.log(error);
            core.setFailed(error)
        })
        .finally(function () {
            // always executed
        });


    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}