// Min side - Fakturaer aarstall
function horisontalScroll() {
    var scroll_container = $("#js_scroll_container");
    var scroll_area = $("#js_scroll_area");
    var scroll_content = $("#js_scroll_content");
    var scroll_content_first_li = $("#js_scroll_content li:first-child");
    
    // Add test classes
    // scroll_area.addClass('w_' + scroll_area.width());
    // scroll_content.addClass('w_' + scroll_content.width());
    // scroll_area.addClass('sL_' + scroll_area.scrollLeft());
    
        
    // Add gradient boxes right when content is larger than the container
    if( scroll_area.scrollLeft() + scroll_area.width() >= scroll_content.width() ) {        
        scroll_container.removeClass("after");        
    } else {        
        scroll_container.addClass("after");        
    }
    
    // Add gradient boxes when scrolling
    scroll_area.scroll(function() {
        if( scroll_area.scrollLeft() == 0 ) {
            scroll_container.removeClass("before");
        } else {
            scroll_container.addClass("before");
        }
        
        if( scroll_area.scrollLeft() + scroll_area.width() >= scroll_content.width() ) {
            scroll_container.removeClass("after");
        } else {
            scroll_container.addClass("after");
        }        
    });    
    
    // Click elements with animation scroll
    var scroll_to_left = $("#js_scroll_to_left");
    scroll_to_left.click(function() {
        // scroll 176px to left with 400 milliseconds duration
        scroll_area.animate({scrollLeft: "-=176" }, 400); 
    });    
    var scroll_to_right = $("#js_scroll_to_right");
    scroll_to_right.click(function() {
        // scroll 176px to right with 400 milliseconds duration
        scroll_area.animate({scrollLeft: "+=176" }, 400);
    });
}


function addClassOnExternalLinks() {
	var location = window.location.protocol + "//" + window.location.host;
	var externalLink = new RegExp("^https?://.*", "i");
	$("a").each(function() {
		try {
			var url = this.href.replace(location, "");
			if (url.match(externalLink)) {
				if (! $(this).html().match(/<img/i)) {
    				if(!(
        				$(this).hasClass('service_icon') // Feilmelding
        				|| $(this).hasClass('some_footer_link') // SoMe
        				|| $(this).hasClass('intern_link') // Ansattpålogging
        				|| $(this).hasClass('contact_static_image_link') // GoogleMaps
    				)) {
    				// if(!$(this).is(".service_icon .some_footer_link")) {
        				$(this).addClass("external_link");
    				}
				}
			}
		} catch(e) { 
			//alert (e); 
		}
	});
}


// Main navigation mobile toggle
function mainNavMobileToggle() {
    $(".js_open_mobile_main_nav").click( function() {
        $(".js_main_nav").removeClass("main_nav_collapsed");
        $(".js_main_nav").addClass("main_nav_expanded");
        return false;
    });
    $(".js_close_mobile_main_nav").click( function() {
        $(".js_main_nav").removeClass("main_nav_expanded");
        $(".js_main_nav").addClass("main_nav_collapsed");
        return false;
    });
}


// Feedback box toggle
function feedbackToggle() {
    $("#js_feedback .feedback_btn.yes").click( function() {
        if ( !$(this).hasClass("active")) {
            $("#js_feedback .feedback_btn.no").removeClass("active");
            $(this).addClass("active");
            $("#js_feedback_text").removeClass("feedback_collapsed");
            $("#js_feedback_text textarea").attr("placeholder", "Så bra! Fortell oss gjerne hva du liker med siden!");
        }
    });
    $("#js_feedback .feedback_btn.no").click( function() {
        if ( !$(this).hasClass("active")) {
            $("#js_feedback .feedback_btn.yes").removeClass("active");
            $(this).addClass("active");
            $("#js_feedback_text").removeClass("feedback_collapsed");
            $("#js_feedback_text textarea").attr("placeholder", "Så kjedelig! Vil du fortelle oss hva som vil gjøre siden bedre?");
        }
    });
}

// Accordion toggle
function toggleAccordion() {
    if ( document.getElementById( "js_accordion_container" ) != null ) {
        $(".js_toggle_accordion_link").click( function() {
            $(this).closest(".js_accordion_item").toggleClass("active");
            return false;
        });
    }
}

// Orgenhet menu toggles
function orgMenuToggle() {
    
    // Mobile menu toggle
    $("#js_org_menu_container").addClass("org_menu_collapsed");
    $(".org_menu_mobile_header").click( function() {
        if ( $(this).parent().hasClass("org_menu_collapsed")) {
            $(this).parent().removeClass("org_menu_collapsed");
            $(this).parent().addClass("org_menu_expanded");
            return false;
        } else {
            $(".with_org_sub_menu").addClass("org_sub_menu_collapsed");
            $(this).parent().addClass("org_menu_collapsed");
            $(this).parent().removeClass("org_menu_expanded");
            return false;
        }
    });
    
    
    // Sub menu toggle
    // Collapse everything beside the active element
    if ( !$('.with_org_sub_menu').hasClass('active') ) {
        $(this).addClass("org_sub_menu_collapsed");
    }
    $(".with_org_sub_menu .org_sub_menu_toggle_link").click( function() {
        if ( $(this).parent().hasClass("org_sub_menu_collapsed")) {
            //$(".with_org_sub_menu").addClass("org_sub_menu_collapsed");
            $(this).parent().removeClass("org_sub_menu_collapsed");
            $(this).parent().addClass("org_sub_menu_expanded");
            return false;
        } else {
            $(this).parent().addClass("org_sub_menu_collapsed");
            $(this).parent().removeClass("org_sub_menu_expanded");
            return false;
        }
    });
}


// Mobile menu toggle
function mobMenuToggle() {
    
    $("#js_mob_menu_container").addClass("mob_menu_collapsed");
    $(".mob_menu_header").click( function() {
        if ( $(this).parent().hasClass("mob_menu_collapsed")) {
            $(this).parent().removeClass("mob_menu_collapsed");
            $(this).parent().addClass("mob_menu_expanded");
            return false;
        } else {
            $(this).parent().addClass("mob_menu_collapsed");
            $(this).parent().removeClass("mob_menu_expanded");
            return false;
        }
    });
}


// Mobile menu toggle
function hvaskjerMenuToggle() {
    
    $("#js_hvaskjer_additional_menu_container").addClass("collapsed");
    $(".toggle_additional_menu_link").click( function() {
        if ( $(this).parent().hasClass("collapsed")) {
            $(this).parent().removeClass("collapsed");
            $(this).parent().addClass("expanded");
            return false;
        } else {
            $(this).parent().addClass("collapsed");
            $(this).parent().removeClass("expanded");
            return false;
        }
    });
}




// Different heights for the page 'Tjenestekategori'
function addCategoryHeights() {
  var current_Width = $(window).width(),
      h1 = 0,
      h2 = 0,
      h3 = 0,
      heighest = 0;
            
  // Mobile
  if (current_Width < 700) {    
    $(".js_categories").css("height", "auto");
  }  
  // Tablet
  if (current_Width >= 700 && current_Width < 1020) {    
    // If we have list 3 // Tjenester
    if ($(".js_cat_3.active").length) {
      h1 = $(".js_cat_1").height();
      h3 = $(".js_cat_3.active").height();
    
      // Get distance from second level's active div to the top of the container
      var h2_to_top = $('.js_cat_2.active .los2.active').position().top;

      if ( ( h3 + h2_to_top ) > h1 ) {
        // If 'Tjenester' is heighest, use this height and add the distance from top
        $(".js_categories").css("height", h3 + h2_to_top);
      } else {
        // If 'LOS2' and 'Emneord' are heighest, is this height
        $(".js_categories").css("height", h1);
      }
    } else {
      $(".js_categories").css("height", "auto");
    }
  }  
  // Desktop
  if (current_Width >= 1020) {    
    if ($(".js_cat_2.active").length && $(".js_cat_3.active").length) {
      h1 = $(".js_cat_1").height();
      h2 = $(".js_cat_2.active").height();
      h3 = $(".js_cat_3.active").height();
      // Find heighest list of all three lists and set on container
      heighest = Math.max.apply(Math.max, [h1, h2, h3]);
      $(".js_categories").css("height", heighest);
    } else if ($(".js_cat_2.active").length && !$(".js_cat_3.active").length) {
      h1 = $(".js_cat_1").height();
      h2 = $(".js_cat_2.active").height();
      // Find heighest list of the two lists and set on container
      heighest = Math.max.apply(Math.max, [h1, h2]);
      $(".js_categories").css("height", heighest);
    } else {
      $(".js_categories").css("height", "auto");
    }
  }
}

// Change long breadcrumbs to position right
function breadcrumbs() {
    // Desktop only
    if ($(window).width() >= 700) {
        var container,
            list = 0;
        // Get current widths
        container = $(".js_breadcrumbs").outerWidth() - 80;
        $(".js_breadcrumbs .bc_list li").each(function() {
            list += $(this).outerWidth() + 16;
        });
        // Add current widths
        $(".js_breadcrumbs .bc_list_container").css("width", container);
        $(".js_breadcrumbs .bc_list").css("width", list);
        // If container is too small
        if (( 16 + container) <= list) {
            // Position right
            $(".js_breadcrumbs .bc_list").addClass("too_small");
            // Add separator
            $(".js_breadcrumbs .bc_label.desktop").addClass("separator");
        }
    }
}

// Update breadcrumbs after load (font is loaded completely) or on resize
function updateBreadcrumbs() {
    var container,
        list = 0;
    
    // Desktop
    if ($(window).width() >= 700) {

        // Get current widths
        container = $(".js_breadcrumbs").outerWidth() - 80;
        $(".js_breadcrumbs .bc_list li").each(function() {
            list += $(this).outerWidth() + 16;
        });
        
        // Add current widths // update this when font is loaded
        $(".js_breadcrumbs .bc_list_container").css("width", container);
        $(".js_breadcrumbs .bc_list").css("width", list);

        // If container is too small
        if (( 16 + container) <= list) {
            // Position right
            $(".js_breadcrumbs .bc_list").addClass("too_small");
            // Add separator
            $(".js_breadcrumbs .bc_label.desktop").addClass("separator");
        } else {
            // remove classes
            $(".js_breadcrumbs .bc_list").removeClass("too_small");
            $(".js_breadcrumbs .bc_label.desktop").removeClass("separator");
        }
        
    // Mobile: reset desktop
    } else {
        $(".js_breadcrumbs .bc_list_container").css("width", '');
        $(".js_breadcrumbs .bc_list").css("width", '');
        $(".js_breadcrumbs .bc_list").removeClass("too_small");
        $(".js_breadcrumbs .bc_label.desktop").removeClass("separator");
    }
}

// Select year on page Fakturaoversikt
function selectYear() {
    $(".js_select_year li a").click( function() {
        $(".js_select_year li").removeClass("active");
        $(this).parent("li").addClass("active");
        $(this).blur();
        return false;
    });
}

// Filtersoek
function filterSearch() {
    if ( document.getElementById( "js_filter_search" ) != null ) {
        // Focus
        // Kommenterer dette ut i patternlab:
        // $(".js_filter_search_input").focus();
        // Do filter
        $(".js_filter_search_input").on("keyup click input", function () {
            if (this.value.length > 0) {
                $(".js_clear_search").show();
                $(".js_filter_search_result_list li").removeClass("match").addClass("hidden").filter(function () {
                    return $(this).text().toLowerCase().indexOf($(".js_filter_search_input").val().toLowerCase()) != -1;
                }).addClass("match").removeClass("hidden");
                // Highlight only if class exists
                if( $(".js_highlight_filter_search_result").length ) {
                    highlightResults(".js_filter_search_result_list li.match .js_highlight_filter_search_result", this.value);
                }
            }
            else {
                $(".js_clear_search").hide();
                $(".js_filter_search_result_list li").removeClass("hidden match");
            }
            // No more matches
            if($(".js_filter_search_result_list li").not(".hidden").length > 0 ) {
                $(".js_empty_filter_search").hide();
            } else {
                $(".js_empty_filter_search").show();
            }
            // Cancel search
            clearFilter();
        });
    }
}
var highlightResults = function (selector, inputValue) {
    $(selector).each(function () {
        var matchStart = $(this).text().toLowerCase().indexOf("" + inputValue.toLowerCase() + "");
        if (matchStart == -1) return;
        var matchEnd = matchStart + inputValue.length - 1;
        var beforeMatch = $(this).text().slice(0, matchStart);
        var matchText = $(this).text().slice(matchStart, matchEnd + 1);
        var afterMatch = $(this).text().slice(matchEnd + 1);
        $(this).html(beforeMatch + "<span class='list_highlight'>" + matchText + "</span>" + afterMatch);
    });
};
function clearFilter() {
    $( ".js_clear_search" ).click(function () {
        $( ".js_clear_search" ).hide();
        $( ".js_empty_filter_search" ).hide();
        $( ".js_filter_search_input" ).val('').focus();
        $( ".js_filter_search_result_list li" ).removeClass("hidden match");
    });
}

//Kun funksjonalitet i PL, Angular ellers
function openSearchFilter(){
    $(".js_search-checkbox-filter__button").click( function() {
        if ( $(this).parent().hasClass("search-checkbox-filter--open")) {
            $(this).parent().removeClass("search-checkbox-filter--open");
            return false;
        } else {
            $(this).parent().addClass("search-checkbox-filter--open")
            return false;
        }
    });
}


//Kun funksjonalitet i PL, Angular ellers
function openSearchFilterGroup(){
    // Mobile only // Lukk alle fasetter bortsett fra den første
    if ($(window).width() <= 1019) {
        $('.search-checkbox-filter__content > .search-checkbox-filter__fieldset--open').slice(1).removeClass("search-checkbox-filter__fieldset--open");
    }
    
    $(".js_search-checkbox-filter__title--advanced").click( function() {
        if ( $(this).parent().parent().hasClass("search-checkbox-filter__fieldset--open")) {
            $(this).parent().parent().removeClass("search-checkbox-filter__fieldset--open");
            return false;
        } else {
            $(this).parent().parent().addClass("search-checkbox-filter__fieldset--open")
            return false;
        }
    });
}


$(document).ready(function () {
    mainNavMobileToggle();
    addCategoryHeights();
    feedbackToggle();
    orgMenuToggle();
    mobMenuToggle();
    hvaskjerMenuToggle();
    breadcrumbs();
    $(".js_chat_link").click(function() { return false; });
    selectYear();
    horisontalScroll();
    filterSearch();
    toggleAccordion();
    openSearchFilter();
    openSearchFilterGroup();
    addClassOnExternalLinks();
});

$(window).bind("load", function() {
    updateBreadcrumbs();
});

window.onresize = function() {
    addCategoryHeights();
    updateBreadcrumbs();
    horisontalScroll();
}; 













