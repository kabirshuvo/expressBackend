import mongoose from 'mongoose';
import config from './config';
import app from './app';

const connectDB = async () => {
  const port = process.env.PORT || config.port;

  try {
    await mongoose.connect(config.database_url as string);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
