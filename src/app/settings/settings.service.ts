import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public static API_ENDPOINT = "http://51.174.84.85:5000/api/"
  public static PI_ENDPOINT = "http://127.0.0.1:5000/?env_jwt="
}
