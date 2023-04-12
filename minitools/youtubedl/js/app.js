const linkInput = $(".link-input");

// Download Screen
const sideWrapper = $(".inner-controller");
const ytThumbnail = $(".yt-info-img");
const ytChannelIcon = $(".yt-channel-icon");
const ytChannelName = $(".yt-channel-name");
const ytDescription = $(".yt-d");
const ytTitle = $(".yt-title");

const qualityList = $(".download-item");
const ytInfo = $(".yt-info");
const loadingScreen = $(".loading-screen");
const closeBtn = $(".close-btn");

linkInput.keypress(function (e) {
	var link = linkInput.val();
	if (e.which == 13 && link) {
		loadSideBar(link);
	}
});

function loadSideBar(link) {
	sideWrapper
		.removeClass("animate__animated animate__bounceOutLeft")
		.addClass("animate__animated animate__bounceInLeft")
		.css("left", "0");
	getYoutubeData(link, (data) => {
		if (data.error !== false) {
			toastMsg(data.error, true);
			closeBtn.trigger("click");
			return;
		}

		const { author, description, title, thumbnails } = data.videoDetails;

		ytChannelIcon.attr("src", getLastThumbUrl(author.thumbnails));
		ytChannelName.text(author.user);

		ytDescription.text(description);
		ytTitle.text(title);

		ytThumbnail.attr("src", getLastThumbUrl(thumbnails));

		formatListMaker(data.formats);
		loadingToggle(false);
	});
}

closeBtn.on("click", () => {
	sideWrapper
		.removeClass("animate__animated animate__bounceInLeft")
		.addClass("animate__animated animate__bounceOutLeft");

	linkInput.val("");
	qualityList.html("");
});

function getLastThumbUrl(obj) {
	var urlObj = obj.slice(-1).pop();
	return urlObj.url;
}
