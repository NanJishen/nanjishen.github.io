function getYoutubeData(link, callback) {
	$.get(`https://ytinfo.vercel.app/get?video=${link}`, async function (data) {
		if (typeof callback === "function") {
			callback(data);
		}
	});
}
