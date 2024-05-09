// All app themes
var colors = { "pink": "#FF0066", "purple": "#8A3FFC", "orange": "#F1C21B", "green": "#08BDBA", "blue": "#0F62FE" };

$(document).ready(function() {
    var txtText = document.getElementById("txtText");
    var imgFrame = document.getElementById("imgFrame");

    // Resolve white color problem
    imgFrame.style.backgroundColor = colors.pink;

    txtText.addEventListener("keydown", refreshText);
});

// Refresh image text
function refreshText() {
    setTimeout(function() {
        $("#imgText").html($("#txtText").val());
    }, 50);
}

// Change color of the background
document.body.addEventListener("click", function({ target }) {
    if (target.matches("div") && target.dataset.color != null) {
        var color = target.dataset.color;
        $("#imgFrame").css("background-color", colors[color]);
    }
});

// Buttons

// Download button
document.getElementById("btnDownload").addEventListener("click", function() {
    html2canvas(document.getElementById("img"), { scrollY: -window.scrollY, scrollX: -window.scrollX }).then(canvas => {
        var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = "imgit.png";
        link.href = image;
        link.click();
    });
});