class Menu {
  
  constructor(video_start, video_end, img_menu, img_instr, img_sett){

    this.video_start = video_start;
    this.video_end = video_end;
    this.img_menu = img_menu;
    this.img_instr = img_instr;
    this.img_sett = img_sett;

  }

  start(video){
    video.play();
    video.onended(this.videoEnded(video));
  }

  videoEnded(video){
    video.hide();
  }

}