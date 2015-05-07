// ToDo
// Add Social Network Images / SVG?
// Add the ability to disable certain networks.
// Add a tooltip that pops up when scrolled to indicate functionality.

(function( $ ){
    $.fn.selectShare = function(options) {

        var settings = $.extend( {
            fullShare  : false
        }, options);

        return this.each(function() {

            function getSelectedText() {
                var text = "";
                text = window.getSelection().toString();
                return text;
            }

            posY = '';
            var title = $('title').text();

            if ( settings.fullShare == true ){
                $(this).append('<div class="sb-guide"><a class="shareToggle" href="#">Share</a><div class="share-popup"><a class="icon-twitter" href="https://www.twitter.com/intent/tweet?url='+window.location.href+'" target="_blank"><span>Twitter</span></a><a class="icon-facebook" href="https://www.facebook.com/sharer/sharer.php?u='+window.location.href+'" target="_blank"><span>facebook</span></a><a class="icon-linkedin" href="https://www.linkedin.com/shareArticle?mini=true&url='+window.location.href+'" target="_blank"><span>LinkedIn</span></a><a class="icon-google" href="https://plus.google.com/share?url='+window.location.href+'" target="_blank"><span>Google+</span></a><a class="icon-mail" href="mailto:?&subject='+title+'&body=&quot;'+getSelectedText()+'&quot;%0D%0A%0D%0A'+window.location.href+'" target="_blank"><span>Email</span></a><p><em>Select any text with your mouse to share.</em></p></div></div>');
            }

            $('.content').mousedown(function(e){
                posY = e.pageY;
                $('#sharebox').remove();
            });

            $(this).mouseup(function (){
                if(getSelectedText() && getSelectedText().length > 2){

                    $('body').append('<div id="sharebox"><a class="icon-twitter" href="https://www.twitter.com/intent/tweet?text=&quot;'+getSelectedText()+'&quot;&url='+window.location.href+'" target="_blank"><span>Twitter</span></a><a class="icon-linkedin" href="https://www.linkedin.com/shareArticle?mini=true&url='+window.location.href+'&title='+getSelectedText()+'" target="_blank"><span>LinkedIn</span></a><a class="icon-mail" href="mailto:?&subject='+title+'&body=&quot;'+getSelectedText()+'&quot;%0D%0A%0D%0A'+window.location.href+'" target="_blank"><span>Email</span></a></div>');

                    var sbHeight = $('#sharebox').outerHeight(),
        			    shareboxPosition = posY - ((sbHeight * 2) + 15);

            		$('#sharebox').css('top', shareboxPosition+'px').addClass('active');
                }
            });

            $('.shareToggle').click(function(e){
                e.preventDefault();
                $('.share-popup').toggleClass('active');
            });
        });
    };
})( jQuery );
