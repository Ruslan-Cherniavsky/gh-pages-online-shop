import { HttpClient } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { Login } from "src/app/interfaces/login.model";
import { Signup } from "src/app/interfaces/signup.model";
import { Subject, firstValueFrom } from 'rxjs'


@Injectable({ providedIn: 'root' })
export class AuthService implements ErrorHandler {
  public token: string
  private authStatusListiner = new Subject<boolean>()
  private switchListener = new Subject<boolean>()
  private userNameListener = new Subject<string>()
  private userStatusListener = new Subject<string>()
  private userIdListener = new Subject<string>()

  constructor(private http: HttpClient) { }
  getUserName() {
    return this.userNameListener.asObservable()
  }
  getUserRole() {
    return this.userStatusListener.asObservable()
  }

  getUserId() {
    return this.userIdListener.asObservable()
  }

  getAuthStatusListener() {
    return this.authStatusListiner.asObservable()
  }

  getSwitch() {
    return this.switchListener.asObservable()
  }

  switchTrue() {
    this.switchListener.next(true)
  }

  switchFalse() {
    this.switchListener.next(false)
  }

  async setUserData() {
    const token = localStorage.getItem('token')

    try {
      if (token) {
        const result = await firstValueFrom(this.http.get('http://localhost:3000/usercheck'))
        const currentName = result['firstName']
        const currentRole = result['role']
        const currentId = result['id']

        this.userNameListener.next(currentName)
        this.userStatusListener.next(currentRole)
        this.userIdListener.next(currentId)

      }
    } catch (error) {
      console.log(error)
    }
  }

  async getUserData(): Promise<any> {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        const result = await firstValueFrom(this.http.get('http://localhost:3000/usercheck'))
        return result
      }
    } catch (error) {
      console.log(error)
    }
  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    city: string,
    street: string) {
    const signup: Signup = {
      firstName,
      lastName,
      email,
      password,
      city,
      street
    }
    try {

      const result = await firstValueFrom(this.http.post('http://localhost:3000/users/signup', signup))
    } catch (error) {
      console.log(error)
    }
  }

  handleError(error) {
    console.log(error)
  }


  async loginUser(
    email: string,
    password: string
  ) {
    const login: Login = {
      email,
      password
    }
    try {
      const response = await firstValueFrom(this.http.post<{ token: string }>('http://localhost:3000/users/login', login))
      this.token = response.token
      localStorage.setItem('token', response.token)
      this.authStatusListiner.next(true)

    } catch (error) {
      console.log(error)
    }
  }


  getToken(): any {
    const token = localStorage.getItem('token')
    this.token = token
    if (token) {
      this.authStatusListiner.next(true)
      return this.token
    }
  }

  logout() {
    localStorage.clear()
    this.authStatusListiner.next(false)
  }
}
