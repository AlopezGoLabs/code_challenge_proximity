$(document).ready(function () {
  $("#keyword_submit").on("click", search);
  $("#keyword_input").on("keypress", function (e) {
    if (e.keyCode === 13) search();
  });

  function search() {
    if (Boolean($("#keyword_input").val())) {
      $("#keyword_input").removeClass("is-invalid");
      $.ajax({
        url: "server/index.php",
        type: "POST",
        dataType: "json",
        data: { keyword: $("#keyword_input").val() },
        success: function (result) {
          if (result.error) {
            showError(result.error);
          }
          $(".show-table").removeClass("d-none");
          if (result.length > 0) {
            $(".no-data").addClass("d-none");
            return fillData(result);
          }
          $(".data").remove();
          $(".no-data").removeClass("d-none");
        },
        error: function () {
          showError("Server Error");
        },
      });
      return;
    }
    $("#keyword_input").addClass("is-invalid");
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
    $(".show-table").hide();
    $(".alert").removeClass("d-none");
    if ($("p").length == 0) {
      $(".alert").append("<p >" + error + "</p>");
    }
    return false;
  }
});
