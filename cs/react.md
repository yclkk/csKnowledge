####  备注

`<div>`和`<span>`的区别在于块状元素和行内元素，可以用这个性质来区分其他标签是不是这两个元素的扩展

`<pre>`：等宽字体 

`<autdio> , <vedio>`在使用`<source>`的时候需要添加`type`指定格式

`<autdio>`的`controls autoplay`可以放在一起使用

`<input name="username" id="inputId">`要和`<label for="inputId">`绑定使用，`name`是会现在`url`上的

`<input type="radio" name="" value="" id="">`:`name`是为什么让多个radio只能选择一个, `value`是被选择时显示在`url`上的。同理，其他`type`类型的`value`值也是显示在`url`上的值，也就是被`submit`的值

`<textarea rows="" cols="">` 其中两个参数代表的是初始的大小

`<select> <option selected></select>` 参数`selected`默认选择

`<ul>, <ol>`：全称`unordered list`, `ordered list`

`<a href="#id">`可以用这种方式链接到页面内的某个`id` 的标签

**语义标签**


```html
    <div class="header"></div>
    <div class="nav"></div>
    <div class="content"></div>
    <div class="footer"></div>
    语义标签等价于以上，只是为了方便阅读
    <header></header>
    <nav></nav>

    <section></section>
    <article></article>
    <aside></aside>
    
    <footer></footer>
```

----

给标签定义一个`class`就可以单独实现`css`属性，在`css`中用`.className`来是实现对应的`class`

`class`内可以写多个对象，比如`<p class="blue-p  big">`  

选择器，越具体的选择器权重越高 。加上`!important`的选择器权重最高

颜色可以用QQ、微信的截图工具取色

------

`text-align`：**子标签**可以继承**父标签**的对齐方式

`<div>` `line-height`跟`height`都设为一个像素可以让内容竖直居中

`text-decoration: none`可以用这个属性去掉`a`标签的下划线 

`text-shadow:5px 10px 2px grey阴影的偏移方向：`x`是朝右的，`y`是朝下的，第三个参数是模糊效果，这个参数可以写多个阴影用**逗号隔开**

`background-size`的两个属性`contain`,`cover`，前者是让图片按比例完全展开，后者是让背景完全被覆盖，不管图片，可以使用`%`

`background`的属性是可以用逗号加多个的，比如说加两个图片，设置两个图片的高度和长度,`opacity`可以把图片变成透明的

`border-radius`是指角的半径

`<div>`嵌套`<div>`的时候，第二层`div`如果设置一个外边距，那么就会拖着第一层的`div`一起移动，如果想要不拖着的话有三种解决方式

- `.div-outer{border-top: 1px solid;}`

- `.div-outer{padding-top: 1px;}`

- **`.div-outer{overflow: hidden;}`**：

- ```css
  .div-outer::before {
    content:"";
    display:table;
  }
  ```

`content-box`：`width = content + padding + border`

` Z-index:2,postion:relative`：`Z-index`是只有不在`static`时候才生效，`Z`代表的Z轴，数字越大就越显示在外面，会覆盖内层

`absolution, fixed`：都是会找到第一个非`static`的父元素

`top, right, bottom, left`：偏移量

`display`为`inline`或`inline-block`时，使用`float`后会统一变成`block。`

---

在调整窗口大小的时候会发现里面的内容会变化，因为在设计`css`的时候添加了`@media(min-width:xxxpx)` 所以就会感觉调到不到合适的尺寸，那是因为是为了适应不同设备的宽度

将屏幕宽度分成12份，每种屏幕都有不同的media去划分，`xs, sm, md, lg, xl`，然后用class="col-size-num"去区分每种屏幕在这种情况下应该干什么。

```html
<div class="col col-sm-6 col-md-4">1</div>
<div class="col col-sm-6 col-md-4">2</div>
<div class="col col-sm-12 col-md-4">3</div>
```

```css
.col {
 
    float: left;
    background-color: lightskyblue;
    border: 0.1px solid yellow;
    box-sizing: border-box; 
} 

@media(min-width:768px) {
    .col-md-1 {
        width:1/12%;
    }
    .col-md-2 {
        width: 2/12%;
    }
    ...
}

@media(max-width:768px) {
    .col-sm-1 {
        width: calc(100% / 12);
    }
    .col-sm-2 {
        width: calc(200% / 12); 
    }
}

/* 同理，lg，xl的大小只要在class里加上具体要怎么划分的大小，css再加上对应的@media即可*/
```

**以上方式在bootstrap中均实现好了，只要引入对应的的文件就行**。`bootstrap.min.css`, `bootstrap.min.js`

```html
<div class="row">
	<div class="col...">
    ...
  </div>
</div>
/*row里面的接的元素必须是col*/
```

-----

**ECMASCRIPT6：ES6**

`<script type="module">`：加上`module`可以严格限制变量的作用域，只在这个标签生效，如果不加就会影响全局

```javascript
let s1 = "Hello";
let s2 =  s1.substr(0, 1) + 'a' + s1.substr(2);
let [a, b] = [1, 2]; //可以通过这种方式赋值
// 通过这种方式改变字符串，js里的字符串是只读变量
```

字典里的键在定义可以用`""` 也可以不用，但是在取值的时候就要加`""`，同时可以动态加值。有两种取值方式：`map[key] or map.key`，但是第二种方式有缺陷。

```js
<script type="module">
        let d = {
            name: 'zyc',
            age: '20'
        };
        let key = 'name';
        console.log(d.key);  // 不输出
				console.log(d[key]); // 输出zyc
				delete.d.name;   // 删除name
    </script>
```

`parseInt()`取整 

```js
/*
	document.querySelector()参数可以直接写标签，class名，只会匹配第一个满足的标签
	querySelectorAll可以获取所有的内容
*/
let input = document.querySelector("textarea"); 
let input = document.querySelectorAll("textarea");
let input = document.querySelector(".className")

// addEventlistener可以给某个标签绑定一个函数
// 第一个参数是绑定的是哪种事件，第二个参数是表示触发事件的时候会执行这个函数
input.addEventListener("click", function(){
  
})
```

**例子**：将`textarea`的内容通过`button`点击事件输出到`pre`上

```js
let input = document.querySelector("textarea");
let run = document.querySelector("button");
let output = document.querySelector("pre");



function main() {
    run.addEventListener("click", function () {
        let s = input.value;     // 获取textarea的内容
        output.innerHTML = s;    // innerHTML pre标签中html里的内容
    });
}
```

```x.toFixed(4)```：保留4位小数	

`Math.ceil(x)`：上取整

`Math.floor(x)`：下取整	

`Math.round(x)`：取整

----

```js
 let person = {
        name: "zyc",
        age: "18",
        money: 0,
        friends: ['zzz', 'yyy', 'ccc'],
        clothes: {
            color: "yellow",
            price: "20",
        },
        add_money: function(x) {
              this.money += x;  // this：返回拥有这个函数的对象也就是person
        }
 
    }
```

数组也是一个对象，所以下标的值可以看作是字符串，因此取负数也没关系

```js
let a = [1, 2, 3, 4, 5, 6, 7];
a.sort(function(a, b) {
  return b - a;
})

/*
	三种情况：
	负数：a < b，此时a在b前面
	0:无所谓
	正数：a > b, 此时a在b后面
	
	此时有两个数a = 3, b = 4，带代入函数，b - a > 0 => b > a 所以a在b的后面，从而实现倒序。
	
*/
```

**函数套娃**

```js
let add = (a, b) => {
    return () => {     // 也可以返回一个对象
        console.log("hello world!");
    }
}
console.log(add(3, 4)()); // 输出hello world
```

在`class`中，`this`代表的是一个实例

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
let p = new Point(3, 4); // 此时的p			

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);   // 这里指父类的构造函数
        this.color = color;
    }

    toString() {
        return `${this.red} ${super.toString}`;  // 这里指父类的实例
    }
}
// 多态，同一个函数可以表现为不同的状态
```

静态成员函数可以被继承

 开发项目：树形结构，一个文件过于冗杂的时候就可以拆分再拆分

```js
<div tabindex="0"></div>  加了tabindex='0' 之后div就可以聚焦了
/*
	触发事件调用函数的参数会直接将事件传过去，所以参数命名是随意的
*/
input.addEventListener('keydown', (event) => { // (parameter) event: KeyboardEvent
        console.log(event.type, event.code, event.altKey, event.shiftKey, event.ctrlKey);
    })
    input.addEventListener('keyup', (fs) => {  // (parameter) et: KeyboardEvent
        console.log(fs.type);
    })
```

----

**jQuery**：操控、获取`HTML`的标签，更容易绑定标签，更容易改变`css`

```js
/*
jQuery的写法，$div是习惯在前面加个$，本质就是一个字符；$('div')的$其实就是一个函数调用，只是jquery取名叫$，
*/
let div = document.querySelector('div');
let $div = $('div');   
console.log(div);
console.log($div);
```

两种绑定事件的方式

```js
let $div = $('div');
$div.on('click', function (fs) {
console.log(fs.type);
});
$div.click(function (fs) {
console.log(fs.type)
});
```

```js
let $div = $('div');
let $input = $('input');
console.log($div.html); // 获取某个标签完整的内容。比如<div>text</div>

$div.text(); // 获取div里的内容
$div.text('text') // 修改div的内容为text

$input.val();  // 更多是用来获取和修改input 和 textarea里的内容

```

**ajax**：在不刷新页面的情况下，只从服务端获取某些数据，一般会获取一个`JSON`也就是字典的数据，然后再自己去拼接出来

```js
$.ajax({
  url: url,
  type: "GET",
  data: {
    // 可以给服务器传个对象
  },
  dataType: "json",
  success: function(resp) {
    // 当运行没有报错的时候，会调用这个函数，也就是从后端获取信息之后会调用这个函数，然后后端返回结果会传到 resp 这个参数里，然后可以从 resp 解析东西出来
  },
});
```

-------

`setTimout, setInterval`

```js
		let q;
    console.log(q);
    $div.click(() => {
        if (q) return false;     // 因为双击事件老是会触发单击事件，所以加一个这个
        q = setTimeout(() => {
            console.log('hello world');
        }, 1000);
    });
    $div.on("dblclick", () => {
        console.log('stop')
        clearTimeout(q);
    });
```

`requestAnimationFrame`

```js
let id
let step = (timestamp) => {  // 每帧将div的宽度增加1像素  timestamp是执行的时刻毫秒数
    let div = document.querySelector('div');
    div.style.width = div.clientWidth + 1 + 'px';
    id = requestAnimationFrame(step);
};

id = requestAnimationFrame(step);

cancelAnimationFrame(id) // 可以设置一个点击事件，点击的时候停下来
```

------

**Map**

```js
    for (let [key, value] of map) {
        console.log(key, value);
    }

    map.forEach((value, key) => {   // 反过来
        console.log(key, value);   
    });
```

------

**localStorage**：存到用户本地，可以存一些用户的偏好 

-----

**window**

```js
$div.css("cursor", "pointer");    // cursor 鼠标悬浮时的样式


let main = () => {
    $div.on('click', function () {
        window.open("https://www.acwing.com");
        // location.href = "https://www.acwing.com";
    })
}
```

```mermaid
graph TD

A(起床) --> B[洗漱]

B --> C{扔硬币}

C -->|正面朝上| D[喝牛奶]

C -->|反面朝上| E[喝果汁]
```



-----

### react

`react`会在内存里放一个虚拟的`Dom`树， 由于`react`是数据驱动的，因此当数据发生改变的时候，`react`会去把有可能发生变化的节点都做出相应的改变，然后再跟真实的`Dom`树进行比较分析，最后只会修改相应的节点
