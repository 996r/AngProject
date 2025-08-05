import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Printer } from "../../models";

@Injectable({
    providedIn: 'root'
})

export class PrintersService {

    private apiUrl = 'http://localhost:3000/api/printers'
    constructor( private httpClient: HttpClient){

    }
    getPrinters(): Observable<Printer[]> {
        return this.httpClient.get<Printer[]>(this.apiUrl);
    }
}