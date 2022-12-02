import { AfterViewInit, Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from './environment/environment';
import { ApiResponse } from './abstractions/api-response';
import { UserLocation } from './abstractions/user-location';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    /** Total days of forecast */
    totalDays = 0;

    /** Total days of rain found in forecast */
    totalRainDays = 0;

    /** Flag to indicate when in process of retrieving data */
    isLoading = true;

    /** Error message to display to UI */
    errorMessage: string = '';

    /** Keeps track of user's location in browser */
    private userLocation: UserLocation;

    constructor(private http: HttpClient) { }

    /** On init lifecycle hook */
    ngAfterViewInit() {
        this.getLocation();
    }

    /** Gets location from browser */
    private getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setPosition(position)
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    /** Sets position of user */
    private setPosition(position: GeolocationPosition) {
        if (position) {
            this.userLocation = new UserLocation(
                position.coords.latitude,
                position.coords.longitude
            );

            this.getForecast();
        }
    }

    /** Calls API to get forecast */
    private getForecast() {
        this.http
            .get<any>('https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily', this.getHeaders())
            .subscribe(
                (response: ApiResponse) => {
                    this.parseForecast(response);
                    this.isLoading = false;
                },
                (error) => {
                    this.handleError(error);
                    this.isLoading = false;
                }
            );
    }

    /** Returns header to send to API */
    private getHeaders() {
        return {
            headers: new HttpHeaders({
                'X-RapidAPI-Key': environment.XRapidAPIKey,
                'X-RapidAPI-Host': environment.XRapidAPIHost
            }),
            params: {
                lat: this.userLocation.latitude.toString(),
                lon: this.userLocation.longitude.toString()
            }
        }
    }

    /** Parses API response to see if it'll rain */
    private parseForecast(response: ApiResponse) {
        this.totalDays = response.data.length;

        this.totalRainDays = 0;
        response.data.forEach(day => {
            if (day.weather.code <= 522) {
                this.totalRainDays += 1;
            }
        });
    }

    /** Sets error message to display in UI */
    private handleError(error: HttpErrorResponse) {
        this.errorMessage = error.error.message;
    }
}
