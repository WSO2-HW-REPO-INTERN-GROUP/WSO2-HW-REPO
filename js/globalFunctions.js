function prepareList() {
<<<<<<< HEAD
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
    })
    $('#collapseList').unbind('click').click(function() {
        $('.collapsed').removeClass('expanded');
        $('.collapsed').children().hide('medium');
    })
}
=======
                            $('#expList').find('li:has(ul)').unbind('click').click(function(event) {
                                if(this == event.target) {
                                    $(this).toggleClass('expanded');
                                    $(this).children('ul').toggle('medium');
                                }
                                return false;
                            }).addClass('collapsed').removeClass('expanded').children('ul').hide();
            
                            //Hack to add links inside the cv
                            $('#expList a').unbind('click').click(function() {
                                window.open($(this).attr('href'));
                                return false;
                            });
                            //Create the button functionality
                            $('#expandList').unbind('click').click(function() {
                                $('.collapsed').addClass('expanded');
                                $('.collapsed').children().show('medium');
                            })
                            $('#collapseList').unbind('click').click(function() {
                                $('.collapsed').removeClass('expanded');
                                $('.collapsed').children().hide('medium');
                            })
                        }

>>>>>>> 2ab677376f8113936a01e790217f203bd1ae7a7f
