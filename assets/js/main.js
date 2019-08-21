(function($) {
  var	$window = $(window);
  var $body = $('body');
  var $wrapper = $('#wrapper');
  var $header = $('#header');
  var $footer = $('#footer');
  var $main = $('#main');
  var $main_articles = $main.children('article');

  // Breakpoints.
  breakpoints({
    xlarge:   [ '1281px',  '1680px' ],
    large:    [ '981px',   '1280px' ],
    medium:   [ '737px',   '980px'  ],
    small:    [ '481px',   '736px'  ],
    xsmall:   [ '361px',   '480px'  ],
    xxsmall:  [ null,      '360px'  ]
  });

  // Play initial animations on page load.
  $window.on('load', function() {
    window.setTimeout(function() {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Fix: Flexbox min-height bug on IE.
  if (browser.name == 'ie') {
    var flexboxFixTimeoutId;

    $window.on('resize.flexbox-fix', function() {
      clearTimeout(flexboxFixTimeoutId);

      flexboxFixTimeoutId = setTimeout(function() {
        if ($wrapper.prop('scrollHeight') > $window.height())
          $wrapper.css('height', 'auto');
        else
          $wrapper.css('height', '100vh');
      }, 250);
    }).triggerHandler('resize.flexbox-fix');
  }

  var $nav = $header.children('nav');
  var $nav_li = $nav.find('li');

  if ($nav_li.length % 2 == 0) {
    $nav.addClass('use-middle');
    $nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');
  }

  // Scroll restoration.
  // This prevents the page from scrolling back to the top on a hashchange.
  if ('scrollRestoration' in history)
    history.scrollRestoration = 'manual';
  else {
    var	oldScrollPos = 0;
    var scrollPos = 0;
    var $htmlbody = $('html,body');

    $window.on('scroll', function() {
      oldScrollPos = scrollPos;
      scrollPos = $htmlbody.scrollTop();
    }).on('hashchange', function() {
      $window.scrollTop(oldScrollPos);
    });
  }
})(jQuery);
