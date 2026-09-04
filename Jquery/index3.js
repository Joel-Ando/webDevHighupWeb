
$(document).ready(function(){
          
            // $("#btn2").click(function(){
            //     $("p:first").hide()
            // })
            //mouesenter event
            // $("#p2").mouseenter(function(){
            //     $("#p2").css("background-color","red")
            // })
            //mouseleave, mouseUp, mousedown, hover, focus, blur
            $("p").on({

                mouseenter: function(){
                $(this).css("background-color","red")
            },
                mouseleave: function(){
                $(this).css("background-color","purple")
            }
        
        
            })
        })