const fastify = require('fastify');
const fp = require('fastify-plugin')
const app = fastify({
    logger: true
});
const splunkFunction = require('dependencies/splunk_function_api_main').splunkFunction
const GetLocalDate = require('dependencies/time_functions').GetLocalDate
let now = GetLocalDate()

const pluginErrorHandler = fp(require('plugins/error-handler'))

app.register(pluginErrorHandler)


app.register(require('routes/pcoapimapitravel_portalroutes.js'));

app.addHook('onSend', async(request, reply, payload) => {

    console.log("este es el payload: ", payload) //When I get a POST request from the user I got a Payload from the backEnd response but when It's a "GET" request I got undefined Here!
    console.log("este es el reply: ", reply)
    let apiURL = "https://apiuat.puntoscolombia.com:8443" + request.url
    await splunkFunction(request, undefined, now, request.url, undefined, false, reply.statusCode, payload, undefined, apiURL, request.headers.authorization, request.method, request.headers['x-forwarded-for'])
})

module.exports = app;