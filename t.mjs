import 'dotenv/config';
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URI)
  .then(() => { console.log('OK'); process.exit(0); })
  .catch(e => { console.log(e.message); process.exit(1); });
