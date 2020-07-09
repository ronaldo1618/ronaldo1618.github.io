/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

function setupTypewriter(t) {
	var HTML = t.innerHTML;

	t.innerHTML = "";

	var cursorPosition = 0,
			tag = "",
			writingTag = false,
			tagOpen = false,
			typeSpeed = 100,
	tempTypeSpeed = 0;

	var type = function() {
	
			if (writingTag === true) {
					tag += HTML[cursorPosition];
			}

			if (HTML[cursorPosition] === "<") {
					tempTypeSpeed = 0;
					if (tagOpen) {
							tagOpen = false;
							writingTag = true;
					} else {
							tag = "";
							tagOpen = true;
							writingTag = true;
							tag += HTML[cursorPosition];
					}
			}
			if (!writingTag && tagOpen) {
					tag.innerHTML += HTML[cursorPosition];
			}
			if (!writingTag && !tagOpen) {
					if (HTML[cursorPosition] === " ") {
							tempTypeSpeed = 0;
					}
					else {
							tempTypeSpeed = (Math.random() * typeSpeed) + 50;
					}
					t.innerHTML += HTML[cursorPosition];
			}
			if (writingTag === true && HTML[cursorPosition] === ">") {
					tempTypeSpeed = (Math.random() * typeSpeed) + 50;
					writingTag = false;
					if (tagOpen) {
							var newSpan = document.createElement("span");
							t.appendChild(newSpan);
							newSpan.innerHTML = tag;
							tag = newSpan.firstChild;
					}
			}

			cursorPosition += 1;
			if (cursorPosition < HTML.length - 1) {
					setTimeout(type, tempTypeSpeed);
			}

	};

	return {
			type: type
	};
}

// var typer = document.getElementById('typewriter');

// typewriter = setupTypewriter(typewriter);

// typewriter.type();

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

})(jQuery);