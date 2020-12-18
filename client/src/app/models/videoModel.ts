export class Video {
    public id: string ;
    public title: string;
    public url: string;
    public description: string

    constructor(title: string, url: string, description: string){
        this.title = title
        this.url = url
        this.description = description
    }
}