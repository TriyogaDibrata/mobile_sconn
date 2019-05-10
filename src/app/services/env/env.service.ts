import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  API_URL = "http://localhost/api_sc/api/";

  constructor() { }
}
