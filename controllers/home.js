

module.exports = {
  index: function(req, res){
    console.log('index_function');

    //기본적인 send 방법
    //res.send('index');

    //express-handlebars 사용 시 res.render로 페이지 설정을 하며 해당 페이지의 확장자는.handlebars를 호출하는것으로 약속된다.
    res.render('index');
  }
};
