export class Address {
  public loc: string;
  constructor(
    public lat: number,
    public lng: number,
    public city: string,
    public region: string,
    public country: string
  ) {
    this.loc = lat + ',' + lng;
  }
}
