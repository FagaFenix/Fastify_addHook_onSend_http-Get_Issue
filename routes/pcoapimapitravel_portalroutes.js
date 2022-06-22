const { getflights_search, postflights_search } = require('../controllers/flights_search.js');
const { getflights_searchschema } = require('../schemas/getflights_searchschema.js');
const { postflights_searchschema } = require('../schemas/postflights_searchschema.js');


function pcoapimapitravel_portalRoutes(fastify, options, done) {

    fastify.get('/travelportal/v1/flights/search/:cacheid/:optionid', getflights_searchschema, getflights_search) //Different path but same logic and BackEnd (same file as well)

    fastify.post('/travelportal/v1/flights/search', postflights_searchschema, postflights_search)

    done()
}

module.exports = pcoapimapitravel_portalRoutes