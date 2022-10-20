$(
  (function () {
    var step1 = $("#step-1"),
      step2 = $("#step-2"),
      step3 = $("#step-3"),
      step4 = $("#step-4"),
      step5 = $("#step-5"),
      username = "",
      msg = $("#generating-message"),
      progressBar = $("#progress-belt"),
      currMsg = 0,
      genState = [
        { percent: 2, text: "Connecting to  server." },
        { percent: 20, text: "Connecting to  server..." },
        { percent: 30, text: "Validating user..." },
        { percent: 40, text: "Generating SHA-256 verification strings..." },
        { percent: 50, text: "Validating blocks 1-256..." },
        { percent: 55, text: "Validating blocks 257-512..." },
        { percent: 60, text: "Connecting to game server..." },
        { percent: 65, text: "Establishing connection..." },
        { percent: 67, text: "Connection successful on port 96531" },
        { percent: 69, text: "Downloading data" },

        { percent: 70, text: "Extracting data..." },
        { percent: 72, text: "Calculating CRC values..." },
        { percent: 75, text: "CRC Check..." },
        { percent: 76, text: "Packing data... 0%" },
        { percent: 78, text: "Packing data... 7%" },

        { percent: 79, text: "Packing data... 63%" },

        { percent: 80, text: "Packing data... 100%" },
        { percent: 85, text: "Sending" },
        { percent: 86, text: '<b class="color-green">Sending... done!</b>' },

        { percent: 87, text: "Checking server response..." },
        { percent: 88, text: '<b class="color-green">Server response: OK<b/>' },
        { percent: 89, text: "Creating files" },
        { percent: 90, text: "Trying Automatic Verification." },
        { percent: 95, text: "<b>Waiting for manual verification...</b>" },
      ];
    var changeStatusBox = function (callback1, callback2) {
      var init = setInterval(function () {
        if (currMsg >= genState.length - 1) {
          clearInterval(init);
          callback2();
        }
        if (currMsg >= genState.length / 2) {
          setTimeout(callback1(), 1000);
        }
        progressBar.css("width", genState[currMsg].percent + "%");
        msg.html(genState[currMsg].text);
        currMsg++;
      }, random(300, 1000));
    };
    var showGenCards = function () {
      $("#r-1")
        .delay(500)
        .animate({ opacity: 1 }, 500, function () {
          $("#r-2").animate({ opacity: 1 }, 700, function () {
            $("#r-3").animate({ opacity: 1 }, 800, function () {
              $("#r-4").animate({ opacity: 1 }, 900);
            });
          });
        });
    };
    var init = function () {
      step1.fadeOut("300", function () {
        step2.fadeIn("300");
        step3.fadeIn("300");
        changeStatusBox(
          function () {
            step2.fadeOut("100", function () {
              step4.fadeIn();
            });
            showGenCards();
          },
          function () {
            step5.fadeIn("100");
            window.scrollTo(0, $(".main-header").offset().top + 20);
          }
        );
      });
    };
    $("#username-input").on("keyup", function () {
      username = $(this).val();
      $("#username-r").text(username);
    });
    $("#generate").on("click tap", function () {
      if (username == "") $("#error").modal();
      else init();
    });
  })()
);
