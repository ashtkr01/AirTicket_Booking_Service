const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const apiRoutes = require('./routes/index');

const db = require('./models/index');

const { PORT } = require('./config/serverConfig');

//Start:
const setupAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api' , apiRoutes);

    app.listen(PORT , () =>{
        console.log(`Server running on PORT ${PORT}`);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter : true});
        }
    });

}

setupAndStartServer();