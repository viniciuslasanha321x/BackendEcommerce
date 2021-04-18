export const IS_PROD = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT || 3333;
export const DATABASE_URI = IS_PROD
  ? process.env.DATABASE_URI_PROD
  : process.env.DATABASE_URI_LOCAL;
export const JWT_SECRET_KEY = `${process.env.JWT_SECRET}`;
export const JWT_EXPIRES_IN = '7d';
