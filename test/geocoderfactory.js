(function() {
    var chai = require('chai'),
        should = chai.should(),
        expect = chai.expect,
        sinon = require('sinon');

    var GoogleGeocoder = require('../lib/geocoder/googlegeocoder.js');
    var HereGeocoder = require('../lib/geocoder/heregeocoder.js');
    var GeocoderFactory = require('../lib/geocoderfactory.js');
    var DataScienceToolkitGeocoder = require('../lib/geocoder/datasciencetoolkitgeocoder.js');
    var OpenStreetMapGeocoder = require('../lib/geocoder/openstreetmapgeocoder.js');

    var HttpAdapter  = require('../lib/httpadapter/httpadapter.js'),
        HttpsAdapter = require('../lib/httpadapter/httpsadapter.js');

    var GpxFormatter = require('../lib/formatter/gpxformatter.js');
    var StringFormatter = require('../lib/formatter/stringformatter.js');

    describe('GeocoderFactory', function() {

        describe('getGeocoder' , function() {

            it('called with "google", "https" and extra business key must return google geocoder with http adapter and business key', function() {
                var geocoder = GeocoderFactory.getGeocoder('google', 'https', {clientId: 'CLIENT_ID', apiKey: 'API_KEY'});

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(GoogleGeocoder);
                geocoderAdapter.options.clientId.should.be.equal('CLIENT_ID');
                geocoderAdapter.options.apiKey.should.be.equal('API_KEY');
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpsAdapter);
            });

            it('called with "google", "https" and extra business key and excludePartialMatches must return google geocoder with http adapter and business key and exclude partial matches', function() {
                var geocoder = GeocoderFactory.getGeocoder('google', 'https', {clientId: 'CLIENT_ID', apiKey: 'API_KEY', excludePartialMatches: true});

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(GoogleGeocoder);
                geocoderAdapter.options.clientId.should.be.equal('CLIENT_ID');
                geocoderAdapter.options.apiKey.should.be.equal('API_KEY');
                geocoderAdapter.options.excludePartialMatches.should.be.equal(true);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpsAdapter);
            });

            it('called with "google", "http", extra language key and extra region must return google geocoder with http adapter and options language', function() {
                var geocoder = GeocoderFactory.getGeocoder('google', 'http', {language: 'fr',region:'de'});

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(GoogleGeocoder);
                geocoderAdapter.options.language.should.be.equal('fr');
                geocoderAdapter.options.region.should.be.equal('de');
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
            });

            it('called with "google" and "http" and "gpx" must return google geocoder with http adapter and gpx formatter', function() {
                var geocoder = GeocoderFactory.getGeocoder('google', 'http', { formatter : 'gpx'});

                var geocoderAdapter = geocoder._geocoder;
                var formatter = geocoder._formatter;

                geocoderAdapter.should.be.instanceof(GoogleGeocoder);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
                formatter.should.be.instanceof(GpxFormatter);
            });

            it('called with "google" and "http" and "string" must return google geocoder with http adapter and string formatter', function() {
                var geocoder = GeocoderFactory.getGeocoder('google', 'http', { formatter : 'string', formatterPattern: 'PATTERN'});

                var geocoderAdapter = geocoder._geocoder;
                var formatter = geocoder._formatter;

                geocoderAdapter.should.be.instanceof(GoogleGeocoder);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
                formatter.should.be.instanceof(StringFormatter);
            });

            it('called with "google" must return google geocoder with http adapter', function() {
                var geocoder = GeocoderFactory.getGeocoder('google');

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(GoogleGeocoder);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
            });

            it('called with "here", "http" and extra business key must return here geocoder with http adapter and business key', function() {
                var geocoder = GeocoderFactory.getGeocoder('here', 'http', {appId: 'APP_ID', appCode: 'APP_CODE'});

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(HereGeocoder);
                geocoderAdapter.options.appId.should.be.equal('APP_ID');
                geocoderAdapter.options.appCode.should.be.equal('APP_CODE');
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
            });

            it('called with "here", "https" and extra business key must return here geocoder with http adapter and business key', function() {
                var geocoder = GeocoderFactory.getGeocoder('here', 'https', {appId: 'APP_ID', appCode: 'APP_CODE'});

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(HereGeocoder);
                geocoderAdapter.options.appId.should.be.equal('APP_ID');
                geocoderAdapter.options.appCode.should.be.equal('APP_CODE');
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpsAdapter);
            });

            it('called with "here" and "http" and language must return here geocoder with http adapter and language', function() {
                var geocoder = GeocoderFactory.getGeocoder('here', 'http', {appId: 'APP_ID', appCode: 'APP_CODE', language:'en'});

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(HereGeocoder);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
                geocoderAdapter.options.language.should.be.equal('en');
            });

            it('called with "here" and "http" and politicalView must return here geocoder with http adapter and politicalView', function() {
                var geocoder = GeocoderFactory.getGeocoder('here', 'http', {appId: 'APP_ID', appCode: 'APP_CODE', politicalView:'GRE'});

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(HereGeocoder);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
                geocoderAdapter.options.politicalView.should.be.equal('GRE');
            });

            it('called with "here" and "http" and country must return here geocoder with http adapter and country', function() {
                var geocoder = GeocoderFactory.getGeocoder('here', 'http', {appId: 'APP_ID', appCode: 'APP_CODE', country:'FR'});

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(HereGeocoder);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
                geocoderAdapter.options.country.should.be.equal('FR');
            });

            it('called with "here" and "http" and state must return here geocoder with http adapter and state', function() {
                var geocoder = GeocoderFactory.getGeocoder('here', 'http', {appId: 'APP_ID', appCode: 'APP_CODE', state:'Île-de-France'});

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(HereGeocoder);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
                geocoderAdapter.options.state.should.be.equal('Île-de-France');
            });

            it('called with "here" and "http" and "gpx" must return here geocoder with http adapter and gpx formatter', function() {
                var geocoder = GeocoderFactory.getGeocoder('here', 'http', {appId: 'APP_ID', appCode: 'APP_CODE', formatter : 'gpx'});

                var geocoderAdapter = geocoder._geocoder;
                var formatter = geocoder._formatter;

                geocoderAdapter.should.be.instanceof(HereGeocoder);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
                formatter.should.be.instanceof(GpxFormatter);
            });

            it('called with "here" and "http" and "string" must return here geocoder with http adapter and string formatter', function() {
                var geocoder = GeocoderFactory.getGeocoder('here', 'http', {appId: 'APP_ID', appCode: 'APP_CODE', formatter : 'string', formatterPattern: 'PATTERN'});

                var geocoderAdapter = geocoder._geocoder;
                var formatter = geocoder._formatter;

                geocoderAdapter.should.be.instanceof(HereGeocoder);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
                formatter.should.be.instanceof(StringFormatter);
            });

            it('called with "datasciencetoolkit" and "http" must return datasciencetoolkit geocoder with http adapter', function() {
                var geocoder = GeocoderFactory.getGeocoder('datasciencetoolkit', 'http');

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(DataScienceToolkitGeocoder);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
            });

            it('called with "datasciencetoolkit" "http" and "host" option must return datasciencetoolkit geocoder with host extra', function() {
                var geocoder = GeocoderFactory.getGeocoder('datasciencetoolkit', 'http', {'host' : 'raoul.io'});

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(DataScienceToolkitGeocoder);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
                geocoderAdapter.options.host.should.be.equal('raoul.io');
            });

            it('called with "openstreetmap" and "http" must return openstreetmap geocoder with http adapter', function() {
                var geocoder = GeocoderFactory.getGeocoder('openstreetmap', 'http');

                var geocoderAdapter = geocoder._geocoder;

                geocoderAdapter.should.be.instanceof(OpenStreetMapGeocoder);
                geocoderAdapter.httpAdapter.should.be.instanceof(HttpAdapter);
            });

            it('called with "zaertyazeaze" and "http" must throw an error', function() {

                expect(function() {GeocoderFactory.getGeocoder('zaertyazeaze', 'http');})
                    .to
                    .throw(Error, 'No geocoder provider find for : zaertyazeaze');
            });
        });
    });

})();
