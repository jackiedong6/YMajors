export const CORS_OPTIONS = {
  origin: process.env.CLIENT,
  credentials: true,
  optionsSuccessStatus: 200,
};

export const DB_URI = process.env.DB_URI;
export const PORT = process.env.PORT;
