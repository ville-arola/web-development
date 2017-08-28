export class Contact {

  private _id: number;
  private _firstName: string;
  private _lastName: string;

  get id(): number {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }


  constructor(id?: number, firstName?: string, lastName?: string) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
  }
}
