var app = new Vue({
	el: "#app",
	data: {
		//搜索内容
		musicname: "搜索一下",
		//歌曲列表
		musiclist: [],
		//专辑图片地址
		musicurl: "",
		//歌曲url
		music_url: "",
		//歌曲图片显示
		picchange: false,
		//logo图片显示
		picchange1: true,
		//mvid
		mvid: [],
		//热门评论
		hotcom: [],
		//歌曲图片旋转
		isplay: false,
		//mv区域
		isshow: false,
		//mvsrc
		mvsrc: "",
		//背景透明度
		BackgrpundShow: true,
		//mv播放 英语自动暂停
		isPlay: false,
		//全局显示
		allshow: false,
		partshow: false,

	},
	methods: {
		//搜索
		seachermusic: function() {
			var that = this;
			axios.get("https://autumnfish.cn/search?keywords=" + this.musicname)
				.then(function(response) {
						console.log(response);
						that.musiclist = response.data.result.songs;
						that.partshow = true;
					},
					function(err) {}
				);
		},
		//播放
		musicPlay: function(musicId) {
			console.log(musicId);
			var that = this;
			//音乐url
			axios.get("https://autumnfish.cn/song/url?id=" + musicId)
				.then(function(response) {
					that.music_url = response.data.data[0].url;
					that.allshow = true;
				}, function(err) {})
			axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
				.then(function(response) {
						console.log(response.data.hotComments);
						that.hotcom = response.data.hotComments;
					},
					function(err) {}
				)
			//专辑封面
			axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
				.then(function(response) {
						console.log(that.hotcom);
						console.log(response.data.songs[0].al.picUrl);
						that.musicurl = response.data.songs[0].al.picUrl;
						that.picchange = true;
						that.picchange1 = false;
					},
					function(err) {})
		},
		//音乐动画
		play: function() {
			console.log("play");
			this.isplay = true;
		},
		pause: function() {
			console.log("pause");
			this.isplay = false;
		},
		// 暂停事件
		StopPause: function() {
			var audio = document.getElementById("mvplays");
			audio.pause();
			console.log(666666)
		},
		playMv: function(mvid) {
			var that = this;
			axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
				.then(function(response) {
					// console.log(response);
					that.BackgrpundShow = false;
					console.log(response.data.data.url);
					that.isshow = true;
					that.mvsrc = response.data.data.url;
					this.isplay = false;


				}, function(err) {})
		},

		hide: function() {
			this.isshow = false;
			this.isplay = true;
			this.BackgrpundShow = true;
			this.mvsrc = "";
			var audio = document.getElementById("mvplays");
			audio.play();
			console.log(5555)
		}

	}



});
