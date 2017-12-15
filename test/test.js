var assert = require('assert');

describe('Array Test', function(){
  describe('indexOf() 메서드', function(){
    it('값이 없을 때에는 -1을 리턴함', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
