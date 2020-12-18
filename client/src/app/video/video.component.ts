import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Video } from '../models/videoModel';
import { VideoService } from "../service/video.service";
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  url: any;
  title: String;
  description: String;
  videos: Video[] = []
  video: Video

  formTitle: string;
  formUrl: string;
  formDescription: string;

  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [10,20,30];
  msaapDisplayVolumeControls = true;
  msaapDisablePositionSlider = true;

  msaapPlaylist: Track[] = []

  showFiller = false;


  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.getAllVideos()
  }

  getAllVideos = () => {
    this.videoService.getAll().subscribe(res => {
      this.videos = res
    this.updateTracks()

  })
  this.updateTracks()

}
  
  updateTracks = () => {
    for (let i = 0; i < this.videos.length; i++) {
      let fileObj = {
        title: this.videos[i].title,
        link: this.videos[i].url
    }
    this.msaapPlaylist.push(fileObj);
  }
}

  createVideo = () => {
    this.video = new Video(this.formTitle, this.formUrl, this.formDescription)
    console.log(this.video)
    this.videoService.create(this.video).then(data => data.json()).then(info => console.log(info))
  }

  deleteSong = (i) => {
    this.videoService.delete(this.videos[i]._id);
    this.getAllVideos();
    this.updateTracks();
  }

  displayInput = () => {
    console.log(this.formDescription)
    console.log(this.formUrl)
    console.log(this.formTitle)
  }

}
