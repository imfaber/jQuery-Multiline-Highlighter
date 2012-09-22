/*
 * jQuery Multiline Highlighter plugin 1.0
 * Author: Fabrizio Meinero
 */ 

 (function ($) {

    $.fn.multilineHighlighter = function () {

        $(this).each(function () {
            var $elem = $(this);
            $elem.css({'display': 'block'});
            var elementTag = $elem[0].tagName.toLowerCase();
            var elemAttributes = ''
            var hasClassAttribute = false;

            //get elem attributes
            $.each($elem[0].attributes, function (index, attr) {
                if(attr.name=='id' || attr.name=='class' || attr.name=='title' || attr.name=='href'){
                    if (attr.name == 'class') {
                        hasClassAttribute = true;
                        elemAttributes = ' ' + elemAttributes + attr.name + '="elem-highlighted ' + attr.value + '"';
                    } else {
                        elemAttributes = ' ' + elemAttributes + attr.name + '="' + attr.value + '"';
                    }
                }
            });
            if (!hasClassAttribute) {
                elemAttributes = elemAttributes + ' class="elem-highlighted"';
            }

            //first line properties
            var defaultTextHeight = Math.floor(parseInt($elem.css("font-size")) + parseInt($elem.css("padding-top")) + parseInt($elem.css("padding-bottom"))) + 2;
            var defaultTextWidth = parseInt($elem.css("padding-right")) + parseInt($elem.css("padding-right")) + $elem.width();
            var defaultTextPadding = $elem.css('padding-top') + ' ' + $elem.css('padding-right') + ' ' + $elem.css('padding-bottom') + ' ' + $elem.css('padding-left');

            //check if element contains a link
            var containsLink = false;
            if ($elem.find('a').size() > 0) {
                $link = $elem.find('a');
                var link = {
                    'href': (typeof($link.attr('href'))!=='undefined') ? $link.attr('href') : 'javascript:void(0)',
                    'target': (typeof($link.attr('target'))!=='undefined') ? $link.attr('target') : '_self',
                    'title': (typeof($link.attr('title'))!=='undefined') ? $link.attr('title') : '',
                    'class': (typeof($link.attr('class'))!=='undefined') ? $link.attr('class') : ''
                };
                containsLink = true;
            }

            //if is multiline
            if ($elem.height() > defaultTextHeight) {
                var words = $elem.text().split(' ');
                var lines = new Array();

                $elem.after('<' + elementTag + ' ' + elemAttributes + '></' + elementTag + '>');

                var elemHighlighted = $elem.next();

                //create lines array
                for (var i = 0; i < words.length; i++) {
                    var textBeforeChange = $(elemHighlighted).text();
                    var word = (i != 0) ? ' ' + words[i] : words[i];
                    $(elemHighlighted).append(word);
                    if ($(elemHighlighted).height() > defaultTextHeight) {
                        lines.push(textBeforeChange);
                        $(elemHighlighted).text(textBeforeChange);
                        textBeforeChange = '';
                        word = word.replace(' ', '');
                        $(elemHighlighted).text(word);
                    }
                    if (i == words.length - 1) lines.push(textBeforeChange + word);
                }

                //empty elem and insert lines
                $(elemHighlighted).text('');

                if (containsLink) {
                    $(elemHighlighted).append('<a class="' + link.class + '" href="' + link.href + '" target="' + link.target + '" title="' + link.title + '"></a>');
                    $(elemHighlighted).find('a').css({
                        'background-color': 'transparent',
                        'padding': '0'
                    });
                }

                for (var i = 0; i < lines.length; i++) {
                    var lineClass = (i > 0) ? 'new-line' : 'new-line first-line';
                    lineClass = lineClass + ' line-' + (i + 1);
                    if (i == (lines.length - 1)) {
                        lineClass = lineClass + ' last-line';
                    }
                    //var zIndex = 'z-index:' + parseInt(9999/(i+2)) + ';';
                    if (containsLink) $(elemHighlighted).find('a').append('<span class="' + lineClass + '">' + lines[i] + ' </span>')
                    else $(elemHighlighted).append('<span class="' + lineClass + '">' + lines[i] + ' </span>')
                }

                //set style
                $(elemHighlighted).find('.new-line').css({
                    'background-color': $elem.css('background-color'),
                    'padding': defaultTextPadding,
                    'position': 'relative',
                    'display': 'inline-block'
                });
                $(elemHighlighted).css({
                    'background-color': 'transparent',
                    'padding': '0',
                    'width': defaultTextWidth
                });

                //remove original
                $elem.remove();
            }
            else{
                $elem.css({'display': 'inline'});
            }

        });
    };
})(jQuery);