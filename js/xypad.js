const container = document.querySelector(".canvasContainer");
console.log(container.offsetWidth);
console.log(container.offsetHeight);

$(function () {
  var $all = $(".dial, .bars1, .bars2, .pad"),
    $body = $("body");

  const pad1 = $("#pad1")
    .xy({
      displayPrevious: false,
      min: -100,
      max: 100,
      width: container.offsetWidth - 10,
      height: container.offsetHeight - 50,

      fgColor: "#222222",
      bgColor: "#EEEEEE",
      change: function (value) {
        sendData(1, value[0], value[1]);
        console.log("change : ", value);
      },
    })
    .css({ border: "5px solid #BBB" });

  console.log(container.offsetWidth);
  console.log(container.offsetHeight);

  const pad2 = $("#pad2")
    .xy({
      displayPrevious: false,
      min: -100,
      max: 100,
      width: container.offsetWidth - 10,
      height: container.offsetHeight - 100,
      fgColor: "#222222",
      bgColor: "#EEEEEE",
      change: function (value) {
        console.log("change : ", value);
        sendData(2, value[0], value[1]);
      },
    })
    .css({ border: "5px solid #BBB" });

  function fitToContainer(canvas) {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  // let canvases = document.querySelectorAll("canvas");
  // canvases.forEach((c) => {
  //   fitToContainer(c);
  //   const p = c.parentElement;
  //   const cC = document.querySelector(".canvasContainer");
  //   console.log(cC);

  //   p.style.width = "97%";
  //   p.style.height = "89%";
  //   console.log(p.offsetWidth);

  //   //   c.style.width = "100%";
  //   //   c.style.height = "100%";
  //   //   // ...then set the internal size to match
  //   //   c.width = cC.offsetWidth;
  //   //   c.height = cC.offsetHeight;

  //   c.width = p.offsetWidth;
  //   c.height = p.offsetHeight;

  //   //   // c.offsetWidth = c.parentElement.style.width
  //   //   // c.offsetHeight = c.parentElement.style.height
  // });

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
