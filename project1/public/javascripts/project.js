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




  $('.form-signin button').click(function () {
    if ($('#password').val() != $('#confirm_Password').val()) {
      window.alert("passwords are not matching")
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
      'success': function (data) {
        console.log(data);
        if (!data.check)
          alert("이미 등록된 id입니다")
      },
    })

    // var Eth_Address = $('#inputEthAddress').val()
    // var id = $('#inputEthAddress').val()
    // var password = $('#inputEthAddress').val()

  })
})
