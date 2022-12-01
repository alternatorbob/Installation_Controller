const container = document.querySelector(".canvasContainer");
let root = document.documentElement;

$(function () {
  var $all = $(".dial, .bars1, .bars2, .pad"),
    $body = $("body");

  const pad1 = $("#pad1")
    .xy({
      displayPrevious: false,
      min: -100,
      max: 100,
      width: container.offsetWidth - 1,
      height: container.offsetHeight - 40,

      fgColor: "#222222",
      bgColor: "#EEEEEE",
      change: function (value) {
        sendData(1, value[0], value[1]);
        console.log("change : ", value);
      },
    })
    .css({ border: ".5px solid #BBB" });

  const pad2 = $("#pad2")
    .xy({
      displayPrevious: false,
      min: -100,
      max: 100,
      width: container.offsetWidth - 1,
      height: container.offsetHeight - 40,
      fgColor: "#222222",
      bgColor: "#EEEEEE",
      change: function (value) {
        console.log("change : ", value);
        sendData(2, value[0], value[1]);
      },
    })
    .css({ border: ".5px solid #BBB" });

  function fitToContainer(canvas) {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  const canvases = document.querySelectorAll("canvas");
  canvases.forEach((c) => {
    root.style.setProperty("--myWidth", c.width + "px");
    root.style.setProperty("--myHeight", c.height + "px");

    console.log(c.width, c.height);
  });

  $("#displayPrevious").bind("change", function (e) {
    $all.trigger("configure", {
      displayPrevious: parseInt($(this).find("option:selected").val()),
    });
  });

  $("#cursor").bind("change", function (e) {
    $all.trigger("configure", {
      cursor: parseInt($(this).find("option:selected").val()),
    });
  });

  $(".height").bind("click", function (e) {
    $all.trigger("configure", { height: 100 });
  });

  var $animBars = $(".bars1"),
    timeout;
  $("#animate").bind("click", function () {
    if ($(this).is(":checked")) {
      var v = 0,
        s = "up",
        i = 0;
      var redraw = function () {
        if (v == 15 || v == 0) i++;
        s = v == 15 ? "down" : v == 0 ? "up" : s;
        s == "up" ? v++ : v--;

        $animBars
          .find("input:eq(" + v + ")")
          .val(Math.floor(Math.sin(i + v * i) * 100))
          .trigger("change");

        timeout = window.setTimeout(redraw, 1000 / 60);
      };
      redraw();
    } else {
      window.clearTimeout(timeout);
    }
  });
});
