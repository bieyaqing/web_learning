$('#contactform').on('submit', function(e) {
    e.preventDefault();

    var name = $('#username').val();
    var email = $('#email').val();
    var message = $('#message').val();

    var data = {
        name : name,
        email : email,
        message : message
    };

    $.ajax({
        type : 'POST',
        url : '/api/email',
        data : JSON.stringify(data),
        contentType : 'application/json',
        success : function(d) {
            $('#m-success').html("Message Received!");
            $('#contactform').trigger('reset');
        },
        error : function(d) {
            $('#m-error').html(
                    "Something went wrong! Please try again.");
        }
    })
});