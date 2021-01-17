const mockPostData = require('../data/dummyData');
const { getStoreDetails, postStoreDetails, populateDataStorage }  = require('../../handler/requestHandler');

const mockRes = {
  // "return this" makes it chainable. Hence, 'res.status.send' is possible
  status(s) { this.statusCode = s; return this; },
};
const mockReq = {
  get: jest.fn(),
};
describe("Test all API end points", () => {
  populateDataStorage(mockPostData);
  it('get store details based on content value', () => {
    mockReq.query = { query: 'EQUAL(content, "Hello World! test")' };
    const mockResult = Object.values(mockPostData).slice(0, 2);
    const mockJson = jest.fn().mockReturnValue(mockResult);
    mockRes.json = mockJson;
    getStoreDetails(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith(mockResult);
    expect(mockRes.statusCode).toBe(200);
  });

  it('get store details based on views', () => {
    // all test data have views more than 100
    mockReq.query = { query: 'GREATER_THAN(views, 100)' };
    const mockResult = Object.values(mockPostData);
    const mockJson = jest.fn().mockReturnValue(mockResult);
    mockRes.json = mockJson;
    getStoreDetails(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith(mockResult);
    expect(mockRes.statusCode).toBe(200);
  });
  it('get store details based on complex query', () => {
    // all test data have views more than 100
    mockReq.query = { query: 'OR(EQUAL(id,"test1"),EQUAL(views,200))' };
    const mockResult = Object.values(mockPostData).slice(0,2);
    const mockJson = jest.fn().mockReturnValue(mockResult);
    mockRes.json = mockJson;
    getStoreDetails(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith(mockResult);
    expect(mockRes.statusCode).toBe(200);
  });
  // it('should retun no data found when wrong query is provided for get request', () => {
  //   mockReq.query = { query: 'EQUAL(content, "content")' };
  //   const mockResult = {"response": "no data found"};
  //   const mockJson = jest.fn().mockReturnValue(mockResult);
  //   mockRes.json = mockJson;
  //   getStoreDetails(mockReq, mockRes);
  //   expect(mockRes.json).toHaveBeenCalledWith(mockResult);
  //   expect(mockRes.statusCode).toBe(200);
  // });
  // it('should retun all entries when empty query provided for get request', () => {
  //   const mockResult = [];
  //   mockResult.push({
  //     "content": "Hello World!",
  //     "id": "first-post",
  //     "timestamp": 1555832341,
  //     "title": "My First Post",
  //     "views": 100,
  //   });
  //   mockResult.push({
  //     "content": "Hello World!",
  //     "id": "second-post",
  //     "timestamp": 1555832354,
  //     "title": "My second Post",
  //     "views": 10,
  //   });
  //   const AllEntries = [...mockResult, Object.values(mockPostData)];
  //   const mockJson = jest.fn().mockReturnValue(AllEntries.flat());
  //   mockRes.json = mockJson;
  //   getStoreDetails(mockReq, mockRes);
  //   expect(mockRes.json).toHaveBeenCalledWith(AllEntries.flat());
  //   expect(mockRes.statusCode).toBe(200);
  // });
  it('post unique store details', () => {
    mockReq.body = { 
      "id": "new test",
      "title": "Another Post",
      "content": "This is From Kheyali!",
      "views": 20
    };
    const mockJson = jest.fn().mockReturnValue({});
    mockRes.json = mockJson;
    postStoreDetails(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith({});
    expect(mockRes.statusCode).toBe(200);
  });
  it('post duplicate store details', () => {
    mockReq.body = { 
      "id": "new test",
      "title": "Override Post",
      "content": "This is als From Kheyali!",
      "views": 200
    };
    const mockJson = jest.fn().mockReturnValue({});
    mockRes.json = mockJson;
    postStoreDetails(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith({});
    expect(mockRes.statusCode).toBe(200);
  });
});