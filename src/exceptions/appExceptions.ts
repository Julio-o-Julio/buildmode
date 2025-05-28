import { HttpStatus } from '../utils/httpStatus';

function formatHttpStatus(status: HttpStatus): string {
  const raw = HttpStatus[status]; // exemplo: "BAD_REQUEST"
  return raw
    .toLowerCase() // "bad_request"
    .replace(/_/g, ' ') // "bad request"
    .replace(/\b\w/g, (c) => c.toUpperCase()); // "Bad Request"
}

interface AppExceptionPayload {
  message: string | string[];
  status: HttpStatus;
  fields?: {
    [key: string]: string;
  };
}

export class AppException extends Error {
  public statusCode: number;
  public error: string;
  public fields?: Record<string, string>;
  public messages: string[];

  constructor({ message, status, fields }: AppExceptionPayload) {
    const messages = Array.isArray(message) ? message : [message];
    super(messages.join('; ')); // define o message da classe base Error

    this.name = 'AppException';
    this.statusCode = status;
    this.error = formatHttpStatus(status);
    this.fields = fields;
    this.messages = messages;
  }

  toJSON() {
    return {
      message: this.messages,
      error: this.error,
      statusCode: this.statusCode,
      fields: this.fields,
    };
  }
}
