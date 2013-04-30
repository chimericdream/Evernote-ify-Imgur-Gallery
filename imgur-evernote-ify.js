// ==UserScript==
// @name          Evernote-ify Imgur Gallery
// @namespace     http://userscripts.org/
// @description   Adds a button to Imgur gallery pages that strips extraneous content, replaces small images with their full size versions, and generally makes the page ready to be added to Evernote with the web clipper.
// @copyright     2013 Bill Parrott
// @version       1.0
// @match         http://*.imgur.com/*
// @match         http://imgur.com/*
// @match         https://*.imgur.com/*
// @match         https://imgur.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==

var style = ".evernote-ify {box-shadow:inset 0px 1px 0px 0px #97c4fe;background:-moz-linear-gradient(center top, #3d94f6 5%, #1e62d0 100%);background-color:#3d94f6;border-radius:6px;border:1px solid #337fed;cursor:pointer;display:block;color:#fff;font-family:arial;font-size:15px;font-weight:bold;left:10px;padding:6px 24px;position:absolute;text-decoration:none;text-shadow:1px 1px 0px #1570cd;top:50px;}.evernote-ify:hover {background:-moz-linear-gradient(center top, #1e62d0 5%, #3d94f6 100%);background-color:#1e62d0;}.evernote-ify.active {top:51px;}.evernote-ify.activated {top:10px;}.evernote-ify.activated.active {top:11px;}body.evernote-ified #content {min-width: 1200px;}body.evernote-ified #content > .left {float: none;}body.evernote-ified #content > .left .panel {width: auto;}body.evernote-ified #content #image-container {text-align: left;}body.evernote-ified #content #image-container > .image {margin-bottom: 40px;}body.evernote-ified #content #image-container img {max-width: 9999px;}";

GM_addStyle(style);

$('body').prepend('<span class="evernote-ify">Evernote-ify</span>');

$('.evernote-ify').mousedown(function(){
    $(this).addClass('active');
}).mouseup(function(){
    $(this).removeClass('active');
});

$('.evernote-ify').click(function(){
    if ($(this).hasClass('activated')) {
        alert('The gallery has already been "Evernote-ified".');
        return;
    }
    $(this).addClass('activated');
    $('body').addClass('evernote-ified');

    var elsToRemove = "" +
    "#cboxOverlay,#colorbox,#topbar,#upload-global-album-tipsy,#upload-global,"+
    "#upload-global-FF-paste-box,#hiddenDropZone,#upload-global-flash-container,"+
    "#fullscreenEmbed,#upload-global-drop-overlay,#humanMsg,#content .right,"+
    "body > div.nodisplay,body > script,body > noscript,#top-message,#footer,"+
    "html > script,html > head > script,html > head > noscript,html > head > meta,"+
    "#content > div.clear,#image-container > a,.wrapper > .image-hover";
    $(elsToRemove).remove();

    $('#image-container > .image').each(function(){
        var img = $(this).find('.wrapper .zoom img');
        $(this).append(img);
        $(this).find('.wrapper').remove();
    });

    $(this).remove();
});