
$('.btnDelete').on('click', function( e ){
  e.preventDefault();
  console.log( "ajax: "+ $(this)[0].attributes.action.nodeValue );
  console.log( window.location );
  console.log( window.location.origin + $(this)[0].attributes.action.nodeValue );

  var $self = $(this);

  $.ajax({
      url: $(this)[0].attributes.action.nodeValue,
      type: 'delete',
      success: function() {
        // window.location.redirect = "/tasks";
        $self.parent().remove();
      }
    });
});

$('.btnComplete').on('click', function( e ){
  e.preventDefault();
  var $self = $(this);
  $.ajax({
      url: $(this)[0].attributes.action.nodeValue,
      type: 'post',
      success: function() {
        $self.parent().remove();
      }
    });
});

$('.btnCompleteAll').on('click', function( e ){
  var res = confirm("Are you sure you want to complete all tasks?");
  if ( res ){
    e.preventDefault();
    var $self = $(this);
    // console.log( $self.parent );
    $.ajax({
        url: $(this)[0].attributes.action.nodeValue,
        type: 'post',
        success: function() {
          console.log($('.tasks'));
          $('.tasks')[0].innerHTML="";
        }
      });
  }
});


$('.menuButton').on('click', function( e ){
  e.preventDefault();
  console.log( "button: "+ this );
    $(".menuButton").removeClass('selected');
    $(this).addClass('selected');
    window.location.href = this ;
});
