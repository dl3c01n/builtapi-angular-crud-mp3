import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../models/videoModel';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  options = { headers: this.headers }

  constructor(private httpClient: HttpClient) { }

  getAll = (): Observable<Video[]> => {
    return this.httpClient.get<Video[]>("http://localhost:8080/endpoint/");
  }

  getSingle = (id: String): Observable<Video> => {
    return this.httpClient.get<Video>('http://localhost:8080/endpoint/get-video/' + id)
  }

  create = (video: Video): Promise<any> => {
    const jsonVideo = JSON.stringify(video);
    return fetch("http://localhost:8080/endpoint/create-video/", {method: "POST", headers : {'Content-Type' : 'application/json'}, body: jsonVideo})
    // console.log(jsonVideo)
  }

  update = (video: Video, id: String): void => {
    this.httpClient.put<Video>("http://localhost:8080/update-video/" + id, video)
  }

  delete = async (id: String) => {
    console.log("http://localhost:8080/endpoint/remove-video/" + id)
    return await this.httpClient.delete("http://localhost:8080/endpoint/remove-video/" + id).subscribe(() => {
    })
  }
}
