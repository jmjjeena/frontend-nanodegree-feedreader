/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    "use strict";
    // Test suite for RSS feed variable
    describe('RSS Feeds', function() {
        // Check if allFeeds variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Check if feed's url property is defined and not empty
        it('url is defined', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        // Check if feed's name property is defined and not empty
        it('name is defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    // Test suite for the apps menu functionality
    describe('The Menu', function() {

        // Check that default state of menu is hidden on page load
        it('menu is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Check that menu toggles on/off from multiple clicks
        it('menu changes visibility when clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    // Test suite for initial load of feed 
    describe('Initaial Entries', function() {

        // Load feed and wait until work is done
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // Check that completed work contains content
        it('has at least 1 entry in the feed container', function() {
            let entriesLength = $('.feed .entry').length;
            expect(entriesLength).toBeGreaterThan(0);
        });
    });


    // Test suite for loading new content after initial load
    describe('New Feed Selection', function() {
        
        // Load multiple feeds and compare content to ensure change
        let initialContent;
        let newContent;
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialContent = document.querySelector('.feed').innerHTML;

                loadFeed(1, function() {
                    done();
                });
            });
        });

        // Compare first feed against new feed content
        it('changes feed content', function() {
            newContent = document.querySelector('.feed').innerHTML;
            expect(initialContent).not.toBe(newContent);
        });
    });

}());