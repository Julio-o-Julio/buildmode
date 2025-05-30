export class AuthenticatedRequestModel extends Request {
  user: {
    id: string;
    username: string;
    name: string | null;
    phone: string;
    createdAt: string;
    updatedAt: string;
  };
}
