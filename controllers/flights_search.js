const env = process.env.ENV || 'dev'
const GetLocalDate = require('dependencies/time_functions').GetLocalDate
const backEnd_metabuscador = require("dependencies/Cluster-Wide-Properties/CW-Properties.json")[env].backEnd_metabuscador
const axios = require('axios')

const getflights_search = async(raw, reply) => {
    console.log("Request: ", raw)

    let options = {
        url: `${backEnd_metabuscador}/flights/v1/search/${cacheid}/${optionid}`,
        method: "GET",
        headers: "myHeaders"
    }

    await axios(options).then((resp) => {
        console.log(resp)
        responseBackEnd = resp.body
        responseStatus = resp.status
        reply.code(responseStatus)
        return reply.send(responseBackEnd)
    }).catch((err) => {
        console.error(err)
        responseStatus = err.response.statusCode
        reply.code(responseStatus)
        return reply.send(err.response.data)
    })

}

const postflights_search = async(raw, reply) => {
    console.log('Request: ', raw)

    let options = {
        url: `${backEnd_metabuscador}/flights/v1/search/`,
        method: "POST",
        data: requestBackEnd.body,
        headers: requestBackEnd.headers
    }


    let responseBackEnd
    let responseStatus
    console.log('axios.options: ', options)
    try {
        await axios(options).then((resp) => {
            console.log("responseBackend:", resp)
            console.log('resp.data: ', resp.data)
            responseBackEnd = resp.data
            responseStatus = resp.status
            reply.code(responseStatus)
            return reply.send(responseBackEnd)
        }).catch((err) => {
            console.error("Error", err)
            console.error('mensaje de error: ', err.response.data)
            responseStatus = err.response.status
            reply.code(responseStatus)
            return reply.send(err.response.data)
        })

    } catch (error) {
        console.error('Something went wrong: ', error)
    }
}
module.exports = { getflights_search, postflights_search }