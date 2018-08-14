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
       var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> Sending...';
       if ($this.html() !== loadingText) {
         $this.data('original-text', $this.html());
         $this.html(loadingText);
       }    

      function SuccessMessage() {
        //Success message
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
        $('#success > .alert-success')
          .append("<strong>" + firstName + ", your message has been sent. Someone will reply you soon. </strong>");
        $('#success > .alert-success')
          .append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
      }

      function FailureMessage() {
        // Fail message
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
        $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
        $('#success > .alert-danger').append('</div>');
        //clear all fields
        $('#contactForm').trigger("reset");
      }

      var data = {
           name: name,
           phone: phone,
           email: email,
           message: message
         };
      var url = "https://script.google.com/macros/s/AKfycbwMv4XBCQ1aAhhGaqwdzq11Q_uS7ZEfjXvGoR8V5w/exec";
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {        
        if(xhr.readyState === 4) {
          $this.prop("disabled", false);
          $this.html($this.data('original-text'));
          console.log(xhr.status, xhr.statusText);
          console.log(xhr.responseText);
          switch(xhr.status) {
            case 200:
              SuccessMessage();
              break;
            default:
              FailureMessage();
          }
        }        
        return;
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
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
