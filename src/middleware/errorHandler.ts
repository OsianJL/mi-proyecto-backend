import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction, // Aunque no lo usemos, lo dejamos aquí para Express
) => {
  let message = 'Internal Server Error';
  let statusCode = 500;
  let stack = undefined;

  if (err instanceof Error) {
    message = err.message;
    statusCode = (err as { statusCode?: number }).statusCode || 500;
    stack = process.env.NODE_ENV === 'production' ? null : err.stack;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack,
  });
};
