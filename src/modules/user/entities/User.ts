import { v7 as uuidv7 } from 'uuid';
import { Replace } from '../../../utils/replace';

interface UserSchema {
  username: string;
  phone: string;
  name: string | null;
  password: string;
  updatedAt: Date;
  createdAt: Date;
}

export class User {
  private props: UserSchema;
  private readonly _id: string;

  constructor(
    props: Replace<
      UserSchema,
      {
        name?: string | null;
        updatedAt?: Date | null;
        createdAt?: Date | null;
      }
    >,
    id?: string | null,
  ) {
    this.props = {
      ...props,
      name: props.name || null,
      updatedAt: props.updatedAt || new Date(),
      createdAt: props.createdAt || new Date(),
    };
    this._id = id || uuidv7();
  }

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this.props.username;
  }
  set username(username: string) {
    this.props.username = username;
  }

  get phone(): string {
    return this.props.phone;
  }

  get name(): string | null {
    return this.props.name;
  }
  set name(name: string | null) {
    this.props.name = name;
  }

  get password(): string {
    return this.props.password;
  }
  set password(password: string) {
    this.props.password = password;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
  set updatedAt(updateAt: Date) {
    this.props.updatedAt = updateAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
