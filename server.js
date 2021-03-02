const express = require('express');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'University Rank API',
			description: 'Indonesian University Rank API Information',
			version: 'v1.0.0',
			contact: {
				name: 'Mekel Ilyasa',
			},
			servers: ['http://127.0.0.1:3000'],
		},
	},
	apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.set('view engine', 'hbs');
app.engine(
	'hbs',
	handlebars({
		layoutsDir: __dirname + '/views/layouts',
		extname: 'hbs',
	})
);
app.use(express.static('public'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(
	process.env.ATLAS_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	() => console.log(`Connected to MongoDB Atlas!`)
);

const webometrics = require('./routes/api/v1/webometrics');
app.use('/api/v1/webometrics', webometrics);

app.get('/', (req, res) => {
	res.render('main', { layout: 'index' });
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
