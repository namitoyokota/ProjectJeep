export class UserLocation {
    latitude?: number;
    longitude?: number;

    constructor(latitude?: number, longitude?: number) {
        this.latitude = latitude ? latitude : null;
        this.longitude = longitude ? longitude : null;
    }
}
