const getCSV = require('get-csv');
const app = require('express')();
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', async (request, response) => {
    await getCSV('http://www.bcb.gov.br/pom/spb/estatistica/port/ParticipantesSTRport.csv').then(rows => {
        return response.status(200).send(rows);
    }).catch(error => {
        return response.status(200).send({error : error.message});
    })
});

http.createServer(app).listen(process.env.PORT || 3010)