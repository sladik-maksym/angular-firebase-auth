import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { catchError, from, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  user: User | null = null;

  get hasUser() {
    const firebaseUser = localStorage.getItem('firebase-user');

    if (firebaseUser) {
      const firebaseUserParsed: User = JSON.parse(firebaseUser);
      this.user = firebaseUserParsed;
    }

    return !!firebaseUser;
  }

  signUp(payload: { email: string; password: string }): Observable<User> {
    const response = from(
      createUserWithEmailAndPassword(this.auth, payload.email, payload.password)
    );

    return this.handleResponse(response);
  }

  signIn(payload: { email: string; password: string }): Observable<User> {
    const response = from(
      signInWithEmailAndPassword(this.auth, payload.email, payload.password)
    );

    return this.handleResponse(response);
  }

  logOut() {
    signOut(this.auth);
    localStorage.removeItem('firebase-user');
  }

  private handleResponse(
    response: Observable<UserCredential>
  ): Observable<User> {
    return response.pipe(
      map<UserCredential, User>(({ user }) => {
        localStorage.setItem('firebase-user', JSON.stringify(user));
        return user;
      }),
      catchError((error) => throwError(() => new Error(error)))
    );
  }
}
