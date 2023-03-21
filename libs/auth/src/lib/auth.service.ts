import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    // userName = '';
    userName = new BehaviorSubject<string>('');

}