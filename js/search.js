$(document).ready(function () {
  $("#keyword_submit").on("click", search);
  $("#keyword_input").on("keypress", function (e) {
    if (e.keyCode === 13) search();
  });

  function search() {
    $.getJSON("server/index.php", { keyword: $("#keyword_input").val() }, function (result) {
        if (result.error) return showError(result.error);
        $(".show-table").removeClass("d-none");
        $(".alert").addClass("d-none");
        if (result.length > 0) {
          $(".no-data").addClass("d-none");
          return fillData(result);
        }
        $(".data").remove();
        $(".no-data").removeClass("d-none");
      }
    ).fail(function () {
      return showError("Request Failed");
    });
  }

  function fillData(result) {
    $(".data").remove();
    result.forEach((el) => {
      $("#loop-data").append($("<tr class='data' id=" + el.ID + " />"));
      $("#" + el.ID).append(
        "<td>" + el.name + "</td>",
        "<td>" + el.city + "</td>",
        "<td>" + el.state + "</td>"
      );
    });
  }

  function showError(error) {
    $("p").remove();
    $(".show-table").addClass("d-none");
    $(".alert").removeClass("d-none");
    $(".alert").append("<p >" + error + "</p>");
  }

  search();
});
