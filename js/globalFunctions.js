function prepareList() {
    $('#expList').find('li:has(ul)').unbind('click').click(function(event) {
        if(this == event.target) {
            $(this).toggleClass('expanded');
            $(this).children('ul').toggle('medium');
        }
    }).addClass('collapsed').removeClass('expanded').children('ul').hide();
 
    //Hack to add links inside the cv
    $('#expList a').unbind('click').click(function() {
        window.open($(this).attr('href'));
    });
    //Create the button functionality
    $('#expandList').unbind('click').click(function() {
        $('.collapsed').addClass('expanded');
        $('.collapsed').children().show('medium');
    });
    $('#collapseList').unbind('click').click(function() {
        $('.collapsed').removeClass('expanded');
        $('.collapsed').children().hide('medium');
    });
}

function sendMail(opts){
    var str = 'http://mail.google.com/mail/?view=cm&fs=1'+ '&to=' + opts.to + '&su=' + opts.subject + '&body=' + opts.message + '&ui=1';    // // location.href.blank = str;
    window.open(str,'_blank');

}
