/*
 * jQuery Multiline Highlighter plugin 1.0
 * Author: Fabrizio Meinero
 */

(function( $ ){

  $.fn.multilineHighlighter = function() {  

    $(this).each(function(){
        var elem = $(this);
        var elementTag = $(elem)[0].tagName.toLowerCase();

        //first line properties
        var defaultTextHeight = isNaN(parseInt($(elem).css("line-height"))) ? Math.floor(parseInt($(elem).css("font-size")) + parseInt($(elem).css("padding-top")) + parseInt($(elem).css("padding-bottom"))) : parseInt($(elem).css("line-height"));
        var defaultTextWidth = parseInt($(elem).css("padding-right")) + parseInt($(elem).css("padding-right")) + $(elem).width();
        var defaultTextPadding = $(elem).css('padding-top') + ' ' + $(elem).css('padding-right') + ' ' + $(elem).css('padding-bottom') + ' ' + $(elem).css('padding-left');

        //check if elemet is link
        var isLink = false;
        if($(elem).find('a').size()>0){
            var link = {
                'href': $(elem).find('a').attr('href'),
                'target': $(elem).find('a').attr('target'),
                'title': $(elem).find('a').attr('title')
            };
            isLink = true;
        }
        
        //if is multiline
        if($(elem).height()>defaultTextHeight){
            var words = $(elem).text().split(' ');
            var lines = new Array();

            $(elem).after('<'+elementTag+' class="elem-highlighted"></'+elementTag+'>');
               
            var elemHighlighted = $(elem).next();
            
            //create lines array
            for(var i=0; i<words.length; i++){
                var textBeforeChange = $(elemHighlighted).text();
                var word = (i!=0) ? ' ' + words[i] : words[i];
                $(elemHighlighted).append(word);
                if($(elemHighlighted).height()>defaultTextHeight){
                    lines.push(textBeforeChange);
                    $(elemHighlighted).text(textBeforeChange);
                    textBeforeChange = '';
                    word = word.replace(' ', '');
                    $(elemHighlighted).text(word);
                }
                if(i==words.length-1) lines.push(textBeforeChange + word);
            }
            
            //empty elem and insert lines
            $(elemHighlighted).text('');

            if(isLink){
                $(elemHighlighted).append('<a href="'+link.href+'" target="'+link.target+'" title="'+link.title+'"></a>');
                $(elemHighlighted).find('a').css({
                    'background-color': 'transparent',
                    'padding': '0'
                });
            }

            for(var i=0; i<lines.length; i++){
                var lineClass = (i>0) ? 'new-line' : 'new-line first-line'; 
                var lineClass = lineClass + ' line-' + (i+1); 
                if(i==(lines.length-1)){
                  var lineClass = lineClass + ' last-line'; 
                }
                //var zIndex = 'z-index:' + parseInt(9999/(i+2)) + ';';
                if(isLink)
                    $(elemHighlighted).find('a').append('<span class="' + lineClass + '">' + lines[i] + ' </span>')
                else
                    $(elemHighlighted).append('<span class="' + lineClass + '">' + lines[i] + ' </span>')
            }

            //set style
            $(elemHighlighted).find('.new-line').css({
                'background-color': $(elem).css('background-color'),
                'padding': defaultTextPadding,
                'line-height': $(elem).css('line-height'),
                'position': 'relative',
                'display': 'inline-block'
            });
            $(elemHighlighted).css({
                'background-color': 'transparent',
                'padding': '0',
                'margin': '0',
                'width': defaultTextWidth
            });

            //remove original
            $(elem).remove();
        }
        
    });


  };
})( jQuery );