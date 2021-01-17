const { parseQueryString }  = require('../../handler/queryGenerator') ;

describe("parseQueryString", () => {
    it('should parse AND(EQUAL(id,"first-post"),EQUAL(views,100)) to id="first-post" AND views = 100', () => {
        const mockResult = 'id === "first-post" && views === 100';
        const result = parseQueryString('AND(EQUAL(id,"first-post"),EQUAL(views,100))');
        expect(result).toBe(mockResult);
    });
    it('should parse OR(EQUAL(id,"first-post"),EQUAL(id,"second-post")) to id="first-post" OR id="second-post"', () => {
        const mockResult = 'id === "first-post" || id === "second-post"';
        const result = parseQueryString('OR(EQUAL(id,"first-post"),EQUAL(id,"second-post"))');
        expect(result).toBe(mockResult);
    });
    it('should parse EQUAL(id,"second-post") to id="second-post"', () => {
        const mockResult = 'id === "second-post"';
        const result = parseQueryString('EQUAL(id,"second-post")');
        expect(result).toBe(mockResult);
    });
    it('should parse NOT(EQUAL(id,"first-post")) to id!=="first-post" ', () => {
        const mockResult = 'id !== "first-post"';
        const result = parseQueryString('NOT(EQUAL(id,"first-post"))');
        expect(result).toBe(mockResult);
    });
    it('should parse GREATER_THAN(views,100) to views>100 ', () => {
        const mockResult = 'views > 100';
        const result = parseQueryString('GREATER_THAN(views,100)');
        expect(result).toBe(mockResult);
    });
    it('should parse LESS_THAN(views,100) to views<100 ', () => {
        const mockResult = 'views < 100';
        const result = parseQueryString('LESS_THAN(views,100)');
        expect(result).toBe(mockResult);
    });
});