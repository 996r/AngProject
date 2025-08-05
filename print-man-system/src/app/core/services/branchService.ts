import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Branch } from "../../models";



@Injectable({
    providedIn: 'root'
})

export class BranchService {
    private apiUrl = 'http://localhost:3000/api/branches';

    constructor(private httpClient: HttpClient) {

    }

    getBranches(): Observable<Branch[]> {
        return this.httpClient.get<Branch[]> (this.apiUrl);
    } 
}