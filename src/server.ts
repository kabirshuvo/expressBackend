import mongoose from 'mongoose';
import config from './config';
import app from './app';

const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
