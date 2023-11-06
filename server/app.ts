import createError from 'http-errors'
import express, {ErrorRequestHandler} from 'express'
import path from 'path'
import logger from 'morgan'

import apiRouter from './routes/api'

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
const errorHandler: ErrorRequestHandler = function(err, req, res, next) {
  // only provide error in development
  const errResponse = {
    errorMessage: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  }

  res.status(err.status || 500);
  res.send(errResponse);
}

app.use(errorHandler);

export default app
