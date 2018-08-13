$(function () {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages

      function SuccessMessage(statusCode) {
        //Success message
        console.log("status code " + statusCode);
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
        $('#success > .alert-success')
          .append("<strong>Your message has been sent. </strong>");
        $('#success > .alert-success')
          .append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
      }

      function FailureMessage(statusCode) {
        console.log("status code " + statusCode);
        // Fail message
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
        $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
        $('#success > .alert-danger').append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
      }
      $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSda9tl9Boh5BJS9cmgcJ9FjTI-0bCAbObmfmYfm_1C4A5m55A/formResponse",
        data: {
          "entry.215119693": name,
          "entry.1074210692": phone,
          "entry.1169079001": email,
          "entry.1228534959": message
        },
        type: "POST",
        dataType: "xml",
        complete: function (jqXHR, textStatus) {
          setTimeout(function () {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
          switch (jqXHR.status) {
            case 200:
            case 0:
              SuccessMessage(jqXHR.status);
              break;

            default:
              FailureMessage(jqXHR.status);
          }
        }

      });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
  $('#success').html('');
});
