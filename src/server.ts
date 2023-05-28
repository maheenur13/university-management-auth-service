import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function bootstrap() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log(`🙌 database connected.Yay!`);
    
    app.listen(config.port, ()=>{
        console.log(`Server Listening on port ${config.port}`);
        
    })

  } catch (error) {
    console.log(error);
  }
}
bootstrap();
