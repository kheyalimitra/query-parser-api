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
  it('get store details based on query', () => {
    mockReq.query = { query: 'EQUAL(content, "Hello World! test")' };
    const mockResult = Object.values(mockPostData).slice(0, 2);
    const mockJson = jest.fn().mockReturnValue(mockResult);
    mockRes.json = mockJson;
    getStoreDetails(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith(mockResult);
    expect(mockRes.statusCode).toBe(200);
  });

  it('post store details based on query', () => {
    mockReq.query = { query: 'EQUAL(content, "Hello World! test")' };
    const mockResult = Object.values(mockPostData).slice(0, 2);
    const mockJson = jest.fn().mockReturnValue(mockResult);
    mockRes.json = mockJson;
    getStoreDetails(mockReq, mockRes);
    expect(mockRes.json).toHaveBeenCalledWith(mockResult);
    expect(mockRes.statusCode).toBe(200);
  });
});