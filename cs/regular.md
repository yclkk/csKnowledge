## 一、基础

### 1.1 元字符

> 正则功能：**校验**数据的有效性、**查找符合要求的文本**以及对文本进行**切割和替换**等操作。

#### 元字符的定义

所谓元字符就是指那些在正则表达式中具有特殊意义的专用字符，正则表达式就是由一系列的元字符组成

> 比如`\d`（表示 0-9 这 10 个数字中的任意一个）、`\d{11}`（表示单个数字出现 11 次），其中`\d`和`{11}`就表示元字符

------

#### 元字符分类

<img src='../src/regular/first_fisrt_sortCharacters.webp' style="zoom:45%;">

1. **特殊单字符**

<img src="../src/regular/first_first_singleCharacter.webp" style="zoom:35%;">

2. **空白符**

不同的系统在每行文本结束位置默认的“换行”会有区别。比如在 Windows 里是 \r\n，在 Linux 和 MacOS 中是 \n。



在正则中，也是类似于 \n 或 \r 等方式来表示空白符号，只要记住它们就行了。平时使用正则，大部分场景使用 \s 就可以满足需求，\s 代表任意单个空白符号。

<img src="../src/regular/first_first_blankCharacter.webp" style="zoom:30%;">

3. **量词**

   比如，在文本中“颜色”这个单词，可能是带有 u 的 colour，也可能是不带 u 的 color，我们使用 colou?r 就可以表示两种情况了

   <img src="../src/regular/first_first_quantifyCharacter.webp" style="zoom:25%;">

4. **范围**

   <img src="../src/regular/first_first_scopeCharacter.webp" style="zoom:25%;">

   匹配http https ftp

   <img src="../src/regular/first_first_scope1Character.webp" style="zoom:45%;">

5. **练习手机号的匹配规则**

   1. 第 1 位固定为数字 1

   2. 第 2 位可能是 3，4，5，6，7，8，9

   3. 第 3 位到第 11 位我们认为可能是 0-9 任意数字。

      通过规则可以得出正则表达式是：`1[3-9 ]\d{9}`

----

### 1.2 量词与贪婪 







