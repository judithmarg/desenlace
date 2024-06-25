import 'dotenv/config';

export default {
  expo: {
    name: "desenlace",
    slug: "desenlace",
    version: "1.0.0",
    scheme: "desenlace-scheme", 
    extra: {
      API_KEY: process.env.API_KEY,
      APP_ID: process.env.APP_ID,
      PROJECT_ID: process.env.PROJECT_ID,
    },
  },
};
