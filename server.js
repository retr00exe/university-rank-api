const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const handlebars = require('express-handlebars');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
	const morgan = require('morgan');
	app.use(morgan('dev'));

	const adminSignup = require('./routes/signup');
	app.use('/signup', adminSignup);
}

const PORT = process.env.PORT || 3000;
const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'University Rank API',
			description: 'Indonesian University Rank API',
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
const auth = require('./routes/auth');

app.use('/api/v1/webometrics', webometrics);
app.use('/auth', auth);

app.get('/', (req, res) => {
	res.render('main', { layout: 'index' });
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
