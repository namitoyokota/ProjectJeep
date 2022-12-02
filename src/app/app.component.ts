import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'projectjeep';

    /** On init lifecycle hook */
    ngOnInit() {
        this.getLocation();
    }

    /** Gets location from browser */
    private getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition, this.handleError);
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    /** Prints out position in console */
    private showPosition(position: any) {
        console.log(
            `Latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`
        );
    }

    /** Handles error from HTML Geolocation API */
    private handleError(error: any) {
        let errorStr;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorStr = 'User denied the request for Geolocation.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorStr = 'Location information is unavailable.';
                break;
            case error.TIMEOUT:
                errorStr = 'The request to get user location timed out.';
                break;
            case error.UNKNOWN_ERROR:
                errorStr = 'An unknown error occurred.';
                break;
            default:
                errorStr = 'An unknown error occurred.';
        }
        console.error('Error occurred: ' + errorStr);
    }
}
