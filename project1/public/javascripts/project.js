$(document).ready(function () {


  $("#signup").click(function () {
    location.href = "/add";
  })
  $("#signin").click(function () {
    location.href = "/login";
  })
  $("#again").click(function () {
    location.href = "/add";
  })
  $('.form-signup button').click(function () {
    if ($('#password').val() != $('#confirm_Password').val()) {
      window.alert("passwords are not matching!!!!!!!")
      return;
    }
    else if($('#password').val()=="" || $('#inputId').val()=="" || $('#Eth_Address').val()==""){

      window.alert("빈 칸을 다 채우세요")
      return;
    }


    event.preventDefault();

    $.ajax('/create', {
      'method': 'POST',
      'data': {
        'Eth_Address': $('#inputEthAddress').val(),
        'id': $('#inputId').val(),
        'password': $('#inputPassword').val()
      },
      'error': function (err) {
        console.log(err);
      },

      'success': function (data) {
        console.log(data);
        if (!data.check)
          alert("We alreay have this ID. Please try the other one.")
        else{
          console.log("성공");
          alert("가입 성공");
          location.href="/login";
        }
      },

    })

    // var Eth_Address = $('#inputEthAddress').val()
    // var id = $('#inputEthAddress').val()
    // var password = $('#inputEthAddress').val()

  })
})
