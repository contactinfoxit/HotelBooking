export class Booking {
  constructor(
    public $key: string,
    public $value: string,
    public BookingDates: any[],
    public HouseNumber: string,
    public Latitude: string,
    public Longitude: String,
    public descruption: string,
    public houseName: string,
    public houseId: string,
    public location: string,
    public photoGalleryUrls: any[],
    public booked: string,
    public privateSwimmingPool: string) {

  }
}
