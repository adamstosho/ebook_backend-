const allowedOrigin = require("./allowedOrigin")


const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200, // For legacy browser support
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}
module.exports = corsOptions;