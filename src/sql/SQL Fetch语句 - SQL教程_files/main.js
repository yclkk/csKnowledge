
jQuery(document)
		.ready(function($) {
			$(".qrcode").hover(function() {
				// alert('show');
				$("#bottom-qrcode").show();
			}, function() {
				// alert('hide');
				$("#bottom-qrcode").hide();
			});

			$(window).scroll(
					function() {
						if ($(window).scrollTop() >= 100) {
							$(".to-top").fadeIn();
							if ($('#htmlfeedback-container').length) {
								if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
										.test(navigator.userAgent)) {
									// some code..
								} else {
									$("#htmlfeedback-container")
											.show();
								}
							}
						} else {
							$(".to-top").fadeOut();
						}
					});
			// 
			$(".to-top").click(function(event) {
				$('body').animate({
					scrollTop : 0
				}, 100);
				return false;
			});
	// 广告处理
	adv_handle();

	// 群列表
	qqgroup();

	// init function list ...
	view_times();
	login_state();
});

function qqgroup(){
	var str='<li><b>Java技术群：</b> 227270512 （人数：<span style="color:red;">3000</span>）</li><li><b>Go开发者群（新）：</b> 851549018 （人数：2000）</li><li><b>PHP开发者群：</b> 460153241 （人数：2000）</li><li><b>MySQL/SQL群：</b> 418407075 （人数：2000）</li><li><b>大数据开发群：</b> 655154550 （人数：2000）</li><li><b>Python技术群：</b> 287904175 （人数：2000）</li><li><b>人工智能深度学习：</b> 456236082 （人数：2000）</li><li><b>测试工程师群：</b> 415553199 （人数：2000）</li><li><b>前端开发者群：</b> 410430016 （人数：2000）</li><li><b>C/C++技术群(新)：</b> 629264796 （人数：2000）</li><li><b>Node.js技术群(新)：</b> 621549808 （人数：2000）</li><li><b>PostgreSQL数据库群：</b> 539504187 （人数：2000）</li><li><b>Linux运维技术群：</b> 479429477 （人数：2000）</li><li><b>Oracle数据库：</b> 175248146 （人数：2000）</li><li><b>C#/ASP.Net开发者：</b> 630493968 （免费，人数：2000）</li><li><b>数据分析师群：</b> 397883996 （人数：2000）</li>';
	$('#qqgroup-list').html(str);
}

// 广告处理
function adv_handle(){
	//return false;
	// A2位置
	//var advstr = '<a href="https://datayi.cn/w/LPd5W3jo" title="" target="_blank"><img src="/static/images/adv/liaoxuefeng-java.png" alt="" style="width:100%;height:80px;"/></a>';
	//$("#adv_730x80").html(advstr);
	//$("#adv_730x80").show();
	$("#adv_730x80").hide();
	// C2位置
	//var adv2 = '<a href="http://www.bjpowernode.com/index/ad?yibai" title="动力节点" target="_blank"><img src="/static/images/adv/bjpowernode.jpg?date=8/13/1400-9/13" alt="" style="width:100%;"/></a>';
	//$("#adv-c2").html(adv2);
	//$("#adv-c2").show();
	$("#adv-c2").hide();
}

// 收藏
$('#action-collection').click(function(){
	var url = document.location.href;
	var aid = $("#article_id").val();
	var catid = $("#catid").val();
	var pdata = {'aid': aid, 'catid': catid, 'url': url};
	$.ajax({
		url : '/api/collection/add',
		type : 'post',
		dataType : 'json',
		data : pdata,
		error : function() {},
		success : function(data, textStatus) {
			if(data.status){
				layer.msg(data.msg, {
					icon : 1,
					time : 2000
				});
			}else{
				layer.msg(data.msg, {
						icon : 5,
						time : 2000
					});
				if(data.gourl){
					window.location.href=data.gourl;
				}
			}
		}
	});
})


// 查看次数
function view_times(){
	var article_id = $("#article_id").val();
	var catid = $("#catid").val();
	if(article_id==undefined && catid==undefined){
		return false;
	}
	var postdata = {'article_id': article_id, 'catid': catid};
	
	$.ajax({
		url : '/article/view_times',
		type : 'post',
		dataType : 'json',
		data : postdata,
		error : function() {},
		success : function(data, textStatus) {
			//$("#click_times").html(data.rs);
		}
	});
}

// 用户登录状态信息
function login_state(){
	$.ajax({
		url : '/login/status',
		type : 'get',
		dataType : 'html',
		error : function() {},
		success : function(data, textStatus) {			
			$("#login-state").html(data);
		}
	});
}


// 返回顶部
function backTop(){
	document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


// 教程纠错


