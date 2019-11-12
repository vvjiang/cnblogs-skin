/**
 * 放在页首的脚本，放入到博客园的时候不要忘记了加上页面上的Html代码
 */
var loadingProcess = 0;
var isLoading = true;
var $loadingProcess = $('#loadingProcess');

// 改造评论结构与样式，展示用户头像
function modifyComment() {
  $('.feedbackCon>.blog_comment_body').each(function (index, item) {
    var faceIcon = 'http://images.cnblogs.com/cnblogs_com/vvjiang/996881/o_default_face.jpg'
    var commentId = $(item).attr('id').split('_')[2];
    // 取消评论下所有的链接上的事件，@上的事件真是奇怪
    $(item).find('a').attr('onclick', '');
    // 为了点击@有效，得加上id为评论id的功能
    if ($('#' + commentId).length === 0) {
      $(item).parent().parent().attr('id', commentId);
    }
    // 取得博客园提供的隐藏头像信息
    var $hiddenInfo = $('#comment_' + commentId + '_avatar')
    if ($hiddenInfo.length > 0) {
      faceIcon = $hiddenInfo.text();
    }
    // 获取评论名字的元素
    var nameId = '#a_comment_author_' + commentId;
    var $name = $(nameId);

    // 得到头像元素
    var faceEle = '<a class="comment_face" href="' + $name.attr('href') + '" target="_blank" style="background-image: url(' + faceIcon + ')"></a>';

    $name.addClass('comment_name').after(faceEle);
  });
}
// 直到评论加载完毕才开始修改评论样式
function beginModifyComment() {
  if ($('#comment_pager_bottom').length === 0) {
    setTimeout(beginModifyComment, 500)
  } else {
    modifyComment()
  }
}
// 生成文章的目录结构
function createCatalog() {
  var $h2Arr = $('#cnblogs_post_body>h2');
  if ($h2Arr.length > 0) {
    var catalogContent = [].join.call($h2Arr.map(function (index, item) {
      return '<li><a id="catalog' + item.id + '" title="' + item.innerText + '" href="#' + item.id + '">' + item.innerText + '</a></li>'
    }), '');

    $('body').append('<div id="reader_catalog"><h3>目录</h3><ul>' + catalogContent + '</ul></div>')
  }
  createCatalogLeaderLine($h2Arr);
}

// 生成目录上的指示箭头
function createCatalogLeaderLine($h2Arr) {
  var lines = {};
  var options = {
    color: '#5bf',
    endPlug: "disc",
    size: 2,
    startSocket: "left",
    endSocket: "right"
  };
  [].slice.call($h2Arr).forEach(function (item) {
    var anchor = LeaderLine.mouseHoverAnchor(document.getElementById('catalog' + item.id), 'draw', {
      animOptions: {
        duration: 500
      },
      hoverStyle:{
        backgroundColor: null
      },
      style: {
        paddingTop: null,
        paddingRight: null,
        paddingBottom: null,
        paddingLeft: null,
        cursor: null,
        backgroundColor: null,
        backgroundImage: null,
        backgroundSize: null,
        backgroundPosition: null,
        backgroundRepeat: null
      },
      onSwitch: function (event) {
        var line = lines[item.id]
        // 浮动上去就重绘
        if (event.type == "mouseenter") {
          line.position();
        }
      }
    });
    lines[item.id] = new LeaderLine(
      anchor,
      document.getElementById(item.id),
      options
    );
  })
  // 滚动时重绘指示箭头
  $(window).scroll(function () {
    for (var key in lines) {
      lines[key].position()
    }
  })
}

// 页面加载进度条
function loading() {
  loadingProcess += 1;
  if (loadingProcess >= 80) {
    loadingProcess = 80;
  }
  $loadingProcess.css('width', loadingProcess + '%');
  if (!isLoading && loadingProcess === 80) {
    $loadingProcess.css('width', '100%').hide(200);
  } else {
    requestAnimationFrame(loading);
  }
}
loading();
$(function () {
  // 页面加载完毕，停掉加载动画
  isLoading = false;
  // 载入小磁怪
  if ($('#div_digg').length === 1 || window.location.href.indexOf('\/p\/') !== -1) {
    $(document.body).append('<div id="xiaociguai"><img title="电磁波切换" alt="电磁波切换" src="http://images.cnblogs.com/cnblogs_com/vvjiang/996881/o_xiaociguai2.jpg" /></div>');

    // 绑定停止精灵球跳动按钮
    var isStopJump = false;
    var stopJump = function () {
      $('#div_digg').css('animation', 'unset');
      $('#xiaociguai').addClass('enable-electric');
      isStopJump = true;
    }
    $('#xiaociguai').click(function (e) {
      if (isStopJump) {
        $('#div_digg').css('animation', 'jumping 5s ease-in-out').css('animation-iteration-count', 'infinite');
        $('#xiaociguai').removeClass('enable-electric');
        isStopJump = false;
      } else {
        stopJump();
      }
    })
    // 精灵球被点击后直接被小磁怪吸附
    $('.diggit').click(stopJump);
    // 如果判定为曾经做过点赞或者取消点赞的操作，那么也被小磁怪吸附
    if ($('#digg_tips').text().trim() !== '') {
      stopJump();
    }
  }
  // 修改评论样式，加载评论头像
  beginModifyComment();
  // 点击头像跳转到个人信息页面
  $('#Header1_HeaderTitle').attr('href', 'https://home.cnblogs.com/u/vvjiang/');
  // 生成文章目录
  createCatalog();
})