function toastMsg(msg, error = false, to = 3000) {
	var toast = document.createElement("div");
	toast.innerHTML = msg;
	toast.classList.add("bottom-toast");

	if (error) {
		toast.classList.add("toast-error");
	}

	toast = $(toast);
	$("body").append(toast);

	setTimeout(function () {
		toast.addClass("animate__animated animate__slideOutDown");
	}, to);
}

function loadingToggle(isLoading = false) {
	if (isLoading) {
		loadingScreen.show();
		ytInfo.hide();
	} else {
		loadingScreen.hide();
		ytInfo.show();
		linkInput.blur();
	}
}

$(".link-box").on("click", () => {
	linkInput.focus();
});

function formatListMaker(Obj) {
	Obj.forEach((item) => {
		var mimeData = item.mimeType.split(";")[0].split("/");

		var container = mimeData[1] + "-" + mimeData[0];
		var containerClass = `.item-container-${container}`;
		if ($(containerClass)[0]) {
		} else {
			var itemSection = `
            <div class="formatSection item-container-${container}">
                <span class="format-title">${mimeData[1]}  ${mimeData[0]}</span>
                <div class="quality-chooser"></div>
            </div>
            `;
			qualityList.append(itemSection);
		}

		$(containerClass).find(".quality-chooser").append(getItemHTML(item));
	});

	function getItemHTML(data) {
		if (data.audioQuality) {
			return `<div class="quality-item" data-link="${
				data.url
			}" data-container=${data.container}>
                <h3>${data.audioQuality.split("_")[2]}  QUALITY</h3>
               <div> 
                    ${(data.contentLength / 1024 / 1024).toFixed(2)}MB · ${
				data.audioCodec
			}</div>
            </div>`;
		} else if (data.quality !== null) {
			return `<div class="quality-item" data-link="${
				data.url
			}" data-container=${data.container}>
                <h3>${data.qualityLabel}</h3>
                <div> 
                    ${(data.contentLength / 1024 / 1024).toFixed(2)}MB · ${
				data.width
			}x${data.height} · ${data.quality}</div>
            </div>`;
		} else {
		}
	}

	$(document.body).on("click", ".quality-item", (e) => {
		var item = e.currentTarget;
		var link = $(item).data("link");
		window.open(link);
	});
}

visualViewport.addEventListener("resize", setViewHeight);
function setViewHeight() {
	document.documentElement.style.setProperty(
		"--viewport-height",
		`${visualViewport.height}px`
	);
}

setViewHeight();
