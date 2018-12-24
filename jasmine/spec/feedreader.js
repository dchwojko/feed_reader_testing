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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('feeds url are defined and not empty', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            }
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('feeds name are defined and not empty', function() {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            }
        })
    });

    describe('The menu', function () {

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu toggles when menu icon is clicked', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });
    });

    describe('Initial Entries', function() {
        /*
            https://jasmine.github.io/tutorials/async
        */
        beforeEach(function(done) {
           loadFeed(0,done);
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('when loadFeed() is called and completes its work, there is at least a single .entry element within the .feed container', function() {
            const entriesCount = document.querySelectorAll('.feed .entry').length   
            expect(entriesCount > 0).toBe(true);
        });
    });

    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let firstTitle, nextTitle
        let firstFeed, nextFeed

        beforeEach(function (done) {
            // initialize feed to null
            $('.feed').empty();

            // load first feed, upon completion load next feed
            loadFeed(0, function () {
                // first feed title
                firstTitle = $('.header-title').text();

                // first feed text
                firstFeed = $('.feed').text();
                loadFeed(1, function () {
                    // next feed title
                    nextTitle = $('.header-title').text();

                    // next feed text
                    nextFeed = $('.feed').text();
                    done();
                });
            });
        });

        it('ensures when a new feed is loaded by the loadFeed function that the content actually changes', function() {
            expect(firstTitle).not.toBe(nextTitle);
            expect(firstFeed).not.toBe(nextFeed);
        });
    });
}());

