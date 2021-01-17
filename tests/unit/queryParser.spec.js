const { parseQueryString }  = require('../../handler/queryParser') ;
const mockPostData = require('../data/dummyData.json');

describe("parseQueryString", () => {
    it('should parse AND(EQUAL(id,"first-post"),EQUAL(views,100)) to id="first-post" AND views = 100', () => {
        const mockResult = 'id = "first-post" AND views = 100';
        const result = parseQueryString('AND(EQUAL(id,"first-post"),EQUAL(views,100))');
        expect(result).toBe(mockResult);
        // //Another way to test a boolean
        // expect(forgotPassword()).toEqual(true);
    });
});