import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class retrieveData {
  constructor(private http: HttpClient) {}
  private hash = 2803303013088158;
  // https://github.com/gr2m/CORS-Proxy
  private urlBase = `http://localhost:1337/superheroapi.com/api/${this.hash}`;

  // Title
  public getHeroInfo(id:number): Promise<any> {
    return this.http
      .get(`${this.urlBase}/${id}`)
      .toPromise()
      .then((hero: []) => hero);
  }
}
